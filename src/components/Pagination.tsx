import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}

export default function Pagination({ page, setPage, totalPages = 5 }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => page > 1 && setPage(page - 1)}
        className="p-2 rounded-xl bg-white/60 backdrop-blur-md shadow hover:shadow-lg transition disabled:opacity-40"
        disabled={page === 1}
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-4 py-2 rounded-xl transition-all duration-200 ${
            page === p
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
              : "bg-white/60 backdrop-blur-md hover:bg-white/80"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => page < totalPages && setPage(page + 1)}
        className="p-2 rounded-xl bg-white/60 backdrop-blur-md shadow hover:shadow-lg transition disabled:opacity-40"
        disabled={page === totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
