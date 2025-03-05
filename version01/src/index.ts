import { Biblioteca, Libro } from './biblio.js';

class BibliotecaUI {
    private biblioteca: Biblioteca;
    private searchInput: HTMLInputElement | null = null;
    private booksContainer: HTMLDivElement | null = null;
    private statsContainer: HTMLDivElement | null = null;
    private alertContainer: HTMLDivElement | null = null;

    constructor() {
        this.biblioteca = new Biblioteca();
        this.initializeDOM();
        
        if (!this.searchInput || !this.booksContainer || !this.statsContainer || !this.alertContainer) {
            throw new Error('No se pudieron encontrar elementos DOM necesarios');
        }
        
        this.initializeEventListeners();
        this.cargarDatosIniciales();
    }

    private initializeDOM(): void {
        this.searchInput = document.getElementById('searchInput') as HTMLInputElement;
        this.booksContainer = document.getElementById('books') as HTMLDivElement;
        this.statsContainer = document.getElementById('stats') as HTMLDivElement;
        this.alertContainer = document.getElementById('alert') as HTMLDivElement;
    }

    private initializeEventListeners(): void {
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            this.filtrarLibros(target.value);
        });
    }

    private cargarDatosIniciales(): void {
        // Agregar algunos libros de ejemplo
        this.biblioteca.agregarLibro("Don Quijote", "Miguel de Cervantes", 1605);
        this.biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", 1967);
        this.biblioteca.agregarLibro("El principito", "Antoine de Saint-Exupéry", 1943);

        // Registrar usuarios de ejemplo
        const usuario1 = this.biblioteca.registrarUsuario("Jazmin Rojano", "jazmin@email.com");
        const usuario2 = this.biblioteca.registrarUsuario("Azael Acuña", "azael@email.com");

        // Realizar algunos préstamos de ejemplo
        this.biblioteca.prestarLibro(1, usuario1.id);
        this.biblioteca.prestarLibro(2, usuario2.id);

        this.actualizarUI();
    }

    private actualizarUI(): void {
        this.renderizarEstadisticas();
        this.renderizarLibros();
    }

    private renderizarEstadisticas(): void {
        if (!this.statsContainer) return;

        const stats = this.biblioteca.obtenerEstadisticas();
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${stats.totalLibros}</div>
                <div class="stat-label">Total Libros</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.librosDisponibles}</div>
                <div class="stat-label">Libros Disponibles</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.librosPrestados}</div>
                <div class="stat-label">Libros Prestados</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.totalUsuarios}</div>
                <div class="stat-label">Total Usuarios</div>
            </div>
        `;
    }

    private renderizarLibros(libros?: Libro[]): void {
        if (!this.booksContainer) return;

        const librosAMostrar = libros || this.biblioteca.obtenerTodosLosLibros();
        this.booksContainer.innerHTML = librosAMostrar.map(libro => `
            <div class="book-card">
                <div class="book-title">${libro.titulo}</div>
                <div class="book-info">
                    <div>Autor: ${libro.autor}</div>
                    <div>Año: ${libro.añoPublicacion}</div>
                </div>
                <span class="status-badge status-${libro.estado}">
                    ${libro.estado}
                </span>
            </div>
        `).join('');
    }

    private filtrarLibros(busqueda: string): void {
        const libros = this.biblioteca.buscarLibros(busqueda);
        this.renderizarLibros(libros);
    }

    public mostrarMensaje(mensaje: string): void {
        if (!this.alertContainer) return;

        this.alertContainer.textContent = mensaje;
        this.alertContainer.classList.add('show');
        setTimeout(() => {
            if (this.alertContainer) {
                this.alertContainer.classList.remove('show');
            }
        }, 3000);
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    try {
        new BibliotecaUI();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});