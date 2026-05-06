"use client";
import {Button, Label, TextInput, Select, TableHeadCell, Textarea} from "flowbite-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import getName from "@/utils/getNameByLanguage";
import ToastError from "./toasts/Toast-error";
import ToastSuccess from "./toasts/Toast-success";


export default function TransportForm({nameEn,nameRo, nameRu, setNameEn, setNameRu, setNameRo}){
    const message = useTranslations("form");
    const locale = useLocale();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");





  async  function handleSubmit(event){
        event.preventDefault()
        console.log("submit")

        console.log('name: ', name)
        console.log('to: ', phone)

        try {
            const response = await fetch(`/api/contact-form/new`, {
                method: "POST",
                body: JSON.stringify({
                    name,
                    message: text,
                    phone,
                }),
            });

            if (response.ok) {
                console.log("Form send successfully")
                setSuccess(message("form_send_successfully"))
                setError("")
                setName('')
                setPhone('')
                setText('')

            } else{
                setError(message("form_send_error"))
                setSuccess("")
            }
        } catch (error) {
            console.log(error);
            setError(message("form_send_error"))
        }

    }
    return (
        <div className='p-5 lg:w-5/6 mx-auto'>
            <form action="" onSubmit={handleSubmit}>
                <div className='grid items-end grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-4'>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="name">{message("name")}</Label>
                        </div>
                        <TextInput
                            id="name"
                            // placeholder={message("write_phone")}
                            value={name}
                            onChange={(event) =>setName(event.target.value)}
                            required
                        />
                    </div>

                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="phone">{message("phone")}</Label>
                        </div>
                        <TextInput
                            id="phone"
                            // placeholder={message("write_phone")}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>


                </div>

                <div className='mb-4 lg:mb-6'>
                    <div className="mb-2 block">
                        <Label htmlFor="text">{message("message")}</Label>
                    </div>
                    <Textarea
                        id="text"
                        value={text}
                        rows={5}
                        onChange={(event) => setText(event.target.value)}
                        required
                    />
                </div>

                <div className={'px-5 flex items-center justify-center'}>
                    <Button pill type={'submit'} className={'w-3/4'}>
                        {message("submit")}
                    </Button>
                </div>

                {error && <ToastError message={error}/>}
                {success && <ToastSuccess message={success}/>}
            </form>

        </div>
    )
}
