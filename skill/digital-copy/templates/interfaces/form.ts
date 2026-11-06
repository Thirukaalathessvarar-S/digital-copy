export type FormErrors = {
    name?:string;
    email?:string;
    phone?:string;
    message?:string;
}

export type Field = 'name' | 'email' | 'phone' | 'message'
