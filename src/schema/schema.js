const graphql = require('graphql');
const Task = require('../model/task');
const graphqlISODate = require('graphql-iso-date');

const {  GraphQLDateTime } = graphqlISODate;

const { 
    GraphQLObjectType, GraphQLString,
    GraphQLID,GraphQLSchema, GraphQLBoolean,
    GraphQLList,GraphQLNonNull 
} = graphql;


const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        _id: { type: GraphQLID},
        title: { type: GraphQLString}, 
        status:{type:GraphQLBoolean},
        deadline: { type: GraphQLDateTime},
        createdAt: {type: GraphQLDateTime},
        deletedAt: {type: GraphQLDateTime}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                return Task.findById(args.id);
            }
        },
        tasks:{
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({deletedAt: { $eq: null }});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString)},
                deadline: { type: new GraphQLNonNull(GraphQLDateTime)}
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    deadline: args.deadline,
                    status:false,
                    createdAt: Date.now()
                });
                return task.save();
            }
        },
        deleteTask:{
            type:TaskType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Task.findOneAndUpdate({'_id':args.id},{deletedAt: Date.now()},{returnOriginal: false})
            }
        },
        updateTask: {
            type:TaskType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLID)},
                title: { type: new GraphQLNonNull(GraphQLString)},
                deadline: { type: new GraphQLNonNull(GraphQLDateTime)}
            },
            resolve(parent,args){
                let updateData = {
                    title:args.title,
                    deadline:args.deadline
                }
                return Task.findOneAndUpdate({'_id':args.id},updateData,{returnOriginal: false})
            }
        },
        finishTask:{
            type:TaskType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Task.findOneAndUpdate({'_id':args.id},{status:true},{returnOriginal: true})
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});