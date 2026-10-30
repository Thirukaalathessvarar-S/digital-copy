import glowingSkin from '../../assets/glowing-skin.png'
import bottlePerfume from '../../assets/bottle-perfume.png'
import armchair from '../../assets/armchair.png'
import grocery from '../../assets/grocery.png'
import deskLamp from '../../assets/desk-lamp.png'
import laptop from '../../assets/laptop.png'
import shirt from '../../assets/shirt.png'

export type categoryType ={
    category:string ,
    label:string,
    image:string
}
export const categoryProps : categoryType[] = [
    {category:'beauty' , label:'Beauty' , image:glowingSkin},
    {category:'fragrances' , label:'Fragrances' , image:bottlePerfume},
    {category:'furniture' , label:'Furniture' , image:armchair},
    {category:'groceries' , label:'Groceries' , image:grocery},
    {category:'home-decoration' , label:'Home Decoration' , image:deskLamp},
    {category:'laptops' , label:'Laptops' , image:laptop},
    {category:'mens-shirts' , label:'Men Shirts' , image:shirt}
]
