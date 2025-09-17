export const handleSharePdf = async (
  data: string,
  filename?: string,
  message?: string
) => {
  try {
    // Normaliza para base64 (independente se veio como data URL ou base64 puro)
    let base64: string = data;
    if (typeof data === "string" && data.startsWith("data:application/pdf")) {
      const commaIndex = data.indexOf(",");
      base64 = commaIndex >= 0 ? data.substring(commaIndex + 1) : "";
    } else if (data.startsWith("data:application/pdf;base64,")) {
      base64 = data.substring("data:application/pdf;base64,".length);
    }

    const binaryString = atob(base64);
    const { length } = binaryString;
    const byteArray = new Uint8Array(length);
    for (let index = 0; index < length; index++) {
      byteArray[index] = binaryString.charCodeAt(index);
    }

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const defaultName = "ingresso";
    const rawName = (filename ?? defaultName).trim().toLowerCase();
    const sanitized = rawName
      .replace(/\s+/g, "_")
      .replace(/[\\\/:*?"<>|]+/g, "");
    const baseName = sanitized || defaultName;
    const finalName = baseName.toLowerCase().endsWith(".pdf")
      ? baseName
      : `${baseName}.pdf`;

    const shareTitle = finalName.replace(/\.pdf$/i, "");
    const shareText = message ?? `Segue seu ingresso: ${finalName}`;

    // Tenta usar Web Share API (preferencial no mobile)
    const hasNavigator = typeof navigator !== "undefined";
    const hasShare =
      hasNavigator && typeof (navigator as any).share === "function";
    // @ts-ignore - canShare pode não existir em todos os navegadores
    const hasCanShare =
      hasNavigator && typeof (navigator as any).canShare === "function";

    if (hasShare) {
      try {
        const file = new File([blob], finalName, { type: "application/pdf" });
        const canShareFiles =
          hasCanShare && (navigator as any).canShare({ files: [file] });

        if (canShareFiles) {
          await (navigator as any).share({
            files: [file],
            title: shareTitle,
            text: shareText,
          });
          return;
        }

        // Compartilha ao menos o texto se não suportar arquivos
        await (navigator as any).share({ title: shareTitle, text: shareText });
        return;
      } catch (err) {
        // Se falhar o share nativo, cai no fallback do WhatsApp abaixo
        console.error(err);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
