    // src/components/UserModal.jsx
    import React, { useEffect, useState } from "react";
    import Swal from "sweetalert2";

    const UserModal = ({ isOpen, onClose, onSave, editingUser }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
    });

    useEffect(() => {
        if (editingUser) {
        setFormData(editingUser);
        } else {
        setFormData({ nombre: "", email: "", telefono: "" });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.email || !formData.telefono) {
        Swal.fire("Campos requeridos", "Todos los campos son obligatorios", "warning");
        return;
        }

        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h2>
            <div className="space-y-4">
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
            />
            <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
            />
            </div>
            <div className="flex justify-end mt-6 space-x-3">
            <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancelar</button>
            <button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded">
                {editingUser ? "Actualizar" : "Crear"}
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default UserModal;
