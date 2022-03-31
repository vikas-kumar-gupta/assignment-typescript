import dotenv from 'dotenv';

dotenv.config({path : '../.env'});

export const CONFIG = {
    PORT: process.env.PORT,
    ADD: "this is just to test"
}