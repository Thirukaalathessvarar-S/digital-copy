import glowingSkin from '../assets/images/glowing-skin.png'
import bottlePerfume from '../assets/images/bottle-perfume.png'
import armchair from '../assets/images/armchair.png'
import grocery from '../assets/images/grocery.png'
import deskLamp from '../assets/images/desk-lamp.png'
import laptop from '../assets/images/laptop.png'
import shirt from '../assets/images/shirt.png'
import type {categoryType} from '../interfaces/category.ts'

export const categoryProps : categoryType[] = [
    {category:'beauty' , label:'Beauty' , image:glowingSkin},
    {category:'fragrances' , label:'Fragrances' , image:bottlePerfume},
    {category:'furniture' , label:'Furniture' , image:armchair},
    {category:'groceries' , label:'Groceries' , image:grocery},
    {category:'home-decoration' , label:'Home Decoration' , image:deskLamp},
    {category:'laptops' , label:'Laptops' , image:laptop},
    {category:'mens-shirts' , label:'Men Shirts' , image:shirt}
]
