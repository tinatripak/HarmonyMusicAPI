const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "https://harmony-music-client.vercel.app",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Access-Control-Allow-Origin, Content-Type, Authorization",
  credentials: true
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

const userRoute = require("./routes/users");
app.use("/api/users/", userRoute);

const singerRoute = require("./routes/singers");
app.use("/api/singers/", singerRoute);

const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

const suggestedSongRoute = require("./routes/suggestedSongs");
app.use("/api/suggestedSongs/", suggestedSongRoute);

mongoose
  .connect(process.env.DB_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the database");
    mongoose.connection
      .once("open", () => console.log("Connected"))
      .on("error", (error) => {
        console.log(`Error: ${error}`);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.listen(4000, () => console.log("lisitening to port 4000"));
