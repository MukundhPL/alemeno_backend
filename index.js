import express from "express"
import db from "./db/index.js"
import courses from "./mock_data/Courses.js"
import contents from "./mock_data/CourseContents.js"
import prerequisites from "./mock_data/Prerequisites.js"
import students from "./mock_data/Students.js"
import enrollments from "./mock_data/Enrollments.js"
import { Content, Course, Enrollment, PreReq, Student } from "./db/schema.js";
import cors from "cors"
import UserRouter from "./routes/User/index.js"
import CourseRouter from "./routes/Course/index.js"
import PrerequisiteRouter from "./routes/Prerequisites/index.js"

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use('/users',UserRouter)
app.use('/course',CourseRouter)
app.use('/prerequisite',PrerequisiteRouter)
app.get('/reset',async(req,res)=>{
    try{
        await db.delete(Content)
        await db.delete(Enrollment)
        await db.delete(PreReq)
        await db.delete(Course)
        await db.delete(Student)
        await db.insert(Student).values(students)
        await db.insert(Course).values(courses)
        await db.insert(Content).values(contents)
        await db.insert(Enrollment).values(enrollments)
        await db.insert(PreReq).values(prerequisites)
        res.send("Success")
    }
    catch(err){
        console.log(err)
        res.send("Error")
    }
})
app.get('/drop',async(req,res)=>{
    try{
        await db.delete(Content)
        await db.delete(Enrollment)
        await db.delete(PreReq)
        await db.delete(Course)
        await db.delete(Student)

        res.send("Success")
    }
    catch(err){
        res.status(500).send(err.message)
    }
})
// app.use('/user',UserRouter)
app.listen(3500,()=>console.log(`Running`))