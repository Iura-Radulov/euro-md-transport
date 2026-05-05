'use client'
import inboxMessages from "@/data/mailing/inbox.json";
import type { MailingInboxMessage } from "@/types/mailing/inbox";
import MailingInboxPageContent from "./content";
import {useEffect, useState} from "react";
import {Checkbox, Label, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";
import Link from "next/link";
import {
  HiArchive,
  HiChevronLeft, HiChevronRight,
  HiDotsVertical,
  HiExclamationCircle, HiOutlineStar,
  HiOutlineViewGrid,
  HiPlusSm, HiStar,
  HiTrash
} from "react-icons/hi";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {twMerge} from "tailwind-merge";
import Loading from "@/app/(dashboard)/loading";

export interface MailingInboxPageData {
  inboxMessages: MailingInboxMessage[];
}




export default function Page() {
  const [items, setItems] = useState([])
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

        const res = await fetch(`/api/transport-form`);
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


  function Menu({ inboxMessages }: MailingInboxPageData) {
    const [page, setPage] = useState(0);
    const numEntriesPerPage = Math.min(20, inboxMessages.length);
    const numPages = Math.floor(inboxMessages.length / numEntriesPerPage);

    const previousPage = () => {
      setPage(page > 0 ? page - 1 : page);
    };

    const nextPage = () => {
      setPage(page < numPages - 1 ? page + 1 : page);
    };

    return (
        <div className="block items-center justify-between border-b border-gray-200 p-4 sm:flex dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
            <div className="pr-3">
              <Label htmlFor="checkbox-all" className="sr-only">
                Select all
              </Label>
              <Checkbox
                  id="checkbox-all"
                  name="checkbox-all"
                  className="align-middle"
              />
            </div>
            <div className="flex space-x-2 px-0 sm:px-2">
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
                <span className="sr-only">Move</span>
                <HiArchive className="text-2xl" />
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
          <div className="hidden items-center space-y-3 space-x-0 sm:flex sm:space-y-0 sm:space-x-3">
            <Link
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Apps</span>
              <HiOutlineViewGrid className="h-7 w-7" />
            </Link>
            <button
                onClick={previousPage}
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <HiChevronLeft className="h-7 w-7" />
            </button>
            <button
                onClick={nextPage}
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <HiChevronRight className="h-7 w-7" />
            </button>
            <span className="font-normal text-gray-500 sm:text-xs md:text-sm dark:text-gray-400">
          Show&nbsp;
              <span className="font-semibold text-gray-900 dark:text-white">
            {page * inboxMessages.length + 1}-
                {numEntriesPerPage * page + numEntriesPerPage}
          </span>
              &nbsp;of&nbsp;
              <span className="font-semibold text-gray-900 dark:text-white">
            {inboxMessages.length}
          </span>
        </span>
          </div>
        </div>
    );
  }

  function Inbox({ inboxMessages }: MailingInboxPageData) {
    const router = useRouter();

   async function onRowClick(id) {


      router.push(`/panel/mailing/transport-forms/${id}`);
    }

    function onRowSelect(e: React.MouseEvent) {
      e.stopPropagation();
    }

    function onRowStar(e: React.MouseEvent) {
      e.stopPropagation();
    }

    return (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <Table className="min-w-full divide-y divide-gray-200">
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
                          <span className="me-2">Откуда отправляться</span>
                        </div>
                      </TableHeadCell>
                      <TableHeadCell>
                        <div className="flex items-center">
                          <span className="me-2">Куда отправиться</span>

                        </div>
                      </TableHeadCell>
                      <TableHeadCell>
                        <div className="flex items-center">
                          <span className="me-2">Телефон</span>

                        </div>
                      </TableHeadCell>
                      <TableHeadCell>
                        <div className="flex items-center">
                          <span className="me-2">Создано</span>

                        </div>
                      </TableHeadCell>


                    </TableRow>
                  </TableHead>
                  <TableBody
                      // theme={{ cell: { base: "rounded-none" } }}
                      className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {inboxMessages.map(
                        ({ _id, fromDestination, toDestination, phone, createdAt, status = 'new' }) => (
                            <TableRow
                                key={`${_id}`}
                                className="cursor-pointer  hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                                onClick={()=>onRowClick(_id)}
                            >
                              <TableCell className="w-4 p-4">
                                <div className="inline-flex items-center space-x-4">
                                  <Checkbox id="checkbox-1" onClick={onRowSelect} />

                                </div>
                              </TableCell>
                              <TableCell className="relative flex items-center space-x-4 p-4 whitespace-nowrap">
                                <span
                                    className={twMerge(
                                        "text-base text-gray-700 after:absolute after:inset-0 dark:text-gray-400",
                                        status === 'new' &&
                                        "font-semibold text-gray-900 dark:text-white",
                                    )}
                                >
                              {fromDestination}
                               </span>
                              </TableCell>
                              <TableCell
                                  className={twMerge(
                                      "p-4 text-base whitespace-nowrap text-gray-700 dark:text-gray-400",
                                      status === 'new' && "font-medium text-gray-900 dark:text-white",
                                  )}
                              >
                                {toDestination}
                              </TableCell>
                              <TableCell className="relative flex items-center space-x-4 p-4 whitespace-nowrap">
                                <span
                                    className={twMerge(
                                        "text-base text-gray-700 after:absolute after:inset-0 dark:text-gray-400",
                                        status === 'new' &&
                                        "font-semibold text-gray-900 dark:text-white",
                                    )}
                                >
                              {phone}
                               </span>
                              </TableCell>
                              <TableCell
                                  className={twMerge(
                                      "p-4 text-base whitespace-nowrap text-gray-700 dark:text-gray-400",
                                      status === 'new' && "font-medium text-gray-900 dark:text-white",
                                  )}
                              >
                                {new Intl.DateTimeFormat(undefined, options).format(new Date(createdAt))  }
                              </TableCell>
                            </TableRow>
                        ),
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <>
        <Menu inboxMessages={items} />
        {isLoading ?
            <div className={'w-full'}> <Loading /> </div>
            : <Inbox inboxMessages={items} />}



      </>
  );
}
