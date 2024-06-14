import express from "express"
import db from "../../db/index.js"
import { Content, Course } from "../../db/schema.js"
import { eq } from "drizzle-orm"
const router = express()
router.get('/',async (req,res)=>{
    try{
        const data = await db.select(
            // {course_id:Course.course_id,name:Course.name,instructor:Course.instructor,enrollmentStatus:Course.enrollmentStatus}x
            ).from(Course)
        console.log(data)
        res.json({courses:data})
        
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
router.post('/create',async(req,res)=>{
    try{
        const course = await db.insert(Course).values({...req.body}).returning()
        res.send(course)
    }
    catch(err){
        res.status(500).send(err.message)
    }   
})
router.post('/content/create',async(req,res)=>{
    try{
        const content= await db.insert(Content).values({...req.body}).returning()
        res.send(content)
    }
    catch(err){
        res.status(500).send(err.message)
    }   
})

router.post('/contents',async(req,res)=>{
    try{
        
        const data = await db.select().from(Content).where(eq(Content.course_id,req.body.course_id))
        console.log(data)
        res.json({contents:data})
        
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
export default router       