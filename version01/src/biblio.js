"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
// Exportamos la clase Biblioteca
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.libros = [];
        this.usuarios = [];
        this.siguienteIdLibro = 1;
        this.siguienteIdUsuario = 1;
    }
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
    Biblioteca.prototype.buscarLibros = function (titulo) {
        return this.libros.filter(function (libro) {
            return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
        });
    };
    Biblioteca.prototype.obtenerTodosLosLibros = function () {
        return __spreadArray([], this.libros, true);
    };
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
exports.Biblioteca = Biblioteca;
