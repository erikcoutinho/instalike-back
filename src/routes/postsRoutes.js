import express from "express"; // Import the Express.js framework
import multer from "multer"; // Import the Multer middleware for file uploads
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Import the necessary controller functions
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the directory where uploaded files will be saved
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Keep the original filename for uploaded files
    cb(null, file.originalname);
  }
});

// Create a Multer instance with the defined storage configuration
const upload = multer({ dest: "./uploads", storage }); // Use the custom storage

const routes = (app) => {
  // Enable parsing of incoming JSON data in request bodies
  app.use(express.json());
  app.use(cors(corsOptions))
  // Route to retrieve all posts (GET request to "/posts")
  app.get("/posts", listarPosts);

  // Route to create a new post (POST request to "/posts")
  app.post("/posts", postarNovoPost);

  // Route to handle image upload (POST request to "/upload")
  // Use the `upload.single('imagem')` middleware to handle a single file upload
  // named "imagem" in the request
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;