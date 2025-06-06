// import { headers } from 'next/headers';

// import { DeviceType } from '@/assets/const';
// import { MainCanvas } from '@/components/mainCanvas';
// import { DeviceTypeProvider } from '@/context/deviceTypeContext';

// async function getDeviceType() {
//   const userAgent = (await headers()).get('x-device-type');
//   return userAgent && userAgent === DeviceType.MOBILE ? DeviceType.MOBILE : DeviceType.DESKTOP;
// }

// export default async function App() {
//     const deviceType = await getDeviceType();

//     return (
//     <DeviceTypeProvider deviceType={deviceType}>
//       <p>Estás accediendo desde: { String(deviceType) }</p>
//       <MainCanvas />
//     </DeviceTypeProvider>
//   );
// }

import { MainCanvas } from '@/components/mainCanvas';

export default function App() {
  return <MainCanvas />
}
