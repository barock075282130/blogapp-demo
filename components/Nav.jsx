'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, useSession , signIn, getProviders} from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();
    const [ providers, setProviders ] = useState(null);
    useEffect(()=>{
        const setUpProviders = async() => {
            const res = await getProviders();
            setProviders(res)
        }
        setUpProviders();
    },[])
    return (
        <>
        <nav className='sticky top-0 border-gray-200 bg-gray-700'>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-white">
                <Link href='/' className='flex gap-2 flex-center'>
                    <p className='text-xl font-semibold'>Blog App (Demo)</p>
                </Link>
                    <div className='sm:flex hidden'>
                    {session?.user ? (
                        <div className='flex gap-4 md:gap-5'>
                        <Link href='/create-blog' className='bg-white/20 py-2 px-5 rounded-full hover:bg-white/60 hover:text-black duration-300 '>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='bg-white/20 py-2 px-5 rounded-full hover:bg-red-600/60 duration-300'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            />
                        </Link>
                        </div>
                    ) : (
                        <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => {
                                signIn(provider.id);
                                }}
                                className="bg-white/20 py-2 px-5 rounded-full hover:bg-white/60 duration-300"
                            >
                                Sign in with {provider.name}
                            </button>
                            ))}
                        </>
                    )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav