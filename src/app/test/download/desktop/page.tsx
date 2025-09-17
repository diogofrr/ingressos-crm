"use client";

import { handleDownloadPdf } from "@/utils/handleDownloadPDF";

const SAMPLE_PDF_DATA_URL =
  "data:application/pdf;base64,JVBERi0xLjUKJeLjz9MKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9Db3VudCAxIC9LaWRzIFsgMyAwIFIgXSA+PgplbmRvYmoKMyAwIG9iago8PCAvVHlwZSAvUGFnZSAvUGFyZW50IDIgMCBSIC9NZWRpYUJveCBbMCAwIDU5NSA4NDJdIC9Db250ZW50cyA0IDAgUiA+PgplbmRvYmoKNCAwIG9iago8PCA+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE0MyAwMDAwMCBuIAowMDAwMDAwMjEwIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAgUiA+PgpzdGFydHhyZWYKMjIzCiUlRU9G";

export default function Page() {
  return (
    <section className="p-6">
      <h1 className="text-xl font-semibold mb-4">Teste Download Desktop</h1>
      <button
        className="btn btn-primary"
        onClick={() => handleDownloadPdf(SAMPLE_PDF_DATA_URL)}
      >
        Baixar PDF
      </button>
    </section>
  );
}
