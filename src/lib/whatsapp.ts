const PRODUCT_MESSAGES: Record<string, string> = {
  pt: "Olá! Vi o artigo “{name}” no site da Casa da Buganvília e gostaria de saber mais ou fazer uma encomenda. Podem confirmar a disponibilidade?\n\n{url}",
  en: "Hello! I saw “{name}” on the Casa da Buganvília website. I’d like to know more or place an order. Could you confirm availability?\n\n{url}",
  fr: "Bonjour ! J’ai vu l’article « {name} » sur le site de Casa da Buganvília. J’aimerais en savoir plus ou passer une commande. Pouvez-vous confirmer sa disponibilité ?\n\n{url}",
  es: "¡Hola! He visto el artículo «{name}» en la web de Casa da Buganvília. Me gustaría saber más o hacer un pedido. ¿Podrían confirmar su disponibilidad?\n\n{url}",
  de: "Hallo! Ich habe den Artikel „{name}“ auf der Website von Casa da Buganvília gesehen. Ich möchte gern mehr erfahren oder ihn bestellen. Können Sie die Verfügbarkeit bestätigen?\n\n{url}",
  zh: "你好！我在 Casa da Buganvília 网站上看到了“{name}”。我想了解更多信息或下单。可以确认是否有货吗？\n\n{url}",
  ja: "こんにちは！Casa da Buganvília のサイトで「{name}」を見ました。詳しい情報を知りたい、または注文したいです。在庫状況を確認していただけますか？\n\n{url}",
};

const GENERAL_MESSAGES: Record<string, string> = {
  pt: "Olá! Gostaria de saber mais sobre a Casa da Buganvília.",
  en: "Hello! I'd like to know more about Casa da Buganvília.",
  fr: "Bonjour ! J'aimerais en savoir plus sur Casa da Buganvília.",
  es: "¡Hola! Me gustaría saber más sobre Casa da Buganvília.",
  de: "Hallo! Ich möchte mehr über Casa da Buganvília erfahren.",
  zh: "你好！我想了解更多关于 Casa da Buganvília 的信息。",
  ja: "こんにちは！Casa da Buganvíliaについてもっと知りたいです。",
};

const LANGUAGE_NAMES: Record<string, string> = {
  pt: "Portuguese",
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  zh: "Chinese",
  ja: "Japanese",
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, value),
    template,
  );
}

function getSupportedLocale(locale: string): string {
  return locale in PRODUCT_MESSAGES ? locale : "en";
}

function addOwnerSummary(
  customerMessage: string,
  locale: string,
  ownerSummary: string,
): string {
  if (locale === "pt" || locale === "en") {
    return customerMessage;
  }

  return `${customerMessage}\n\n--- English summary for the store ---\n${ownerSummary}`;
}

function createWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLink(
  phoneNumber: string,
  productName: string,
  productUrl: string,
  locale: string = "pt",
): string {
  const supportedLocale = getSupportedLocale(locale);
  const customerMessage = fillTemplate(PRODUCT_MESSAGES[supportedLocale], {
    name: productName,
    url: productUrl,
  });
  const ownerSummary = [
    "The customer would like information or wants to place an order.",
    `Product: ${productName}`,
    `Customer language: ${LANGUAGE_NAMES[supportedLocale]}`,
    `Product link: ${productUrl}`,
  ].join("\n");

  return createWhatsAppUrl(
    phoneNumber,
    addOwnerSummary(customerMessage, supportedLocale, ownerSummary),
  );
}

export function getGeneralWhatsAppLink(
  phoneNumber: string,
  locale: string = "pt",
): string {
  const supportedLocale = getSupportedLocale(locale);
  const customerMessage = GENERAL_MESSAGES[supportedLocale];
  const ownerSummary = [
    "The customer would like more information about Casa da Buganvília.",
    `Customer language: ${LANGUAGE_NAMES[supportedLocale]}`,
  ].join("\n");

  return createWhatsAppUrl(
    phoneNumber,
    addOwnerSummary(customerMessage, supportedLocale, ownerSummary),
  );
}
