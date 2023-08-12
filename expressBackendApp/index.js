const express = require("express");
const app = express();
const port = 3000;

// you need to add the object store here .


const Questions = [{
  title : "Two status",
  description : " Given an array, return the max of the array ",
  testCases : [{
    input : "[1,2,3,4,5]",
    output : "5"

  }]

}];

// const SUBMISSION = [];
const users = [];
// -------------------------------------------------------SIGNUP ----------------------------------------------------
// Assuming you have an array called 'users' declared before the route handler


app.post("/signup", (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  // Check if the user with the given email already exists in the users array
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).send("User with this email already exists.");
  }

  // If the user does not exist, add the new user to the users array
  users.push({ email, password });

  // Return a success response
  res.status(200).send("User signup successful!");
});

// --------------------------------------------------------LOGIN------------------------------------------------------


// Assuming you have an array called 'users' declared before the route handler
// const users = [];

// Middleware to parse incoming JSON data
app.use(express.json());

app.post("/login", (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  // Find the user with the given email in the users array
  const user = users.find((user) => user.email === email);

  // Check if the user exists and if the password is correct
  if (user && user.password === password) {
    // If the password is correct, generate a token (random string for now)
    const token = generateRandomToken();
    // Return success response with token
    return res.status(200).json({ message: "Login successful!", token });
  }

  // If the user does not exist or the password is incorrect, return 401 status code
  res.status(401).send("Invalid credentials.");
});

// Function to generate a random token (for demonstration purposes)
function generateRandomToken() {
  const tokenLength = 10;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}


// -------------------------------------------------------QUESTIONS------------------------------------------------



// Sample users array (replace this with your actual data)
const data = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
  { id: 3, name: "Bob" },
];

app.get("/questions", (req, res) => {
  // Return the users array as the response
  res.json(data);
});




// ------------------------------------------------------Submission-----------------------------------------------

// Sample submissions array (replace this with your actual data)
const submissions = [
  { userId: 1, problemId: 1, submission: "Solution 1" },
  { userId: 2, problemId: 1, submission: "Solution 2" },
  { userId: 1, problemId: 2, submission: "Solution 3" },
  // Add more submissions as needed...
];

app.get("/submissions", (req, res) => {
  // Get the problemId from the query parameters
  const { problemId } = req.query;

  // Check if problemId is provided in the query parameters
  if (!problemId) {
    return res.status(400).send("Problem ID is required in the query parameters.");
  }

  // Filter the submissions array based on the problemId
  const userSubmissions = submissions.filter((submission) => submission.problemId === parseInt(problemId));

  // Return the filtered submissions as the response
  res.json(userSubmissions);
});


// ---------------------------------------------------SUBMISSION-2----------------------------------------------

// Sample submissions array (replace this with your actual data)
const submissionsArr = [];

// Middleware to parse incoming JSON data
app.use(express.json());

app.post("/submissions", (req, res) => {
  // Extract userId and problem solution from the request body
  const { userId, solution } = req.body;

  // Check if userId and solution are provided
  if (!userId || !solution) {
    return res.status(400).send("User ID and solution are required.");
  }

  // Generate a random boolean (true or false) to simulate acceptance or rejection
  const isAccepted = Math.random() < 0.5; // 50% chance of being true

  // Create a submission object to store the user submission
  const submission = {
    userId,
    solution,
    isAccepted,
  };

  // Add the submission to the submissions array
  submissionsArr.push(submission);

  // Return a response indicating if the submission was accepted or rejected
  const responseMessage = isAccepted ? "Solution accepted!" : "Solution rejected.";
  res.status(200).json({ message: responseMessage });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
