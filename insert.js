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

// Insertar un nuevo curso
const curso1 = new Curso({
    clave: "curso3",
    titulo: "Curso de AppInventor desde cero (2024)",
    instructor: "Heydi Reyes",
    video_url: "https://www.youtube.com/embed/qOGMIx7B3LQ?si=DE7G5yTpM0XPJCz9",
    syllabus: [
        "1. Introducción a App Inventor",
        "2. Exploración de la Interfaz de App Inventor",
        "3. Uso del Editor de Bloques",
        "4. Eventos y Acciones",
        "5. Interacción con el Usuario",
        "6. Navegación entre Pantallas",
        "7. Uso de Sensores y Funciones del Teléfono",
        "8. Almacenamiento de Datos",
        "9. Diseño y Personalización de la App",
        "10. Pruebas y Publicación de la Aplicación"
    ],
    descripcion: "Desarrollo de aplicaciones móviles de manera visual y fácil de entender",
    image_url: "https://i.postimg.cc/DyBnFP8f/mit-2.png",
    precio: "$ Gratis"
});

curso1.save()
    .then(() => {
        console.log('Curso insertado correctamente');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error al insertar el curso:', err);
        mongoose.connection.close();
    });
