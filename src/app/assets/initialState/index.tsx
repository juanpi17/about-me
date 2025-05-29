import { SectionPageElement, CommonWindowProps } from '@/types';
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

export const startingWindowElements: Array<CommonWindowProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: initialStateElement,
      titleName: about.title,
      info: about,
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      titleName: contact.title,
      info: contact,
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      titleName: skills.title,
      info: skills,
      extendedClasses: ['w-96', 'h-fit'],
    },{
      id: WindowElementsType.WORKING_EXPERIENCE,
      element: initialStateElement,
      titleName: workingExperience.title,
      info: workingExperience,
    },
  ];

export const startingWindowElementsResume: Array<CommonWindowProps> = 
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
      info: about,
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      titleName: contact.title,
      info: contact,
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      titleName: skills.title,
      info: skills,
      extendedClasses: ['w-96', 'h-fit'],
    },{
      id: WindowElementsType.WORKING_EXPERIENCE,
      element: initialStateElement,
      titleName: workingExperience.title,
      info: workingExperience,
    },
  ];