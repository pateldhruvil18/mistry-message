import {z} from 'zod'

export const messageSchema = z.object({
    content : z
    .string()
    .min(10, {message : "content is must be atleast 10 character long"})
    .max(300, {message : "content is must be not longer morev than 300 character"})
})