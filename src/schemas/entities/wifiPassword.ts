import * as Yup from "yup";

export const create = Yup.object().shape({
    name: Yup.string()
        .trim()
        .max(128, "The name is too long. Maximum length is 128 characters.")
        .matches(
            /^[a-zA-Z0-9-_\s()]+$/,
            "The name must be alphanumeric and only (-_()) characters are allowed."
        )
        .required("Enter name"),
    url: Yup.string()
        .lowercase()
        .trim()
        .max(256, "The url is too long. Maximum length is 256 characters."),
    password: Yup.string()
        .max(256, "The password is too long. Maximum length is 256 characters.")
        .required("Enter password"),
    routerUsername: Yup.string()
        .lowercase()
        .trim()
        .max(128, "The username is too long. Maximum length is 128 characters."),
    routerPassword: Yup.string()
        .max(256, "The password is too long. Maximum length is 256 characters.")
});