import * as Yup from "yup";

export const create = Yup.object().shape({
    name: Yup.string()
        .trim()
        .max(128, "The name is too long. Maximum length is 128 characters.")
        .required("Enter Name"),
    phoneNumber: Yup.string()
        .length(10)
        .matches(/^\d+$/, { message: "The phone number must only contain numbers." })
        .required("Enter phone number"),
    email: Yup.string()
        .email("Invalid email!")
        .max(256, "The email is too long. Maximum length is 256 characters."),
    address: Yup.string()
        .trim()
        .max(256, "The email is too long. Maximum length is 256 characters."),
    website: Yup.string()
        .lowercase()
        .trim()
        .max(1024, "The website is too long. Maximum length is 1024 characters.")
        .url("Invalid website (example: https://www.example.com)")
});













