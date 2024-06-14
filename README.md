# Alemeno Internship Assignment - Backend

This is my submission for the internship assignment given by Alemeno - [Link](https://drive.google.com/file/d/1m9uCsaiWalbCkzTTc43lZ2sx0RVvp1By/view)

Done by - Mukundh P L

## Routes

### /reset (GET request)
- Preloads the database with sample data, refer to mock_data
    
### /drop (GET request)
- Truncates all data in the database

### /users (GET request)
- Returns the data of all users in the format {users:[...]}

### /users/create (POST request)
- Creates a user, refer to schema.js for the required schema. Pass required details in the request body

### /users/enrollments (POST request)
- Returns the data of all the enrollments the user has the format {enrollments:[...]} , pass the student_id of the user as id in the request body i.e req.body = {id:student_id}

### /users/enrollment/create (POST request)
- Creates an enrollment, refer to schema.js for the required schema. Pass required details in the request body

### /users/complete (PUT request)
- Marks an enrollment as completed, requires student_id and course_id in body i.e req.body = {student_id,course_id}

### /course (GET request)
- Returns the data of all courses in the format {courses:[...]}

### /course/create (POST request)
- Creates a course, refer to schema.js for the required schema. Pass required details in the request body

### /course/contents (POST request)
- Returns the content a course has in the format {contents:[...]}, requires course_id in the body i.e req.body={course_id}

### /course/content/create (POST request)
- Creates a content for a course, refer to schema.js for the required schema. Pass required details in the request body

### /prerequisite (POST request)
- Returns the id and name of all the prerequisites a course has, requires course_id in the body i.e req.body={course_id}

### /prerequisite/create (POST request)
- Creates a prerequisite for a course, refer to schema.js for the required schema. Pass required details in the request body

## Setup


- Run "npm i" to install required node_modules 
- Make sure you have a PostgreSQL instance and pass the required credentials in drizzle.config.js
- Run "npm run gen" and "npm run migrate" to initialize the database
- Run "npm run start" or "npm run dev" to start the server
- Server will run in [http://localhost:3500](http://localhost:3500) 
- Note: You might find it easier to do DML operations using drizzle-kit studio with its nice UI interface. To use it run "npm run studio" and go to [https://local.drizzle.studio](https://local.drizzle.studio)


### Video
- [Link](https://drive.google.com/file/d/1F2Lpb7tGMgp6YWkgQ7aWNTCX5PLXxg0g/view?usp=sharing)
