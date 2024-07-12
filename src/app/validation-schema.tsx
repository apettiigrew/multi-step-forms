import * as Yup from "yup";

// export const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("Please enter your first name").min(2, "Must be at least 2 characters").max(20, 'Must be 20 characters or less'),
//     lastName: Yup.string().required("Please enter your last name").min(2, "Must be at least 2 characters").max(20, 'Must be 20 characters or less'),
//     email: Yup.string().email().required("Please enter your email"),
//     phone: Yup.string()
// });
export const validationSchema = [
    Yup.object().shape({
        firstName: Yup.string().required("Please enter your first name").min(2, "Must be at least 2 characters").max(20, 'Must be 20 characters or less'),
        lastName: Yup.string().required("Please enter your last name").min(2, "Must be at least 2 characters").max(20, 'Must be 20 characters or less'),
        email: Yup.string().email().required("Please enter your email"),
        phoneNumber: Yup.string().matches(/^[0-9]{10}/, "Please enter a valid phone number"),
    }),

    Yup.object().shape({
        streetAddress: Yup.string().required("Please enter a street address").min(2, "Must be at least 2 characters").max(100, 'Must be 100 characters or less'),
        country: Yup.string().required("Please select a country").min(2),
        state: Yup.string().required("Please select a state"),
        postalCode: Yup.string(),
        shippingMethod: Yup.string().required("Please select shipping method"),
    }),
];

// Yup.object().shape({
//     cardType: Yup.string().required("Please select a card type"),
//     cardNumber: Yup.number()
//         .typeError("Please enter a valid card number")
//         .required("Please select a card number"),
//     expirationDate: Yup.object().shape({
//         month: Yup.string().required("Please select a month"),
//         year: Yup.string().required("Please select a year"),
//     }),
//     cvv: Yup.number()
//         .typeError("Please enter only digits")
//         .required("Please enter your CVV Number"),
// }),
// Yup.object().shape({
//     agreement: Yup.boolean().oneOf(
//         [true],
//         "You must agree to this to continue"
//     ),
// }),