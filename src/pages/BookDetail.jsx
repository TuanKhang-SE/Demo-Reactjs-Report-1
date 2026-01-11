import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getBookById, updateBook, deleteBook } from "../api/bookApi";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getBookById(id).then((res) => setBook(res.data));
  }, [id]);

  if (!book) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading book...
      </div>
    );
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    price: Yup.number().required("Required").min(0),
    category: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    image: Yup.string().url("Invalid URL").required("Required"),
  });

  const handleUpdate = async (values) => {
    await updateBook(id, values);
    setBook(values);
    setIsEdit(false);
    alert("Update successfully!");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    await deleteBook(id);
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-80 h-96 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* INFO / FORM */}
        <div>
          {!isEdit ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

              <p className="text-lg mb-2">
                <span className="font-semibold">Author:</span> {book.author}
              </p>

              <p className="text-lg mb-2">
                <span className="font-semibold">Category:</span> {book.category}
              </p>

              <p className="text-lg mb-2">
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-red-500 font-bold">${book.price}</span>
              </p>

              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {book.description}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>

                <button
                  onClick={handleDelete}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Update Book</h2>

              <Formik
                initialValues={book}
                validationSchema={validationSchema}
                onSubmit={handleUpdate}
              >
                <Form className="space-y-4">
                  <div>
                    <Field name="title" className="input" placeholder="Title" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <Field
                      name="author"
                      className="input"
                      placeholder="Author"
                    />
                    <ErrorMessage
                      name="author"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <Field
                      name="price"
                      type="number"
                      className="input"
                      placeholder="Price"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <Field
                      name="category"
                      className="input"
                      placeholder="Category"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      className="input h-24"
                      placeholder="Description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <Field
                      name="image"
                      className="input"
                      placeholder="Image URL"
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEdit(false)}
                      className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
