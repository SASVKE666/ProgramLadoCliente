// Paso 2: Typescript básico - agregando tipos
let nombre: string = "BRAYAN";
let edad: number = 23;
let activo: boolean = true;

// Paso 3: Typescript avanzado - utilizando interfaces
interface Estudiante {
  nombre: string;
  edad: number;
  activo: boolean;
}

let estutidiante: Estudiante = {
  nombre: "BRAYAN",
  edad: 23,
  activo: true
};

/* 0. instalar npm
1. npm install -g typescript */