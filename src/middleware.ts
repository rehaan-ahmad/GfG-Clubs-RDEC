import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:    (n) => request.cookies.get(n)?.value,
        set:    (n, v, o) => { request.cookies.set({ name: n, value: v, ...o }); response.cookies.set({ name: n, value: v, ...o }) },
        remove: (n, o) => { request.cookies.set({ name: n, value: '', ...o }); response.cookies.set({ name: n, value: '', ...o }) },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAttendRoute = request.nextUrl.pathname.startsWith('/attend')

  if ((isAdminRoute || isAttendRoute) && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/attend/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
}
