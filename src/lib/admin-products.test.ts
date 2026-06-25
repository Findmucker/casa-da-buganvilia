import { describe, expect, it } from "vitest";
import { normalizeProductSaveInput } from "./admin-products";

describe("normalizeProductSaveInput", () => {
  it("accepts comma decimal prices and trims translations", () => {
    const result = normalizeProductSaveInput({
      slug: " produto-teste ",
      categoryId: "category-1",
      price: "12,50",
      active: true,
      featured: true,
      translations: {
        pt: {
          name: " Produto Teste ",
          description: " Descricao ",
          shortDescription: " Curta ",
        },
        en: { name: "", description: "", shortDescription: "" },
      },
    });

    expect(result).toEqual({
      active: true,
      categoryId: "category-1",
      featured: true,
      price: 12.5,
      slug: "produto-teste",
      translations: [
        {
          locale: "pt",
          name: "Produto Teste",
          description: "Descricao",
          shortDescription: "Curta",
        },
      ],
    });
  });

  it("rejects invalid product save payloads", () => {
    expect(normalizeProductSaveInput({})).toEqual({
      error: "O slug do produto e obrigatorio.",
    });

    expect(
      normalizeProductSaveInput({
        slug: "produto",
        categoryId: "category-1",
        price: "abc",
        translations: { pt: { name: "Produto" } },
      }),
    ).toEqual({
      error: "O preco do produto deve ser um numero valido.",
    });

    expect(
      normalizeProductSaveInput({
        slug: "produto",
        categoryId: "category-1",
        price: "1",
        translations: { pt: { name: "" } },
      }),
    ).toEqual({
      error: "Adicione pelo menos um nome de produto.",
    });
  });
});
