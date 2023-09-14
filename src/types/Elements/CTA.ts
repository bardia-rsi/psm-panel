export interface CTA {
    icon?: string;
    title: string;
    description: string;
    submitBtn: {
        href: string;
        text: string;
    };
    cancelBtnText?: string;
}