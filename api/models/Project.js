<<<<<<< HEAD
// Name
// Project Manager (Ref User)
// Developer Team : Array[Ref User]
// Threads: [Ref Thread]
// Tags
// Stats (Only accessible by Project Manager)
=======
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
>>>>>>> deep
