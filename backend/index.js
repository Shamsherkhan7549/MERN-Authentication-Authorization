const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./route/userRoute')
const dotenv = require('dotenv')

dotenv.config(); //load env file

const port = 8000
const app = express()

function main(){
    mongoose.connect(process.env.MONGO_SERVER_URL)
    .then(result => console.log("DB Connected"))
    .catch(err=> console.log("Error while DB Connection : " + err))
}

main();
app.use(cors(
    {
        origin:process.env.VITE_FRONTEND_URL,
        credentials:true
    }
))
app.use(express.json())
app.use('/', router)

app.get('/', (req, res) => {
    res.send("res is working")
})


app.listen(port, () => {
    console.log(`server running on port ${port}`);
    
})