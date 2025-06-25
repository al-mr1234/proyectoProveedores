    // src/components/CrudProveedores.jsx
    import React, { useEffect, useState } from "react";
    import proveedorService from "../services/userService";
    import Swal from "sweetalert2";

    const CrudProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState({ nombre: "", email: "", telefono: "", direccion: "" });

    const fetchProveedores = async () => {
        try {
        setLoading(true);
        const data = await proveedorService.getProveedores();
        setProveedores(data);
        } catch (err) {
             console.error("Ocurrió un error:", err); // <- ya lo usas
        setError("Error al obtener proveedores");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (editando) {
            await proveedorService.updateProveedor(editando.id_proveedor, form);
            Swal.fire("Actualizado", "Proveedor actualizado correctamente", "success");
        } else {
            await proveedorService.createProveedor(form);
            Swal.fire("Creado", "Proveedor creado correctamente", "success");
        }
        fetchProveedores();
        setModal(false);
        setEditando(null);
        setForm({ nombre: "", email: "", telefono: "", direccion: "" });
        } catch (err) {
        Swal.fire("Error", err.message || "No se pudo guardar", "error");
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
        title: "¿Eliminar proveedor?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        }).then(async (result) => {
        if (result.isConfirmed) {
            try {
            await proveedorService.deleteProveedor(id);
            fetchProveedores();
            Swal.fire("Eliminado", "Proveedor eliminado", "success");
            } catch (err) {
            Swal.fire("Error", err.message, "error");
            }
        }
        });
    };

    const abrirModal = (proveedor = null) => {
        setEditando(proveedor);
        setForm(proveedor || { nombre: "", email: "", telefono: "", direccion: "" });
        setModal(true);
    };

    const cerrarModal = () => {
        setModal(false);
        setEditando(null);
        setForm({ nombre: "", email: "", telefono: "", direccion: "" });
    };

    return (
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Proveedores</h2>
        <button onClick={() => abrirModal()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Agregar Proveedor
        </button>

        {loading ? (
            <p>Cargando...</p>
        ) : error ? (
            <p className="text-red-600">{error}</p>
        ) : (
            <table className="w-full border">
            <thead className="bg-gray-100">
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {proveedores.map((p) => (
                <tr key={p.id_proveedor} className="border-t">
                    <td>{p.id_proveedor}</td>
                    <td>{p.nombre}</td>
                    <td>{p.email}</td>
                    <td>{p.telefono}</td>
                    <td>{p.direccion}</td>
                    <td>
                    <button onClick={() => abrirModal(p)} className="text-blue-500 mr-2">Editar</button>
                    <button onClick={() => handleDelete(p.id_proveedor)} className="text-red-500">Eliminar</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}

        {modal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{editando ? "Editar" : "Agregar"} Proveedor</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border p-2" required />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2" required />
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full border p-2" />
                <textarea name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="w-full border p-2" />
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={cerrarModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                    {editando ? "Actualizar" : "Crear"}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default CrudProveedores;