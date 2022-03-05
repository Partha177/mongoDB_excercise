const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort("name")
    .select("name author");
}

async function getCourses2() {
  // 1.solution
  // return await Course.find({
  //   isPublished: true,
  //   tags: { $in: ["frontend", "backend"] },
  // })
  // 2.solution
  // return await Course.find({ isPublished: true })
  //   .or([{ tags: "frontend" }, { tags: "backend" }])
  //   .sort("-price")
  //   .select({ name: 1, author: 1, price: 1 });
  // 3.solution
  // return await Course.find().or([
  //   { isPublished: true, price: { $gte: 15 } },
  //   { name: /.*by.*/ },
  // ]);

  return await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/ },
  ]);
}

async function run() {
  // const courses = await getCourses();
  const courses = await getCourses2();
  console.log(courses);
}

run();

