import { CommonWindow } from '@/components/commonWindow';
import { type SkillsSectionText, type WorkingExperienceSectionText, AboutMeSectionText, CombinedSectionText, ContactSectionText, MakeSectionProps } from '@/types';
import { SkillsSection } from './skills';
import { WorkingExperienceSection } from './workingExperience';
import { PersonalInformationSection } from './personalInformation';
import { ContactMeSection } from './contactMe';
import { AboutMeSection } from './aboutMe';

export const MakeSection = (props: MakeSectionProps) => {
  const { id, element, titleName, extendedClasses = null, content } = props;

  if (!element.isLoaded) {
    return null;
  }

  const isSkillsSection = 'primarySkills' in content || false;
  const isWorkingExperienceSection = 'jobs' in content || false;
  const isPersonalInformationSection = 'sections' in content || false;
  const isContactMeSection = 'items' in content || false;
  const isAboutMeSection = 'images' in content || false;

  const defaultClasses = ['w-128', 'h-fit'];

  return (
    <CommonWindow
      id={id}
      element={element}
      titleName={titleName}
      extendedClasses={extendedClasses ?? defaultClasses}
      overflow={isSkillsSection ? 'overflow-y-hidden' : 'overflow-y-auto'}
    >
      {content && (
        <>
          <p>{content.description}</p>
          {isSkillsSection && <SkillsSection info={content as SkillsSectionText} onTop={element.onTop} />}
          {isWorkingExperienceSection && <WorkingExperienceSection info={content as WorkingExperienceSectionText} />}
          {isPersonalInformationSection && <PersonalInformationSection info={content as CombinedSectionText} />}
          {isContactMeSection && <ContactMeSection info={content as ContactSectionText} onTop={element.onTop} />}
          {isAboutMeSection && <AboutMeSection info={content as AboutMeSectionText} onTop={element.onTop} />}
        </>
      )}
    </CommonWindow>
  );
}
