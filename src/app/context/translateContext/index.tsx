'use client';
import React, { createContext, useContext, useState } from 'react';

import { Lang } from '@/types';

interface TranslateContextProps {
  language: Lang;
}

const LocalizedContent = createContext<TranslateContextProps>({ language: 'es' });

export function TranslateProvider({ selectedLanguage, children } : { selectedLanguage: Lang, children: React.ReactNode }) {
  const [language] = useState<Lang>(selectedLanguage);
  console.log('🚀 ~ TranslateProvider ~ language:', language);
  console.log('🚀 ~ TranslateProvider ~ selectedLanguage:', selectedLanguage);

  return (
    <LocalizedContent value={{ language }}>
      {children}
    </LocalizedContent>
  );
}

export const useTranslateContext = () => useContext(LocalizedContent);
