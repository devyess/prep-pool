const zod= require('zod');

const submissionSchema=zod.object({
      userName:zod.string(),
      country:zod.string(),
      company:zod.string(),
      question:zod.string(),
});

module.exports=submissionSchema;