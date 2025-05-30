import type { WorkingExperienceSectionText } from "@/types";

export const WorkingExperienceSection = ({ info } : { info: WorkingExperienceSectionText }) => {
  if (!info.jobs) return null;

  return (
    <>
      {info.jobs.map((job, index) => (
        <div key={job.title + index} className={`${index === info.jobs.length - 1 ? `mb-0` : `mb-5`}`}>
          <span className='retro-title'>{job.title}</span>
          <div className='flex justify-between items-center my-2'>
            <span className='text-sm font-bold'>{job.subtitle}</span>
            <span className='text-sm'>{job.fromTo}</span>
          </div>
          <ul className='ml-6 list-outside list-disc mt-1'>
            {job.items.map((item, index) => (
              <li key={item + index} className='text-md'>{item}</li>
            ))}
          </ul>
          <span className={`mt-5 mx-26 border-b border-b-gray-200 ${index === info.jobs.length - 1 ? `hidden` : `block`}`}></span>
        </div>
      ))}
    </>
  )
};
