const zod= require('zod');

const submissionSchema=zod.object({
      userName:zod.string().min(3).max(20),
      country:zod.string().min(3).max(20),
      company:zod.string().min(3).max(20),
      question:zod.string().min(10),
});

module.exports=submissionSchema;