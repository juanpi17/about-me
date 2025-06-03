import type { AboutMeSectionText } from "@/types";
import Image from 'next/image';

export const AboutMeSection = ({ info, onTop } : { info: AboutMeSectionText, onTop: boolean }) => {
  if (!info.images) return null;

  const [ image ] = info.images;

  return (
    <div className='flex flex-row gap-6 items-center'>
      <div className="image ml-2">
        <div className={`p-2 border border-gray-600 -rotate-4 hover:transition-all ease-in-out duration-500 ${onTop ? 'hover:scale-110 hover:rotate-0' : ''}`}>
          <Image className="border border-gray-600" alt={`Picture of me`} src={image.src} width={image.width} height={image.height} />
        </div>
      </div>
      <div className="content">
        {info.information.map((item, index) => (
          <p key={index} className={`${index === info.information.length - 1 ? `mb-0` : `mb-3`}`}>{item}</p>
        ))}
      </div>
    </div>
  )
};
