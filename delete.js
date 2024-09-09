const mongoose = require('mongoose');

// Conectar a la base de datos
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

// Borrar un curso por su clave
const claveCurso = "curso3"; // Cambia esto por la clave del curso que quieras borrar

Curso.deleteOne({ clave: claveCurso })
    .then(result => {
        if (result.deletedCount > 0) {
            console.log(`Curso con clave ${claveCurso} borrado correctamente`);
        } else {
            console.log(`No se encontró un curso con la clave ${claveCurso}`);
        }
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error al borrar el curso:', err);
        mongoose.connection.close();
    });
