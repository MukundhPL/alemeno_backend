import express from "express"
import db from "../../db/index.js"
import { Course, PreReq } from "../../db/schema.js"
import { eq } from "drizzle-orm"
const router = express()
router.post('/',async (req,res)=>{
    try{
       
        const data = await db.select(
            {id:PreReq.prereq_id,name:Course.name}
            ).from(PreReq).leftJoin(Course,eq(PreReq.prereq_id,Course.course_id)).where(eq(PreReq.course_id,req.body.course_id))

        res.json({prerequisites:data})
        
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
router.post('/create',async(req,res)=>{
    try{
        if(req.body.prereq_id==req.body.course_id)throw new Error("Course and prerequisite can't be equal")
        const prereq= await db.insert(PreReq).values({...req.body}).returning()
        res.send(prereq)
    }
    catch(err){
        res.status(500).send(err.message)
    }   
})
export default router       