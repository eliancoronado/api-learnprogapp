const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors'); // Importar el paquete cors
app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb+srv://cuentaparaelian12:HAayjRGRYOSk4F1B@cluster0.citmxdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir el esquema y modelo del curso
const cursoSchema = new mongoose.Schema({
    clave: String,
    titulo: String,
    instructor: String,
    video_url: String,
    syllabus: [String],
    descripcion: String, // Nueva descripción del curso
    image_url: String,   // URL de la imagen del curso
    precio: String       // Precio del curso
});

const Curso = mongoose.model('Curso', cursoSchema);

// Endpoint para obtener todos los cursos
app.get('/api/cursos', async (req, res) => {
    try {
        const cursos = await Curso.find({});
        res.json(cursos);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener un curso por su clave
app.get('/api/cursos/:clave', async (req, res) => {
    try {
        const curso = await Curso.findOne({ clave: req.params.clave });
        if (curso) {
            res.json(curso);
        } else {
            res.status(404).send('Curso no encontrado');
        }
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});
// Ruta para obtener un curso por su clave
// Ruta para buscar cursos por parte del título
// Ruta para buscar cursos por título
// Ruta para buscar cursos por título insensible a mayúsculas/minúsculas
app.get('/api/cursos/buscar/:title', async (req, res) => {
    try {
        // Crear una expresión regular insensible a mayúsculas/minúsculas
        const regex = new RegExp(req.params.title, 'i');

        // Buscar un curso cuyo título coincida con la expresión regular
        const curso = await Curso.findOne({ titulo: { $regex: regex } });

        if (curso) {
            res.json(curso);
        } else {
            res.status(404).send('Curso no encontrado');
        }
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});


// Endpoint para buscar cursos por título
// Endpoint para buscar cursos por título


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
