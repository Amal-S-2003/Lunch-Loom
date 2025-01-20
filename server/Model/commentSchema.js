


  const mongoose = require("mongoose");
  
  const commentSchema = new mongoose.Schema({
    
        
          userId: {
            type: String,
            required: true,
        },
          messId: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          profilePicture: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        
      
  });
  
  const comments = mongoose.model("comments", commentSchema);
  
  module.exports = comments;
  