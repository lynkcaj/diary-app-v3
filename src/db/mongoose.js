const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
// })

const MONGODB_URI = "mongodb+srv://jackielyn_benitez:Kcaj725123@mycluster.mhydu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI || "mongodb://127.0.0.1:27017/MyDiary", {
    useNewUrlParser: true,
})

//"mongodb://127.0.0.1:27017/MyDiary"