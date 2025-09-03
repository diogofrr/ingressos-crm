import jsPDF from "jspdf";
import QRCode from "qrcode";

type BuildTicketPdfArgs = {
  ticket: { full_name: string; cpf: string; telephone: string; qrcode: string };
  event: {
    title: string;
    date: string;
    time: string;
    addressLine1: string;
    addressLine2: string;
    batch: number;
  };
  logoDataUrl?: string;
};

// Função para converter imagem para base64 e obter dimensões
async function convertImageToBase64(
  imagePath: string
): Promise<{ dataUrl: string; width: number; height: number }> {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível criar contexto do canvas"));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
        resolve({
          dataUrl,
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = () => reject(new Error("Erro ao carregar imagem"));
      img.src = URL.createObjectURL(blob);
    });
  } catch (error) {
    console.error("Erro ao converter imagem para base64:", error);
    return { dataUrl: "", width: 0, height: 0 };
  }
}

export async function buildTicketPdf({
  ticket,
  event,
  logoDataUrl,
}: BuildTicketPdfArgs) {
  const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;

  // Borda principal - similar ao código anterior
  doc.setLineWidth(1);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  // Logo centralizado no topo - similar ao código anterior
  let finalLogoDataUrl = logoDataUrl;
  let logoDimensions = { width: 250, height: 100 }; // Dimensões padrão

  if (!finalLogoDataUrl) {
    // Se não foi fornecida logo, usa a logo padrão
    try {
      const logoData = await convertImageToBase64("/arraia-crm.png");
      finalLogoDataUrl = logoData.dataUrl;
      if (logoData.width && logoData.height) {
        logoDimensions = logoData;
      }
    } catch (error) {
      console.error("Erro ao carregar logo padrão:", error);
    }
  }

  if (finalLogoDataUrl) {
    try {
      // Calcula as dimensões mantendo as proporções originais
      const maxWidth = 250;
      const maxHeight = 120;

      let logoWidth = logoDimensions.width;
      let logoHeight = logoDimensions.height;

      // Redimensiona mantendo proporção se exceder os limites
      if (logoWidth > maxWidth || logoHeight > maxHeight) {
        const ratio = Math.min(maxWidth / logoWidth, maxHeight / logoHeight);
        logoWidth = logoWidth * ratio;
        logoHeight = logoHeight * ratio;
      }

      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 70; // Posição Y similar ao código anterior
      doc.addImage(
        finalLogoDataUrl,
        "PNG",
        logoX,
        logoY,
        logoWidth,
        logoHeight
      );
    } catch (error) {
      console.error("Erro ao adicionar logo ao PDF:", error);
    }
  }

  // Texto de instrução - mais próximo do primeiro container
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(
    "Apresente este voucher no dia do evento, acompanhado de documento com foto.",
    pageWidth / 2,
    300, // Posição Y mais próxima do container
    { align: "center" }
  );

  // Caixa do evento - dimensões similares ao código anterior
  const eventBoxX = 75;
  const eventBoxY = 310; // Posição Y similar ao código anterior
  const eventBoxWidth = pageWidth - 150;
  const eventBoxHeight = 100; // Altura similar ao código anterior

  doc.setLineWidth(1);
  doc.rect(eventBoxX, eventBoxY, eventBoxWidth, eventBoxHeight);

  // Conteúdo da caixa do evento - alinhado à esquerda e endereço em uma linha
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `${event.title} - ${event.batch}ª Lote`,
    eventBoxX + 10,
    eventBoxY + 25
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    `DATA: ${event.date} - ${event.time}`,
    eventBoxX + 10,
    eventBoxY + 45
  );

  // Endereço completo em uma linha com "LOCAL:"
  const fullAddress = `LOCAL: ${event.addressLine1} - ${event.addressLine2}`;
  doc.text(fullAddress, eventBoxX + 10, eventBoxY + 65);

  // Caixa QR + informações pessoais - dimensões similares ao código anterior
  const personalBoxX = 75;
  const personalBoxY = 450; // Posição Y similar ao código anterior
  const personalBoxWidth = pageWidth - 150;
  const personalBoxHeight = 150; // Altura similar ao código anterior

  doc.rect(personalBoxX, personalBoxY, personalBoxWidth, personalBoxHeight);

  // QR Code - centralizado verticalmente na caixa
  const qrDataUrl = await QRCode.toDataURL(ticket.qrcode);
  const qrSize = 120;
  const qrX = personalBoxX + 15;
  const qrY = personalBoxY + (personalBoxHeight - qrSize) / 2; // Centralizado verticalmente
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

  // Informações pessoais - alinhadas com o QR Code
  const infoX = personalBoxX + 155;
  const infoStartY = personalBoxY + (personalBoxHeight - qrSize) / 2 + 20; // Alinhado com o QR Code
  const lineHeight = 25;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text(`Nome: ${ticket.full_name}`, infoX, infoStartY);
  doc.text(`CPF: ${ticket.cpf}`, infoX, infoStartY + lineHeight);
  doc.text(`Telefone: ${ticket.telephone}`, infoX, infoStartY + lineHeight * 2);

  return doc.output("datauristring");
}
