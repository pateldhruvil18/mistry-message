"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from '@/components/ui/button'

const Navabr = () => {

  const { data: session } = useSession()
  const user: User = session?.user as User

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-pink-500"
        >
          Mystery Message
        </a>

        {/* Right Section */}
        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <span className="text-sm md:text-base text-slate-300">
              Welcome,&nbsp;
              <span className="font-semibold text-white">
                {user?.username || user?.email}
              </span>
            </span>

            <Button
              onClick={() => signOut()}
              className="bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-md transition-all"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md transition-all">
              Login
            </Button>
          </Link>
        )}

      </div>
    </nav>
  )
}

export default Navabr
