import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div
      className="
        p-4 rounded-lg border transition-colors
        bg-white text-black
        dark:bg-gray-800 dark:text-white
        dark:border-gray-700
      "
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-60 object-cover rounded mb-4 bg-gray-100 dark:bg-gray-700"
      />

      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="opacity-80">{book.author}</p>
      <p className="mt-2 font-semibold">${book.price}</p>

      <div className="mt-4">
        <Link to={`/books/${book.id}`} className="text-blue-500">
          Detail
        </Link>
      </div>
    </div>
  );
}
