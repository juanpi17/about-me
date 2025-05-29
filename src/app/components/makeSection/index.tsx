import { CommonWindow } from '@/components/commonWindow';
import { type SkillsSectionText, type WorkingExperienceSectionText, CommonWindowProps } from '@/types';

import { Accordion } from '@/components/accordion';

const SkillsSection = ({ info } : { info: SkillsSectionText }) => {
  if (!info.primarySkills && !info.secondarySkills) return null;
  
  return (
    <>
      <Accordion items={info.primarySkills} />
      {/* {info.secondarySkills.map((skill) => (
        <span key={skill.name}>{skill.icon}</span>
      ))} */}
    </>
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
            <p className="text-lg">{info.description}</p>
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