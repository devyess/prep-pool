const mongoose=require("mongoose");
const User=require("./user.models");

const submissionSchema=new mongoose.Schema({
      userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
      },
      userName:{
            type:String,
            required:true
      },
      country:{
            type:String,
            required:true
      },
      company:{
            type:String,
            required:true
      },
      question:{
            type:Array,
            required:true
      },
},{
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    });

module.exports=mongoose.model("Submission",submissionSchema);