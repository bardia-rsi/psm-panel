import * as Yup from "yup";
import { validator } from "@/helpers/creditCard";

export const create = Yup.object().shape({
    owner: Yup.string()
        .trim()
        .max(128, "The Owner is too long. Maximum length is 128 characters.")
        .required("Enter Card Owner"),
    cardNumber: Yup.string()
        .trim()
        .min(13, "The card number is too short. Minimum length is 13 characters.")
        .max(16, "The card number is too long. Maximum length is 16 characters.")
        .matches(/^\d+$/, "The card number must only contain numbers.")
        .test(
            "card-number-validator",
            "Invalid card number",
            value => validator(value!)
        )
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
    expiration: Yup.string()
        .test(
            "expiration-date-format",
            "The expiration date must be the following format: yyyy/mm",
            value => /^(\d{4}\/\d{2})+$/.test(value!)
        )
        .test(
            "expiration-date-year",
            "The expiration date has passed.",
            value => {

                const valueArr = value?.split("/") ?? [];

                return !(Number(new Date(Number(valueArr[0]), Number(valueArr[1]))) < Date.now());

            }
        )
        .test(
            "expiration-date-year",
            "The year of the expiration date must be between this year and ten years later",
            value => {

                const valueArr = value?.split("/") ?? [];
                const currentFullYear = new Date().getFullYear();

                return !(Number(valueArr[0]) < currentFullYear || Number(valueArr[1]) > currentFullYear + 10);

            }
        )
        .test(
            "expiration-date-month",
            "The month of the expiration date must be between 1 and 12",
            value => {

                const valueArr = value?.split("/") ?? [];

                return !(Number(valueArr[1]) < 1 || Number(valueArr[1]) > 12);

            }
        )
        .required("Enter expiration")
});