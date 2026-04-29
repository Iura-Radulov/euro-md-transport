'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import {
    HiChevronLeft,
    HiChevronRight,
    HiCog,
    HiDocumentDownload,
    HiDotsVertical,
    HiExclamationCircle,
    HiHome,
    HiOutlineExclamationCircle,
    HiPencilAlt,
    HiPlus,
    HiTrash,
} from "react-icons/hi";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "../../components/DeleteModal";
import Loading from "@/app/(dashboard)/loading";
import FlagRo from "@/public/assets/icons/flag_ro.svg";
import FlagEn from "@/public/assets/icons/flag_en.svg";
import FlagRu from "@/public/assets/icons/flag_ru.svg";
export default function Page(){

    const [items, setItems] = useState([])
    const[isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchData =async ()=>{
            try {

                const res = await fetch(`/api/locations-europa`);
                if (!res.ok) {
                    throw new Error(`API error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                console.log(data)
                setItems(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setItems([]); // fallback to empty list
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();

    }, [])



    async function handleDelete(itemId) {
            try {
                await fetch(`/api/locations-europa/${itemId.toString()}`, {
                    method: "DELETE",
                });
                const filteredPosts = items.filter(item=>item._id !==itemId)
                setItems(filteredPosts)

            } catch (error) {
                console.log(error);
            }


    }

    return (
        <>
            <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 sm:flex dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb className="mb-5">
                            <BreadcrumbItem href="#">
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl" />
                                    <span className="dark:text-white">Home</span>
                                </div>
                            </BreadcrumbItem>
                            <BreadcrumbItem href="/panel/locations/moldova">Moldova Locations</BreadcrumbItem>
                            <BreadcrumbItem>List</BreadcrumbItem>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            All locations
                        </h1>
                    </div>
                    <div className="sm:flex">
                        <div className="mb-3 hidden items-center sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 dark:divide-gray-700">
                            <form className="lg:pr-3">
                                <Label htmlFor="items-search" className="sr-only">
                                    Search
                                </Label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <TextInput
                                        id="items-search"
                                        name="items-search"
                                        placeholder="Search for items"
                                    />
                                </div>
                            </form>
                            <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                                <Link
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Configure</span>
                                    <HiCog className="text-2xl" />
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Delete</span>
                                    <HiTrash className="text-2xl" />
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Purge</span>
                                    <HiExclamationCircle className="text-2xl" />
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <span className="sr-only">Settings</span>
                                    <HiDotsVertical className="text-2xl" />
                                </Link>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                            <AddModal setItems={setItems}/>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            {isLoading ?
                                <div className={'w-full'}> <Loading /> </div>
                                :  <AllItemsTable itemList={items} />}

                        </div>
                    </div>
                </div>
            </div>
            <Pagination itemList={items} />
        </>
        )


    function AllItemsTable({ itemList }) {
        return (
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <TableHead
                    className="bg-gray-100 dark:bg-gray-700"
                    theme={{
                        cell: {
                            base: "p-4 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400",
                        },
                    }}
                >
                    <TableRow>
                        <TableHeadCell className="rounded-none! p-4">
                            <Label htmlFor="select-all" className="sr-only">
                                Select all
                            </Label>
                            <Checkbox id="select-all" name="select-all" />
                        </TableHeadCell>
                        <TableHeadCell>
                            <div className="flex items-center">
                                <span className="me-2">Name</span>
                                <Image src={FlagRu} alt="FlagRu"/>
                            </div>
                        </TableHeadCell>
                        <TableHeadCell>
                            <div className="flex items-center">
                                <span className="me-2">Name</span>
                                <Image src={FlagEn} alt="FlagEn"/>
                            </div>
                        </TableHeadCell>
                        <TableHeadCell>
                            <div className="flex items-center">
                                <span className="me-2">Name</span>
                                <Image src={FlagRo} alt="FlagRo"/>
                            </div>
                        </TableHeadCell>

                        <TableHeadCell className="rounded-none!"/>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {itemList.map((item) => (
                        <TableRow
                            key={item._id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <TableCell className="w-4 rounded-none! p-4">
                                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                            </TableCell>
                            <TableCell className="mr-12 flex items-center space-x-6 p-4 whitespace-nowrap lg:mr-0">

                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                                        {item.nameRu}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                {item.nameEn}
                            </TableCell>
                            <TableCell className="p-4 text-base font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                {item.nameRo}
                            </TableCell>

                            <TableCell className="ml-auto rounded-none!">
                                <div className=" flex items-center justify-end gap-x-3 whitespace-nowrap">
                                    <EditModal itemId={item._id} setItems={setItems} />
                                    <DeleteModal  itemId={item._id} handleDelete={handleDelete} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }






    function Pagination({ itemList }) {
        const [page, setPage] = useState(0);
        const numEntriesPerPage = Math.min(20, itemList.length);
        const numPages = Math.floor(itemList.length / numEntriesPerPage);

        const previousPage = () => {
            setPage(page > 0 ? page - 1 : page);
        };

        const nextPage = () => {
            setPage(page < numPages - 1 ? page + 1 : page);
        };

        return (
            <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 sm:flex sm:justify-between dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center sm:mb-0">
                    <button
                        onClick={previousPage}
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous page</span>
                        <HiChevronLeft className="h-7 w-7" />
                    </button>
                    <button
                        onClick={nextPage}
                        className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next page</span>
                        <HiChevronRight className="h-7 w-7" />
                    </button>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">
            {page * itemList.length + 1}-
                            {numEntriesPerPage * page + numEntriesPerPage}
          </span>
                        &nbsp;of&nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">
            {itemList.length}
          </span>
        </span>
                </div>
                <div className="flex items-center space-x-3">
                    <Link
                        href="#"
                        className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
                    >
                        <HiChevronLeft className="mr-1 -ml-1 h-5 w-5" />
                        Previous
                    </Link>
                    <Link
                        href="#"
                        className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
                    >
                        Next
                        <HiChevronRight className="-mr-1 ml-1 h-5 w-5" />
                    </Link>
                </div>
            </div>
        );
    }
}
