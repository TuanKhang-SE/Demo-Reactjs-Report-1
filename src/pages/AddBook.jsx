import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be > 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.string().url("Invalid image URL").required("Image is required"),
  description: Yup.string().required("Description is required"),
});

export default function AddBook() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    author: "",
    price: "",
    category: "",
    image: "",
    description: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(API_URL, values);
      alert("Add book successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">➕ Add New Book</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Title */}
              <div>
                <Field
                  name="title"
                  placeholder="Book title"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Author */}
              <div>
                <Field
                  name="author"
                  placeholder="Author"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
                <ErrorMessage
                  name="author"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Price */}
              <div>
                <Field
                  name="price"
                  placeholder="Price"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <Field
                  name="category"
                  placeholder="Category"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Image */}
              <div>
                <Field
                  name="image"
                  placeholder="Image URL"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  rows="4"
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting ? "Saving..." : "Add Book"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
