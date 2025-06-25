        import axios from 'axios';

        const API_URL = "http://localhost:3000/proveedores";

        const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    });

        const proveedorService = {
        // Obtener todos los proveedores
        getProveedores: async () => {
            try {
            const response = await apiClient.get('/');
            return response.data;
            } catch (error) {
            console.error("Error obteniendo proveedores:", error);
            throw error.response?.data?.message || error.message || "Error desconocido al obtener proveedores";
            }
        },

        // Obtener un proveedor por ID
        getProveedorById: async (id) => {
            try {
            const response = await apiClient.get(`/${id}`);
            return response.data;
            } catch (error) {
            console.error(`Error obteniendo proveedor con ID ${id}:`, error);
            throw error.response?.data?.message || error.message || `Error desconocido al obtener proveedor con ID ${id}`;
            }
        },

        // Crear un nuevo proveedor
        createProveedor: async (proveedorData) => {
            try {
            const response = await apiClient.post('/', proveedorData);
            return response.data;
            } catch (error) {
            console.error("Error creando proveedor:", error);
            throw error.response?.data?.message || error.message || "Error desconocido al crear proveedor";
            }
        },

        // Actualizar un proveedor
        updateProveedor: async (id, proveedorData) => {
            try {
            const response = await apiClient.put(`/${id}`, proveedorData);
            return response.data;
            } catch (error) {
            console.error(`Error actualizando proveedor con ID ${id}:`, error);
            throw error.response?.data?.message || error.message || `Error desconocido al actualizar proveedor con ID ${id}`;
            }
        },

        // Eliminar un proveedor
        deleteProveedor: async (id) => {
            try {
            const response = await apiClient.delete(`/${id}`);
            return response.data;
            } catch (error) {
            console.error(`Error eliminando proveedor con ID ${id}:`, error);
            throw error.response?.data?.message || error.message || `Error desconocido al eliminar proveedor con ID ${id}`;
            }
        },
        };

        export default proveedorService;
