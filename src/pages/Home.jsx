import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 transition-colors min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
