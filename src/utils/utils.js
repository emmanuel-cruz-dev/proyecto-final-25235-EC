export function formatPrice(price) {
  return price.toLocaleString("ar-AR", {
    currency: "ARS",
    minimumFractionDigits: 0,
  });
}

export function handleRetry() {
  window.location.reload();
}

export function priceInstallments(price) {
  const newPrice = Math.floor(price / 6);
  return formatPrice(newPrice);
}
