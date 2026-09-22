import app from './app.js'
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const startServer = ()=>{
    try {
        app.listen(PORT, (req, res)=>{
            console.log(`Server created at port: ${PORT}`);
        })
    } catch (error) {
        console.log("Server error: " + error);
    }
}

startServer()