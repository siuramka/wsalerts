export interface IApiClient {
    get<TResponse>(url: string): Promise<TResponse>;
    post<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse>;
    put<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse>;
    delete<TRequest, TResponse>(url: string, data?: TRequest): Promise<TResponse>;
}