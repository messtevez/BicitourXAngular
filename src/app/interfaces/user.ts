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

export interface ApiResponse {
    user: User;
}