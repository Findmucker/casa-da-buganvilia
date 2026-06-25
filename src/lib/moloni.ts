const MOLONI_BASE_URL = "https://api.moloni.pt/v1";

interface MoloniTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

interface MoloniProduct {
  product_id: number;
  name: string;
  reference: string;
  price: number;
  stock: number;
  has_stock: number;
  category_id: number;
  description: string;
  image: string;
  ean: string;
}

interface MoloniCategory {
  category_id: number;
  name: string;
  parent_id: number;
  description: string;
}

// Token cache
let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getMoloniToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const response = await fetch(`${MOLONI_BASE_URL}/grant/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "password",
      client_id: process.env.MOLONI_CLIENT_ID!,
      client_secret: process.env.MOLONI_CLIENT_SECRET!,
      username: process.env.MOLONI_USERNAME!,
      password: process.env.MOLONI_PASSWORD!,
    }),
  });

  if (!response.ok) {
    throw new Error(`Moloni auth failed: ${response.status} ${await response.text()}`);
  }

  const data: MoloniTokenResponse = await response.json();

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

async function moloniRequest(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
): Promise<unknown> {
  const token = await getMoloniToken();
  const companyId = process.env.MOLONI_COMPANY_ID!;

  const response = await fetch(`${MOLONI_BASE_URL}/${endpoint}/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      company_id: companyId,
      access_token: token,
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    }),
  });

  if (!response.ok) {
    throw new Error(`Moloni API error [${endpoint}]: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

export async function getMoloniProducts(offset = 0, qty = 50): Promise<MoloniProduct[]> {
  return moloniRequest("products/getAll", { offset, qty }) as Promise<MoloniProduct[]>;
}

export async function getMoloniProduct(productId: number): Promise<MoloniProduct> {
  return moloniRequest("products/getOne", { product_id: productId }) as Promise<MoloniProduct>;
}

export async function getMoloniProductCount(): Promise<number> {
  const result = (await moloniRequest("products/count")) as { count: number };
  return result.count;
}

export async function getMoloniCategories(): Promise<MoloniCategory[]> {
  return moloniRequest("productCategories/getAll", { parent_id: 0 }) as Promise<MoloniCategory[]>;
}

export async function getMoloniCategoryProducts(categoryId: number, offset = 0, qty = 50): Promise<MoloniProduct[]> {
  return moloniRequest("products/getAll", {
    category_id: categoryId,
    offset,
    qty,
  }) as Promise<MoloniProduct[]>;
}

// Check stock for a single product (real-time)
export async function getMoloniProductStock(productId: number): Promise<number> {
  const product = await getMoloniProduct(productId);
  return product.stock;
}

export function isMoloniConfigured(): boolean {
  return !!(
    process.env.MOLONI_CLIENT_ID &&
    process.env.MOLONI_CLIENT_SECRET &&
    process.env.MOLONI_USERNAME &&
    process.env.MOLONI_PASSWORD &&
    process.env.MOLONI_COMPANY_ID
  );
}
