import express, { json } from "express";
const app = express();

app.use(json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Listening on the port : 8000"));
const courses = [];

// making Get API demo
app.get("/all-courses", (request, response) => {
  response.send(courses);
});

// making Post API demo
app.post("/courses", (request, response) => {
  if (!request.body.name) {
    response.status(400); // Bad request
    response.send("course name can not be empty");
    return;
  }
  const course = {
    id: courses.length + 1,
    course: request.body.name,
  };
  courses.push(course);
  response.send(course);
});

//making Put API demo
app.put("/courses/:id", (request, response) => {
  const id = request.params.id;
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    response.status(404);
    response.send(`The course ${id} was not found, search with other keywords`);
  } else {
    if (!request.body.name) {
      response.status(400); // Bad request
      response.send("Course Name Must be added for adding the new course");
      return;
    } else {
      course.course = request.body.name;
      response.send(courses);
    }
  }
});

//making Delete API demo
app.delete("/courses/:id", (request, response) => {
  const id = request.params.id;
  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    response.status(404);
    response.send(`The course ${id} was not found, search with other keywords`);
  } else {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    response.send(courses);
  }
});
