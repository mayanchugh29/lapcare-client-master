import * as yup from 'yup';


export const validationSchemaforCheckout = yup.object({
    shippingAddress: yup.object({
        fullName: yup
            .string('Enter your full name')
            .required('Name field is required'),
        addressLine1: yup
            .string('Enter Your Address')
            .required('Address Line 1 field is required')
            .min(4, 'Address line 1 should be of 4 characters'),
        addressLine2: yup
            .string('Enter Address Line 2'),
        landmark: yup
            .string('Enter your landmark'),

        city: yup
            .string('Enter your city')
            .required('City is required'),
        state: yup
            .string('Select your State')
            .required('State is required'),
        pinCode: yup
            .number('Enter your Pin Code')
            .min(6, 'Pin Code should be of 6 digits')
            .required('Pin Code is required'),
        phoneNumber: yup
            .number('Enter your Phone Number')
            .min(10, 'Contact should be of 10 digits')
            .required('Contact is required')
    })
})


export const validationSchemaforCheckoutWithBillingAddress = yup.object({
    shippingAddress: yup.object({
        fullName: yup
            .string('Enter your full name')
            .required('Name field is required'),
        addressLine1: yup
            .string('Enter Your Address')
            .required('Address Line 1 field is required'),
        addressLine2: yup
            .string('Enter Address Line 2'),
        landmark: yup
            .string('Enter your landmark'),

        city: yup
            .string('Enter your city')
            .required('City is required'),
        state: yup
            .string('Select your State')
            .required('State is required'),
        pinCode: yup
            .number('Enter your Pin Code')
            .min(6, 'Pin Code should be of 6 digits')
            .required('Pin Code is required'),
        phoneNumber: yup
            .number('Enter your Phone Number')
            .min(10, 'Contact should be of 10 digits')
            .required('Contact is required')
    }),
    billingAddress: yup.object({
        fullName: yup
            .string('Enter your full name')
            .required('Name field is required'),
        addressLine1: yup
            .string('Enter Your Address')
            .required('Address Line 1 field is required'),
        addressLine2: yup
            .string('Enter Address Line 2'),
        landmark: yup
            .string('Enter your landmark'),

        city: yup
            .string('Enter your city')
            .required('City is required'),
        state: yup
            .string('Select your State')
            .required('State is required'),
        pinCode: yup
            .number('Enter your Pin Code')
            .min(6, 'Pin Code should be of 6 digits')
            .required('Pin Code is required'),
        phoneNumber: yup
            .number('Enter your Phone Number')
            .min(10, 'Contact should be of 10 digits')
            .required('Contact is required')
    })
})