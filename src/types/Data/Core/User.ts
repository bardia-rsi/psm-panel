import { BaseMeta, PIDR, Password } from "@/types/Data/Base";

interface UserBase {
    personalInfo: {
        name: string | null;
        dateOfBirth: Date | null;
        gender: string | null;
    };
    security: {
        twoStepVerification: boolean;
    };
}

interface LoginBaseObject {
    username: string;
    email: string;
    phoneNumber: string;
}

export interface UserUpdatePayload extends RecursivePartial<UserBase> {
    login: Partial<LoginBaseObject> & {
        password?: {
            current: string;
        };
        securityQuestions?: {
            question?: PIDR;
            answer?: string;
        }[];
    };
}

export interface UserMeta extends UserBase, BaseMeta {
    login: LoginBaseObject & {
        password: {
            current: Password;
            history: Password[];
        };
        securityQuestions?: {
            question: PIDR;
            answer: string;
        }[];
    };
    security: {
        lastActivities: {
            pid: PIDR;
            ip: string;
            os: string;
            time: {
                zone: string;
                local: Date;
            };
        }[];
        twoStepVerification: boolean;
    }
    subscription: {
        plan: string;
        status: string;
        period: string | null;
        expire: Date | null;
        history: {
            pid: PIDR;
            plan: string;
            period: string;
            expire: Date;
        }[];
    };
}