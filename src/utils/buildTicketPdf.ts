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
  };
  logoDataUrl?: string;
};

export async function buildTicketPdf({
  ticket,
  event,
  logoDataUrl,
}: BuildTicketPdfArgs) {
  const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;

  // Borda
  doc.setLineWidth(1);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  // Logo (opcional)
  if (logoDataUrl) {
    const logoWidth = 200;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logoDataUrl, "PNG", logoX, 70, logoWidth, 200);
  }

  // Texto de instrução
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    "Apresente este voucher no dia do evento, acompanhado de documento com foto.",
    pageWidth / 2,
    280,
    { align: "center" }
  );

  // Caixa evento
  doc.rect(75, 310, pageWidth - 150, 100);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(event.title, 85, 325);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`DATA: ${event.date} - ${event.time}`, 85, 345);
  doc.text(event.addressLine1, 85, 365);
  doc.text(event.addressLine2, 85, 385);

  // Caixa QR + comprador
  doc.rect(75, 450, pageWidth - 150, 150);

  const qrDataUrl = await QRCode.toDataURL(ticket.qrcode);
  doc.addImage(qrDataUrl, "PNG", 90, 465, 120, 120);

  const infoX = 230;
  doc.text(`Nome: ${ticket.full_name}`, infoX, 480);
  doc.text(`CPF: ${ticket.cpf}`, infoX, 505);
  doc.text(`Telefone: ${ticket.telephone}`, infoX, 530);

  return doc.output("datauristring");
}
