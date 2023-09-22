export type Dictionary<T = any> = {
    [key: string]: T;
}

export type DictionaryUnion<K extends string | number | symbol, T = any> = {
    [key in K]: T;
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;