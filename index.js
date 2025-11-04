const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./MongoDBconnect/Connect");
const User1 = require('./Usermodule/UserSchema')

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(cors({
  origin:"https://prot-na73.vercel.app/"
}));

app.use(express.json());
connectDB()
app.get("/api/sendkey", (req, res) => {

    res.status(200).json({ key: process.env.SecKretKey })
})
app.post("/api/addData", async(req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token || token !== process.env.SecKretKey) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        await User1.create((req.body))
        res.status(202).json({
            success: true,
            message: "User sended massage successfuly ✅",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'somthing is wrong' })

    }

});
app.get("/api/add", async(req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token || token !== process.env.SecKretKey) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        const alldata = await User1.find();
        res.status(200).json({ data: alldata })

    } catch (error) {
        console.log(error)
        res.status(500)
    }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
