import { headers } from 'next/headers';

import { DeviceType } from '@/assets/const';

export async function isMobileType() {
  const userAgent = (await headers()).get('x-device-type');
  return userAgent && userAgent === DeviceType.MOBILE ? true : false;
}
