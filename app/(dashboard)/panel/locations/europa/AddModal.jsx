import {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import FlagRo from "@/public/assets/icons/flag_ro.svg";
import FlagEn from "@/public/assets/icons/flag_en.svg";
import FlagRu from "@/public/assets/icons/flag_ru.svg";
import Image from "next/image";
export default function AddModal({setItems}) {
    const [isOpen, setOpen] = useState(false);
    const [nameRu, setNameRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [nameRo, setNameRo] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/locations-europa/new`, {
                method: "POST",
                body: JSON.stringify({
                    nameRu,
                    nameEn,
                    nameRo
                }),
            });

            if (response.ok) {
                console.log("Location added successfully")
                const result = await response.json();
                console.log('response id', result._id)
                setItems(prevUsers => [...prevUsers, {nameRu, nameEn, nameRo, _id:result._id}])

                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button color="blue" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Add location
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
                <form action="" onSubmit={handleSubmit}>
                    <ModalHeader>Add new location</ModalHeader>
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
                                        placeholder="Write name in Russian"
                                        value={nameRu}
                                        onChange={(event) => setNameRu(event.target.value)}
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
                                        placeholder="Write name in English"
                                        type="nameEn"
                                        value={nameEn}
                                        onChange={(event) => setNameEn(event.target.value)}
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
                                        placeholder="Write name in Romanian"
                                        type="nameRo"
                                        value={nameRo}
                                        onChange={(event) => setNameRo(event.target.value)}
                                    />
                                </div>
                            </div>


                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="blue" type='submit'>
                            Add
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}