import express from 'express';
import cors from 'cors';
import ImageRoute from './Routes/ImageRoute.js';

const app = express();

app.use(cors());

app.use(express.json());


app.use('/UrlImages', ImageRoute);

app.use('/', (req, res) => {
    try {
        res.send("Connected To The Server Successfully")
    } catch (error) {
        console.log("Failed To Connect To Server");
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    try {
        console.log("Successfully Connected To The Server");
    } catch (error) {
        console.log("Failed To Connect To The Server");
    }
})