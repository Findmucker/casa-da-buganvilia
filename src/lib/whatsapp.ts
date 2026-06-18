const WHATSAPP_MESSAGES: Record<string, string> = {
  pt: "Olá! Vi o artigo “{name}” no site da Casa da Buganvília e gostaria de saber mais ou fazer uma encomenda. Podem confirmar a disponibilidade?\n\n{url}",
  en: "Hello! I saw “{name}” on the Casa da Buganvília website. I’d like to know more or place an order. Could you confirm availability?\n\n{url}",
  fr: "Bonjour ! J’ai vu l’article « {name} » sur le site de Casa da Buganvília. J’aimerais en savoir plus ou passer une commande. Pouvez-vous confirmer sa disponibilité ?\n\n{url}",
  es: "¡Hola! He visto el artículo «{name}» en la web de Casa da Buganvília. Me gustaría saber más o hacer un pedido. ¿Podrían confirmar su disponibilidad?\n\n{url}",
  de: "Hallo! Ich habe den Artikel „{name}“ auf der Website von Casa da Buganvília gesehen. Ich möchte gern mehr erfahren oder ihn bestellen. Können Sie die Verfügbarkeit bestätigen?\n\n{url}",
  zh: "你好！我在 Casa da Buganvília 网站上看到了“{name}”。我想了解更多信息或下单。可以确认是否有货吗？\n\n{url}",
  ja: "こんにちは！Casa da Buganvília のサイトで「{name}」を見ました。詳しい情報を知りたい、または注文したいです。在庫状況を確認していただけますか？\n\n{url}",
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
  const cleanPhone = phoneNumber.replace(/\D/g, "");
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
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
