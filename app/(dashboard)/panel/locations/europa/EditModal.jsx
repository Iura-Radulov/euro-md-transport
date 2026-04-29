"use client"
import {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from "flowbite-react";
import {HiPencilAlt} from "react-icons/hi";
import FlagRo from "@/public/assets/icons/flag_ro.svg";
import FlagEn from "@/public/assets/icons/flag_en.svg";
import FlagRu from "@/public/assets/icons/flag_ru.svg";
import Image from "next/image";

export default function EditModal({itemId, setItems}) {
    const [isOpen, setOpen] = useState(false);
    // Initialize with safe defaults so inputs are controlled from mount
    const [itemData, setItemData] = useState({ nameRu: '', nameEn: '', nameRo: '' })

        const fetchItem =async ()=>{
        try {
            const response = await fetch(`/api/locations-europa/${itemId}`);
            if (!response.ok) throw new Error('Failed to load user');
            const data = await response.json()
            console.log(data)
            // Map missing fields to defaults to avoid uncontrolled -> controlled warnings
            setItemData({
                nameRu: data?.nameRu ?? '',
                nameRo: data?.nameRo ?? '',
                nameEn: data?.nameEn ?? '',

            })
            // Open modal after data is set so inputs render controlled values immediately
            setOpen(true);
        } catch (err) {
            console.error('fetchItem error', err);
            setOpen(false);
        }


        }



  async function handleEdit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/locations-europa/${itemId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    nameRu: itemData.nameRu,
                    nameEn: itemData.nameEn,
                    nameRo: itemData.nameRo,
                }),
            });

            if (response.ok) {

                console.log("Location updated successfully")
                console.log(response)
                setItems(prevItems => prevItems.map(item => item._id === itemId ? { ...item, nameRu: itemData.nameRu, nameEn: itemData.nameEn, nameRo:itemData.nameRo }: item));

                setOpen(false);

            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Button size="sm" color="blue" onClick={() =>  fetchItem()}>
                <div className="flex items-center gap-x-2">
                    <HiPencilAlt className="h-5 w-5" />
                    Edit
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
                <form action="" onSubmit={handleEdit}>
                    <ModalHeader>Edit Location</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex mb-2">
                                    <Label htmlFor="nameRu">Name Ru</Label>
                                    <Image className="ms-2" src={FlagRu} alt="FlagRu"/>
                                </div>
                                <div>
                                    <TextInput
                                        id="nameRu"
                                        name="nameRu"
                                        value={itemData.nameRu}
                                        onChange={(event) => setItemData({...itemData, nameRu: event.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex mb-2">
                                    <Label htmlFor="nameRu">Name En</Label>
                                    <Image className="ms-2" src={FlagEn} alt="FlagEn"/>
                                </div>
                                <div>
                                    <TextInput
                                        id="nameEn"
                                        name="nameEn"
                                        value={itemData.nameEn}
                                        onChange={(event) => setItemData({...itemData, nameEn: event.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex mb-2">
                                    <Label htmlFor="nameRo">Name Ro</Label>
                                    <Image className="ms-2" src={FlagRo} alt="FlagRo"/>
                                </div>
                                <div>
                                    <TextInput
                                        id="nameRo"
                                        name="nameRo"
                                        value={itemData.nameRo}
                                        onChange={(event) => setItemData({...itemData, nameRo: event.target.value})}
                                    />
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="blue" type='submit'>
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}