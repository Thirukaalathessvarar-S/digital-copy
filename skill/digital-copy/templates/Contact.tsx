import {useState} from 'react'
import {Header} from './Header.tsx'
import {Footer} from './Footer.tsx'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const schema = yup.object({
    name:yup.string().required('name is required'),
    email:yup.string().email('please enter valid email').required('email is required'),
    phone:yup.string().required('phone number is required').matches(/^[6-9]\d{9}$/, "Enter a valid phone number"),
    message:yup.string().required('message is required').min(10 , 'message must be at least 10 characters')
})

type FormErrors = {
    name?:string;
    email?:string;
    phone?:string;
    message?:string;
}

type Field = 'name' | 'email' | 'phone' | 'message'

export function Contact(){
    const [errors , setErrors] = useState<FormErrors>({});
    const [isSending , setSending] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formElement = event.currentTarget; // currentTarget is null after an await
        const form = new FormData(formElement);
        const data = Object.fromEntries(form);
        try{
            await schema.validate(data , {abortEarly:false});
            setErrors({});
            setSending(true);
            await new Promise((resolve)=>setTimeout(resolve , 1000));
            setSending(false);
            toast.success('message sent');
            formElement.reset();
            navigate('/');
        }
        catch(err){
            if (err instanceof yup.ValidationError) {
                const newErrors: FormErrors = {};

                err.inner.forEach((error) => {
                    const field = error.path as Field;

                    if (field && !newErrors[field]) {
                        newErrors[field] = error.message;
                    }
                });
                setErrors(newErrors);
                return;
            }
            throw err;
        }
    }

    return(
        <>
            <Header isSearch={false}></Header>
            <section id="contact" className="bg-[var(--bg-soft)] p-[30px_0px]">
                <div className="container flex justify-center">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div>
                            <h2>Contact us</h2>
                            <p className="text-muted-sm">We reply within a day</p>
                        </div>

                        <div className="flex flex-wrap gap-[20px]">
                            <div className="flex-1 min-w-[150px]">
                                <label htmlFor="name" className="block eyebrow">Name</label>
                                <input onChange={() => setErrors(prev => ({ ...prev, name: '' }))} name="name" placeholder="Rakesh" id="name" className="input mt-[8px]"></input>
                                {errors.name && <p className="red-text">{errors.name}</p>}
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label htmlFor="phone" className="block eyebrow">Phone number</label>
                                <input onChange={() => setErrors(prev => ({ ...prev, phone: '' }))} name="phone" placeholder="8788812341" id="phone" className="input mt-[8px]"></input>
                                {errors.phone && <p className="red-text">{errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block eyebrow">Email</label>
                            <input onChange={() => setErrors(prev => ({ ...prev, email: '' }))} name="email" placeholder="you@example.com" id="email" className="input mt-[8px]"></input>
                            {errors.email && <p className="red-text">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block eyebrow">Message</label>
                            <textarea onChange={() => setErrors(prev => ({ ...prev, message: '' }))} name="message" placeholder="write your message" id="message" className="input mt-[8px] min-h-[100px] resize-none"></textarea>
                            {errors.message && <p className="red-text">{errors.message}</p>}
                        </div>

                        <button type="submit" disabled={isSending} className="btn btn-block disabled:opacity-40 disabled:cursor-default">{isSending ? 'Sending...' : 'Send'}</button>
                    </form>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}
