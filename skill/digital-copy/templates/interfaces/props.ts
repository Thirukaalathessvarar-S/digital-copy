export type ButtonProps = {
    label:string;
    icon?:string;                        // font awesome classes , e.g. 'fa-solid fa-xmark'
    variant?:string;                     // an index.css class name , never utilities
    onClick?:()=>void;
}
