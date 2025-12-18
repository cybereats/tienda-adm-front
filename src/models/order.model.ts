import { Product } from "./product.model";
import { User } from "./user.model";

export interface Order {
    id: string;
    user: User;
    orderItems: OrderItem[];
    createdAt: Date;
    status: string;
    totalPrice: number;
}

export interface OrderItem {
    id: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface OrderResponse {
    data: Order[];
    page: number;
    size: number;
    totalElements: number;
    totalPages?: number; // Optional since backend doesn't return it
}
