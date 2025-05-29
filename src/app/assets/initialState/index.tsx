import { SectionPageElement, MakeSectionProps } from '@/types';
import { WindowElementsType } from '@/assets/const';

import { about, contact, skills, workingExperience } from '@/assets/content/es';
import { ClientRect } from '@dnd-kit/core';

const initialPosition: ClientRect = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
};

const initialStateElement: SectionPageElement = {
  visible: true,
  onTop: false,
  position: initialPosition,
};

export const startingWindowElements: Array<MakeSectionProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: initialStateElement,
      titleName: about.title,
      content: about,
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      titleName: contact.title,
      content: contact,
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      titleName: skills.title,
      extendedClasses: ['w-128', 'h-fit'],
      content: skills,
    },{
      id: WindowElementsType.WORKING_EXPERIENCE,
      element: initialStateElement,
      titleName: workingExperience.title,
      content: workingExperience,
    },
  ];

export const startingWindowElementsResume: Array<MakeSectionProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: {
        ...initialStateElement,
        position: {
            ...initialPosition,
            top: 62,
            right: 589,
        },
      },
      titleName: about.title,
      content: about,
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      titleName: contact.title,
      content: contact,
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      titleName: skills.title,
      content: skills,
      extendedClasses: ['w-96', 'h-fit'],
    },{
      id: WindowElementsType.WORKING_EXPERIENCE,
      element: initialStateElement,
      titleName: workingExperience.title,
      content: workingExperience,
    },
  ];