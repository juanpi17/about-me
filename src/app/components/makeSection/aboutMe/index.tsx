import type { AboutMeSectionText } from "@/types";
import Image from 'next/image';

export const AboutMeSection = ({ info } : { info: AboutMeSectionText }) => {
  if (!info.images) return null;

  const [ image ] = info.images;

  return (
    <div className='grid grid-cols-3 gap-6 items-center'>
      <div className="image">
        <div className="p-2 border border-gray-600 -rotate-4 hover:transition-all ease-in-out duration-500 hover:scale-110 hover:rotate-0">
          <Image className="border border-gray-600" alt={`Picture of me`} src={image.src} width={image.width} height={image.height} />
        </div>
      </div>
      <div className="content col-span-2">
        {info.information.map((item, index) => (
          <p key={index} className={`${index === info.information.length - 1 ? `mb-0` : `mb-3`}`}>{item}</p>
        ))}
      </div>
    </div>
    // <div className='grid grid-cols-2 gap-6 items-center'>
    //   <div className="image">
    //     <div className="p-2 border border-gray-600 -rotate-3">
    //       <Image className="border border-gray-600" alt={`Picture of me`} src={info.images[1].src} width={info.images[1].width} height={info.images[1].height} />
    //     </div>
    //   </div>
    //   <div className="content">
    //     <p>{info.description}</p>
    //   </div>
    // </div>
    // <div className='grid grid-cols-2 gap-6'>
    //   <div className="relative h-64 p-3 border">
    //     <Image
    //       src={info.images[0].src}
    //       alt="Picture of the author"
    //       layout="fill"
    //       objectFit="cover"
    //     />
    //     {/* <div className={`absolute -top-0 left-0 w-full h-1/8 scale-110 bg-white -rotate-6`} />
    //     <div className="absolute -bottom-5 left-0 w-full h-1/8 scale-110 bg-white rotate-3" /> */}
    // </div>
    //   <div className="content">
    //     <p>{info.description}</p>
    //   </div>
    // </div>
    // <div className='mt-5'>
    //   {info.images.map((image, index) => (
    //     <Image alt={`Picture ${index + 1} from me`} key={index} src={image.src} width={image.width} height={image.height} />
    //   ))}
    // </div>
    // <div className='grid grid-cols-2'>
    //   <div className="image">
    //     <div className="p-3 border">
    //       <Image className="border border-gray-900" alt={`Picture of me`} src={info.images[1].src} width={info.images[1].width} height={info.images[1].height} />
    //     </div>
    //   </div>
    //   <div className="content">
    //     <p>{info.description}</p>
    //   </div>
    // </div>
    // // <div className='mt-5'>
    // //   {info.images.map((image, index) => (
    // //     <Image alt={`Picture ${index + 1} from me`} key={index} src={image.src} width={image.width} height={image.height} />
    // //   ))}
    // // </div>
  )
};
