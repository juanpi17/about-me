import React, { Dispatch, SetStateAction, MouseEvent } from 'react';
import { ClientRect, DragEndEvent, DragStartEvent } from '@dnd-kit/core';

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

export interface CommonWindowElementsContextProps {
    windowElements: CommonWindowProps[];
    setWindowElements: Dispatch<SetStateAction<CommonWindowProps[]>>;
    historyClickedElements: string[];
    setHistoryClickedElements:  Dispatch<SetStateAction<string[]>>;
}

export interface CommonWindowProps {
  id: string;
  element: SectionPageElement;
  extendedClasses?: Array<string>;
  titleName?: string;
  children?: React.ReactNode;
  info?: BasicSectionText | SkillsSectionText | WorkingExperienceSectionText;
};

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

export interface ExtendedSectionText extends BasicSectionText {
  items: Array<string>;
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
  items: Array<AchievementsSectionProps>;
}

export interface SVGSkillIcons {
  [key: string]: string;
};
