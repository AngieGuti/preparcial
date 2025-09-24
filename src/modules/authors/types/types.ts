//import date from "date-and-time";

export interface Author { //recordar exportar porque si no se exporta, no se puede usar en otro lado y va a dar error
    id: number;
    birthDate: string; // Usar string para simplificar la serialización/deserialización
    name: string;
    description: string;
    image: string;
    books: Book;
    prizes: Prize;
}

export interface Book {
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string; // Debería ser Date pero se usa string para simplificar
    description: string;
    editorial: string; // cambio a string para simplificar
}

export interface Editorial {
    name: string;
}

export interface Prize {
    id: number;
    premiationDate: string;
    name: string;
    description: string;
    organization: string; // cambio a string para simplificar
}

export interface Organization {
    id: number;
    name: string;
    tipo: string;
}