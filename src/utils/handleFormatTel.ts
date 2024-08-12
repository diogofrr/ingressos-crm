export const handleFormatTel = (value: string) => {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) 9$3-$4");
  }

  return cleaned;
};