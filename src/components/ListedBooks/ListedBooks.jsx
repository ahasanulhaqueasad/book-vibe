import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { RiPagesLine } from "react-icons/ri";

const ListedBooks = () => {
  const allBooks = useLoaderData();
  const [readBooks, setReadBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [displayReadBooks, setDisplayReadBooks] = useState([]);
  const [displayWishlistBooks, setDisplayWishlistBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("read");

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে Read এবং Wishlist এর আইডি ফেচ করা
    const storedReadIds = JSON.parse(localStorage.getItem("read-books")) || [];
    const storedWishlistIds = JSON.parse(localStorage.getItem("wishlist-books")) || [];

    const readList = allBooks.filter((book) => storedReadIds.includes(book.bookId));
    const wishlistList = allBooks.filter((book) => storedWishlistIds.includes(book.bookId));

    setReadBooks(readList);
    setDisplayReadBooks(readList);

    setWishlistBooks(wishlistList);
    setDisplayWishlistBooks(wishlistList);
  }, [allBooks]);

  // সর্টিং ফাংশন (Rating, Pages, Year অনুযায়ী সাজানোর জন্য)
  const handleSort = (sortType) => {
    if (activeTab === "read") {
      let sorted = [...readBooks];
      if (sortType === "rating") sorted.sort((a, b) => b.rating - a.rating);
      else if (sortType === "totalPages") sorted.sort((a, b) => b.totalPages - a.totalPages);
      else if (sortType === "yearOfPublishing") sorted.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
      setDisplayReadBooks(sorted);
    } else {
      let sorted = [...wishlistBooks];
      if (sortType === "rating") sorted.sort((a, b) => b.rating - a.rating);
      else if (sortType === "totalPages") sorted.sort((a, b) => b.totalPages - a.totalPages);
      else if (sortType === "yearOfPublishing") sorted.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
      setDisplayWishlistBooks(sorted);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* হেডার */}
      <h2 className="text-3xl font-bold text-center bg-base-200 py-6 rounded-2xl mb-8">
        Books
      </h2>

      {/* সর্টিং ড্রপডাউন */}
      <div className="flex justify-center mb-10">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn bg-[#23BE0A] text-white font-semibold">
            Sort By ▾
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => handleSort("rating")}>Rating</a></li>
            <li><a onClick={() => handleSort("totalPages")}>Number of pages</a></li>
            <li><a onClick={() => handleSort("yearOfPublishing")}>Publisher year</a></li>
          </ul>
        </div>
      </div>

      {/* ট্যাব সেকশন */}
      <div className="flex items-center border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("read")}
          className={`px-6 py-3 font-semibold border-t border-x rounded-t-lg ${
            activeTab === "read"
              ? "border-gray-300 border-b-white bg-white text-black -mb-px"
              : "text-gray-500 bg-gray-50"
          }`}
        >
          Read Books ({displayReadBooks.length})
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`px-6 py-3 font-semibold border-t border-x rounded-t-lg ${
            activeTab === "wishlist"
              ? "border-gray-300 border-b-white bg-white text-black -mb-px"
              : "text-gray-500 bg-gray-50"
          }`}
        >
          Wishlist Books ({displayWishlistBooks.length})
        </button>
      </div>

      {/* ট্যাবের ভেতরে কন্টেন্ট রেন্ডার */}
      {activeTab === "read" ? (
        <div className="space-y-6">
          {displayReadBooks.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No books added to Read list yet!</p>
          ) : (
            displayReadBooks.map((book) => <BookCard key={book.bookId} book={book} />)
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {displayWishlistBooks.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No books added to Wishlist yet!</p>
          ) : (
            displayWishlistBooks.map((book) => <BookCard key={book.bookId} book={book} />)
          )}
        </div>
      )}
    </div>
  );
};

// আলাদা একটি ছোট কম্পোনেন্ট বইয়ের কার্ড দেখানোর জন্য
const BookCard = ({ book }) => {
  const {
    bookId,
    bookName,
    author,
    image,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = book;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 border rounded-2xl bg-base-100 shadow-sm items-center">
      <div className="bg-base-200 p-6 rounded-xl flex justify-center items-center w-full md:w-48 h-56">
        <img src={image} alt={bookName} className="h-full object-cover rounded" />
      </div>

      <div className="flex-grow space-y-3 w-full">
        <h3 className="text-2xl font-bold text-gray-800">{bookName}</h3>
        <p className="text-gray-600 font-medium">By : {author}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold">Tag</span>
            {tags.map((tag, idx) => (
              <span key={idx} className="badge bg-[#23BE0A]/10 text-[#23BE0A] border-none font-medium">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <CiLocationOn className="text-lg" />
            <span>Year of Publishing: {yearOfPublishing}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <IoIosPeople className="text-lg" />
            <span>Publisher: {publisher}</span>
          </div>
          <div className="flex items-center gap-2">
            <RiPagesLine className="text-lg" />
            <span>Page {totalPages}</span>
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="badge bg-[#328EFF]/10 text-[#328EFF] py-3 px-4 font-medium border-none">
            Category: {category}
          </span>
          <span className="badge bg-[#FFAC33]/10 text-[#FFAC33] py-3 px-4 font-medium border-none">
            Rating: {rating}
          </span>
          <a href={`/books/${bookId}`} className="btn bg-[#23BE0A] hover:bg-[#1b9a08] text-white rounded-full px-6 btn-sm">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListedBooks;