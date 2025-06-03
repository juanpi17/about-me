import { DesktopIconHolder } from '@/components/desktopIconHolder';
import { useWindowElementsContext } from '@/context/windowElementsContext';

export const DesktopIconsList = () => {
  const { windowElements } = useWindowElementsContext();

  return (
    <div className='flex flex-col m-2 w-fit touch-auto'>
        {windowElements.map((shortcut) => {
          return (
            <div key={shortcut.id + 'icon'} className='mb-2'>
              <DesktopIconHolder id={shortcut.id} icon={shortcut.icon} legend={shortcut.titleName} />
            </div>
          )
        })}
    </div>
  );
};
