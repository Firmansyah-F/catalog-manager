import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    name: string;
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get<Product>(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl hover:shadow-2xl transition p-8 grid md:grid-cols-2 gap-8">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-80 object-cover rounded-xl"
        />

        <div>
          <span className="text-sm text-gray-500">{product.category.name}</span>

          <h1 className="text-3xl font-bold mt-2">{product.title}</h1>

          <p className="text-2xl text-blue-600 font-semibold mt-4">
            ${product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
