'use client';

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
    const locale = useLocale();
  const pathName = usePathname();
  const router = useRouter();
    const searchParams = useSearchParams();


    const handleChange = (newLocale) => {

        const queryString = searchParams.toString();
        const fullPath = queryString ? `${pathName}?${queryString}` : pathName;

        router.replace(fullPath, { locale: newLocale });
    };

  return (
    <div className='col-3 mr-4'>


       <select
           defaultValue={locale}
        onChange={(e) => handleChange(e.target.value) }
        id='languages'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>

           {routing.locales.map((loc) => (
               <option key={loc} value={loc}>
                   {loc.toUpperCase()}
               </option>
           ))}

       </select>
    </div>
  );
}
