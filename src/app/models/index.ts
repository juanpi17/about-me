import React from 'react';
import { ClientRect } from '@dnd-kit/core';

export interface CommonWindowProps {
  id: string;
  element: SectionPageElement;
  extendedClasses?: Array<string>;
  titleName?: string;
  children?: React.ReactNode;
  info?: SectionPageElementText;
};

export interface SectionPageElement {
  visible: boolean;
  onTop: boolean;
  position: ClientRect | null;
};

export interface AdditionalProps {
  name: string;
  icon: React.JSX.Element;
  description: string;
};

export interface SectionPageElementText {
  title: string;
  description: string;
  additional?: Array<AdditionalProps>;
};

export interface SVGSkillIcons {
  [key: string]: string;
};
