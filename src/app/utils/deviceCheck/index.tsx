import { cookies } from 'next/headers';

import { DeviceType } from '@/assets/const';

export async function isMobileType() {
  const userAgent = (await cookies()).get('device-type');
  return userAgent ? ( userAgent.value === DeviceType.MOBILE ? true : false ) : true;
}
