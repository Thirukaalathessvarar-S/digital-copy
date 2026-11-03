import {Link} from 'react-router-dom'
import {Header} from './Header.tsx'
import {Footer} from './Footer.tsx'
import {useDispatch , useSelector} from 'react-redux'
import type {AppDispatch , RootState} from '../app/store.ts'
import {removeWish} from '../features/wishlist/wishSlice.ts'
import toast from 'react-hot-toast'
import notFound from '../assets/not-found.jpg'

export function Wishlist(){
    const dispatch = useDispatch<AppDispatch>();
    const wishItems = useSelector((state:RootState)=>state.wish);

    function handleRemove(id:number){
        dispatch(removeWish(id));
        toast.success('removed from wishlist');
    }

    if(wishItems.length===0){
        return(
            <>
                <Header isSearch={false}></Header>
                <section id="wishlist-empty" className="bg-[var(--bg-soft)] p-[30px_0px]">
                    <div className="container flex justify-center">
                        <div className="empty-card">
                            <img src={notFound} alt="No items in wishlist" className="block max-w-[320px] max-sm:max-w-[240px]"></img>
                            <div>
                                <h2 className="mb-[8px]">Your wishlist is empty</h2>
                                <p className="text-muted-sm">Save the things you love to find them here</p>
                            </div>
                            <Link to="/" className="btn">Continue shopping</Link>
                        </div>
                    </div>
                </section>
                <Footer></Footer>
            </>
        )
    }

    return(
        <>
            <Header isSearch={false}></Header>
            <section id="wishlist" className="bg-[var(--bg-soft)] p-[30px_0px]">
                <div className="container mb-[30px]">
                    <h2>Wishlist <span className="text-muted-sm">{wishItems.length} items</span></h2>
                </div>

                <div className="container flex flex-col gap-[16px]">
                    {wishItems.map((wishItem)=>(
                        <div key={wishItem.id} className="flex items-center gap-[20px] max-sm:gap-[12px] bg-[#ffffff] rounded-[24px] p-[20px] max-sm:p-[12px]">
                            <div className="basis-[10%] max-sm:basis-[20%] shrink-0"><img src={wishItem.image} alt={wishItem.title} className="block w-full"></img></div>

                            <div className="flex flex-col gap-[5px] flex-1 min-w-0">
                                <p className="card-title">{wishItem.title}</p>
                                <p className="text-muted-sm">₹ {wishItem.price.toFixed(2)}</p>
                            </div>

                            <button onClick={()=>handleRemove(wishItem.id)} title="Remove" className="btn-outline gap-[8px]"><i className="fa-solid fa-trash"></i><span className="max-sm:hidden">Remove</span></button>
                        </div>
                    ))}
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}
