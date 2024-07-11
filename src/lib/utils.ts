import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function fetchJson<ResponseType extends any = any>(url: string, opts?: RequestInit) {
    return fetch(url, opts).then(async (response) => {
        if (response.ok) {
            if (response.status === 204) {
                return null as ResponseType;
            } else {
                return await response.json() as ResponseType;
            }
        } else {
            let error = await response.text()
            try {
                error = JSON.parse(error)
            } catch (error) { }
            throw error
        }
    })
}

export function dateToLocale(input: any) {
    const date = new Date(input);
    return `${date.toLocaleDateString('fr-FR', { dateStyle: "long" })} - ${date.toLocaleTimeString('fr-FR', { timeStyle: "medium" })}`
}