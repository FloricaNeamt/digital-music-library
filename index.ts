import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtistById,
  deleteArtistById,
} from "./controllers/artist.controller";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

dotenv.config();
const dbURI = process.env.DB_URI;

if (!dbURI) {
  console.error("MongoDB connection URI not found in environment variables.");
  process.exit(1); // Exit the process with an error code
}

mongoose.Promise = Promise;
mongoose.connect(dbURI).then(() => console.log(`Connected to ${dbURI}`));
mongoose.connection.on("error", (error: Error) => console.log(error));

// Routes
app.get("/artists", getAllArtists);
app.get("/artists/:id", getArtistById);
app.post("/artists", createArtist);
app.put("/artists/:id", updateArtistById);
app.delete("/artists/:id", deleteArtistById);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
