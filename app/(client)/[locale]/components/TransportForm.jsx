"use client";

import {Button, Label, TextInput} from "flowbite-react";
import ReactSelect from "react-select";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import getName from "@/utils/getNameByLanguage";
import ToastError from "./toasts/Toast-error";
import ToastSuccess from "./toasts/Toast-success";


const PHONE_REGEX = /^[+\d\s\-\(\)]+$/;

const selectClassNames = {
    control: ({ isFocused }) =>
        `!rounded-lg !border !bg-gray-50 dark:!bg-gray-700 !text-sm !min-h-[42px] ${isFocused ? '!border-blue-500 !ring-1 !ring-blue-500' : '!border-gray-300 dark:!border-gray-600'}`,
    valueContainer: () => '!px-3 !py-2',
    menu: () => '!rounded-lg !border !border-gray-200 dark:!border-gray-600 !bg-white dark:!bg-gray-700 !shadow-md !z-50',
    option: ({ isFocused, isSelected }) =>
        `!text-sm !cursor-pointer !px-3 !py-2 ${isSelected ? '!bg-blue-600 !text-white' : isFocused ? '!bg-blue-50 dark:!bg-gray-600 !text-gray-900 dark:!text-white' : '!text-gray-900 dark:!text-white'}`,
    placeholder: () => '!text-gray-500 dark:!text-gray-400',
    singleValue: () => '!text-gray-900 dark:!text-white',
    input: () => '!text-gray-900 dark:!text-white',
};

export default function TransportForm(){
    const message = useTranslations("form");
    const locale = useLocale();

    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [phone, setPhone] = useState('');
    const [locationsMoldova, setLocationsMoldova] = useState([]);
    const [locationsEuropa, setLocationsEuropa] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(()=>{
        const fetchMoldovaData = async () => {
            try {
                const res = await fetch(`/api/locations-moldova`);
                if (!res.ok) {
                    console.error(`API error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setLocationsMoldova(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setLocationsMoldova([]); // fallback to empty list
            }
        }
        const fetchEuropaData = async () => {
            try {
                const res = await fetch(`/api/locations-europa`);
                if (!res.ok) {
                    console.error(`API error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setLocationsEuropa(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setLocationsEuropa([]); // fallback to empty list
            }
        }

        fetchMoldovaData();
        fetchEuropaData();
    }, []);

    const validatePhone = (phoneValue) => {
        return PHONE_REGEX.test(phoneValue) && /\d/.test(phoneValue);
    };

    async function handleSubmit(event){
        event.preventDefault();

        // Phone validation added before submitting
        if (!validatePhone(phone)) {
            setError(message("invalid_phone_format") || "Invalid phone number format. Please enter a valid phone number containing only numbers, +, -, and parentheses.");
            return;
        }

        try {
            const response = await fetch(`/api/transport-form/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fromDestination,
                    toDestination,
                    phone,
                }),
            });

            if (response.ok) {
                console.log("Form send successfully");
                setSuccess(message("form_send_successfully"));
                setError("");
                setFromDestination('');
                setToDestination('');
                setPhone('');

            } else{
                setError(message("form_send_error"));
                setSuccess("");
            }
        } catch (error) {
            console.log(error);
            setError(message("form_send_error"));
        }
    }

    return (
        <div className='p-5 lg:w-5/6 mx-auto'>
            <form action="" onSubmit={handleSubmit}>
                <div className='grid items-end grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-4'>
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="fromDestination" >{message("from")}</Label>
                        </div>

                        <ReactSelect
                            instanceId="fromDestination"
                            inputId="fromDestination"
                            options={locationsMoldova.map((loc) => ({
                                value: loc.nameRu,
                                label: getName(locale, loc.nameRu, loc.nameEn, loc.nameRo),
                            }))}
                            value={locationsMoldova
                                .filter((loc) => loc.nameRu === fromDestination)
                                .map((loc) => ({
                                    value: loc.nameRu,
                                    label: getName(locale, loc.nameRu, loc.nameEn, loc.nameRo),
                                }))[0] || null}
                            onChange={(option) => setFromDestination(option ? option.value : '')}
                            placeholder={message("select_from")}
                            isSearchable
                            required
                            classNames={selectClassNames}
                            unstyled
                        />
                    </div>

                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="toDestination" >{message("to")}</Label>
                        </div>

                        <ReactSelect
                            instanceId="toDestination"
                            inputId="toDestination"
                            options={locationsEuropa.map((loc) => ({
                                value: loc.nameRu,
                                label: getName(locale, loc.nameRu, loc.nameEn, loc.nameRo),
                            }))}
                            value={locationsEuropa
                                .filter((loc) => loc.nameRu === toDestination)
                                .map((loc) => ({
                                    value: loc.nameRu,
                                    label: getName(locale, loc.nameRu, loc.nameEn, loc.nameRo),
                                }))[0] || null}
                            onChange={(option) => setToDestination(option ? option.value : '')}
                            placeholder={message("select_to")}
                            isSearchable
                            required
                            classNames={selectClassNames}
                            unstyled
                        />
                    </div>
                    
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="phone" >{message("phone")}</Label>
                        </div>

                        <div className="[&_input]:!p-[10px]">
                            <TextInput
                                id="phone"
                                placeholder={message("write_phone")}
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={'px-5 flex items-center justify-center'}>
                        <Button pill type={'submit'} className={'w-3/4'}>
                            {message("submit")}
                        </Button>
                    </div>
                    
                    {error && <ToastError message={error}/>}
                    {success && <ToastSuccess message={success}/>}
                </div>
            </form>
        </div>
    );
}
