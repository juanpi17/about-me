import React, { Dispatch, SetStateAction, MouseEvent } from 'react';
import { ClientRect, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { StaticImageData } from 'next/image';

export interface SVGIcons {
  [key: string]: string;
};

export interface CustomCloseEvent extends Omit<CommonWindowElementsContextProps, 'setHistoryClickedElements'> {
  event: MouseEvent<HTMLButtonElement>;
  currentWindowId: string;
};

export interface CustomOnTopEvent extends Omit<CommonWindowElementsContextProps, 'historyClickedElements'> {
  currentWindowId: string;
};

export interface CustomDragEndEvent extends Omit<CommonWindowElementsContextProps, 'historyClickedElements'> {
  event: DragEndEvent;
  canvasId: string;
};

export interface CustomDragStartEvent extends Omit<CommonWindowElementsContextProps, 'historyClickedElements' | 'setHistoryClickedElements'> {
  event: DragStartEvent;
};

export interface CustomOnClickItemMenuEvent extends Omit<CommonWindowElementsContextProps, 'setHistoryClickedElements'> {
  currentWindowId: string;
};

export interface CommonWindowElementsContextProps {
    windowElements: MakeSectionProps[];
    setWindowElements: Dispatch<SetStateAction<MakeSectionProps[]>>;
    historyClickedElements: string[];
    setHistoryClickedElements:  Dispatch<SetStateAction<string[]>>;
}

export interface CommonWindowProps {
  id: string;
  element: SectionPageElement;
  extendedClasses?: Array<string>;
  titleName: string;
  children: React.ReactNode;
};

type SectionText = BasicSectionText | LanguagesSectionText | SkillsSectionText | WorkingExperienceSectionText | ContactSectionText | EducationSectionText | AchievementsSectionText | CombinedSectionText;

export interface MakeSectionProps extends Omit<CommonWindowProps, 'children'> {
  content: SectionText;
}

export interface SectionPageElement {
  visible: boolean;
  onTop: boolean;
  position: ClientRect | null;
};

export interface SkillProps {
  name: string;
  icon: React.JSX.Element;
  description?: string;
};

interface ContactSectionProps {
  icon?: React.JSX.Element;
  text: string;
  linkType?: string;
}

interface AchievementsSectionProps {
  title: string;
  description: string;
}

export interface BasicSectionText {
  title: string;
  description: string;
};

export interface LanguagesSectionText extends BasicSectionText {
  languages: Array<string>;
}

export interface ContactSectionText extends BasicSectionText {
  items: Array<ContactSectionProps>;
};

export interface SkillsSectionText extends BasicSectionText {
  primarySkillsTitle: {
    key: string;
    content: string;
  };
  primarySkills: Array<SkillProps>;
  secondarySkillsTitle: {
    key: string;
    content: string;
  };
  secondarySkills: Array<SkillProps>;
};

export interface FormationProps {
  title: string;
  subtitle: string;
  fromTo: string;
  items: Array<string>;
};

export interface WorkingExperienceSectionText extends BasicSectionText {
  jobs: Array<FormationProps>; 
};

export interface EducationSectionText extends BasicSectionText {
  studies: Array<FormationProps>; 
};

export interface AchievementsSectionText extends BasicSectionText {
  achievements: Array<AchievementsSectionProps>;
}

export interface CombinedSectionText extends BasicSectionText {
  sections: {
    education: EducationSectionText;
    idioms: LanguagesSectionText;
    personalAchievements: AchievementsSectionText;
  }
}

export interface AboutMeSectionText extends BasicSectionText {
  information: Array<string>;
  images: Array<StaticImageData>;
}
