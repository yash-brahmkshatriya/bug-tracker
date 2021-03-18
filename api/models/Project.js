const mongoose = require("mongoose");

const Project = mongoose.Schema({
  developers:  [{
        type:  mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
    threads: [{
        type:  mongoose.Schema.Types.ObjectId, 
        ref: 'Thread' }] ,
    projectManager:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:'User', 
    },
    tags:[String],
});

module.exports = mongoose.model("Project", Project);
