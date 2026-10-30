import type {Product} from '../App.tsx'
import {Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import type {AppDispatch , RootState} from '../app/store'
import {addItems} from '../features/cart/cartSlice'
import toast from 'react-hot-toast'

export function ProductCard({id , title , price , category , rating , images , discountPercentage , index} : Product & {index?:number}){
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state:RootState)=>state.cart);
    const discountAmount = price * (discountPercentage/100);
    const actualPrice = (price - discountAmount).toFixed(2);

    // item exist , button follows the cart so it changes right after the click
    const buttonState = cart.some((item)=>item.id===id);

    function handleLink(e:React.MouseEvent){
        e.preventDefault();
        if(buttonState){
            return;
        }
        dispatch(addItems({id , category , title , image:images[0] , price}));
        toast.success('added to cart');
    }

    return(
        <Link to={`/product/${id}`} className={`basis-[calc((100%-60px)/4)] max-md:basis-[calc((100%-40px)/3)] max-sm:mx-auto max-sm:basis-[70%] ${(index ?? 0)>3 ? 'hidden' : ''} rounded-[24px] flex flex-col gap-[15px] border-solid border-[1px] border-[var(--line)] overflow-hidden`}>
            {/* image */}
            <div className="relative bg-[var(--tint)] p-[40px_0px_0px_0px]">
                <img className="w-full aspect-square object-contain" src={images?.[0]} alt={title}></img>
                <p className="chip !py-[4px] !px-[8px] max-sm:!px-[6px] max-sm:!py-[2px] absolute top-[10px] right-[10px] max-sm:top-[6px] max-sm:right-[6px] text-[var(--muted)] font-[400] inline-flex gap-[5px] max-sm:gap-[3px] items-center"><i className="fa-solid fa-star text-[var(--tertiary)]"></i>{rating}</p>
            </div>
            <div className="flex flex-col gap-[15px] max-md:gap-[12px] max-sm:gap-[10px] mt-auto p-[20px] max-md:p-[16px] max-sm:p-[12px]">
                <div className="flex flex-col gap-[5px]">
                    <p className="eyebrow !text-[var(--muted)]">{category}</p>
                    <p className="card-title line-clamp-1" title={title}>{title}</p>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-[8px] gap-y-[4px]">
                    <p className="price">₹{actualPrice}</p>
                    {discountPercentage > 0 &&
                        <p className="price-was text-nowrap max-sm:text-wrap">₹{price} <span className="ms-[5px] inline-block text-[var(--tertiary)] text-[length:var(--price-off-size)] leading-[calc(var(--price-off-size)+4px)] font-bold font-satoshi">({Math.round(discountPercentage)}% off)</span></p>
                    }
                </div>
                {buttonState ?
                    <Link to="/cart" className="btn-outline">Go to Cart</Link>

                    : <button onClick={handleLink} className="btn whitespace-nowrap">Add to Cart</button>
                }
            </div>
        </Link>
    )
}
