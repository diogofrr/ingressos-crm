export const handleDownloadPdf = (data: string) => {
  // Se já for um data URL de PDF, baixa diretamente
  if (typeof data === "string" && data.startsWith("data:application/pdf")) {
    const link = document.createElement("a");
    link.href = data;
    link.download = "ingresso-crm.pdf";
    link.click();
    return;
  }

  // Compatibilidade: base64 com prefixo removido anteriormente
  const base64WithPossiblePrefix = data;
  const base64 = base64WithPossiblePrefix.startsWith(
    "data:application/pdf;base64,"
  )
    ? base64WithPossiblePrefix.substring("data:application/pdf;base64,".length)
    : base64WithPossiblePrefix;

  const bytes = atob(base64);
  let length = bytes.length;
  const out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  const blob = new Blob([out], { type: "application/pdf" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "ingresso-crm.pdf";
  link.click();
  URL.revokeObjectURL(url);
};
