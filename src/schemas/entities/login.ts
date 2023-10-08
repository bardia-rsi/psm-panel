import * as Yup from "yup";

export const create = Yup.object().shape({
    company: Yup.object().shape({
        name: Yup.string()
            .trim()
            .max(128, "The company name is too long. Maximum length is 128 characters.")
            .required("Enter company name")
    }).required("Enter company name"),
    url: Yup.string()
        .lowercase()
        .trim()
        .max(2048, "The url is too long. Maximum length is 2048 characters.")
        .url("Invalid url (example: https://www.example.com)")
        .required("Enter login url"),
    email: Yup.string()
        .email("Invalid email!")
        .max(256, "The email is too long. Maximum length is 256 characters.")
        .when(["username", "phoneNumber"], {
            is: (username: string | undefined, phoneNumber: string | undefined) => !(!!username || !!phoneNumber),
            then: schema => schema.required("Email, username or phone number is required"),
        }),
    username: Yup.string()
        .lowercase()
        .trim()
        .max(128, "The username is too long. Maximum length is 128 characters.")
        .when(["email", "phoneNumber"], {
            is: (email: string | undefined, phoneNumber: string | undefined) => !(!!email || !!phoneNumber),
            then: schema => schema.required("Email, username or phone number is required"),
        }),
    phoneNumber: Yup.string()
        .matches(/^\d+$/, { message: "The phone number must only contain numbers." })
        .length(10)
        .when(["email", "username"], {
            is: (email: string | undefined, username: string | undefined) => !(!!email || !!username),
            then: schema => schema.required("Email, username or phone number is required"),
        }),
    password: Yup.string()
        .max(2048, "The password is too long. Maximum length is 2048 characters.")
}, [
    ["email", "username"],
    ["email", "phoneNumber"],
    ["username", "phoneNumber"]
]);