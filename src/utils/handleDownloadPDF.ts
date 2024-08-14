export const handleDownloadPdf = (hash: string) => {
  const link = document.createElement("a");
  link.href = hash;
  link.download = `ingresso-crm.pdf`;
  link.click();
}