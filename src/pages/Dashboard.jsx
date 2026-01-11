import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios.get(API_URL).then((res) => setBooks(res.data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    const confirm = window.confirm("Delete this book?");
    if (!confirm) return;

    await axios.delete(`${API_URL}/${id}`);
    fetchBooks();
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <table className="w-full bg-white dark:bg-gray-800 rounded">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr
              key={b.id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="p-3">{b.title}</td>
              <td className="p-3">{b.author}</td>
              <td className="p-3">{b.category}</td>
              <td className="p-3">${b.price}</td>
              <td className="p-3 flex gap-4">
                {/* DETAIL */}
                <Link
                  to={`/books/${b.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Detail
                </Link>

                {/* DELETE */}
                <button
                  onClick={() => deleteBook(b.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
