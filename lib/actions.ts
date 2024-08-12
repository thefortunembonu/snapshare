'use server';

import { cookies } from 'next/headers';

import { formatDistanceToNow } from 'date-fns';


export async function handlecookieset( accessToken: string, refresh: string,){
    cookies().set('access', accessToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,// 60 minutes
        path: '/'
    }),
    cookies().set('refresh', refresh,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,// One week
        path: '/'
    })
}


export async function handlecookiedel(){
    cookies().delete('access'),
    cookies().delete('refresh')
}


export async function getcookie(cookiename: string){
    const cookie = cookies().get(cookiename)?.value;
    return cookie ? cookie : null
  

}







