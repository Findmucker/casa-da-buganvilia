const WHATSAPP_MESSAGES: Record<string, string> = {
  pt: "Olá! Tenho interesse neste produto: {name} - {url}",
  en: "Hello! I'm interested in this product: {name} - {url}",
  fr: "Bonjour ! Je suis intéressé(e) par ce produit : {name} - {url}",
  es: "¡Hola! Estoy interesado/a en este producto: {name} - {url}",
  de: "Hallo! Ich interessiere mich für dieses Produkt: {name} - {url}",
  zh: "你好！我对这个产品感兴趣：{name} - {url}",
  ja: "こんにちは！この商品に興味があります：{name} - {url}",
};

export function getWhatsAppLink(
  phoneNumber: string,
  productName: string,
  productUrl: string,
  locale: string = "pt"
) {
  const template = WHATSAPP_MESSAGES[locale] || WHATSAPP_MESSAGES.pt;
  const message = template
    .replace("{name}", productName)
    .replace("{url}", productUrl);
  const encoded = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function getGeneralWhatsAppLink(phoneNumber: string, locale: string = "pt") {
  const messages: Record<string, string> = {
    pt: "Olá! Gostaria de saber mais sobre a Casa da Buganvília.",
    en: "Hello! I'd like to know more about Casa da Buganvília.",
    fr: "Bonjour ! J'aimerais en savoir plus sur Casa da Buganvília.",
    es: "¡Hola! Me gustaría saber más sobre Casa da Buganvília.",
    de: "Hallo! Ich möchte mehr über Casa da Buganvília erfahren.",
    zh: "你好！我想了解更多关于Casa da Buganvília的信息。",
    ja: "こんにちは！Casa da Buganvíliaについてもっと知りたいです。",
  };
  const message = messages[locale] || messages.pt;
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
