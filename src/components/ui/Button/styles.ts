import type { DictionaryUnion } from "@/types/Types";
import type { Variants, Sizes } from "@/types/Theme/Properties";

export const styles: DictionaryUnion<Variants, string> = {
    filled: "border-transparent bg-ac-primary-500 text-white [&>svg>*]:fill-white hover:bg-ac-primary-600",
    outline: "border-ac-primary-500 text-ac-primary-500 [&>svg>*]:fill-ac-primary-500 hover:bg-ac-primary-500 hover:text-white hover:[&>svg>*]:fill-white",
    text: "border-transparent text-ac-primary-500 [&>svg>*]:fill-ac-primary-500 hover:bg-black/[.075] dark:hover:bg-white/[.075]",
    icon: "border-transparent [&>svg>*]:fill-secondary hover:bg-black/[.075] dark:hover:bg-white/[.075] [&>svg>*]:hover:fill-primary"
}

export const spaces: DictionaryUnion<"normal" | "compact", DictionaryUnion<Sizes, string>> = {
    normal: {
        sm: "py-1 px-2 gap-x-1",
        md: "py-2 px-4 gap-x-2",
        lg: "py-4 px-8 gap-x-4"
    },
    compact: {
        sm: "p-1 gap-x-1",
        md: "p-2 gap-x-2",
        lg: "p-4 gap-x-4"
    }
}

export const sizes: DictionaryUnion<Sizes, string> = {
    sm: "text-sm [&>svg]:w-3 [&>svg]:h-3",
    md: "text-base [&>svg]:w-4 [&>svg]:h-4",
    lg: "text-lg [&>svg]:w-6 [&>svg]:h-6"
}