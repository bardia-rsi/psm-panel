import * as Yup from "yup";

export const accountDeletionSchema = Yup.object().shape({
    reason: Yup.string()
        .oneOf([
            "I use a different PSM account",
            "It's missing a key feature that I need",
            "I found another service that I like better",
            "My reason isn't listed"
        ])
        .required("Select a reason"),
    feedback: Yup.string()
        .min(64, "The feedback is too short. Minimum length is 64 characters.")
        .max(1024, "The feedback is too long. Maximum length is 2048 characters.")
        .required("Enter your feedback"),
    confirmation: Yup.boolean()
        .isTrue("Confirm that you want to delete your account.")
        .required("Confirm that you want to delete your account.")
});