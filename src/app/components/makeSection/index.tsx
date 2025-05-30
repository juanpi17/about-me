import { CommonWindow } from '@/components/commonWindow';
import { SkillsSection } from './skills';
import { WorkingExperienceSection } from './workingExperience';
import { PersonalInformationSection } from './personalInformation';
import { ContactMeSection } from './contactMe';
import { type SkillsSectionText, type WorkingExperienceSectionText, CombinedSectionText, ContactSectionText, MakeSectionProps } from '@/types';

export const MakeSection = (props: MakeSectionProps) => {
  const { id, element, titleName, extendedClasses = null, content } = props;
  const isSkillsSection = 'primarySkills' in content || false;
  const isWorkingExperienceSection = 'jobs' in content || false;
  const isPersonalInformationSection = 'sections' in content || false;
  const isContactMeSection = 'items' in content || false;

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
            {isContactMeSection && <ContactMeSection info={content as ContactSectionText} />}
          </>
        )}
      </CommonWindow>
    );
}
