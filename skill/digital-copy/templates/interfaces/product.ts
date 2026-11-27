export type Product = {
    id:number;
    title:string;
    price:number;
    category:string;
    rating:number;
    discountPercentage:number;
    images:string[];
}

export type ProductBody = {
    title:string;
    price:number;
    category:string;
    images:string[];
}

export type ProductState = {
    items:Product[];
    loading:boolean;
    error:string;
}
