"use client";
import {Button, Label, TextInput, Textarea} from "flowbite-react";

import { useState} from "react";
import { useTranslations} from "next-intl";

import ToastError from "./toasts/Toast-error";
import ToastSuccess from "./toasts/Toast-success";


    const PHONE_REGEX = /^[+\d\s\-\(\)]+$/;
    export default function ContactForm(){
    const message = useTranslations("form");
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const validatePhone = (phoneValue) => {
        // Check that the input contains only allowed characters and has at least one digit
        return PHONE_REGEX.test(phoneValue) && /\d/.test(phoneValue);
    };


  async  function handleSubmit(event){
        event.preventDefault()

      if (!validatePhone(phone)) {
          setError(message("invalid_phone_format"));
          return;
      }

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
            console.error(error);
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
