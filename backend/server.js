import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // Importing product routes
import sql from "./config/db.js"; // Importing the SQL connection
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json);
app.use(cors());
app.use(helmet()); // helmet is security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); //log the requests


app.use("/api/products", productRoutes);

async function initDB() {
    try {
        await sql`
             CREATE TABLE IF NOT EXISTS products (
                 id SERIAL PRIMARY KEY,
                 name VARCHAR(100) NOT NULL,
                 image VARCHAR(100) NOT NULL,
                 price DECIMAL(10, 2) NOT NULL,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
             )
        `;
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("error initDB", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on port " + PORT);
    });
})

