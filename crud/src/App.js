import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    publishedOn: "",
    genre: "",
    rating: 0,
  });

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addBook = async () => {
    await axios.post("http://localhost:5000/books", form);
    setForm({ title: "", author: "", publishedOn: "", genre: "", rating: 0 });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
  };

  const updateBook = async (id) => {
    await axios.put(`http://localhost:5000/books/${id}`, form);
    setForm({ title: "", author: "", publishedOn: "", genre: "", rating: 0 });
    fetchBooks();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Book Manager</h1>

      <div className="space-y-4 mb-8 border p-4 rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold">Add / Update Book</h2>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
        <input name="publishedOn" type="date" value={form.publishedOn} onChange={handleChange} />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <input name="rating" type="number" min="0" max="5" value={form.rating} onChange={handleChange} />

        <button onClick={addBook}>Add Book</button>
      </div>

      <h2>📖 Book List</h2>
      {books.map((book) => (
        <div key={book._id}>
          <p>{book.title} by {book.author}</p>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
          <button onClick={() => updateBook(book._id)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default App;
