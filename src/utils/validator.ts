import { DBENUMS } from '../constant';
import Joi from 'joi';

export const userSignup = Joi.object({
    username: Joi.string().trim().min(3).max(15).lowercase().required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().trim().email().required(),
    status: Joi.string().trim().uppercase()
})

export const userLogIn = Joi.object({
    username: Joi.string().trim().min(3).lowercase().required(),
    password: Joi.string().min(5).max(20).required()
})

export const username = Joi.object({
    username: Joi.string().trim().min(3).lowercase().required()
})

export const userUpdate = Joi.object({
    password: Joi.string().min(5).max(20),
    email: Joi.string().trim().email().required(),
    status: Joi.string().trim().uppercase()
})