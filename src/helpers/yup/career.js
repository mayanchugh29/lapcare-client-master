import * as yup from 'yup';

export const validationSchemaforCareer = yup.object({
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
    position: yup
        .string('Enter the Position you are applying for')
        .required('Position is required'),
    //userAcceptance: yup
      //  .boolean('The terms and conditions must be accepted')
        //.required('The terms and conditions must be accepted')
        //.oneOf([true], "The terms and conditions must be accepted.")
});