import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, deleteBook, updateBook } from "../api/bookApi";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    getBookById(id).then((res) => {
      setBook(res.data);
      setForm(res.data); // đổ dữ liệu vào form
    });
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black text-black dark:text-white">
        Loading...
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateBook(id, form);
    setBook(form);
    setIsEditing(false);
    alert("Update successful!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors">
      <div className="max-w-5xl mx-auto p-6 text-gray-900 dark:text-white">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-80 h-96 object-cover rounded-xl shadow"
            />
          </div>

          {/* INFO */}
          <div>
            {isEditing ? (
              <>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
                />

                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
                />

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
                />

                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
                />

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

                <p className="mb-2">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {book.category}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="text-red-500 font-bold">${book.price}</span>
                </p>

                <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
                  {book.description}
                </p>
              </>
            )}

            {/* ACTIONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Back
              </button>

              {isEditing ? (
                <button
                  onClick={handleUpdate}
                  className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              )}

              <button
                onClick={async () => {
                  if (confirm("Delete this book?")) {
                    await deleteBook(id);
                    navigate("/");
                  }
                }}
                className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
