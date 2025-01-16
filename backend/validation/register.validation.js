const zod= require('zod');

const registerValidation = zod.object({
      userName: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(6),
});
module.exports = registerValidation;