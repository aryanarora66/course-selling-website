const { z } = require("zod");

const zodUserSchema = z.object({
    username: z.string().email().min(10),
    password: z.string().min(3),
});

const zodAdminSchema = z.object({
    username: z.string().email().min(10),
    password: z.string().min(3),
});

const zodCourseSchema = z.object({
    title: z.string().min(3),
    desc:z.string(),
    imageLink : z.string().optional()
});

module.exports = {
    zodUserSchema,
    zodAdminSchema,
    zodCourseSchema
}
