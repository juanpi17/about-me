import { MouseEvent } from "react";

export const DesktopIconHolder = ({ icon, legend, scale = 'scale-85' } : {icon: React.JSX.Element, legend: string, scale?: string}) => {
  const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.detail === 2) {
        console.log("double click");
    }
  }
  
  return (
    <button type='button' onClick={handleIconClick} className='flex flex-col wrap w-30 items-center m-3 font-[family-name:var(--font-inconsolata)] cursor-default focus:bg-gray-400'>
      <div className={`${scale}`}>
        {icon}
      </div>
      <p className='text-center text-sm text-white'>{legend}.txt</p>
    </button>
  );
}
