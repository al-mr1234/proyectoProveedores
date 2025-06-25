    const express = require("express");
    const cors = require("cors");
    const app = express();

    const { connectDB, sequelize } = require("./config/sequelizeConfig");

    // Middleware para permitir solicitudes desde otros orígenes
    app.use(cors({
    origin: "http://localhost:5173", // permite solo desde el frontend local
    credentials: true
    }));

    app.use(express.json());

    // Rutas
    const proRoutes = require("./routes/proRoutes");
    app.use("/proveedores", proRoutes);

    // Sincronizar modelos y conectar a la base de datos antes de iniciar el servidor
    sequelize.sync()
    .then(() => {
        return connectDB(); // Verifica la conexión con authenticate()
    })
    .then(() => {
        app.listen(3000, () => {
        console.log("Servidor corriendo en http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error("Error al sincronizar modelos o conectar la base de datos:", error);
        process.exit(1); // Detener la ejecución si falla la conexión
    });
