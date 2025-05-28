import React, { Dispatch, SetStateAction } from 'react';
import { ClientRect, DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export interface CustomDragEndEvent extends Omit<CommonWindowElementsContextProps, 'historyClickedElements'> {
  event: DragEndEvent;
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

// export interface CustomDragEvent<T> extends CommonWindowElementsContextProps {
//   event: T;
// };

// export interface CommonWindowElementsContextProps {
//     windowElements: CommonWindowProps[];
//     setWindowElements: Dispatch<SetStateAction<CommonWindowProps[]>>;
//     historyClickedElements: string[];
//     setHistoryClickedElements:  Dispatch<SetStateAction<string[]>>;
// }

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

export interface BasicSectionText {
  title: string;
  description: string;
};

export interface SkillsSectionText extends BasicSectionText {
  primarySkillsTitle: string;
  primarySkills: Array<SkillProps>;
  secondarySkillsTitle: string;
  secondarySkills: Array<SkillProps>;
};

export interface WorkingExperienceProps {
  company: string;
  position: string;
  fromTo: string;
  items: Array<string>;
};

export interface WorkingExperienceSectionText extends BasicSectionText {
  jobs: Array<WorkingExperienceProps>; 
};

export interface SVGSkillIcons {
  [key: string]: string;
};
