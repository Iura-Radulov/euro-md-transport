'use client';
import {useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { initTheme } from '@/lib/theme';

export default function ThemeSwitcher(){
    const [theme, setTheme] = useState(null)


    useEffect(()=>{
        // Run legacy init to sync icons/state if needed
        try { initTheme(); } catch(e){}

// Change the icons inside the button based on previous settings
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('')
        }


    },[])


    function toggleTheme() {

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                setTheme('dark')
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                setTheme('')
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                setTheme('')
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                setTheme('dark')
            }
        }
    }
    return (
        <div className='col-3 mr-4'>
            <button
                onClick={toggleTheme}
                id='theme-toggle'
                type='button'
                className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>

                {theme ==='dark' ? (
                    <LightModeOutlinedIcon/>

                ): (
                    <DarkModeOutlinedIcon/>

                )}


            </button>
        </div>
    )
}
