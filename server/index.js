const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.set("port", port);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const routesCertificate = require("./src/routes/certificate");

app.use("/verify", routesCertificate);

app.listen(port, () => {
  console.log(`Examle app in port ${port}`);
});
