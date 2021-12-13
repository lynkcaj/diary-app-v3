const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
// })

// const MONGODB_URI = "mongodb+srv://jackielyn_benitez:Kcaj725123@mycluster.mhydu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose.connect("mongodb+srv://jackielyn_benitez:Kcaj725123@mycluster.mhydu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
// })

//"mongodb://127.0.0.1:27017/MyDiary"

const db = async () => {
  await mongoose.connect(
    'mongodb+srv://jackielyn_benitez:Kcaj725123@mycluster.mhydu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log('db connected..');
};

module.exports = db;