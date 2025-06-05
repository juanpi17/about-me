import { NextRequest, NextResponse, userAgent } from 'next/server';
 
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  console.log('🚀 ~ middleware ~ device:', device);
 
  // device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
  // 'wearable', 'embedded', or undefined (for desktop browsers)
  const viewport = device.type || 'desktop';
 
  url.searchParams.set('viewport', viewport);
  return NextResponse.rewrite(url);
}

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   const { device } = userAgent(request);
//   const viewport = device.type || 'desktop';

//   response.headers.set('Viewport', viewport);
 
//   return response;
// }