// Naming convention for routes/controllers is the entity they represent in the plural form
// Import Express and create a router object
const express = require("express");
const router = express.Router();
// Import the model
const bookRecord = require("../Models/book_record");
// Define handlers
// GET/book_records
router.get("/", async (req, res, next) => {
    // Retrive all Projects in the DB sorted by date
    let data = await bookRecord.find().sort({ startDate: 1 });
    //render the view with the data
    res.render("book_records/index", { title: "Book Record Management System", dataset: data, user: req.user});
});
// GET/ book_records/add > when i click on the Add button in the index page
// This path is relative to the path defined in app.js
router.get("/add", async (req, res, next) => {
    // Render the add view
    //foldername/viewname (withour the extension)
    res.render("book_records/add", { title: "Add a new Book Record",  user: req.user });
});
// POST/ book_records/add > when i submit the form in th add page by clicking the save button
router.post("/add", async (req, res, next) => {
    // Create a new project object with the data from the form
    let newBook = new bookRecord({
        bookName: req.body.bookName,// req.body> access to input fields by id
        startDate: req.body.startDate,
        author: req.body.author,
    })
    // Save the new project object to the DB
    await newBook.save();
    //Redirect to the index page to show the new data
    res.redirect("/book_records");
});

// GET/ book_records/delete/:id > when i click on the delete button in the index page
router.get("/delete/:_id", async (req, res, next) => {
    // you can access _id from the request object
    let bookId = req.params._id;
    //delete the project by id
    await bookRecord.findByIdAndDelete(bookId);
    //Redirect to the index page to show the update data
    res.redirect("/book_records");
});

// GET/ book_records/edit/:_id > when i click on the edit button in the index page
router.get("/edit/:_id", async (req, res, next) => {
    // you can access _id from the request object
    let bookId = req.params._id;
    //delete the project by id
    let bookRecordData = await bookRecord.findById(bookId);
    //Redirect to the index page to show the update data
    res.render("book_records/edit", {
        title: "Edit the Record",
        book_record: bookRecordData,
        user: req.user
    });
});

// POST/book_records/edit/:_id > when i sub,it the form in the edit page by clicking the save button
router.post("/edit/:_id", async (req, res, next) => {
    let bookId = req.params._id;
    // find bt id and update
    await bookRecord.findByIdAndUpdate(
        { _id: bookId }, //ID
        {
            bookName: req.body.bookName,// req.body> access to input fields by id
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            author: req.body.author,
            statusOfReading: req.body.statusOfReading,
        } // new data
    );
    //Redirect to the index page to show the update data
    res.redirect("/book_records");
});
// Export the router object
module.exports = router;
