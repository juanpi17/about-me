import type { ContactSectionText } from "@/types";

export const ContactMeSection = ({ info } : { info: ContactSectionText }) => {
  if (!info.items) return null;

  return (
    <ul className='ml-6 list-outside list-disc mt-1'>
      {info.items.map((item, index) => (
        <li key={item.text + index} className='text-md'>
          {item.linkType ? (
              <a href={`${item.linkType}${item.text}`} target='_blank' rel='noopener noreferrer'>{item.icon} {item.text}</a>
            ) : (
              <span className='text-md'>{item.icon} {item.text}</span>
            )}
        </li>
      ))}
    </ul>
  )
};
