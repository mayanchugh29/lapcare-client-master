import * as yup from 'yup';

export const validationSchemaForLogin = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const validationSchemaforRegister = yup.object({
    fname: yup
        .string("Enter your First Name")
        .required('First Name is required'),
    lname: yup
        .string("Enter your Last Name")
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    contact: yup
        .number('Enter your Contact')
        .min(10, 'Contact must be of 10 digits')
        .required('Contact is required'),
});