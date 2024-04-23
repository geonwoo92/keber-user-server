import axios, { Axios, AxiosInstance } from "axios"
import { parseCookies } from "nookies"


export default function instance(){


    const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })
    setInterceptor(instance)
    return instance
}


export const setInterceptor = (inputInstance:AxiosInstance) => {
    inputInstance.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json"
        config.headers["Authorization"] = `Bearer ${parseCookies().accessToken}`
        return config
    }, (error) => {
        console.log("AXIOS INTERSEPTOR ERROR OCCURRED : " + error)
        return Promise.reject(error)
    })
    inputInstance.interceptors.response.use(
        (response) => {
            if(response.status === 404) console.log("AXIOS INTERSEPTOR CATCHES 404")
            return response
        }
    )
    return inputInstance
} 


// export default function AxiosConfig(){
//     return {
//         headers: {
//             "Cache-Control": "no-cache",
//             "Content-Type": "application/json",
//             Authorization: `Bearer blah ~`,
//             "Access-Control-Allow-Origin": "*",
//         }
//     }
// }


// export default setInterceptor =(inputInstance:AxiosInstance)=>
//     { instance.interceptors.request.use
//         (request) => {
//             const accessToken = parseCookies().accessToken;
//             console.log('AXIOS 인터셉터가 쿠키에서 토큰을 추출함')
//             request.headers['Content-Type'] = "application/json"
//             request.headers[' Authorization'] = `Bearer ${accessToken}`
//             return request
    
    
//         }, (error) => {
//             console.log('AXIOS 인터셉터에서 발생한 에러 :' + error)
//             return Promise.reject(error)
//         }
    


//     }
// (
    
// )

// instance.interceptors.response.use(
//     (response) => {
//         if (response.status === 404) {
//             console.log('AXIOS 인터셉터에서 발생한 에러로 토큰이 없어서 404페이지로 넘어감')

//         }
//         return response
//     }
// )

// export default instance












