
# ToDo List GraphQl Back-End

  

Node.js and MongoDB GraphQl API

### Dependencies of the project
```
mongoose, express.js, graphql, express-graphql, graphql-iso-date 
```
### Install

```bash
npm install
```
### Run
```bash
node index.js
```
Url: http://localhost:3000/graphql?

## Mongoose Model Structure
> ### Task
```javascript
task:{
	title:String,
	deadline:Date,
	status:Boolean,
	createdAt:Date,
	deletedAt:Date
}
```

  

## GraphQL Queries

> Add Task

```json
mutation{
  addTask(title:"Example", deadline:"2019-09-18T16:00:00.000Z"){
   _id
    title
    deadline
    status
    createdAt
  }
}
```
> Task Get By Id
 ``` json 
 {
  task(id:"5d6dd71afdbd8527a8930185"){
  	title
    deadline
    status
    createdAt
  }
}
 ```
 > Update Task 
 ```json
 mutation{
  updateTask(id:"5d6dd71afdbd8527a8930185",title:"updated",deadline:"2019-11-18T16:00:00.000Z"){
    _id
    title
    deadline
    createdAt
  }
}
 ```
> Task List
 ``` json 
{
  tasks{
	_id 
	title 
	deadline 
	status 
	createdAt 
	deletedAt
  }
}
 ```
 >Delete Task
 ``` json 
mutation{
  deleteTask(id:"5d6dd71afdbd8527a8930185"){
    _id
    title
    deadline
    status
    createdAt
    deletedAt
  }
}
 ```
 >Finish Task
  ``` json 
mutation{
  finishTask(id:"5d6dd71afdbd8527a8930185"){
    _id
    title
    deadline
    status
    createdAt
    deletedAt
   }
}
 ```
 
## License
This project licensed under MIT.