"use client";

import {  List, ListItem, Button } from "flowbite-react";
import Link from "next/link";
import {
  HiArchive,
  HiArrowNarrowLeft,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiClock,
  HiExclamationCircle,
  HiOutlinePhotograph,
  HiOutlineTag,
  HiPaperClip,
  HiPrinter,
  HiReply,
  HiTrash,
} from "react-icons/hi";
import { HiFaceSmile } from "react-icons/hi2";
import {useEffect, useState} from "react";
import { use } from 'react';
import Loading from "@/app/(dashboard)/loading";
import {useRouter} from "next/navigation";
import ConfirmModal from "@/app/(dashboard)/panel/components/ConfirmModal";

export default function Page({params}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [data, setData] = useState(null)
  const[isLoading, setIsLoading] = useState(true)
  const [isOpen, setOpen] = useState(false);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const router = useRouter()


  useEffect(()=>{
    const fetchData =async ()=>{
      try {

        const res = await fetch(`/api/contact-form/${id}`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data)
        if(data.status === 'new') {
          const response = await fetch(`/api/contact-form/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
              status: 'view',
            }),
          });
        }
        setData( data );
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setData(null); // fallback to empty list
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchData();

  }, [])

  async function handleDelete(itemId) {
    try {
      await fetch(`/api/contact-form/${itemId.toString()}`, {
        method: "DELETE",
      });
      router.push("/panel/mailing/contact-forms");
     // route()

    } catch (error) {
      console.log(error);
    }


  }

  return (

      <>
        {isLoading ?
            <div className={'w-full'}> <Loading /> </div>
            :
            <>
              <div
                  className="block items-center justify-between border-b border-gray-200 bg-white p-4 sm:flex dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
                  <div className="pr-3">
                    <Link
                        href="/panel/mailing/contact-forms"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Go back</span>
                      <HiArrowNarrowLeft className="text-2xl"/>
                    </Link>
                  </div>
                  <div className="flex space-x-2 pl-0 sm:px-2">
                    <Link
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Save for later</span>
                      <HiClock className="text-2xl"/>
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Purge</span>
                      <HiExclamationCircle className="text-2xl"/>
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Move</span>
                      <HiArchive className="text-2xl"/>
                    </Link>

                  </div>
                  <div className="pl-3 text-sm font-medium text-gray-500">
                    {new Intl.DateTimeFormat('en-US', options).format(new Date(data.createdAt))}
                  </div>
                </div>
                <div className="hidden space-x-2 divide-x divide-gray-100 pl-0 sm:flex sm:px-2 dark:divide-gray-700">
                  <div className="flex gap-1 pr-2">
                    <Button onClick={() => setOpen(true)}
                            color="alternative"
                        className="inline-flex cursor-pointer justify-center rounded p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Delete</span>
                      <HiTrash className="h-6 w-6"/>
                    </Button>
                    <ConfirmModal handleDelete={handleDelete} isOpen={isOpen} setOpen={setOpen} itemId={id}/>
                  </div>
                  <div className="flex gap-1 pl-2">
                    <Link
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <HiChevronLeft className="h-7 w-7"/>
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <HiChevronRight className="h-7 w-7"/>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center">

                  <List unstyled className="w-xl max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
                    <ListItem className="p-4 sm:p-8">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">Имя</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{data.name}</div>
                      </div>
                    </ListItem>

                    <ListItem className="p-4 sm:p-8">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">Телефон:</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <a href={`tel:${data.phone.replace(/[^\d+]/g, '')}`}>{data.phone}</a>
                        </div>
                      </div>
                    </ListItem>

                    <ListItem className="p-4 sm:p-8">
                      <div className="mb-4">
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">Сообщение:</p>
                      </div>
                      <div className="flex items-center ">

                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {data.message}
                        </div>
                      </div>
                    </ListItem>

                  </List>


                </div>

              </div>
            </>
        }
      </>
  );
}





