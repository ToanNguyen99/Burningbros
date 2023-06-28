export interface ListReponse<T> {
    products: T[];
    total: string;
    skip: string;
    limit: string;
}