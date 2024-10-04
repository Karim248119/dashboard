const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models/db.js");
const dotenv = require("dotenv");
const app = express();

const mvcRoutes = require("./routes/mvcRoutes.js");
const productsRouter = require("./routes/productRoutes.js");
const categoriesRouter = require("./routes/categoryRouter.js");
const registerRouter = require("./routes/userRouter.js");
const apiProductRouter = require("./routes/api/products.js");
const protectedRoutes = require("./middleware/protectedRoutes.js");

dotenv.config({ path: "./config.env" });

app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiProductRouter);
app.use(registerRouter, mvcRoutes, productsRouter, categoriesRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(port));
db();


