export const formatter = {
  rupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  },

  number(value: number) {
    return new Intl.NumberFormat("id-ID").format(value);
  },

  date(value: Date) {
    return new Intl.DateTimeFormat("id-ID").format(value);
  },
};