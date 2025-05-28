import React from 'react';
import { ClientRect } from '@dnd-kit/core';

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
