export const WHATSAPP_NUMBER = "447310613403";

export const whatsappMessages = {
  general: "Hi, I'm interested in your furniture collection",
  product: (productName: string, size: string, price: string) =>
    `Assalam o Alaikum, I'm interested in the ${productName} (${size}) listed on OAK & HAVEN FURNITURE for ${price}. Please share availability and delivery details.`,
};

export const createWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const createProductWhatsAppLink = (
  productName: string,
  size: string,
  price: string,
) => {
  const message = whatsappMessages.product(productName, size, price);
  return createWhatsAppLink(message);
};

export const createGeneralWhatsAppLink = () => {
  return createWhatsAppLink(whatsappMessages.general);
};
