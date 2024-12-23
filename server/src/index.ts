import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGO_URL);

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hi")
});


app.post('/register', (req: Request, res: Response) => {
    
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
})