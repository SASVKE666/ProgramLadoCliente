// Clase principal que gestiona la biblioteca
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.libros = [];
        this.usuarios = [];
        this.siguienteIdLibro = 1;
        this.siguienteIdUsuario = 1;
    }
    // Método para agregar un nuevo libro
    Biblioteca.prototype.agregarLibro = function (titulo, autor, añoPublicacion) {
        var nuevoLibro = {
            id: this.siguienteIdLibro++,
            titulo: titulo,
            autor: autor,
            añoPublicacion: añoPublicacion,
            estado: "disponible"
        };
        this.libros.push(nuevoLibro);
        console.log("Libro \"".concat(titulo, "\" agregado con \u00E9xito."));
    };
    // Método para registrar un nuevo usuario
    Biblioteca.prototype.registrarUsuario = function (nombre, email) {
        var nuevoUsuario = {
            id: this.siguienteIdUsuario++,
            nombre: nombre,
            email: email,
            librosPrestados: []
        };
        this.usuarios.push(nuevoUsuario);
        console.log("Usuario ".concat(nombre, " registrado con \u00E9xito."));
        return nuevoUsuario;
    };
    // Método para prestar un libro
    Biblioteca.prototype.prestarLibro = function (idLibro, idUsuario) {
        var libro = this.libros.find(function (l) { return l.id === idLibro; });
        var usuario = this.usuarios.find(function (u) { return u.id === idUsuario; });
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
        console.log("Libro \"".concat(libro.titulo, "\" prestado a ").concat(usuario.nombre, "."));
        return true;
    };
    // Método para devolver un libro
    Biblioteca.prototype.devolverLibro = function (idLibro, idUsuario) {
        var libro = this.libros.find(function (l) { return l.id === idLibro; });
        var usuario = this.usuarios.find(function (u) { return u.id === idUsuario; });
        if (!libro || !usuario) {
            console.log("Libro o usuario no encontrado.");
            return false;
        }
        var indiceLibro = usuario.librosPrestados.findIndex(function (l) { return l.id === idLibro; });
        if (indiceLibro === -1) {
            console.log("El usuario no tiene este libro prestado.");
            return false;
        }
        libro.estado = "disponible";
        usuario.librosPrestados.splice(indiceLibro, 1);
        console.log("Libro \"".concat(libro.titulo, "\" devuelto por ").concat(usuario.nombre, "."));
        return true;
    };
    // Método para buscar libros por título
    Biblioteca.prototype.buscarLibros = function (titulo) {
        var resultados = this.libros.filter(function (libro) {
            return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
        });
        return resultados;
    };
    // Método para obtener estadísticas de la biblioteca
    Biblioteca.prototype.obtenerEstadisticas = function () {
        var librosDisponibles = this.libros.filter(function (l) { return l.estado === "disponible"; }).length;
        var librosPrestados = this.libros.filter(function (l) { return l.estado === "prestado"; }).length;
        return {
            totalLibros: this.libros.length,
            librosDisponibles: librosDisponibles,
            librosPrestados: librosPrestados,
            totalUsuarios: this.usuarios.length
        };
    };
    return Biblioteca;
}());
// Ejemplo de uso del sistema
function ejemploUsoBiblioteca() {
    // Crear una instancia de la biblioteca
    var biblioteca = new Biblioteca();
    // Agregar algunos libros
    biblioteca.agregarLibro("Don Quijote", "Miguel de Cervantes", 1605);
    biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", 1967);
    biblioteca.agregarLibro("El principito", "Antoine de Saint-Exupéry", 1943);
    // Registrar usuarios
    var usuario1 = biblioteca.registrarUsuario("Jazmin Rojano", "jazmin@email.com");
    var usuario2 = biblioteca.registrarUsuario("Azael Acuña", "azael@email.com");
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
