import { DesktopIconHolder } from '@/components/desktopIconHolder';
import { useShowHelpContext } from '@/context/helpContext';
import { useWindowElementsContext } from '@/context/windowElementsContext';

export const DesktopIconsList = () => {
  const { windowElements } = useWindowElementsContext();
  const { showHelp, setShowHelp } = useShowHelpContext();

  const handleOnClick = () => {
    if (showHelp) {
      setShowHelp(false);
    }
  }

  return (
    <div onClick={handleOnClick} className='flex flex-col m-2 w-fit'>
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
