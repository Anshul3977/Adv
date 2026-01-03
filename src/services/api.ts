const BASE_URL = 'https://world.openfoodfacts.org';

export interface Product {
  code: string;
  product_name: string;
  brands?: string;
  categories?: string;
  image_url?: string;
  nutrition_grades?: string;
  ingredients_text?: string;
  nutriments?: {
    'energy-kcal_100g'?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
    sugars_100g?: number;
    salt_100g?: number;
  };
  labels?: string;
  labels_tags?: string[];
}

export interface ProductResponse {
  products: Product[];
  count: number;
  page: number;
  page_size: number;
  page_count: number;
}

export interface ProductDetail {
  status: number;
  product: Product;
}

export const searchProducts = async (
  searchTerm: string,
  page: number = 1,
  pageSize: number = 24
): Promise<ProductResponse> => {
  const response = await fetch(
    `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&page=${page}&page_size=${pageSize}&json=true`
  );
  return response.json();
};

export const searchByBarcode = async (barcode: string): Promise<ProductDetail> => {
  const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
  return response.json();
};

export const getProductsByCategory = async (
  category: string,
  page: number = 1,
  pageSize: number = 24
): Promise<ProductResponse> => {
  const response = await fetch(
    `${BASE_URL}/category/${category}.json?page=${page}&page_size=${pageSize}`
  );
  return response.json();
};

export const getProductDetail = async (barcode: string): Promise<ProductDetail> => {
  const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
  return response.json();
};

export const categories = [
  { value: '', label: 'All Categories' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'cereals', label: 'Cereals' },
  { value: 'meat', label: 'Meat' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'sauces', label: 'Sauces' },
];
