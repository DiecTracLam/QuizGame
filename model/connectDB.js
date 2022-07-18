const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://traclam:lam123456@quizgame.lhbki.mongodb.net/?retryWrites=true&w=majority')
const dbName = 'QuizGame'

const db = {}

async function connectDB(){
    try {
        await client.connect();
        const database = client.db(dbName);
        db.Users = database.collection('User');
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB , db};