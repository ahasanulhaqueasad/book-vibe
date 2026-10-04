import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import ListedBooks from "./components/ListedBooks/ListedBooks";
import PagesToRead from "./components/PagesToRead/PagesToRead";
import BookDetails from "./components/Books/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async () => {
          const res = await fetch("/data/booksData.json");
          const data = await res.json();
          return data;
        },
      },
      {
        path: "listed-books",
        element: <ListedBooks></ListedBooks>,
        loader: async () => {
          const res = await fetch("/data/booksData.json");
          const data = await res.json();
          return data;
        }, // এখানেও ListedBooks এর জন্য loader যোগ করতে পারেন যদি প্রয়োজন হয়
      },
      {
        path: "pages-to-read",
        element: <PagesToRead></PagesToRead>,
        loader: async () => {
          const res = await fetch("/data/booksData.json");
          const data = await res.json();
          return data;
        }, // ← এই loader-টি মিসিং ছিল, তাই যোগ করে দেওয়া হলো
      },
      {
        path: "books/:bookId",
        loader: async () => {
          const res = await fetch("/data/booksData.json");
          const data = await res.json();
          return data;
        },
        element: <BookDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);