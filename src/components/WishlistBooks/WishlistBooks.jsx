import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { RiPagesLine } from "react-icons/ri";

const WishlistBooks = () => {
  const allBooks = useLoaderData(); // সব বইয়ের ডেটা
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist-books")) || [];
    const addedBooks = allBooks.filter((book) =>
      storedWishlist.includes(book.bookId)
    );
    setWishlistBooks(addedBooks);
    setDisplayBooks(addedBooks);
  }, [allBooks]);

  // সর্টিং ফাংশন (Rating, Pages, Year অনুযায়ী সাজানোর জন্য)
  const handleSort = (sortType) => {
    let sortedBooks = [...wishlistBooks];
    if (sortType === "rating") {
      sortedBooks.sort((a, b) => b.rating - a.rating);
    } else if (sortType === "totalPages") {
      sortedBooks.sort((a, b) => b.totalPages - a.totalPages);
    } else if (sortType === "yearOfPublishing") {
      sortedBooks.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
    }
    setDisplayBooks(sortedBooks);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center bg-base-200 py-6 rounded-2xl mb-8">
        Wishlist Books
      </h2>

      {/* সর্টিং ড্রপডাউন */}
      <div className="flex justify-center mb-8">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn bg-[#23BE0A] text-white font-semibold">
            Sort By ▾
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a onClick={() => handleSort("rating")}>Rating</a></li>
            <li><a onClick={() => handleSort("totalPages")}>Number of pages</a></li>
            <li><a onClick={() => handleSort("yearOfPublishing")}>Publisher year</a></li>
          </ul>
        </div>
      </div>

      {/* উইশলিস্ট বইগুলোর লিস্ট */}
      {displayBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No books added to wishlist yet!</p>
      ) : (
        <div className="space-y-6">
          {displayBooks.map((book) => (
            <div
              key={book.bookId}
              className="flex flex-col md:flex-row gap-6 p-6 border rounded-2xl bg-base-100 shadow-sm items-center"
            >
              {/* বইয়ের ছবি */}
              <div className="bg-base-200 p-6 rounded-xl flex justify-center items-center w-full md:w-48 h-56">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="h-full object-cover rounded"
                />
              </div>

              {/* বইয়ের বিবরণ */}
              <div className="flex-grow space-y-3 w-full">
                <h3 className="text-2xl font-bold text-gray-800">{book.bookName}</h3>
                <p className="text-gray-600 font-medium">By : {book.author}</p>

                {/* ট্যাগ ও পাবলিশার */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Tag</span>
                    {book.tags.map((tag, idx) => (
                      <span key={idx} className="badge bg-[#23BE0A]/10 text-[#23BE0A] border-none font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CiLocationOn className="text-lg" />
                    <span>Year of Publishing: {book.yearOfPublishing}</span>
                  </div>
                </div>

                {/* পাবলিশার ও পেজ সংখ্যা */}
                <div className="flex flex-wrap gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <IoIosPeople className="text-lg" />
                    <span>Publisher: {book.publisher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiPagesLine className="text-lg" />
                    <span>Page {book.totalPages}</span>
                  </div>
                </div>

                <div className="divider my-2"></div>

                {/* ক্যাটাগরি, রেটিং এবং ডিটেইলস বাটন */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="badge bg-[#328EFF]/10 text-[#328EFF] py-3 px-4 font-medium border-none">
                    Category: {book.category}
                  </span>
                  <span className="badge bg-[#FFAC33]/10 text-[#FFAC33] py-3 px-4 font-medium border-none">
                    Rating: {book.rating}
                  </span>
                  <a href={`/books/${book.bookId}`} className="btn bg-[#23BE0A] hover:bg-[#1b9a08] text-white rounded-full px-6 btn-sm">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistBooks;