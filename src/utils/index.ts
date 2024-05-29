const f = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
});
export const toINR = (n: number) => f.format(n).replace("T", "K");
