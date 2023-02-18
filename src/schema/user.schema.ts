import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number().or(z.null()),
    name: z.string().or(z.null()),
    photo: z.string().or(z.null()),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' })
})

export const LoginUserSchema = z.object({
    email: z.string({ required_error: 'Email is required' })
    .email('Invalid email or password'),
    password: z.string({ required_error: 'Password is required' })
    .min(8,'Invalid email or password')
});

export const CreateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string({ required_error: 'Email is required' })
    .email('Invalid email'),
    password: z.string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: z.string({ required_error: 'Please confirm your password' })
})
.refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

// export type CreateUserInput = z.infer<typeof createUserSchema>;
// export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];