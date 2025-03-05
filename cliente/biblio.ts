// Definimos un tipo personalizado para el estado del libro
type EstadoLibro = "disponible" | "prestado" | "en reparación";

// Definimos una interfaz para la estructura de un libro
interface Libro {
    id: number;
    titulo: string;
    autor: string;
    añoPublicacion: number;
    estado: EstadoLibro;
}

// Definimos una interfaz para un usuario de la biblioteca
interface Usuario {
    id: number;
    nombre: string;
    email: string;
    librosPrestados: Libro[];
}

// Clase principal que gestiona la biblioteca
class Biblioteca {
    private libros: Libro[] = [];
    private usuarios: Usuario[] = [];
    private siguienteIdLibro: number = 1;
    private siguienteIdUsuario: number = 1;

    // Método para agregar un nuevo libro
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

    // Método para registrar un nuevo usuario
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

    // Método para prestar un libro
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

    // Método para devolver un libro
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

    // Método para buscar libros por título
    public buscarLibros(titulo: string): Libro[] {
        const resultados = this.libros.filter(libro => 
            libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
        return resultados;
    }

    // Método para obtener estadísticas de la biblioteca
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

// Ejemplo de uso del sistema
function ejemploUsoBiblioteca(): void {
    // Crear una instancia de la biblioteca
    const biblioteca = new Biblioteca();

    // Agregar algunos libros
    biblioteca.agregarLibro("Don Quijote", "Miguel de Cervantes", 1605);
    biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", 1967);
    biblioteca.agregarLibro("El principito", "Antoine de Saint-Exupéry", 1943);

    // Registrar usuarios
    const usuario1 = biblioteca.registrarUsuario("Jazmin Rojano", "jazmin@email.com");
    const usuario2 = biblioteca.registrarUsuario("Azael Acuña", "azael@email.com");

    // Realizar algunos préstamos
    biblioteca.prestarLibro(1, usuario1.id); // Prestar "Don Quijote" a Jazmin
    biblioteca.prestarLibro(2, usuario2.id); // Prestar "Cien años de soledad" a Azael

    // Buscar libros
    console.log("Búsqueda de libros que contienen 'don':");
    console.log(biblioteca.buscarLibros("don"));

    // Devolver un libro
    biblioteca.devolverLibro(1, usuario1.id);

    // Mostrar estadísticas
    console.log("Estadísticas de la biblioteca:");
    console.log(biblioteca.obtenerEstadisticas());
}

// Ejecutar el ejemplo
ejemploUsoBiblioteca();