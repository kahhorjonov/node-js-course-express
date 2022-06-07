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

const getCourses = async () => {
  const result = await Course.find({ isPublished: true, tags: "backend" })
    .sort("name")
    .select({ name: 1, author: 1 });
  console.log(result);
};

// getCourses();

const getCourses2 = async () => {
  const result = await Course.find({ isPublished: true })
    .find({ tags: { $in: ["frontend", "backend"] } })
    .sort("-price")
    .select(name, author, price);
  console.log(result);
};

// getCourses2();

const getCourses3 = async () => {
  const result = await Course.find({ isPublished: true }).or([
    {
      price: { $gte: 15 },
    },
    { name: /.*by.*/ },
  ]);

  console.log(result);
};

getCourses3();

// const updateCourse = async (id) => {
//   const course = await Course.findById("5a68fdc3615eda645bc6bdec");
//   if (!course) return;

//   course.isPublished = true;
//   course.author = "Another Author";

//   const result = await course.save();
//   console.log(result);
// };

// updateCourse("5a68fdc3615eda645bc6bdec");

// Query First (Update)

async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(id, {
    $set: { author: "Mosh", isPublished: false },
  });

  console.log(result);
}

updateCourse("5a6900fff467be65019a9001");
