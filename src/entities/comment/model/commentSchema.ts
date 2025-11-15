import z from 'zod';

const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type Comment = z.infer<typeof commentSchema>;

export { commentSchema, type Comment };
