import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import urotraman from "../Project/assets/urotraman.png";
import BG from "../Project/assets/BG.jpg";
import STAR1 from "../Project/assets/STAR1.png";
import STAR2 from "../Project/assets/STAR2.png";
import STAR3 from "../Project/assets/STAR3.png";
import STAR4 from "../Project/assets/STAR4.png";
import STAR5 from "../Project/assets/STAR5.png";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const getStarImage = (rating) => {
    if (rating >= 0.1 && rating <= 1.8) return STAR1;
    if (rating >= 1.9 && rating <= 2.8) return STAR2;
    if (rating >= 2.9 && rating <= 3.8) return STAR3;
    if (rating >= 3.9 && rating <= 4.8) return STAR4;
    if (rating >= 4.9 && rating <= 5) return STAR5;
    return null;
  };

  if (!product)
    return <div className="text-center text-lg text-gray-600 font-montserrat">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-montserrat">
      <nav className="bg-[#006EA5] px-7 py-4 text-white flex flex-wrap justify-between items-center">
        <div className="w-1/3 min-w-[100px]">
          <img src={urotraman} alt="UROTRAMAN" className="w-full max-w-[150px]" />
        </div>
        <div className="flex-grow flex justify-center gap-6 text-lg w-1/3 min-w-[200px]">
          <Link to="/product" className="hover:underline">Home</Link>
          <a href="#" className="hover:underline">Product</a>
          <a href="#" className="hover:underline">About We</a>
        </div>
        <div className="w-1/3 flex justify-end min-w-[150px]">
          <h1 className="text-lg font-medium flex items-center mr-4">Hello, {userProfile}</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-sans">Log Out</button>
        </div>
      </nav>

      <div className="flex items-center justify-center flex-grow p-6 md:p-12" style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="bg-[#F2F2F2] p-6 rounded-lg shadow-lg w-full max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full w-full mx-auto bg-white flex items-center">
            <img src={product.image} alt={product.title} className="h-48 mx-auto my-8 object-contain max-w-[90%]" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">{product.title}</h2>
              <img src={getStarImage(product.rating?.rate)} alt="Rating Stars" className="flex mt-2 h-5" />
              <p className="text-gray-500 mt-2 text-sm">Rating: {product.rating?.rate} ({product.rating?.count} reviews)</p>
              <p className="text-gray-500 mt-4 text-sm md:text-sm">
                {showFullDescription ? product.description : `${product.description.slice(0, 200)}...`}
                {!showFullDescription && (
                  <button onClick={() => setShowFullDescription(true)} className="text-blue-500 text-sm ml-1 cursor-pointer hover:underline">Read More</button>
                )}
              </p>

              <p className="text-xl md:text-2xl font-bold text-gray-800 mt-4">${product.price}</p>
              <span className="text-lg text-gray-600">Total: ${(quantity * product.price).toFixed(2)}</span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Select Size:</p>
              <div className="flex space-x-2 flex-wrap">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button key={size} className={` px-3 py-1 font-bold ${selectedSize === size ? "bg-[#003B58] text-white" : "bg-[#B2B2B2]"}`} onClick={() => setSelectedSize(size)}>{size}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <button onClick={() => handleQuantityChange("decrease")} className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-gray-400">-</button>
              <span className="text-lg">{quantity}</span>
              <button onClick={() => handleQuantityChange("increase")} className="bg-gray-300 px-3 py-1 rounded-lg hover:bg-gray-400">+</button>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-3 mt-4">
              <button className="bg-[#006EA5] text-white text-sm px-6 py-3 hover:bg-[#0081a5] w-full md:w-auto">Buy Now</button>
              <button className="border border-gray-300 text-sm px-6 py-3 hover:bg-gray-100 w-full md:w-auto">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;