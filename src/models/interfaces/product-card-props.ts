export interface Product {
    id: number;
    title: string;
    description: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];

}

export interface ProductCardProps {
  product: Product,
  onClick: () => void;
}

export interface ProductState{
  products: Product[];
  loading: boolean;
  error: string;
}
