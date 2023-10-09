import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const ignorePrefixes = ['/_next/', '/fonts/', '/images/']
    const shouldRewrite = !ignorePrefixes.some((pathPrefix) =>
        request.nextUrl.pathname.startsWith(pathPrefix)
    )

    if (shouldRewrite) {
        return NextResponse.rewrite(new URL(request.nextUrl.pathname.toLowerCase(), request.url))
    }
}
