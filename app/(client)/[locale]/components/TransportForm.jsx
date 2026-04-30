"use client";
import {Button, Label, TextInput, Select, TableHeadCell} from "flowbite-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import getName from "@/utils/getNameByLanguage";


export default function TransportForm({nameEn,nameRo, nameRu, setNameEn, setNameRu, setNameRo}){
    const message = useTranslations("form");
    const locale = useLocale();

    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [phone, setPhone] = useState('');
    const [locationsMoldova, setLocationsMoldova] = useState([]);
    const [locationsEuropa, setLocationsEuropa] = useState([]);


    useEffect(()=>{

        const fetchMoldovaData =async ()=>{
            try {
                const res = await fetch(`/api/locations-moldova`);
                if (!res.ok) {
                    throw new Error(`API error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                console.log(data)
                setLocationsMoldova(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setLocationsMoldova([]); // fallback to empty list
            }
        }
        const fetchEuropaData =async ()=>{
            try {
                const res = await fetch(`/api/locations-europa`);
                if (!res.ok) {
                    throw new Error(`API error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                console.log(data)
                setLocationsEuropa(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setLocationsEuropa([]); // fallback to empty list
            }
        }


        fetchMoldovaData();
        fetchEuropaData();


    }, [])
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
                            {locationsMoldova.map((location) => (
                                <option key={location._id} value={location._id}>{getName(locale, location.nameRu, location.nameEn, location.nameRo ) }</option>
                            ))}

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
                            {locationsEuropa.map((location) => (
                                <option key={location._id} value={location._id}>{getName(locale, location.nameRu, location.nameEn, location.nameRo )}</option>
                            ))}


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
                            {message("submit")}
                        </Button>
                    </div>



                </div>


            </form>

        </div>
    )
}
