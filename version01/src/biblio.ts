// Exportamos los tipos
export type EstadoLibro = "disponible" | "prestado" | "en reparación";

export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    añoPublicacion: number;
    estado: EstadoLibro;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    librosPrestados: Libro[];
}

// Exportamos la clase Biblioteca
export class Biblioteca {
    private libros: Libro[] = [];
    private usuarios: Usuario[] = [];
    private siguienteIdLibro: number = 1;
    private siguienteIdUsuario: number = 1;

    public agregarLibro(titulo: string, autor: string, añoPublicacion: number): void {
        const nuevoLibro: Libro = {
            id: this.siguienteIdLibro++,
            titulo,
            autor,
            añoPublicacion,
            estado: "disponible"
        };
        this.libros.push(nuevoLibro);
        console.log(`Libro "${titulo}" agregado con éxito.`);
    }

    public registrarUsuario(nombre: string, email: string): Usuario {
        const nuevoUsuario: Usuario = {
            id: this.siguienteIdUsuario++,
            nombre,
            email,
            librosPrestados: []
        };
        this.usuarios.push(nuevoUsuario);
        console.log(`Usuario ${nombre} registrado con éxito.`);
        return nuevoUsuario;
    }

    public prestarLibro(idLibro: number, idUsuario: number): boolean {
        const libro = this.libros.find(l => l.id === idLibro);
        const usuario = this.usuarios.find(u => u.id === idUsuario);

        if (!libro || !usuario) {
            console.log("Libro o usuario no encontrado.");
            return false;
        }

        if (libro.estado !== "disponible") {
            console.log("El libro no está disponible para préstamo.");
            return false;
        }

        if (usuario.librosPrestados.length >= 3) {
            console.log("El usuario ha alcanzado el límite de préstamos.");
            return false;
        }

        libro.estado = "prestado";
        usuario.librosPrestados.push(libro);
        console.log(`Libro "${libro.titulo}" prestado a ${usuario.nombre}.`);
        return true;
    }

    public devolverLibro(idLibro: number, idUsuario: number): boolean {
        const libro = this.libros.find(l => l.id === idLibro);
        const usuario = this.usuarios.find(u => u.id === idUsuario);

        if (!libro || !usuario) {
            console.log("Libro o usuario no encontrado.");
            return false;
        }

        const indiceLibro = usuario.librosPrestados.findIndex(l => l.id === idLibro);
        if (indiceLibro === -1) {
            console.log("El usuario no tiene este libro prestado.");
            return false;
        }

        libro.estado = "disponible";
        usuario.librosPrestados.splice(indiceLibro, 1);
        console.log(`Libro "${libro.titulo}" devuelto por ${usuario.nombre}.`);
        return true;
    }

    public buscarLibros(titulo: string): Libro[] {
        return this.libros.filter(libro => 
            libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
    }

    public obtenerTodosLosLibros(): Libro[] {
        return [...this.libros];
    }

    public obtenerEstadisticas(): {
        totalLibros: number,
        librosDisponibles: number,
        librosPrestados: number,
        totalUsuarios: number
    } {
        const librosDisponibles = this.libros.filter(l => l.estado === "disponible").length;
        const librosPrestados = this.libros.filter(l => l.estado === "prestado").length;

        return {
            totalLibros: this.libros.length,
            librosDisponibles,
            librosPrestados,
            totalUsuarios: this.usuarios.length
        };
    }
}