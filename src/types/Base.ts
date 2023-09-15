type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};