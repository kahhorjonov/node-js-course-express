const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to Mongo-Exercises"))
  .catch((err) => console.error("Connection Error", err));

const courseSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  date: Date,
  author: String,
  isPublished: Boolean,
  price: Number,
  __v: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(result);
  console.log(course);
}

removeCourse("5a6900fff467be65019a9001");
