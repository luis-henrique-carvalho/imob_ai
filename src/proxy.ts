import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    // Busca a sessão no server-side usando headers() conforme a documentação
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const isAuthRoute = ['/login', '/register'].includes(request.nextUrl.pathname);
    const isPublicRoute = ['/'].includes(request.nextUrl.pathname);

    // Se não estiver logado
    if (!session) {
        if (!isAuthRoute && !isPublicRoute) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        // Se estiver logado e tentar acessar login/register, manda pro dashboard
        if (isAuthRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Aplica o proxy em todas as rotas ignorando arquivos estáticos, _next, imagens e /api
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'
    ],
};
