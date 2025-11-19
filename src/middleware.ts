import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/cadastro') ||
                     request.nextUrl.pathname.startsWith('/recuperar-senha')
  
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard') ||
                          request.nextUrl.pathname.startsWith('/perfil') ||
                          request.nextUrl.pathname.startsWith('/receitas') ||
                          request.nextUrl.pathname.startsWith('/planos') ||
                          request.nextUrl.pathname.startsWith('/configuracoes') ||
                          request.nextUrl.pathname.startsWith('/suporte')
  
  // Redirecionar usuários autenticados para dashboard se tentarem acessar páginas de auth
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Redirecionar usuários não autenticados para login se tentarem acessar páginas protegidas
  if (!session && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/perfil/:path*',
    '/receitas/:path*',
    '/planos/:path*',
    '/configuracoes/:path*',
    '/suporte/:path*',
    '/login',
    '/cadastro',
    '/recuperar-senha',
  ],
}
