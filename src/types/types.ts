//import date from "date-and-time";

export interface Author { //recordar exportar porque si no se exporta, no se puede usar en otro lado y va a dar error
    id: number;
    birthDate: Date; // Tipo nativo de JavaScript para fechas
    name: string;
    description: string;
    image: string;
    books: Book[];
}

export interface Book {
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: Date; // Tipo nativo de JavaScript para fechas
    description: string;
    editorial: Editorial;
}

export interface Editorial {
    id: number;
    name: string;
}