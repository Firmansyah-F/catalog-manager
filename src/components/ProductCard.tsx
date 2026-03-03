import { useNavigate } from "react-router-dom";

interface Props {
  product: {
    id: number;
    title: string;
    price: number;
    images: string[];
  };
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl hover:shadow-2xl transition overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">
          {product.title}
        </h3>

        <p className="text-blue-600 font-bold mt-2">${product.price}</p>

        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="mt-4 w-full bg-blue-500 hover:bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
