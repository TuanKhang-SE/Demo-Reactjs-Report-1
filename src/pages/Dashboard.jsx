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
    const confirmDelete = window.confirm("Delete this book?");
    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/${id}`);
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors p-6">
      <div className="max-w-6xl mx-auto text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-6">📊 Book Dashboard</h1>

        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full bg-white dark:bg-gray-900">
            <thead className="bg-gray-200 dark:bg-gray-800">
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
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3">{b.title}</td>
                  <td className="p-3">{b.author}</td>
                  <td className="p-3">{b.category}</td>
                  <td className="p-3 font-semibold text-red-500">${b.price}</td>
                  <td className="p-3 flex gap-4">
                    {/* DETAIL */}
                    <Link
                      to={`/books/${b.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Detail
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteBook(b.id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
