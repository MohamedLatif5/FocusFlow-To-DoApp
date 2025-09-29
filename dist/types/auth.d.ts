export interface LoginRequestBody {
    email: string;
    password: string;
}
export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
//# sourceMappingURL=auth.d.ts.map