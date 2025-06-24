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

  const response = NextResponse.next();

  response.headers.set(
    'x-device-type',
    viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE
  );

  response.headers.set('x-language', locale);

  return response;
}

// export function middleware(request: NextRequest) {
//   const { device } = userAgent(request);
//   const viewport = device.type || DeviceType.DESKTOP;

//   const { pathname } = request.nextUrl;

//   // Check if the pathname starts with a supported locale
//   const pathnameHasLocale = supportedLocales.some(
//       (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );
//   console.log('🚀 ~ middleware ~ pathnameHasLocale:', pathnameHasLocale);

//   let locale = defaultLocale;
//   let newPathname = pathname;

//   if (pathnameHasLocale) {
//     locale = pathname[0];
//     newPathname = pathname.replace(`/${locale}/`, '').replace(`/${locale}`, '');
//     request.nextUrl.pathname = newPathname;
//   }

//   console.log('🚀 ~ middleware ~ request.nextUrl:', request.nextUrl);
//   const response = NextResponse.redirect(request.nextUrl);


//   // console.log('🚀 ~ middleware ~ newPathname:', newPathname);
//   // // const response = NextResponse.next();
//   // response.headers.set('x-device-type', viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE);
//   // response.headers.set('Accept-Language', pathnameHasLocale ? pathname[0] : defaultLocale);


//   // // If no locale is present in the pathname and it's not a static asset or API route
//   // if (!pathnameHasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
//   //     // Get the preferred language from the 'Accept-Language' header
//   //     const acceptLanguage = request.headers.get('Accept-Language');
//   //     const preferredLocale = acceptLanguage 
//   //       ? acceptLanguage.split(',')[0].split('-')[0]
//   //       : defaultLocale;
//   //     console.log('🚀 ~ middleware ~ preferredLocale:', preferredLocale);

//   //     // Determine the locale to use for redirection
//   //     const localeToUse = supportedLocales.includes(preferredLocale) ? preferredLocale : defaultLocale;
//   //     console.log('🚀 ~ middleware ~ localeToUse:', localeToUse);

//   //     // Redirect to the URL with the detected or default locale
//   //     request.nextUrl.pathname = `/${localeToUse}${pathname}`;
//   //     console.log('🚀 ~ middleware ~ request.nextUrl.pathname:', request.nextUrl.pathname);
//   //     return NextResponse.redirect(request.nextUrl);
//   // }

//   return response;
// }

// export function middleware(request: NextRequest) {
//   const { device } = userAgent(request);

//   const viewport = device.type || DeviceType.DESKTOP;

//   const response = NextResponse.next();
//   response.headers.set('x-device-type', viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE);

//   const { pathname } = request.nextUrl;

//   // Check if the pathname starts with a supported locale
//   const pathnameHasLocale = supportedLocales.some(
//       (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );
//   response.headers.set('Accept-Language', pathnameHasLocale ? pathname[0] : defaultLocale);

//   // // If no locale is present in the pathname and it's not a static asset or API route
//   // if (!pathnameHasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
//   //     // Get the preferred language from the 'Accept-Language' header
//   //     const acceptLanguage = request.headers.get('Accept-Language');
//   //     const preferredLocale = acceptLanguage 
//   //       ? acceptLanguage.split(',')[0].split('-')[0]
//   //       : defaultLocale;
//   //     console.log('🚀 ~ middleware ~ preferredLocale:', preferredLocale);

//   //     // Determine the locale to use for redirection
//   //     const localeToUse = supportedLocales.includes(preferredLocale) ? preferredLocale : defaultLocale;
//   //     console.log('🚀 ~ middleware ~ localeToUse:', localeToUse);

//   //     // Redirect to the URL with the detected or default locale
//   //     request.nextUrl.pathname = `/${localeToUse}${pathname}`;
//   //     console.log('🚀 ~ middleware ~ request.nextUrl.pathname:', request.nextUrl.pathname);
//   //     return NextResponse.redirect(request.nextUrl);
//   // }

//   return response;
// }



// import { NextRequest, NextResponse, userAgent } from 'next/server';

// import { DeviceType } from '@/assets/const';

// const defaultLocale = 'es';
// const supportedLocales = ['es', 'en'];

// export function middleware(request: NextRequest) {
//   const { device } = userAgent(request);
//   const viewport = device.type || DeviceType.DESKTOP;

//   const { pathname } = request.nextUrl;

//   // Check if the pathname starts with a supported locale
//   const pathnameHasLocale = supportedLocales.some(
//       (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );
//   console.log('🚀 ~ middleware ~ pathnameHasLocale:', pathnameHasLocale);

//   let locale = defaultLocale;
//   let newPathname = pathname;

//   if (pathnameHasLocale) {
//     locale = pathname[0];
//     newPathname = pathname.replace(`/${locale}/`, '').replace(`/${locale}`, '');
//     request.nextUrl.pathname = newPathname;
//   }

//   console.log('🚀 ~ middleware ~ request.nextUrl:', request.nextUrl);
//   const response = NextResponse.redirect(request.nextUrl);


//   // console.log('🚀 ~ middleware ~ newPathname:', newPathname);
//   // // const response = NextResponse.next();
//   // response.headers.set('x-device-type', viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE);
//   // response.headers.set('Accept-Language', pathnameHasLocale ? pathname[0] : defaultLocale);


//   // // If no locale is present in the pathname and it's not a static asset or API route
//   // if (!pathnameHasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
//   //     // Get the preferred language from the 'Accept-Language' header
//   //     const acceptLanguage = request.headers.get('Accept-Language');
//   //     const preferredLocale = acceptLanguage 
//   //       ? acceptLanguage.split(',')[0].split('-')[0]
//   //       : defaultLocale;
//   //     console.log('🚀 ~ middleware ~ preferredLocale:', preferredLocale);

//   //     // Determine the locale to use for redirection
//   //     const localeToUse = supportedLocales.includes(preferredLocale) ? preferredLocale : defaultLocale;
//   //     console.log('🚀 ~ middleware ~ localeToUse:', localeToUse);

//   //     // Redirect to the URL with the detected or default locale
//   //     request.nextUrl.pathname = `/${localeToUse}${pathname}`;
//   //     console.log('🚀 ~ middleware ~ request.nextUrl.pathname:', request.nextUrl.pathname);
//   //     return NextResponse.redirect(request.nextUrl);
//   // }

//   return response;
// }

// // export function middleware(request: NextRequest) {
// //   const { device } = userAgent(request);

// //   const viewport = device.type || DeviceType.DESKTOP;

// //   const response = NextResponse.next();
// //   response.headers.set('x-device-type', viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE);

// //   const { pathname } = request.nextUrl;

// //   // Check if the pathname starts with a supported locale
// //   const pathnameHasLocale = supportedLocales.some(
// //       (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
// //   );
// //   response.headers.set('Accept-Language', pathnameHasLocale ? pathname[0] : defaultLocale);

// //   // // If no locale is present in the pathname and it's not a static asset or API route
// //   // if (!pathnameHasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
// //   //     // Get the preferred language from the 'Accept-Language' header
// //   //     const acceptLanguage = request.headers.get('Accept-Language');
// //   //     const preferredLocale = acceptLanguage 
// //   //       ? acceptLanguage.split(',')[0].split('-')[0]
// //   //       : defaultLocale;
// //   //     console.log('🚀 ~ middleware ~ preferredLocale:', preferredLocale);

// //   //     // Determine the locale to use for redirection
// //   //     const localeToUse = supportedLocales.includes(preferredLocale) ? preferredLocale : defaultLocale;
// //   //     console.log('🚀 ~ middleware ~ localeToUse:', localeToUse);

// //   //     // Redirect to the URL with the detected or default locale
// //   //     request.nextUrl.pathname = `/${localeToUse}${pathname}`;
// //   //     console.log('🚀 ~ middleware ~ request.nextUrl.pathname:', request.nextUrl.pathname);
// //   //     return NextResponse.redirect(request.nextUrl);
// //   // }

// //   return response;
// // }
