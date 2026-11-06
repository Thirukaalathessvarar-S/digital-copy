import {Header} from '../layout/Header.tsx'
import {Footer} from '../layout/Footer.tsx'
import {ProductCard} from '../card/ProductCard.tsx'
import {ProductCardSkeleton} from '../card/ProductCardSkeleton.tsx'
import {useEffect , useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import type {AppDispatch , RootState} from '../../store/store.ts'
import {fetchProducts} from '../../store/asyncThunk/productThunk.ts'
import {DEALS_URL} from '../../constants/api.ts'
import {Link} from 'react-router-dom'
import notFound from '../../assets/images/not-found.jpg'

export function Deals(){
    const dispatch = useDispatch<AppDispatch>();
    const {items , loading , error} = useSelector((state:RootState)=>state.product);
    const [minDiscount , setMinDiscount] = useState<number>(0);

    const visibleProducts = items.filter((product)=>product.discountPercentage >= minDiscount);

    useEffect(()=>{
        const request = dispatch(fetchProducts(DEALS_URL));
        return ()=>{
            request.abort();      // skip a stale response
        };
    },[])

    function handleDiscount(discount:number){
        setMinDiscount(discount);
    }

    return(
        <>
            <Header isSearch={false}></Header>

            <section id="deals" className="bg-[var(--bg-soft)] p-[60px_0px] max-md:p-[40px_0px]">
                <div className="container flex flex-wrap items-center justify-between gap-x-[20px] gap-y-[12px] mb-[40px] max-md:mb-[24px]">
                    <div className="flex flex-col gap-[4px]">
                        <p className="eyebrow text-[color:var(--muted)]">Offers</p>
                        <h2>Today's Deals</h2>
                    </div>

                    <div className="flex flex-wrap gap-[10px] max-sm:gap-[8px]">
                        {[0 , 10 , 20].map((discount)=>(
                            <button key={discount} onClick={()=>handleDiscount(discount)} className={`${minDiscount===discount ? 'chip-active' : 'chip'}`}>{discount===0 ? 'All' : `${discount}%+`}</button>
                        ))}
                    </div>
                </div>

                {loading ?
                    <div className="container flex flex-wrap gap-[20px]">
                        {Array.from({length:4}).map((_ , i)=>(
                            <ProductCardSkeleton key={i}></ProductCardSkeleton>
                        ))}
                    </div> :

                    error!=='' || visibleProducts.length===0 ?
                    <div className="container flex flex-col items-center justify-center gap-[20px]">
                        <img src={notFound} alt="No deals found" className="block max-w-[480px] max-md:max-w-[360px] max-sm:max-w-[280px]"></img>
                        <h2>{error!=='' ? 'Could not load deals' : 'No deals right now'}</h2>
                        <Link to="/" className="btn">Continue shopping</Link>
                    </div> :

                    <div className="container flex flex-wrap gap-[20px]">
                        {visibleProducts.map((product)=>(
                            <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} category={product.category} rating={product.rating} discountPercentage={product.discountPercentage} images={product.images}></ProductCard>
                        ))}
                    </div>
                }
            </section>

            <Footer></Footer>
        </>
    )
}
