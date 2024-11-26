export interface UserResponse {
    user:    User;
    token: string;
}

export interface User {
    _id:       string;
    Nombre:    string;
    Correo:    string;
    isActive: boolean;
    __v:       number;
    Contra?:   string;
}

export interface LoginRecuest {
    Correo: string;
    Contra: string;
}

export interface CreateUserRecuest {
    Correo: string;
    Contra: string;
    Nombre: string;
}

export interface UserListResponse {
    users: User[];
    token: string;
}

export interface EditUserRecuest {
    _id:    string;
    Correo: string;
    Contra: string;
    Nombre: string;
}

