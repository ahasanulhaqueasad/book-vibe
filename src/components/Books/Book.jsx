import { Link } from "react-router-dom";

const Book = ({ book }) => {
  const { bookId, bookName, author, image, rating, tags } = book;

  return (
    <div className="card bg-base-100 w-full max-w-96 shadow-sm">
      {/* Book Image */}
      <figure className="bg-base-200 p-6">
        <img
          src={image}
          alt={bookName}
          className="h-56 w-full object-contain"
        />
      </figure>

      <div className="card-body">
        {/* Book Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="badge  text-green-800 bg-green-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Book Name */}
        <h2 className="card-title">
          {bookName}
          <div className="badge badge-secondary">NEW</div>
        </h2>

        {/* Author */}
        <p>By: {author}</p>

        <div className="border-t border-dashed border-gray-300"></div>

        {/* Rating */}
        <div className="flex w-full items-center justify-between gap-3">
          <span>Pages to Read</span>

          <div className="flex shrink-0 items-center gap-1">
            <span>{rating}</span>
            <span>⭐</span>
          </div>
        </div>
      </div>
      <Link
        to={`/books/${bookId}`}
        className="btn btn-accent text-xl font-bold"
      >
        Book Details
      </Link>
    </div>
  );
};

export default Book;
