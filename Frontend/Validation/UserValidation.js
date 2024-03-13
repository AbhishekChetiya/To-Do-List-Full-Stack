import { check } from "express-validator";

export const UserValidation = [
    check('name')
        .trim()
        .isAlpha()
        .withMessage("Name should contain alphabetic characters only"),

    check('username')
        .trim()
        .exists().withMessage('Username is required')
        .isAlphanumeric().withMessage('Username should be alphanumeric')
        .isLength({ min: 5, max: 15 }).withMessage('Username length should be between 5 and 15 characters'),

    check('password')
        .exists().withMessage('Password is required')
        .isLength({ min: 4, max: 12 }).withMessage('Password length should be between 4 and 12 characters'),

    check('email')
        .trim()
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
];
