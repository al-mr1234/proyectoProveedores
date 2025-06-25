    // models/proveedorModel.js
    const Proveedor = require('./Proveedor'); // modelo Sequelize

    // Obtener todos los proveedores
    exports.getAllPros = async () => {
    return await Proveedor.findAll();
    };

    // Obtener proveedor por ID
    exports.getProById = async (id) => {
    return await Proveedor.findByPk(id);
    };

    // Crear nuevo proveedor
    exports.createPro = async (nombre, email, telefono, direccion) => {
    return await Proveedor.create({ nombre, email, telefono, direccion });
    };

    // Actualizar proveedor
    exports.updatePro = async (id, nombre, email, telefono, direccion) => {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) throw new Error("Proveedor no encontrado");

    await proveedor.update({ nombre, email, telefono, direccion });
    return { message: "Proveedor actualizado correctamente" };
    };

    // Eliminar proveedor
    exports.deletePro = async (id) => {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) throw new Error("Proveedor no encontrado");

    await proveedor.destroy();
    return { message: "Proveedor eliminado correctamente" };
    };
