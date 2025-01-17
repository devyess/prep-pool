const zod= require('zod');

const submissionSchema=zod.object({
      userName:zod.string().min(2),
      country:zod.string().min(2),
      company:zod.string().min(2),
      question:zod.string(),
});

module.exports=submissionSchema;