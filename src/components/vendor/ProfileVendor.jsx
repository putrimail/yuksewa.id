import axios from "axios";
import { useAuth } from "../../models/useAuth";
import NavbarVendor from "./NavbarVendor";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfileVendor() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { vendorId, token, refreshToken } = useAuth();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    refreshToken();
    getVendorById();
  }, [token]);

  const getVendorById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getvendor/${vendorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <NavbarVendor />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="row">
                  <div className="col-3">
                    <p>
                      <strong>Nama</strong>
                    </p>
                    <p>
                      <strong>Toko</strong>
                    </p>
                    <p>
                      <strong>Alamat</strong>
                    </p>
                    <p>
                      <strong>No Wa</strong>
                    </p>
                    <p>
                      <strong>Email</strong>
                    </p>
                    <p>
                      <strong>Password</strong>
                    </p>
                  </div>
                  <div className="col">
                    <p>
                      <strong>: {profile.namaVendor}</strong>
                    </p>
                    <p>
                      <strong>: {profile.namaToko}</strong>
                    </p>
                    <p>
                      <strong>: {profile.alamatToko}</strong>
                    </p>
                    <p>
                      <strong>: {profile.noWa}</strong>
                    </p>
                    <p>
                      <strong>: {profile.email}</strong>
                    </p>
                    <p>
                      <Link
                        to={`/ubahpassword/${vendorId}`}
                        className="btn btn-primary btn-sm"
                      >
                        ganti Password
                      </Link>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/editprofile/${vendorId}`}
                  className="btn btn-primary"
                >
                  Edit Profile
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileVendor;
