'use client'

import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import ToastError from "../../(client)/[locale]/components/toasts/Toast-error";
import ToastSuccess from "../../(client)/[locale]/components/toasts/Toast-success";
import {signIn, useSession} from "next-auth/react";
import login from "../../../actions/login";
import {useRouter} from "next/navigation";
import Logo from "@/public/assets/images/logo.png";
import LoginImage from "@/public/assets/images/login.jpg";


export default function Page(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { data: session, status } = useSession()
    const router = useRouter();

    useEffect(()=>{
        console.log(status)
        if(status === 'authenticated') {
            router.push('/panel')
        }
    }, [status])

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const logInSuccess = await login({email, password})
        console.log(logInSuccess)
        if(logInSuccess) {
            // Ask next-auth to not auto-redirect so we can control routing and avoid callback nesting
            const result = await signIn('credentials', {
                email,
                password,
                callbackUrl: `${window.location.origin}/panel`,
                redirect: false
            });

            console.log('signIn result', result);
            // result?.url may be present; prefer to push to /panel to keep URL clean
            if (result && !result.error) {
                // Auth succeeded — navigate to panel
                router.push('/panel');
                return;
            }

            setError('Authentication failed');
        } else setError('You do not have permissions to enter')



    }
    return (

        <div className="mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
            <Link
                href="/"
                className="mb-8 flex items-center justify-center text-2xl font-semibold lg:mb-10 dark:text-white"
            >
                <Image
                    alt=""
                    src={Logo}
                    width={43}
                    height={44}
                    className="mr-4 h-11"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          EuroMdTransport
        </span>
            </Link>
            <Card
                horizontal
                imgAlt=""
                imgSrc={'/assets/images/login.jpg'}
                className="w-full md:max-w-(--breakpoint-lg)"
                theme={{
                    root: {
                        children: "my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16",
                    },
                    img: {
                        horizontal: {
                            on: "hidden w-2/3 rounded-l-lg md:w-96 md:p-0 lg:block",
                        },
                    },
                }}
            >
                <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="email">Your email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                            type="email"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="password">Your password</Label>
                        <TextInput
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <Checkbox id="rememberMe" name="rememberMe"/>
                            <Label htmlFor="rememberMe">Remember me</Label>
                        </div>

                    </div>
                    <div className="mb-6">
                        <Button
                            size="lg"
                            color="blue"
                            type="submit"
                            className="w-full sm:w-auto"
                        >
                            Login to your account
                        </Button>
                    </div>

                </form>
            </Card>
        </div>

        // <section className='flex justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 w-full h-full'>
        //     <div className=" w-[400px] shadow-md h-1/3 flex justify-center items-center rounded bg-stone-50">
        //         <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
        //             <div>
        //                 <div className="mb-2 block">
        //                     <Label htmlFor="email1" value="Your email" />
        //                 </div>
        //                 <TextInput
        //                     id="email1"
        //                     type="email"
        //                     placeholder="name@google.com"
        //                     value={email}
        //                     onChange={(event) => setEmail(event.target.value)}
        //                     required />
        //             </div>
        //             <div>
        //                 <div className="mb-2 block">
        //                     <Label htmlFor="password1" value="Your password" />
        //                 </div>
        //                 <TextInput
        //                     id="password1"
        //                     type="password"
        //                     value={password}
        //                     onChange={(event) => setPassword(event.target.value)}
        //                     required />
        //             </div>
        //             {error && <ToastError message={error}/>}
        //             {success && <ToastSuccess message={success}/>}
        //             <Button type="submit">Submit</Button>
        //         </form>
        //
        //     </div>
        // </section>


    )
}
