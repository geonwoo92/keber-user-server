'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { IUser } from "./component/users/model/user.model"
import { useDispatch, useSelector } from "react-redux"
import { existsUsername, findlogin } from "./component/users/service/user.service"
import { useRouter } from "next/navigation"
import { parseCookies, destroyCookie, setCookie } from "nookies"
import { getAuth, getExistsUsername } from "./component/users/service/user.slice"
import { jwtDecode } from "jwt-decode"
import { Password } from "@mui/icons-material"

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth)
  const passwordRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({} as IUser)
  const [isWrongId, setisWrongId] = useState(false)
  const [isTrueId, setisTrueId] = useState(false)
  const [beforeSubmit, setBeforeSubmit] = useState(true)
  const [len, setLen] = useState('')

  const [isWrongPw, setisWrongPw] = useState(false)
  const existsUsernameSelector = useSelector(getExistsUsername)

  const handelIdChange = (e: any) => {
    const ID_CHECK = /^[a-zA-z][a-zA-z0-9]{6,19}$/g;
    // 영어 대소문자로 시작, 6~20자의 영어소문자 숫자
    setLen(e.target.value)
    setBeforeSubmit(true)

    if (ID_CHECK.test(len)) {
      setisWrongId(false)
      setisTrueId(true)
      console.log('정확하게 입력했습니다.')

      setUser({
        ...user,
        username: e.target.value
      })

    } else {
      setisWrongId(true)
      setisTrueId(false)
      console.log('잘못된 형식의 아이디 입니다.')
    }
  }

  const handelPwChange = (e: any) => {
    const PW_CHECK = /^[a-z](?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/g;

    if (PW_CHECK.test(e.target.value)) {

      console.log('정확하게 입력했습니다.')

      setUser({

        ...user,
        password: e.target.value
      })

    } else {

      console.log('잘못된 형식의 비밀번호 입니다.')
    }

  }

  const handleSubmit = () => {

    console.log('user ...' + JSON.stringify(user))
    dispatch(existsUsername(user.username))

      .then((res: any) => {
        if (res.payload == true) {

          dispatch(findlogin(user))
            .then((resp: any) => {
              console.log('서버에서 넘어온 RES ' + JSON.stringify(resp))
              console.log('서버에서 넘어온 메시지 1 ' + resp.payload.message)
              console.log('서버에서 넘어온 토큰 1 ' + resp.payload.accessToken)
              console.log('로그인성공')
              setCookie({}, 'message', resp.payload.message, { httpOnly: false, path: '/' })
              setCookie({}, 'accessToken', resp.payload.accessToken, { httpOnly: false, path: '/' })
              console.log('서버에서 넘어온 메시지 ' + parseCookies().message)
              console.log('서버에서 넘어온 토큰 ' + parseCookies().accessToken)
              console.log('토큰을 decode한 내용:')
              console.log(jwtDecode<any>(parseCookies().accessToken))
              router.push('/pages/boards/list')
              router.refresh()
            })
            .catch((err: any) => {
              console.log('LOGIN FAIL : '+err)
            })

        } else {
          console.log('아이디가 존재하지 않습니다')
          setBeforeSubmit(false)
          setisWrongId(false)
          setisTrueId(false)
        }
      })
      .catch((res: any) => {

      })

      .finally(() => {
        console.log('최종적으로 반드시 이뤄져야 할 로직')
      })
    setBeforeSubmit(false)
    setisWrongId(false)
    setisTrueId(false)
    if (passwordRef.current) {
      passwordRef.current.value = "";
    }

    // dispatch(findlogin(user))
  }


  // useEffect(() => {
  //   if (auth.message === 'SUCCESS') {
  //     console.log('로그인성공')
  //     setCookie({}, 'message', auth.message, { httpOnly: false, path: '/' })
  //     setCookie({}, 'token', auth.token, { httpOnly: false, path: '/' })
  //     console.log('서버에서 넘어온 메시지 ' + parseCookies().message)
  //     console.log('서버에서 넘어온 토큰 ' + parseCookies().token)
  //     console.log('토큰을 decode한 내용:')
  //     console.log(jwtDecode<any>(parseCookies().token))
  //     router.push('/pages/boards/list')
  //   } else {
  //     console.log('LOGIN FAIL')
  //   }
  // }, [auth])



  return (
    <div className='margincenter w-4/5 my-[30px] border-double border-4'>
      <div className="text-3xl font-bold underline text-center">welcom to react world !!</div><br />
      <h2>ID : Clarinda</h2>
      <h3>비번 : {"aVf2yvZ@"}</h3>
      <div className="flex items-center justify-center w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ID
              </label>
              <input
                onChange={handelIdChange}
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
              />
            </div>
            {isWrongId && len?.length> 1 &&(<pre>
              <h6 className="text-red-500">
                잘못된 아이디 입니다.
              </h6>
            </pre>
            )
            }
            {isTrueId && len?.length> 1 && (<pre>
              <h6 className="text-yellow-500">
                정상적인 아이디 입니다.
              </h6>
            </pre>

            )
            }
            {!beforeSubmit && !existsUsernameSelector && (<pre>
              <h6 className='text-red-500' >
                존재하지 않는 아이디 입니다.
              </h6>
            </pre>)}


            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              {isWrongPw && (<pre>
                <h6 className="text-red-500">
                  잘못된 비밀번호 입니다.
                </h6>
              </pre>)}
              <input
                ref={passwordRef}
                onChange={handelPwChange}
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
              />
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Login
              </button>
            </div>
            <a
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex px-5 justify-center w-full py-3">
                <div className="min-w-[30px]">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <div className="flex w-full justify-center">
                  <h1 className="whitespace-nowrap text-gray-600 font-bold">
                    Sign in with Google
                  </h1>
                </div>
              </div>
            </a>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                href="/pages/user/join"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}

