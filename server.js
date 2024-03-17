require("dotenv").config();
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = process.env.PORT;
const Routes = require("./src/routes/main.routes")


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", Routes)

app.listen(port, () => {
    console.log(`server is running on the ${port}`)
})

