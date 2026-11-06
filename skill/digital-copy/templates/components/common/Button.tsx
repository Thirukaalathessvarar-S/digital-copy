import type {ButtonProps} from '../../interfaces/props.ts'

export function Button({label , icon , variant = 'btn' , onClick} : ButtonProps){
    return(
        <button onClick={onClick} className={`${variant} gap-[8px]`}>{icon && <i className={icon}></i>}{label}</button>
    )
}
