export interface User {
    ok: boolean;
    email: string;
    pw: string;
    edad: string;
    nombre: string;
    nacionalidad: string;
    tipoDeDocumento: string;
    documentoDeIdentidad: string;
    numeroDeContacto: string
}

export interface EventModelo {
    ok: boolean;
    title: string;
    date: string;
    hour: string;
    location: string;
    distance: string;
    capacity: string;
    category: string;
    cost: string
}

export interface ApiResponse {
    user: User;
}