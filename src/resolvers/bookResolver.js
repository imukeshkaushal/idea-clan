const Book = require("../models/Book");
const User = require("../models/User");
const BorrowRequest = require("../models/borrowRequest");

module.exports = {
  books: async () => await Book.find(),

  book: async ({ id }) => {
    try {
      const book = await Book.findById(id);
      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    } catch (error) {
      throw new Error(`Error fetching book: ${error.message}`);
    }
  },

  borrowRequests: async () => await BorrowRequest.find(),

  addBook: async ({ title, author }) => {
    const newBook = new Book({ title, author, available: true });
    await newBook.save();
    return newBook;
  },
  // addBook: async ({ title, author }, { user }) => {
  //   try {
  //     // Check if user is authenticated
  //     if (!user) {
  //       throw new Error('Unauthorized: You must be logged in to add a book');
  //     }

  //     // Check if user is admin
  //     if (user.role !== 'ADMIN') {
  //       throw new Error('Unauthorized: Only admins can add books');
  //     }

  //     // User is authenticated and is an admin, allow adding the book
  //     const newBook = new Book({ title, author, available: true });
  //     await newBook.save();
  //     return newBook;
  //   } catch (error) {
  //     throw new Error(`Error adding book: ${error.message}`);
  //   }
  // },
  // updateBook: async ({ id, title, author }) => {
  //   const updatedBook = await Book.findByIdAndUpdate(id, { title, author }, { new: true });
  //   return updatedBook;
  // },
  updateBook: async ({ id, title, author }) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author },
        { new: true } // Return the updated document
      );

      if (!updatedBook) {
        throw new Error("Book not found");
      }

      return updatedBook;
    } catch (error) {
      throw new Error(`Error updating book: ${error.message}`);
    }
  },
  deleteBook: async ({ id }) => {
    const deletedBook = await Book.findByIdAndDelete(id);
    return deletedBook;
  },

  borrowBook: async ({ bookId, userId }) => {
    // console.log(bookId, userId);
    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      throw new Error("User not authenticated");
    }
    const book = await Book.findById(bookId);
    // console.log(book);
    if (!book) {
      throw new Error("We don't have this book ");
    }
    if (!book.owner) {
      book.owner = user._id;
      book.save();
    }
    const borrowRequest = new BorrowRequest({
      book,
      borrower: user,
      owner: user,
      approved: false,
    });
    await borrowRequest.save();
    console.log("This is borrowRequest", borrowRequest._doc);
    return { ...borrowRequest._doc };
  },
  approveBorrowRequest: async ({ requestId }, { user }) => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    const request = await BorrowRequest.findById(requestId)
      .populate("book")
      .populate("owner");
    if (!request || request.owner._id.toString() !== user._id.toString()) {
      throw new Error("You are not the owner of this request");
    }
    if (request.approved) {
      throw new Error("Request has already been approved");
    }
    request.approved = true;
    await request.save();
    // Update book ownership
    const book = request.book;
    book.owner = request.borrower._id;
    book.available = false;
    await book.save();
    return request;
  },
};
