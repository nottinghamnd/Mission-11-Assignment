import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types/Book';

function BookList({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories]);

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((category) => `bookCategories=${encodeURIComponent(category)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/Bookstore/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${
          selectedCategories.length ? `&${categoryParams}` : ''
        }`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  return (
    <>
      {books.map((book) => (
        <div id="bookCard" className="card mb-3" key={book.bookId}>
          <div className="card-body">
            <h3 className="card-title">{book.title}</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {book.author}
              </li>
              <li>
                <strong>Publisher:</strong> {book.publisher}
              </li>
              <li>
                <strong>Class:</strong> {book.classification}
              </li>
              <li>
                <strong>Category:</strong> {book.category}
              </li>
              <li>
                <strong>ISBN:</strong> {book.isbn}
              </li>
              <li>
                <strong>Page Count:</strong> {book.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${book.price.toFixed(2)}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(
                  `/purchase/${encodeURIComponent(book.title)}/${book.bookId}?price=${book.price}`
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary me-2"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className="btn btn-primary me-2"
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="btn btn-primary"
        disabled={pageNum === totalPages || totalPages === 0}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label className="mt-3">
        Results Per Page:
        <select
          className="ms-2"
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
