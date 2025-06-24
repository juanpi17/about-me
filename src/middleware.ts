import { NextRequest, NextResponse, userAgent } from 'next/server';

import { DeviceType } from '@/assets/const';

const defaultLocale = 'es';
const supportedLocales = ['es', 'en'];

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type || DeviceType.DESKTOP;
  const { pathname } = request.nextUrl;

  const locale = supportedLocales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  ) || defaultLocale;

  // Redirige a "/" si el pathname es exactamente "/en" o "/es"
  if (pathname === '/en' || pathname === '/es') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    const response = NextResponse.redirect(url);
    response.headers.set(
      'x-device-type',
      viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE
    );
    response.headers.set('x-language', locale);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set(
    'x-device-type',
    viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE
  );
  response.headers.set('x-language', locale);

  return response;
}
