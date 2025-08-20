const { z } = require("zod");

// Signup validation schema
const signupSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  username: z.string().min(3).max(20),
});

// Signin validation schema
const signinSchema = z.object({
  email: z.string(), 
  password: z.string().min(6),
});

module.exports = { signupSchema, signinSchema };
