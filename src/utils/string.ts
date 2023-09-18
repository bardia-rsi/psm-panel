export const titleCase = (v: string): string => v
    .split(" ")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");