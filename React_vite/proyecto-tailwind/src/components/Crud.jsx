import React, { useEffect, useState } from "react";
import proveedorService from "../services/userService";
import Swal from "sweetalert2";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";


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
      console.error("Ocurrió un error:", err);
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
      iconColor: '#ff6467',
      showCancelButton: true,
      confirmButtonColor: '#ff6467',
      cancelButtonColor: 'black',
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
    <div className="p-8 w-full">

      <button
        onClick={() => abrirModal()}
        className="mb-6 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg shadow transition-all"
      >
        + Agregar Proveedor
      </button>

      {loading ? (
        <p className="text-gray-600">Cargando proveedores...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Dirección</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((p, idx) => (
                <tr key={p.id_proveedor} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{p.id_proveedor}</td>
                  <td className="px-4 py-2">{p.nombre}</td>
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.telefono}</td>
                  <td className="px-4 py-2">{p.direccion}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                    onClick={() => abrirModal(p)}
                    className="text-blue-500 hover:text-blue-800"
                    >
                    <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                    onClick={() => handleDelete(p.id_proveedor)}
                    className="text-red-500 hover:text-red-600"
                    >
                    <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">

          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {editando ? "Editar Proveedor" : "Agrega un Nuevo Proveedor!"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                 className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none  transition duration-200 placeholder-gray-400"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                 className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none  transition duration-200 placeholder-gray-400"
                required
              />
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none  transition duration-200 placeholder-gray-400"
                required
              />
              <textarea
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Dirección"
                 className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none  transition duration-200 placeholder-gray-400"
                 required
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
                >
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
