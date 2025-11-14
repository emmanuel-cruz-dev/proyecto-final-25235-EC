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

export function renderCategory(category) {
  switch (category) {
    case "tecnologia":
      return "Tecnología";
    case "gaming":
      return "Gaming";
    case "hombres":
      return "Ropa de Hombre";
    case "mujeres":
      return "Ropa de Mujer";
    default:
      return "Todos los productos";
  }
}
