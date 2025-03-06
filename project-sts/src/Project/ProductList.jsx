import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import urotraman from "../Project/assets/urotraman.png";
import GambarDiscount from "../Project/assets/GambarDiscount.png";
import Discount from "../Project/assets/DISCOUNT.png";
import STAR1 from "../Project/assets/STAR1.png";
import STAR2 from "../Project/assets/STAR2.png";
import STAR3 from "../Project/assets/STAR3.png";
import STAR4 from "../Project/assets/STAR4.png";
import STAR5 from "../Project/assets/STAR5.png";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const adminStatus = localStorage.getItem("admin") === "true";
    setIsAdmin(adminStatus);

    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserProfile(response.data.name);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const getStarImage = (rate) => {
    if (rate >= 0.1 && rate <= 1.8) return STAR1;
    if (rate >= 1.9 && rate <= 2.8) return STAR2;
    if (rate >= 2.9 && rate <= 3.8) return STAR3;
    if (rate >= 3.9 && rate <= 4.8) return STAR4;
    if (rate >= 4.9 && rate <= 5) return STAR5;
    return STAR1;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="bg-[#E2F8FF] min-h-screen font-montserrat">
      <nav className="bg-[#006EA5] px-7 py-4 text-white flex justify-between items-center">
        <div className="w-1/3">
          <img src={urotraman} alt="UROTRAMAN" />
        </div>
        <div className="flex-grow flex justify-center gap-6 text-lg w-1/3">
          <Link to="/product" className="hover:underline">
            Home
          </Link>
          <a href="#" className="hover:underline">
            Product
          </a>
          <a href="#" className="hover:underline">
            About We
          </a>
        </div>
        <div className="w-1/3 flex justify-end">
          <h1 className="text-lg font-medium flex items-center mr-4">
            Hello, {userProfile}
          </h1>
          {isAdmin && (
            <Link
              to="/onlyAdmin"
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition font-sans mr-4"
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-sans"
          >
            Log Out
          </button>
        </div>
      </nav>

      <div className="flex justify-center my-6 w-[96%] mx-auto">
        <div className="bg-[#B30000] text-white text-center w-1/2">
          <img src={Discount} alt="" className="w-[75%] my-[85px] ml-[75px]" />
        </div>
        <div className="w-1/2">
          <img src={GambarDiscount} alt="GambarDiscount" />
        </div>
      </div>

      <h2 className="text-center text-4xl text-[#003879] font-semibold my-14">
        PRODUCTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-14 px-16">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="bg-[#F2F2F2] p-9 h-[520px] shadow-lg cursor-pointer">
              <div className="h-[67%] mx-auto pt-11 bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-52 mx-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-medium mt-4 truncate">
                {product.title}
              </h3>
              <p
                className="text-4xl font-extrabold mt-1"
                style={{ fontWeight: 900 }}
              >
                ${product.price}
              </p>
              <div className="flex items-center mt-12">
                <img
                  src={getStarImage(product.rating?.rate)}
                  alt="Rating Star"
                  className="h-4 mr-2"
                />
                <span className="text-gray-700 text-sm">
                  {product.rating?.rate}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="bg-[#006EA5] text-white text-center p-4 mt-20">
        Created by : wildan2512@student.abudzar.sch.id
      </footer>
    </div>
  );
}

export default ProductList;
