import { CommonWindow } from '@/components/commonWindow';
import { type SkillsSectionText, type WorkingExperienceSectionText, CombinedSectionText, MakeSectionProps } from '@/types';

import { Accordion } from '@/components/accordion';
import Tooltip from '@/components/tooltip';

const SkillsSection = ({ info } : { info: SkillsSectionText }) => {
  if (!info.primarySkills && !info.secondarySkills) return null;
  
  return (
    <div className='mt-3'>
      {info.primarySkillsTitle && info.primarySkills && (
        <div className="primary-skills flex flex-col">
          <div className='mt-1'>
            <span className='retro-title'>{info.primarySkillsTitle.key}</span>
            <span>{info.primarySkillsTitle.content}</span>
          </div>
          <Accordion items={info.primarySkills} />
        </div>
      )}

      {info.secondarySkillsTitle && info.secondarySkills && (
        <div className="secondary-skills flex flex-col mt-4">
          <div className='mt-1'>
            <span className='retro-title'>{info.secondarySkillsTitle.key}</span>
            <span>{info.secondarySkillsTitle.content}</span>
          </div>
          <div className="grid grid-cols-6 justify-items-center justify-between mt-3 px-2">
            {info.secondarySkills.map((item, index) => (
              <div key={index} className='py-3 not-hover:grayscale hover:scale-120'>
                <Tooltip text={item.name}>
                  {item.icon}
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
};

const WorkingExperienceSection = ({ info } : { info: WorkingExperienceSectionText }) => {
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

const PersonalInformationSection = ({ info } : { info: CombinedSectionText }) => {
  console.log('🚀 ~ PersonalInformationSection ~ info:', info);
  if (!info.sections) return null;
  console.log('🚀 ~ PersonalInformationSection ~ info.sections:', info.sections);

  return (
    <>
      {info.sections.map((section, index) => (
        <div key={section.title + index}>
          <p>{section.title}</p>
        </div>
      ))}
    </>
  )
};

export const MakeSection = (props: MakeSectionProps) => {
  const { id, element, titleName, extendedClasses = null, content } = props;
  const isSkillsSection = 'primarySkills' in content || false;
  const isWorkingExperienceSection = 'jobs' in content || false;
  const isPersonalInformationSection = 'sections' in content || false;
  console.log('🚀 ~ MakeSection ~ isPersonalInformationSection:', isPersonalInformationSection);

  const defaultClasses = ['w-128', 'h-fit'];

  return (
      <CommonWindow
        id={id}
        element={element}
        titleName={titleName}
        extendedClasses={extendedClasses ?? defaultClasses}
      >
        {content && (
          <>
            <p>{content.description}</p>
            {isSkillsSection && <SkillsSection info={content as SkillsSectionText} />}
            {isWorkingExperienceSection && <WorkingExperienceSection info={content as WorkingExperienceSectionText} />}
            {isPersonalInformationSection && <PersonalInformationSection info={content as CombinedSectionText} />}
          </>
        )}
      </CommonWindow>
    );
}
