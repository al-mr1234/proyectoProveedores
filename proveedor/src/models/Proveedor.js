    // models/Proveedor.js
    const { DataTypes } = require('sequelize');
    const { sequelize } = require('../config/sequelizeConfig');

    const Proveedor = sequelize.define('Proveedor', {
    id_proveedor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // Ya que mencionas que es un índice, puede usarse como único
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    }, {
    tableName: 'proveedores',
    timestamps: false
    });

    module.exports = Proveedor;
