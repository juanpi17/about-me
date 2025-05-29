import { CommonWindow } from '@/components/commonWindow';
import { type SkillsSectionText, type WorkingExperienceSectionText, CommonWindowProps } from '@/types';

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
          <div className="grid grid-cols-6 justify-items-center justify-between mt-3">
            {info.secondarySkills.map((item, index) => (
              <div key={index} className='py-3 not-hover:grayscale'>
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
      {info.jobs.map((job) => (
        <div key={job.title} className='jobs'>
          <h4>{job.title}</h4>
        </div>
      ))}
    </>
  )
};

export const MakeSection = (props: CommonWindowProps) => {
  const { id, element, titleName, info, extendedClasses = null } = props;

  const isSkillsSection = info && 'primarySkills' in info || false;
  const isWorkingExperienceSection = info && 'jobs' in info || false;

  const defaultClasses = ['w-128', 'h-fit'];

  return (
      <CommonWindow
        id={id}
        element={element}
        titleName={titleName}
        extendedClasses={extendedClasses ?? defaultClasses}
      >
        {info && (
          <>
            <p>{info.description}</p>
            {isSkillsSection && <SkillsSection info={info as SkillsSectionText} />}
            {isWorkingExperienceSection && <WorkingExperienceSection info={info as WorkingExperienceSectionText} />}
            {/* {<SkillsSection isSkillsSection={isSkillsSection} info={(info as SkillsSectionText)} />} */}
            {/* {SkillsSection()} */}
            {/* { isSkillsSection && (
              <Accordion items={(info as SkillsSectionText).primarySkills} />
            )} */}
            {/* { (info as SkillsSectionText)?.primarySkills && (
              <Accordion items={(info as SkillsSectionText).primarySkills} />
            )} */}
          </>
        )}
      </CommonWindow>
    );
}


// {info && (
//           <>
//           <p className="text-lg">{info.description}</p>
//           { (info as SkillsSectionText)?.primarySkills && (
//             <Accordion items={(info as SkillsSectionText).primarySkills} />
//           )}
//           </>
//         )}