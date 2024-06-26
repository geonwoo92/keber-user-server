'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const pages = ['카운터', '게시판종류', '사용자목록', '게시글내용'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import React from 'react';
import LinkButton, { LinkButtonTitles } from '@/app/atoms/button/LinkButton';
import Link from 'next/link';

import { destroyCookie, parseCookies } from 'nookies';
import { logout } from '../../users/service/user.service';
import { useDispatch } from 'react-redux';



function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showProfile, setShowProfile]= useState(false)
useEffect(() => {
    console.log('헤더 useEffect 쿠키 : ' + parseCookies().accessToken)
    if (parseCookies().accessToken !== '') {
      console.log('쿠키가 있어서 보임')
      setShowProfile(true)
    } else {
      console.log('쿠키가 있어서 안보임')
      setShowProfile(false)
    }
  }, [parseCookies().accessToken])

  const logoutHandler = () => {
    console.log('로그아웃 적용 전 :' + parseCookies().accessToken)
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null,'accessToken')
        setShowProfile(false)
        router.push('/')


      })
      .catch((err: any) => {
        console.log('로그아웃 실행에서 에러 발생')

      })
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

      <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
      </Link>

      {!showProfile && <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/public/img/user/profile.jpg" alt="user photo" />
      </button>}

      {showProfile &&
        <div className="flex px-4 py-3 float-end">
          <span className="block text-sm text-gray-900 dark:text-white">LEE GEON</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5">naver.com</span>
          <span 
          onClick={logoutHandler}
          className="block text-sm  text-gray-500 truncate dark:text-gray-400"><a href="#">Logout</a>  </span>
        </div>
      }
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

          {LinkButtonTitles.map((item) => (
            <li key={item.id}>
              <LinkButton id={item.id} title={item.title} path={item.path} />
            </li>
          ))}

        </ul>
      </div>
    </div>
  </nav>
  )
}
export default Header;