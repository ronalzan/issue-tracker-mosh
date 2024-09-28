import { z } from "zod";

const IssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255),
    description: z.string().min(1, 'Description is required!'),
})

const PatchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255).optional(),
    description: z.string().min(1, 'Description is required!').max(65535).optional(),
    //if you have a string value for assignedToUserId, it cannot be empty string. But can be null or no value at all!
    assignedToUserId: z.string().min(1, 'AssignedToUserId is required!').max(255).optional().nullable(),
})

export { IssueSchema, PatchIssueSchema };