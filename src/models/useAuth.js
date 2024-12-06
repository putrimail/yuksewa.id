import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [expire, setExpire] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, [navigate]);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/token`);
      const { accessToken } = response.data;
      setToken(accessToken);
      const decoded = jwtDecode(accessToken);
      setName(decoded.namaVendor);
      setVendorId(decoded.id);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${BASE_URL}/token`);
        const { accessToken } = response.data;
        config.headers.Authorization = `Bearer ${accessToken}`;
        setToken(accessToken);
        const decoded = jwtDecode(accessToken);
        setName(decoded.namaVendor);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return { token, name, vendorId, axiosInstance, refreshToken };
};
