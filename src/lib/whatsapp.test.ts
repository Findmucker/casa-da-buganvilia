import { describe, expect, it } from "vitest";
import { getGeneralWhatsAppLink, getWhatsAppLink } from "./whatsapp";

describe("getWhatsAppLink", () => {
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
    const message = new URL(link).searchParams.get("text") ?? "";

    expect(message).toContain("Handmade bowl");
    expect(message).toContain("https://example.com/en/shop/handmade-bowl");
    expect(message).toContain("confirm availability");
  });

  it("falls back to Portuguese for an unsupported locale", () => {
    const link = getWhatsAppLink(
      "+351900000000",
      "Peça única",
      "https://example.com/item",
      "unsupported",
    );
    const message = new URL(link).searchParams.get("text") ?? "";

    expect(message).toContain("gostaria de saber mais");
  });
});

describe("getGeneralWhatsAppLink", () => {
  it("normalizes phone numbers for general inquiries", () => {
    expect(
      getGeneralWhatsAppLink("+351 900 000 000", "en").startsWith(
        "https://wa.me/351900000000?text=",
      ),
    ).toBe(true);
  });
});
