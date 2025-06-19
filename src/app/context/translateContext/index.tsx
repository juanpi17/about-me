'use client';
import React, { createContext, useContext, useState } from 'react';

import { Lang } from '@/types';

interface TranslateContextProps {
  language: Lang;
}

const LocalizedContent = createContext<TranslateContextProps>({ language: 'es' });

export function TranslateProvider({ children } : { children: React.ReactNode }) {
  const [language] = useState<Lang>('es'); // Default language set to 'es'

  return (
    <LocalizedContent value={{ language }}>
      {children}
    </LocalizedContent>
  );
}

export const useTranslateContext = () => useContext(LocalizedContent);
