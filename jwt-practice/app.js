// 1. Token JWT generado manualmente (simulación)
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXN1YXJpb19wcnVlYmEiLCJleHAiOiJNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSArIDYwICgxIG1pbnV0bykifQ.roeris-LGjq4dyAmlFqgAXmjXtjgb63kqMt7maDVtLg"
  ; // Reemplaza con tu token
localStorage.setItem('JWT_TOKEN', JWT_TOKEN);

// 2. Función para validar el token (simulación)
function validateToken(token) {
  try {
    // Decodificar el token (sin verificar firma)
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      throw new Error("Token expirado");
    }
    return true;
  } catch (error) {
    console.error("Token inválido:", error);
    alert("El token ha expirado. Por favor, vuelve a iniciar sesión.");
    return false;
  }
}

// 3. Función GET con JWT
async function fetchDataWithJWT() {
	const JWT_TOKEN = localStorage.getItem('JWT_TOKEN');
  if (!validateToken(JWT_TOKEN)) {
    alert("Token inválido o expirado");
    return;
  }

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        headers: { Authorization: `Bearer ${JWT_TOKEN}` },
      }
    );
    const data = await response.json();
    document.getElementById("response").innerHTML = `<pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre>`;
  } catch (error) {
    console.error("Error GET:", error);
  }
}

// 4. Función POST con JWT
document.getElementById("postForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	const JWT_TOKEN = localStorage.getItem('JWT_TOKEN');
	if (!validateToken(JWT_TOKEN)) {
	  return;
	}

  const postData = {
    title: document.getElementById("data").value,
    body: "Contenido de prueba",
    userId: 1,
  };

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    document.getElementById("response").innerHTML = `<pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre>`;
  } catch (error) {
    console.error("Error POST:", error);
  }
});

// app.js (backend Node.js)
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET_KEY = 'clave_secreta_educativa';

app.use(express.json());

app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Datos protegidos', user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Datos guardados', user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});