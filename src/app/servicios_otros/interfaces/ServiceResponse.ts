export interface ServiceResponse<T = any> {
    mensaje: string;
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}