import express from "express";
import { Book } from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";

const bookRoute = express.Router();

bookRoute.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books)
      return res.status(StatusCodes.OK).json({ msg: "No books added yet" });
    res.status(StatusCodes.OK).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
  }
});

bookRoute.post("/book", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "All field data not provide" });
    }
    await Book.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "Book added", data: req.body });
  } catch (error) {
    console.log(error);
  }
});

bookRoute.get("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Book with ${id} not found` });
    }
    return res.status(StatusCodes.OK).json({ msg: "Book found", book });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Book with ${id} not found` });
  }
});

bookRoute.delete("/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`Book with id ${id} not found`);
    res.status(StatusCodes.OK).json({ msg: "Book Deleted", book });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json(`Book with id ${id} not found`);
  }
});

bookRoute.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  try {
    if (!title || !author || !year) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "please provide all data" });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Book not found" });
    return res.status(StatusCodes.OK).json({ msg: "Book updated", result });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Book not found" });
  }
});

export default bookRoute;
