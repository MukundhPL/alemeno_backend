import  {uuid,serial,varchar,pgTable,pgEnum,smallint,boolean,date,text, integer, primaryKey,unique,} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm' 


export const statusEnum = pgEnum("enrollmentStatus",['Open','In Progress','Closed'])
const items = ['Open','In Progress','Closed']
export const Course = pgTable("Courses",{
    course_id:uuid("course_id").primaryKey().defaultRandom(),
    name:varchar("courseName").notNull(),
    instructor:varchar("instructor").notNull(),
    description:text("description"),
    enrollmentStatus:statusEnum("enrollment-status").default(items[Math.floor(Math.random()*3)]),
    schedule:varchar("schedule"),
    duration:varchar("duration"),
    location:varchar("location"),
    dueDate:date("dueDate").notNull(),
    image:text("image").notNull().default('1.png')
})

export const Student = pgTable("Students",{
    student_id:serial("student_id").primaryKey(),
    name:varchar("name").notNull(),
    email:varchar("email"),
})

export const completionEnum = pgEnum("completionStatus",['In Progress','Completed'])
export const Enrollment = pgTable("Enrollments",{
    course_id:uuid("course_id").references(()=>Course.course_id,{onDelete:'cascade',onUpdate:'cascade'}),
    student_id:serial("student_id").references(()=>Student.student_id,{onDelete:'cascade',onUpdate:'cascade'}),
    completionStatus:completionEnum("enrollment-status").default("In Progress"),
    progress:integer('progress').default(0),
    createdAt:date("createdAt").defaultNow(),
},(table)=>{
    return ({pk : primaryKey({columns:[table.student_id,table.course_id]})})
})

export const PreReq = pgTable("Prerequisites",{
    course_id:uuid("course_id").references(()=>Course.course_id,{onDelete:'cascade',onUpdate:'cascade'}),
    prereq_id:uuid("prereq_id").references(()=>Course.course_id,{onDelete:'cascade',onUpdate:'cascade'})
})

export const Content = pgTable("CourseContents",{
    course_id:uuid("course_id").references(()=>Course.course_id,{onDelete:'cascade',onUpdate:'cascade'}),
    week:integer("week").notNull(),
    title:varchar("title").notNull(),
    content:text("content").notNull(),
}
,(table)=>{return(
    {pk: primaryKey({columns:[table.week,table.course_id]})}
)
}

)

//Relations
export const StudentRelations = relations(Student,({many})=>{
    return { 
    enrollee:many(Enrollment),
}})
export const CourseRelations = relations(Course,({many})=>{
    return { 
    enrolled_in:many(Enrollment),
    course:many(PreReq,{relationName: 'course'}),
    prerequisite:many(PreReq,{relationName: 'prerequisite'}),
    // contains: many(Content),
}})
export const EnrollmentRelations = relations(Enrollment,({one,many})=>{
    return{ 
    enrollee:one(Student,{  
        fields: [Enrollment.student_id],
        references:[Student.student_id]
    }),
    enrolled_in:one(Course,{
        fields: [Enrollment.course_id],
        references:[Course.course_id]
    }),
}})

export const PreReqRelations = relations(PreReq,({one})=>{
    return {
        course:one(Course,{
            fields:[PreReq.course_id],
            references:[Course.course_id], 
            relationName: 'course'

        }),
        prerequisite:one(Course,{
            fields:[PreReq.prereq_id],
            references:[Course.course_id], 
            relationName: 'prerequisite'
        })
    }
})
// export const ContentRelations = relations(Content,({one})=>{
//     contains:one(Course,{
//         fields:[Content.course_id],
//         references:[Course.course_id], 
//     })
// })