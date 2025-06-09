import { NextRequest, NextResponse, userAgent } from 'next/server';

import { DeviceType } from '@/assets/const';
 
export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  const viewport = device.type || DeviceType.DESKTOP;

  const response = NextResponse.next();
  response.headers.set('x-device-type', viewport === DeviceType.DESKTOP ? DeviceType.DESKTOP : DeviceType.MOBILE);

  return response;
}
