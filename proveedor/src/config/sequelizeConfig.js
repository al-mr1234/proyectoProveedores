    // config/db.js (o el nombre que uses para el archivo de conexión)
    const { Sequelize } = require('sequelize');

    // Crea la instancia de Sequelize con los datos de conexión
    const sequelize = new Sequelize('proveedores', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // desactiva los logs de las consultas
    });

    // Función asincrónica para probar la conexión
    async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos MySQL con Sequelize establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos con Sequelize:', error);
        process.exit(1); // finaliza la app si no hay conexión
    }
    }

    module.exports = { sequelize, connectDB };
