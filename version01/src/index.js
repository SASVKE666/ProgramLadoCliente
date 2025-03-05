"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biblio_js_1 = require("./biblio.js");
var BibliotecaUI = /** @class */ (function () {
    function BibliotecaUI() {
        this.searchInput = null;
        this.booksContainer = null;
        this.statsContainer = null;
        this.alertContainer = null;
        this.biblioteca = new biblio_js_1.Biblioteca();
        this.initializeDOM();
        if (!this.searchInput || !this.booksContainer || !this.statsContainer || !this.alertContainer) {
            throw new Error('No se pudieron encontrar elementos DOM necesarios');
        }
        this.initializeEventListeners();
        this.cargarDatosIniciales();
    }
    BibliotecaUI.prototype.initializeDOM = function () {
        this.searchInput = document.getElementById('searchInput');
        this.booksContainer = document.getElementById('books');
        this.statsContainer = document.getElementById('stats');
        this.alertContainer = document.getElementById('alert');
    };
    BibliotecaUI.prototype.initializeEventListeners = function () {
        var _this = this;
        if (!this.searchInput)
            return;
        this.searchInput.addEventListener('input', function (e) {
            var target = e.target;
            _this.filtrarLibros(target.value);
        });
    };
    BibliotecaUI.prototype.cargarDatosIniciales = function () {
        // Agregar algunos libros de ejemplo
        this.biblioteca.agregarLibro("Don Quijote", "Miguel de Cervantes", 1605);
        this.biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", 1967);
        this.biblioteca.agregarLibro("El principito", "Antoine de Saint-Exupéry", 1943);
        // Registrar usuarios de ejemplo
        var usuario1 = this.biblioteca.registrarUsuario("Jazmin Rojano", "jazmin@email.com");
        var usuario2 = this.biblioteca.registrarUsuario("Azael Acuña", "azael@email.com");
        // Realizar algunos préstamos de ejemplo
        this.biblioteca.prestarLibro(1, usuario1.id);
        this.biblioteca.prestarLibro(2, usuario2.id);
        this.actualizarUI();
    };
    BibliotecaUI.prototype.actualizarUI = function () {
        this.renderizarEstadisticas();
        this.renderizarLibros();
    };
    BibliotecaUI.prototype.renderizarEstadisticas = function () {
        if (!this.statsContainer)
            return;
        var stats = this.biblioteca.obtenerEstadisticas();
        this.statsContainer.innerHTML = "\n            <div class=\"stat-card\">\n                <div class=\"stat-value\">".concat(stats.totalLibros, "</div>\n                <div class=\"stat-label\">Total Libros</div>\n            </div>\n            <div class=\"stat-card\">\n                <div class=\"stat-value\">").concat(stats.librosDisponibles, "</div>\n                <div class=\"stat-label\">Libros Disponibles</div>\n            </div>\n            <div class=\"stat-card\">\n                <div class=\"stat-value\">").concat(stats.librosPrestados, "</div>\n                <div class=\"stat-label\">Libros Prestados</div>\n            </div>\n            <div class=\"stat-card\">\n                <div class=\"stat-value\">").concat(stats.totalUsuarios, "</div>\n                <div class=\"stat-label\">Total Usuarios</div>\n            </div>\n        ");
    };
    BibliotecaUI.prototype.renderizarLibros = function (libros) {
        if (!this.booksContainer)
            return;
        var librosAMostrar = libros || this.biblioteca.obtenerTodosLosLibros();
        this.booksContainer.innerHTML = librosAMostrar.map(function (libro) { return "\n            <div class=\"book-card\">\n                <div class=\"book-title\">".concat(libro.titulo, "</div>\n                <div class=\"book-info\">\n                    <div>Autor: ").concat(libro.autor, "</div>\n                    <div>A\u00F1o: ").concat(libro.añoPublicacion, "</div>\n                </div>\n                <span class=\"status-badge status-").concat(libro.estado, "\">\n                    ").concat(libro.estado, "\n                </span>\n            </div>\n        "); }).join('');
    };
    BibliotecaUI.prototype.filtrarLibros = function (busqueda) {
        var libros = this.biblioteca.buscarLibros(busqueda);
        this.renderizarLibros(libros);
    };
    BibliotecaUI.prototype.mostrarMensaje = function (mensaje) {
        var _this = this;
        if (!this.alertContainer)
            return;
        this.alertContainer.textContent = mensaje;
        this.alertContainer.classList.add('show');
        setTimeout(function () {
            if (_this.alertContainer) {
                _this.alertContainer.classList.remove('show');
            }
        }, 3000);
    };
    return BibliotecaUI;
}());
// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
    try {
        new BibliotecaUI();
    }
    catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});
