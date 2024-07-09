import * as Yup from "yup";

export const validationSchema = [
    Yup.object().shape({
        firstName: Yup.string().required("Please enter your first name"),
        // lastName: Yup.string().required("Please enter your last name"),
        // email: Yup.string().email().required("Please select an age group"),
        // phone: Yup.string().required("Please enter your phone number"),
    }),
    // Yup.object().shape({
    //     address: Yup.string().required("Please enter a street address"),
    //     country: Yup.string().required("Please select a country"),
    //     state: Yup.string().required("Please select a state"),
    //     zip: Yup.string(),
    //     shipping: Yup.string().required("Please select shipping method"),
    // }),
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
];