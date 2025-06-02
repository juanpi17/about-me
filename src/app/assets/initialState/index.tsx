import { SectionPageElement, MakeSectionProps } from '@/types';
import { WindowElementsType } from '@/assets/const';

import { about, contact, skills, workingExperience, personalInformation } from '@/assets/content/es';
import { ClientRect } from '@dnd-kit/core';
import { AboutMeFolder } from '@/components/svg/aboutMeFolder';
import { ContactMeFolder } from '@/components/svg/contactMeFolder';
import { SkillsFolder } from '@/components/svg/skillsFolder';
import { WorkingExperienceFolder } from '@/components/svg/workingExperienceFolder';
import { PersonalInformationFolder } from '@/components/svg/personalInformationFolder';

const initialPosition: ClientRect = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
};

const initialStateElement: SectionPageElement = {
  visible: false,
  onTop: false,
  position: initialPosition,
  isLoaded: false,
};

export const startingWindowElements: Array<MakeSectionProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: initialStateElement,
      titleName: about.title,
      extendedClasses: ['w-140', 'h-fit'],
      content: about,
      icon: <AboutMeFolder />,
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      titleName: contact.title,
      extendedClasses: ['w-96', 'h-fit'],
      content: contact,
      icon: <ContactMeFolder />,
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      titleName: skills.title,
      extendedClasses: ['w-128', 'h-fit'],
      content: skills,
      icon: <SkillsFolder />,
    },
    {
      id: WindowElementsType.WORKING_EXPERIENCE,
      element: initialStateElement,
      titleName: workingExperience.title,
      content: workingExperience,
      icon: <WorkingExperienceFolder />,
    },
    {
      id: WindowElementsType.PERSONAL_INFORMATION,
      element: initialStateElement,
      titleName: personalInformation.title,
      content: personalInformation,
      icon: <PersonalInformationFolder />,
    },
  ];

export const startingWindowElementsResume: Array<MakeSectionProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: {
        ...initialStateElement,
        onTop: true,
        visible: true,
        position: {
            ...initialPosition,
            left: 22,
            top: 28,
        },
      },
      titleName: about.title,
      extendedClasses: ['w-140', 'h-fit'],
      content: about,
      icon: <AboutMeFolder />,
    },
    {
      id: WindowElementsType.CONTACT,
      element: {
        ...initialStateElement,
        visible: true,
        position: {
            ...initialPosition,
            left: 590,
            top: 632,
        },
      },
      titleName: contact.title,
      extendedClasses: ['w-96', 'h-fit'],
      content: contact,
      icon: <ContactMeFolder />,
    },
    {
      id: WindowElementsType.SKILLS,
      element: {
        ...initialStateElement,
        visible: true,
        position: {
            ...initialPosition,
            left: 610,
            top: 28,
        },
      },
      titleName: skills.title,
      extendedClasses: ['w-128', 'h-fit'],
      content: skills,
      icon: <SkillsFolder />,
    },
    {
      id: WindowElementsType.WORKING_EXPERIENCE,
      element: {
        ...initialStateElement,
        visible: true,
        position: {
            ...initialPosition,
            left: 31,
            top: 400,
        },
      },
      titleName: workingExperience.title,
      content: workingExperience,
      icon: <WorkingExperienceFolder />,
    },
    {
      id: WindowElementsType.PERSONAL_INFORMATION,
      element: {
        ...initialStateElement,
        visible: true,
        position: {
            ...initialPosition,
            left: 1150,
            top: 28,
        },
      },
      titleName: personalInformation.title,
      content: personalInformation,
      icon: <PersonalInformationFolder />,
    },
  ];