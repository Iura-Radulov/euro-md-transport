"use client";
import {Button, Label, TextInput, Select, TableHeadCell} from "flowbite-react";
import {FaBackward} from "react-icons/fa";



import Image from "next/image";
import {useState} from "react";
import {useTranslations} from "next-intl";


export default function TransportForm({nameEn,nameRo, nameRu, setNameEn, setNameRu, setNameRo}){
    const message = useTranslations("form");

    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(event){
        event.preventDefault()
        console.log("submit")
        console.log('from: ', fromDestination)
        console.log('to: ', toDestination)
        console.log('phone: ', phone)
    }
    return (
        <div className='p-5 lg:w-5/6 mx-auto'>
            <form action="" onSubmit={handleSubmit}>
                <div className='grid items-end grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-4'>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="fromDestination" >{message("from")}</Label>
                        </div>

                        <Select
                            id="fromDestination"
                            onChange={(event) => setFromDestination(event.target.value)}
                            required
                        >
                            <option value="">{message("select_from")}</option>
                            <option value="chisinau">Chisinau</option>
                            <option value="comrat">Comrat</option>
                            <option value="ceadir">Ceadir-Lunga</option>
                            <option value="vulcanesti">Vulcanesti</option>
                        </Select>

                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="toDestination" >{message("to")}</Label>
                        </div>

                        <Select
                            id="toDestination"
                            onChange={(event) => setToDestination(event.target.value)}
                            required
                        >
                            <option value="">{message("select_to")}</option>
                            <option value="germany">Germany</option>
                            <option value="romania">Romania</option>

                        </Select>
                    </div>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="phone" >{message("phone")}</Label>
                        </div>

                        <TextInput
                            id="phone"
                            placeholder={message("write_phone")}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>

                    <div className={'px-5 flex items-center justify-center'}>
                        <Button pill type={'submit'} className={'w-3/4'}>
                            Send
                        </Button>
                    </div>



                </div>


            </form>

        </div>
    )
}
