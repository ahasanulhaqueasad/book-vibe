import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookDetails = () => {
  const { bookId } = useParams();
  const books = useLoaderData();

  // URL-এর bookId অনুযায়ী নির্দিষ্ট বই খুঁজে বের করা
  const book = books.find((book) => book.bookId === Number(bookId));

  // বই না পাওয়া গেলে
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center bg-base-100 p-10 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold text-error mb-3">
            Book Not Found!
          </h2>
          <p className="text-gray-500 mb-5">
            Sorry, we couldn't find the book you're looking for.
          </p>
          <button className="btn btn-primary" onClick={() => window.history.back()}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    bookId: currentBookId,
    bookName,
    author,
    image,
    review,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = book;

  // Read বাটন হ্যান্ডলার (LocalStorage-এ সেভ করার জন্য)
  const handleMarkAsRead = (id) => {
    const storedReadBooks = JSON.parse(localStorage.getItem("read-books")) || [];
    const isExist = storedReadBooks.find((bookId) => bookId === id);

    if (!isExist) {
      storedReadBooks.push(id);
      localStorage.setItem("read-books", JSON.stringify(storedReadBooks));
      toast.success("Books added to your Read list.");
    } else {
      toast.error("You have already read this book!");
    }
  };

  // Wishlist বাটন হ্যান্ডলার
  const handleAddToWishlist = (id) => {
    const storedReadBooks = JSON.parse(localStorage.getItem("read-books")) || [];
    const isAlreadyRead = storedReadBooks.find((bookId) => bookId === id);

    if (isAlreadyRead) {
      toast.error("You have already read this book!");
      return;
    }

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist-books")) || [];
    const isExist = storedWishlist.find((bookId) => bookId === id);

    if (!isExist) {
      storedWishlist.push(id);
      localStorage.setItem("wishlist-books", JSON.stringify(storedWishlist));
      toast.success("Book added to the wishlist successfully.");
    } else {
      toast.error("This book is already in your wishlist!");
    }
  };

  return (
    <div className="hero bg-base-100 min-h-screen py-10">
      <div className="hero-content flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">
        
        {/* বাম পাশের বইয়ের ছবি */}
        <div className="bg-base-200 p-16 rounded-2xl flex justify-center items-center w-full lg:w-1/2">
          <img
            src={image}
            alt={bookName}
            className="max-h-[500px] object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* ডান পাশের তথ্য */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{bookName}</h1>
          <p className="text-lg text-gray-600 font-medium">By : {author}</p>
          
          <div className="divider my-2"></div>
          
          <p className="text-lg font-medium text-gray-700">{category}</p>
          
          <div className="divider my-2"></div>

          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="font-bold text-gray-900">Review : </span> {review}
          </p>

          {/* ট্যাগ সেকশন */}
          <div className="flex items-center gap-3 py-2">
            <span className="font-bold text-gray-900">Tag</span>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="badge bg-[#23BE0A]/10 text-[#23BE0A] border-none font-medium px-4 py-3"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="divider my-2"></div>

          {/* অতিরিক্ত তথ্য টেবিল স্টাইল */}
          <div className="space-y-3 text-gray-600 text-sm py-2">
            <div className="flex">
              <span className="w-44">Number of Pages:</span>
              <span className="font-bold text-gray-900">{totalPages}</span>
            </div>
            <div className="flex">
              <span className="w-44">Publisher:</span>
              <span className="font-bold text-gray-900">{publisher}</span>
            </div>
            <div className="flex">
              <span className="w-44">Year of Publishing:</span>
              <span className="font-bold text-gray-900">{yearOfPublishing}</span>
            </div>
            <div className="flex">
              <span className="w-44">Rating:</span>
              <span className="font-bold text-gray-900">{rating}</span>
            </div>
          </div>

          {/* অ্যাক্টিভ বাটন সেকশন */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => handleMarkAsRead(currentBookId)} 
              className="btn btn-outline px-8 font-semibold rounded-lg"
            >
              Read
            </button>
            <button 
              onClick={() => handleAddToWishlist(currentBookId)} 
              className="btn bg-[#59C6D2] hover:bg-[#45b2be] text-white px-8 font-semibold rounded-lg border-none"
            >
              Wishlist
            </button>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default BookDetails;