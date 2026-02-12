export interface Computer {
    id: number;
    label: string;
    slug: string;
    runtime: number;
    specs: string;
    workingSince: string;
    image: string;
    status: PCStatus;
    categoryPCResponse: CategoryPC;
}

export type PCStatus = 'OCCUPIED' | 'MAINTENANCE' | 'AVAILABLE';

export interface ComputerResponse {
    data: Computer[];
    page: number;
    size: number;
    totalElements: number;
    totalPages?: number; // Optional since backend doesn't return it

}


export interface CategoryPC {
    id: number;
    label: string;
    slug: string;
}
