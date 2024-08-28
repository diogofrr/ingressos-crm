export const handleDownloadPdf = (hash: string) => {
  const base64WithoutPrefix = hash.substr('data:application/pdf;base64,'.length)

  const bytes = atob(base64WithoutPrefix)
  let length = bytes.length
  const out = new Uint8Array(length)

  while (length--) {
    out[length] = bytes.charCodeAt(length)
  }

  const blob = new Blob([out], { type: 'application/pdf' })

  // Cria um link para download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.href = url;
  link.download = 'ingresso-crm.pdf';
  
  // Simula o clique no link para iniciar o download
  link.click();
  
  // Limpa o objeto URL para liberar memória
  URL.revokeObjectURL(url);
}
