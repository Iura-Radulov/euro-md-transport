import {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Select, TextInput} from "flowbite-react";
import {HiOutlineExclamationCircle, HiPlus, HiTrash} from "react-icons/hi";

export default function DeleteModal({itemId, handleDelete}) {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Button size="sm" color="red" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiTrash className="h-5 w-5" />
                    Delete
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md" dismissible>
                <ModalHeader className="border-none p-2">
                    <span className="sr-only">Delete user</span>
                </ModalHeader>
                <ModalBody className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="mx-auto h-20 w-20 text-red-600" />
                        <p className="text-xl font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this item?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button
                                color="red"
                                theme={{ base: "px-0" }}
                                onClick={()=> handleDelete(itemId)}
                            >
                                <span className="text-base font-medium">Yes, I'm sure</span>
                            </Button>
                            <Button
                                color="alternative"
                                theme={{ base: "px-0" }}
                                onClick={() => setOpen(false)}
                            >
                                <span className="text-base font-medium">No, cancel</span>
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}