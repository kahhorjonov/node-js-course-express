const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Couldn't connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Ultimate Redux course",
    author: "Mosh",
    tags: ["redux", "frontend"],
    isPublished: false,
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  // Comparison Queries -->

  // eq (equal)
  //   ne (not equal)
  //   gt (greater than)
  //   gte (greater than or equal to)
  //   lt (less than)
  //   lte (less than or equal to)
  //   in
  //   nin (not in)

  //   <-- Comparison Queries

  //   Logical Queries -->
  //   or
  //   and

  //   <-- Logical Queries

  const pageNumber = 2;
  const pageSize = 10;

  //   Example
  //   //api/courses?pageNumber=2&pageSize=10

  //   Regular Expression -->
  const result = await Course
    //   Starts With
    .find({ author: /^Mosh/ })

    // Ends With
    .find({ auhtor: /Hamedani$/i })

    // Contains With
    .find({ author: /.*Mosh.*/ })

    // .or([{ author: "Shah" }, { isPublished: "false" }])
    // .and([{}, {}])
    //   .find({ price: { $in: [10, 15, 20] } })
    //   .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ author: "Mosh", isPublished: false })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  console.log(result);
};

getCourses();

// createCourse();

// Update Course

const updateCourse = async (id) => {
  const course = await Course.findById(id);

  console.log(course);

  if (!course) return;
  course.isPublished = true;
  course.author = "Another Author";

  const result = await course.save();
  console.log(result);
};

updateCourse("5a68fdd7bee8ea64649c2777");
