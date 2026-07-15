const Express  = require("express")
const Cors  = require("cors")
const Mongoose  = require("mongoose")
const jwt  = require("jsonwebtoken")
const bcrypt  = require("bcrypt")
const User = require("./models/User")

let  app = Express()
app.use(Express.json())
app.use(Cors())

// MongoDB Connection
Mongoose.connect("mongodb+srv://user:pass@cluster.mongodb.net/BlogAppDB?retryWrites=true&w=majority") // Replace with actual URI
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req,res) => {
    res.send("hellooo")
})

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json("Email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json("Success");
    } catch (err) {
        res.status(500).json({ error: "Signup failed" });
    }
});

app.listen(3000,() => {
    console.log("Server Started")
})