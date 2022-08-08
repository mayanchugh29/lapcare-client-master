import * as yup from 'yup';


export const validationSchemaForProductRegister = yup.object({
    name: yup
        .string('Enter your full name')
        .required('Name field is required'),
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
    productName: yup
        .string('Enter your Product Name')
        .required('Product Name is required'),
    productCode: yup
        .string('Enter your Product Code')
        .required('Product Code is required'),
    serialNumber: yup
        .string('Enter your Serial Number')
        .required('Serial Number is required'),
    invoiceNumber: yup
        .string('Enter your Invoice Number')
        .required('Invoice Number is required'),
    invoiceDate: yup
        .string('Enter your Invoice Date')
        .required('Invoice Date is required'),
    file: yup
        .string('Upload your Invoice')
        .required('Invoice is required')
});