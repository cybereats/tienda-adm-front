export interface CategoryProduct {
  id: number;
  label: string;
  slug: string;
}

export interface Product {
  id: number;
  label: string;
  slug: string;
  desc: string;
  price: number;
  category: CategoryProduct;
}

export interface ProductsResponse {
  data: Product[];
}
