import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Category {
  id: number;
  name: string;
}

interface AddProductPayload {
  title: string;
  price: number | string;
  description: string;
  categoryId: number;
  images: string[];
}

interface FormErrors {
  title?: string;
  price?: string;
  description?: string;
  image?: string;
  categoryId?: string;
}

export default function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<AddProductPayload>({
    title: "",
    price: "",
    description: "",
    categoryId: 0,
    images: [""],
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get<Category[]>("/categories");
        setCategories(res.data);

        if (res.data.length > 0) {
          setForm((prev) => ({
            ...prev,
            categoryId: res.data[0].id,
          }));
        }
      } catch {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  // Validation
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title wajib diisi";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Price harus lebih dari 0";
    }

    if (form.description.length < 10) {
      newErrors.description = "Description minimal 10 karakter";
    }

    if (!form.images[0]) {
      newErrors.image = "Image URL wajib diisi";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "Category wajib dipilih";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/products", form);

      navigate("/products");
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border rounded-lg p-3 pl-8 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Description - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.images[0]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    images: [e.target.value],
                  })
                }
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>

            {/* Image Preview */}
            <div className="flex items-end">
              {form.images[0] ? (
                <img
                  src={form.images[0]}
                  alt="Preview"
                  className="h-40 w-full rounded-lg object-cover border"
                />
              ) : (
                <div className="h-40 w-full flex items-center justify-center border rounded-lg text-gray-400">
                  Image Preview
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.categoryId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: Number(e.target.value),
                  })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
              )}
            </div>

            {/* Submit - Full Width */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
