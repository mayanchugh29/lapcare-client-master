import * as yup from 'yup';

export const validationSchemaforContactUs = yup.object({
    name: yup
        .string("Enter your Name")
        .required('Name Field is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    contact: yup
        .number('Enter your Contact')
        .min(10, 'Contact must be of 10 digits')
        .required('Contact is required'),
    city: yup
        .string('Enter your city')
        .required('City is required'),
    state: yup
        .string('Select your State')
        .required('State is required'),
    country: yup
        .string('Enter your Country')
        .required('Country is Required'),
    message: yup
        .string('Enter your Message')
        .required('You message is required')
});