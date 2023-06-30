import 'dotenv/config.js'
import server from './server.js'
import MongoClient from './MongoClient.js'

function run() {
    try {
        // Connect to database
        MongoClient()

        const PORT = process.env.PORT || 5000

        // Start the Express server
        server.listen(PORT, () => {
            console.log(`API is running on port: ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}
run()