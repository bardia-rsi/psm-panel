type PID = string;

export type PIDR = Readonly<PID>;

export interface PIDI {
    pid: PIDR;
}

export interface Password extends PIDI{
    content: string;
    strength: number;
    createdAt: string | number;
}

export interface Timestamps {
    createdAt: string | number;
    updatedAt: string | number | null;
}

export interface BaseMeta extends Timestamps, PIDI {}