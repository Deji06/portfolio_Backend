import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import Contact from '../src/controllers/Contact.js'

dotenv.config()
const app = express()


app.use(express.json())

app.use('/api/v1', Contact)

//routes
app.get('/', (req:Request, res:Response)=> {
    res.send('backend is running')

})

app.use((err: any, req: Request, res: Response, next:express.NextFunction) => {
  console.error(err.stack);
  res.status(400).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
}); 

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT} `);
})
