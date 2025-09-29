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
export declare const comparePassword: (hashedPassword: string, candidatePassword: string) => Promise<boolean>;
export declare const loginUser: (email: string, password: string) => Promise<LoginResponse>;
export declare const createUser: (name: string, email: string, password: string) => Promise<any>;
//# sourceMappingURL=userService.d.ts.map