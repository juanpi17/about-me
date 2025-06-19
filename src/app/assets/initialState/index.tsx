'use client';

import Image from 'next/image';
import { ClientRect } from '@dnd-kit/core';

import { SectionPageElement, MakeSectionProps } from '@/types';
import { WindowElementsType, WindowsType } from '@/assets/const';
import { getContent } from '@/assets/content';
import { iconSizeDesktop } from '@/assets/sizes';
import { useTranslateContext } from '@/context/translateContext';

export const initialPosition: ClientRect = {
    left: 200,
    right: 0,
    top: 100,
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

export const Localized = () => {
  const { language } = useTranslateContext();
  const { about, contact, skills, workingExperience, personalInformation, musicPlayer } = getContent(language);

  const startingWindowElements: Array<MakeSectionProps> = 
    [
      {
        id: WindowElementsType.ABOUT,
        element: initialStateElement,
        titleName: about.title,
        extendedClasses: ['w-screen', 'md:w-140', 'h-fit'],
        content: about,
        icon: <Image src="/aboutMeIcon.png" alt="About Me Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.CONTACT,
        element: initialStateElement,
        titleName: contact.title,
        extendedClasses: ['w-screen', 'md:w-90', 'h-fit'],
        content: contact,
        icon: <Image src="/contactMeIcon.png" alt="Contact Me Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.SKILLS,
        element: initialStateElement,
        titleName: skills.title,
        extendedClasses: ['w-screen', 'md:w-128', 'h-fit'],
        content: skills,
        icon: <Image src="/skillsIcon.png" alt="Skills Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.WORKING_EXPERIENCE,
        element: initialStateElement,
        titleName: workingExperience.title,
        extendedClasses: ['w-screen', 'md:w-128', 'h-fit'],
        content: workingExperience,
        icon: <Image src="/workingExperienceIcon.png" alt="Working Experience Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.PERSONAL_INFORMATION,
        element: initialStateElement,
        titleName: personalInformation.title,
        extendedClasses: ['w-screen', 'md:w-128', 'h-fit'],
        content: personalInformation,
        icon: <Image src="/personalInformationIcon.png" alt="Personal Information Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.MUSIC_PLAYER,
        element: initialStateElement,
        titleName: musicPlayer.title,
        extendedClasses: ['w-fit', 'md:w-120', 'h-fit'],
        content: musicPlayer,
        icon: <Image src="/musicPlayerIcon.png" alt="Music Player Icon" {...iconSizeDesktop} />,
        type: WindowsType.APP,
      },
    ];

  const startingWindowElementsResume: Array<MakeSectionProps> = 
    [
      {
        id: WindowElementsType.ABOUT,
        element: {
          ...initialStateElement,
          onTop: true,
          visible: true,
          isLoaded: true,
          position: {
              ...initialPosition,
              left: 22,
              top: 28,
          },
        },
        titleName: about.title,
        extendedClasses: ['w-screen', 'md:w-140', 'h-fit'],
        content: about,
        icon: <Image src="/aboutMeIcon.png" alt="About Me Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.CONTACT,
        element: {
          ...initialStateElement,
          visible: true,
          isLoaded: true,
          position: {
              ...initialPosition,
              left: 590,
              top: 632,
          },
        },
        titleName: contact.title,
        extendedClasses: ['w-screen', 'md:w-96', 'h-fit'],
        content: contact,
        icon: <Image src="/contactMeIcon.png" alt="Contact Me Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.SKILLS,
        element: {
          ...initialStateElement,
          visible: true,
          isLoaded: true,
          position: {
              ...initialPosition,
              left: 610,
              top: 28,
          },
        },
        titleName: skills.title,
        extendedClasses: ['w-screen', 'md:w-128', 'h-fit'],
        content: skills,
        icon: <Image src="/skillsIcon.png" alt="Skills Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.WORKING_EXPERIENCE,
        element: {
          ...initialStateElement,
          visible: true,
          isLoaded: true,
          position: {
              ...initialPosition,
              left: 31,
              top: 400,
          },
        },
        titleName: workingExperience.title,
        extendedClasses: ['w-screen', 'md:w-128', 'h-fit'],
        content: workingExperience,
        icon: <Image src="/workingExperienceIcon.png" alt="Working Experience Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.PERSONAL_INFORMATION,
        element: {
          ...initialStateElement,
          visible: true,
          isLoaded: true,
          position: {
              ...initialPosition,
              left: 1150,
              top: 28,
          },
        },
        titleName: personalInformation.title,
        extendedClasses: ['w-screen', 'md:w-128', 'h-fit'],
        content: personalInformation,
        icon: <Image src="/personalInformationIcon.png" alt="Personal Information Icon" {...iconSizeDesktop} />,
      },
      {
        id: WindowElementsType.MUSIC_PLAYER,
        element: {
          ...initialStateElement,
          visible: false,
          isLoaded: false,
          position: {
              ...initialPosition,
              left: 22,
              top: 28,
          },
        },
        titleName: musicPlayer.title,
        extendedClasses: ['w-fit', 'md:w-120', 'h-fit'],
        content: musicPlayer,
        icon: <Image src="/musicPlayerIcon.png" alt="Music Player Icon" {...iconSizeDesktop} />,
        type: WindowsType.APP,
      },
    ];
  
  return {
    startingWindowElements,
    startingWindowElementsResume,
  };
}
