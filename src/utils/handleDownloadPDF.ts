export const handleDownloadPdf = (data: string) => {
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

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "ingresso-crm.pdf";
  link.click();
  URL.revokeObjectURL(url);
};
