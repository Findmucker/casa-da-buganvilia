import { describe, expect, it } from "vitest";
import { getGeneralWhatsAppLink, getWhatsAppLink } from "./whatsapp";

describe("getWhatsAppLink", () => {
  function getMessage(link: string): string {
    return new URL(link).searchParams.get("text") ?? "";
  }

  it("normalizes the phone number for wa.me", () => {
    const link = getWhatsAppLink(
      "+351 912-345-678",
      "Taça artesanal",
      "https://example.com/shop/taca",
      "pt",
    );

    expect(link.startsWith("https://wa.me/351912345678?text=")).toBe(true);
  });

  it("includes the selected item name and URL in the message", () => {
    const link = getWhatsAppLink(
      "+351900000000",
      "Handmade bowl",
      "https://example.com/en/shop/handmade-bowl",
      "en",
    );
    const message = getMessage(link);

    expect(message).toContain("Handmade bowl");
    expect(message).toContain("https://example.com/en/shop/handmade-bowl");
    expect(message).toContain("confirm availability");
    expect(message).not.toContain("English summary for the store");
  });

  it("keeps Portuguese product inquiries in Portuguese only", () => {
    const message = getMessage(
      getWhatsAppLink(
        "+351900000000",
        "Taça artesanal",
        "https://example.com/shop/taca",
        "pt",
      ),
    );

    expect(message).toContain("fazer uma encomenda");
    expect(message).not.toContain("English summary for the store");
  });

  it("adds an English owner summary to other supported languages", () => {
    const message = getMessage(
      getWhatsAppLink(
        "+351900000000",
        "Bol artisanal",
        "https://example.com/fr/shop/bol",
        "fr",
      ),
    );

    expect(message).toContain("J’aimerais en savoir plus");
    expect(message).toContain("English summary for the store");
    expect(message).toContain("Product: Bol artisanal");
    expect(message).toContain("Customer language: French");
    expect(message).toContain("Product link: https://example.com/fr/shop/bol");
  });

  it("falls back to English for an unsupported locale", () => {
    const link = getWhatsAppLink(
      "+351900000000",
      "Unique item",
      "https://example.com/item",
      "unsupported",
    );
    const message = getMessage(link);

    expect(message).toContain("I’d like to know more");
    expect(message).not.toContain("English summary for the store");
  });
});

describe("getGeneralWhatsAppLink", () => {
  function getMessage(locale: string): string {
    const link = getGeneralWhatsAppLink("+351900000000", locale);
    return new URL(link).searchParams.get("text") ?? "";
  }

  it("normalizes phone numbers for general inquiries", () => {
    expect(
      getGeneralWhatsAppLink("+351 900 000 000", "en").startsWith(
        "https://wa.me/351900000000?text=",
      ),
    ).toBe(true);
  });

  it("keeps Portuguese and English general inquiries monolingual", () => {
    expect(getMessage("pt")).not.toContain("English summary for the store");
    expect(getMessage("en")).not.toContain("English summary for the store");
  });

  it("adds an English owner summary to translated general inquiries", () => {
    const message = getMessage("ja");

    expect(message).toContain("もっと知りたいです");
    expect(message).toContain("English summary for the store");
    expect(message).toContain("Customer language: Japanese");
  });
});
