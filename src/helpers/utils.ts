import clsx, { ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

// Utility function to combine class names
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};