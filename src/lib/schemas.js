import { z } from 'zod'

export const loginUserSchema = z.object({
	email: z.string({ required_error: 'Email address is required' }).email({
		message: 'Email must be a valid email address'
	}),
	password_login: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password is required' })
})

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'Fullname is required' })
			.regex(/^[a-zA-z\s]*$/, { message: 'Fullname can only contain letters and spaces.' })
			.min(6, { message: 'Fullname must be at least 6 characters' })
			.max(64, { message: 'Fullname must be less than 64 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email address is required' })
			.email({ message: 'Email must be a valid email address' }),
		password_register: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		password_register_confirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ password_register_confirm, password_register }, ctx) => {
		if (password_register_confirm !== password_register) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password_register']
			})
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password_register_confirm']
			})
		}
	})

export const resetPasswordSchema = z.object({
	email: z.string({ required_error: 'Email address is required' }).email({
		message: 'Email must be a valid email address'
	})
})

const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Fullname is required' })
		.regex(/^[a-zA-z\s]*$/, { message: 'Fullname can only contain letters and spaces.' })
		.min(6, { message: 'Fullname must be at least 6 characters' })
		.max(64, { message: 'Fullname must be less than 64 characters' })
		.trim(),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 2097152) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 2MB'
					})
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, gif'
					})
				}
			}
		})
})

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
})

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(6, { message: 'Username must be at least 6 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
})

export const updatePasswordSchema = z
	.object({
		oldPassword: z
			.string({ required_error: 'Old password is required' })
			.min(8, { message: 'Old password is required' }),
		password: z
			.string({ required_error: 'New Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm New Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'New Password & Confirm New password must match',
				path: ['password']
			})
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'New Password & Confirm New password must match',
				path: ['passwordConfirm']
			})
		}
	})

export const linkSchema = z.object({
	url: z.string({ required_error: 'Url is required' }).regex(/^(http|https):\/\/[^ "]+$/, {
		message: 'URL must be a valid url. Example: https://www.example.com or http://www.example.com'
	}),
	expiredIn: z.string().optional(),
	expiration: z.string().optional()
})
