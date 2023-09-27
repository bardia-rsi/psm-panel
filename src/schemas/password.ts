import * as Yup from "yup";

export const checkPasswordSchema = Yup.object().shape({
    password: Yup.string().required()
});


export const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "The password is too short. Minimum length is 8 characters.")
        .max(2048, "The password is too long. Maximum length is 2048 characters.")
        .matches(/[a-z]/g, "The password must contain at least one lowercase letter.")
        .matches(/[A-Z]/g, "The password must contain at least one uppercase letter.")
        .matches(/\d/g, "The password must contain at least one number.")
        .matches(/[^A-Z0-9]/gi, "The password must contain at least one special character.")
        .required("Enter password"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "The password and password confirmation do not match.")
        .required("Enter password confirmation")
});