"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
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

export default function Page({params}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [data, setData] = useState(null)
  const[isLoading, setIsLoading] = useState(true)

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    // timeZone: "Europe/Chisinau",
  };

  useEffect(()=>{
    const fetchData =async ()=>{
      try {

        const res = await fetch(`/api/transport-form/${id}`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data)
        if(data.status === 'new') {
          const response = await fetch(`/api/transport-form/${id}`, {
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
                        href="/panel/mailing/transport-forms"
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
                    {/*{new Intl.DateTimeFormat(undefined, options).format(new Date(data.createdAt))}*/}
                  </div>
                </div>
                <div className="hidden space-x-2 divide-x divide-gray-100 pl-0 sm:flex sm:px-2 dark:divide-gray-700">
                  <div className="flex gap-1 pr-2">
                    <Link
                        href="#"
                        className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Delete</span>
                      <HiTrash className="h-6 w-6"/>
                    </Link>
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

                  <div className="ml-4">
                    <div className="truncate text-base font-semibold text-gray-900 dark:text-white">
                      {data.fromDestination}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {data.toDestination}
                    </div>
                  </div>
                </div>
                <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Website Hosting Reviews Free The Best Resource For Hosting Comparison
                </h1>
                <div className="space-y-2">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Do you know what could beat the exciting feeling of having a new
                    computer? Make your own PC easy and compatible!
                  </p>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    So insisted received is occasion advanced honoured. Among ready to
                    which up. Attacks smiling and may out assured moments man nothing
                    outward. Thrown any behind afford either the set depend one temper.
                    Instrument melancholy in acceptance collecting frequently be if.
                    Zealously now pronounce existence add you instantly say offending.
                    Merry their far had widen was. Concerns no in expenses raillery
                    formerly.
                  </p>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Best Regards,
                    <br/>
                    Bonnie Green, CEO Themesberg LLC
                  </p>
                </div>
              </div>
            </>


        }


      </>
  );
}





