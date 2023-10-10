import * as Yup from "yup";

export const create = Yup.object().shape({
    owner: Yup.string()
        .trim()
        .max(128, "The Owner is too long. Maximum length is 128 characters.")
        .required("Enter Card Owner"),
    cardNumber: Yup.string()
        .trim()
        .length(16, "The credit card must be 16 characters long.")
        .required("Enter credit card"),
    password: Yup.string()
        .matches(/^\d+$/, "The password must only contain numbers.")
        .min(4, "The password is too short. Minimum length is 4 characters.")
        .max(8, "The password is too long. Maximum length is 8 characters.")
        .required(),
    cvv2: Yup.string()
        .matches(/^\d+$/, "The cvv2 must only contain numbers.")
        .min(3, "The cvv2 is too short. Minimum length is 3 characters.")
        .max(4, "The cvv2 is too long. Maximum length is 4 characters.")
        .required(),
    expiration: Yup.date().min(new Date(Date.now())).required("Enter expiration")
});