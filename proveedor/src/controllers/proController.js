    // controllers/proController.js
    const Proveedor = require("../models/Proveedor");

    // Obtener todos los proveedores
    exports.getPros = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();
        res.json(proveedores);
    } catch (error) {
        console.error("Error obteniendo proveedores:", error);
        res.status(500).send("Error obteniendo proveedores");
    }
    };

    // Obtener un proveedor por ID
    exports.getProById = async (req, res) => {
    const proId = req.params.id;
    try {
        const proveedor = await Proveedor.findByPk(proId);
        if (!proveedor) {
        return res.status(404).send("Proveedor no encontrado");
        }
        res.json(proveedor);
    } catch (error) {
        console.error("Error obteniendo proveedor:", error);
        res.status(500).send("Error obteniendo proveedor");
    }
    };

    // Crear un nuevo proveedor
    exports.createPro = async (req, res) => {
    const { nombre, email, telefono, direccion } = req.body;
    if (!nombre || !email) {
        return res.status(400).send("Nombre y email son obligatorios");
    }

    try {
        const nuevoProveedor = await Proveedor.create({ nombre, email, telefono, direccion });
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        console.error("Error creando proveedor:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send("El email ya está registrado");
        }
        res.status(500).send("Error creando proveedor");
    }
    };

    // Actualizar un proveedor
    exports.updatePro = async (req, res) => {
    const proId = req.params.id;
    const { nombre, email, telefono, direccion } = req.body;

    if (!nombre || !email) {
        return res.status(400).send("Nombre y email son obligatorios");
    }

    try {
        const proveedor = await Proveedor.findByPk(proId);
        if (!proveedor) {
        return res.status(404).send("Proveedor no encontrado");
        }

        await proveedor.update({ nombre, email, telefono, direccion });
        res.json({ message: "Proveedor actualizado correctamente" });
    } catch (error) {
        console.error("Error actualizando proveedor:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send("El email ya está registrado");
        }
        res.status(500).send("Error actualizando proveedor");
    }
    };

    // Eliminar un proveedor
    exports.deletePro = async (req, res) => {
    const proId = req.params.id;

    try {
        const proveedor = await Proveedor.findByPk(proId);
        if (!proveedor) {
        return res.status(404).send("Proveedor no encontrado");
        }

        await proveedor.destroy();
        res.json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
        console.error("Error eliminando proveedor:", error);
        res.status(500).send("Error eliminando proveedor");
    }
    };
