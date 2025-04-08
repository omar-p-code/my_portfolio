import express from 'express';
import env from 'dotenv';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
env.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
   maxAge: "30d"
}));


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
   exec(`start http://localhost:${process.env.PORT}`);
});