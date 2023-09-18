import type { DictionaryUnion } from "@/types/Types";
import type { LinkVariants } from "@/types/Theme/Properties";
import { styles as buttonStyles } from "@/components/ui/Button/styles";

export const styles: DictionaryUnion<LinkVariants, string> = {
    ...buttonStyles,
    link: "text-link [&>svg>*]:fill-link hover:border-b-link"
}





