import { Toast, ToastToggle} from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

export default function ToastError({message}){
    return (
        <Toast className='mb-4 fixed top-10 right-10 z-50'>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <ToastToggle />
        </Toast>
        )
    }
