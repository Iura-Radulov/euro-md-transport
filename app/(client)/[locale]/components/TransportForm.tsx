"use client";
import {Button, Label, TextInput, Select, type TextInputHelperTextProps} from "flowbite-react";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import getName from "@/utils/getNameByLanguage";
import ToastError from "./toasts/Toast-error";
import ToastSuccess from "./toasts/Toast-success";

// Define TypeScript interfaces for our data structures
interface LocationData {
    _id: string;
    nameRu: string;
    nameEn: string;
    nameRo: string;
}

// Regex pattern to allow numbers, +, -, parentheses, and spaces
const PHONE_REGEX = /^[+\d\s\-\(\)]+$/;

export default function TransportForm(){
    const message = useTranslations("form");
    const locale = useLocale();

    const [fromDestination, setFromDestination] = useState<string>('');
    const [toDestination, setToDestination] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [locationsMoldova, setLocationsMoldova] = useState<LocationData[]>([]);
    const [locationsEuropa, setLocationsEuropa] = useState<LocationData[]>([]);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(():void=>{
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

    // Validate phone number format (allowing numbers, +, -, parentheses, and spaces)
    const validatePhone = (phoneValue: string): boolean => {
        // Check that the input contains only allowed characters and has at least one digit
        return PHONE_REGEX.test(phoneValue) && /\d/.test(phoneValue);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
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

                        <Select
                            id="fromDestination"
                            value={fromDestination}
                            onChange={(event) => setFromDestination(event.target.value)}
                            required
                        >
                            <option value="">{message("select_from")}</option>
                            {locationsMoldova.map((location) => (
                                <option key={location._id} value={location.nameRu}>{getName(locale, location.nameRu, location.nameEn, location.nameRo )}</option>
                            ))}
                        </Select>
                    </div>
                    
                    <div className=''>
                        <div className="mb-2 block">
                            <Label htmlFor="toDestination" >{message("to")}</Label>
                        </div>

                        <Select
                            id="toDestination"
                            value={toDestination}
                            onChange={(event) => setToDestination(event.target.value)}
                            required
                        >
                            <option value="">{message("select_to")}</option>
                            {locationsEuropa.map((location) => (
                                <option key={location._id} value={location.nameRu}>{getName(locale, location.nameRu, location.nameEn, location.nameRo )}</option>
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
                            onChange={(event) => {
                                const inputValue = event.target.value;
                                setPhone(inputValue);
                                // Clear phone validation error when user types with valid format
                                if (validatePhone(inputValue)) {
                                    if (error.includes("Invalid phone number format") || error === (message("invalid_phone_format") || "Invalid phone number format. Please enter a valid phone number containing only numbers, +, -, and parentheses.")) {
                                       setError("");
                                    }
                                }
                            }}
                            required
                            color={!validatePhone(phone) && phone !== '' ? "failure" : ""}
                            helperText={(!validatePhone(phone) && phone !== '') ? 
                                (error || "Invalid phone number format. Please enter a valid phone number containing only numbers, +, -, and parentheses.") as unknown as React.PropsWithChildren<TextInputHelperTextProps>["content"] 
                                : undefined}
                        />
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
