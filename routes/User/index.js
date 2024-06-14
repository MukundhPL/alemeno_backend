import { eq,and } from "drizzle-orm"
import express, { application } from "express"
import db from "../../db/index.js"
import {Student,Enrollment} from "../../db/schema.js"

const router = express()

router.get('/',async(req,res)=>{
    const data= await db.select().from(Student)
    console.log(data)
    res.json({users:data})
})
router.post('/enrollments',async(req,res)=>{
    try{
        if(!req.body.id)throw new Error()
        const data= await db.select().from(Enrollment).where(eq(Enrollment.student_id,req.body.id))
        console.log(data)
        res.json({enrollments:data})
    }
    catch(err){
        res.status(500)
        res.send("Invalid User data")
    }
})
router.post('/enrollment/create',async(req,res)=>{
    try{
        
        const enroll= await db.insert(Enrollment).values({...req.body}).returning()
        res.send(enroll)
    }
    catch(err){
        res.status(500).send(err.message)
    }   
})
router.post('/create',async(req,res)=>{
    try{
        
        const user= await db.insert(Student).values({...req.body}).returning()
        res.send(user)
    }
    catch(err){
        res.status(500).send(err.message)
    }   
})
router.put('/complete',async(req,res)=>{
    try{
       
        const enrollment = await db.update(Enrollment).set({completionStatus:"Completed"}).where(and(eq(req.body.student_id,Enrollment.student_id),eq(req.body.course_id,Enrollment.course_id))).returning()
        console.log(enrollment)
        res.json({enrollment:enrollment[0]})
    }
    catch(err){
        res.status(500)
        res.send("Invalid User data")
    }
})

export default router   