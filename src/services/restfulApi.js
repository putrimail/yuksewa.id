import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
// products
export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/productvendor/`);
    return response.data.data.reverse();
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};
export const getProductByKategori = async (kategori) => {
  try {
    const response = await axios.get(`${API_URL}/productvendor/${kategori}`);
    return response.data.data.reverse();
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/vendor/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

export const getKategori = async () => {
  try {
    const response = await axios.get(`${API_URL}/kategori`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const addProduct = async (formData) => {
  try {
    await axios.post(`${API_URL}/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};

export const updateDataProduct = async (id, formData) => {
  try {
    await axios.patch(`${API_URL}/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};
// vendor
export const logoutVendor = async () => {
  try {
    await axios.delete(`${API_URL}/logout`);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const getVendorById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/getvendor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileVendor = async (id, formData) => {
  try {
    await axios.patch(`${API_URL}/editVendor/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};

export const login = async (email, password) => {
  try {
    await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }
};

export const register = async (
  namaVendor,
  namaToko,
  alamatToko,
  noWa,
  email,
  password
) => {
  try {
    await axios.post(`${API_URL}/register`, {
      namaVendor,
      namaToko,
      alamatToko,
      noWa,
      email,
      password,
    });
  } catch (error) {
    console.error(error);
  }
};
