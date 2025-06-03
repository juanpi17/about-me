import type { ContactSectionText } from "@/types";

export const ContactMeSection = ({ info, onTop } : { info: ContactSectionText, onTop: boolean }) => {
  if (!info.items) return null;

  return (
    <div className='mt-5'>
      {info.items.map((item, index) => (
        <div key={item.text + index} className={`flex flex-row gap-5 align-middle items-center ${index === info.items.length - 1 ? `mb-0` : `mb-4`} not-hover:grayscale ${onTop ? 'hover:transition-all p-0 hover:pl-5 hover:scale-110 easy-out duration-300 hover:overflow-hidden' : ''}`}>
          <span>{item.icon}</span>
          {item.linkType && onTop ? (
              <a href={`${item.linkType}${item.text}`} target='_blank' rel='noopener noreferrer' className="w-full hover:cursor-pointer">{item.text}</a>
            ) : (
              <span className="w-full">{item.text}</span>
            )}
        </div>
      ))}
    </div>
  )
};
