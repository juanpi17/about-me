export const DesktopIconHolder = ({ icon, legend, scale = 'scale-85' } : {icon: React.JSX.Element, legend: string, scale?: string}) => {
  return (
    <div className='flex flex-col wrap w-30 items-center p-3 font-[family-name:var(--font-inconsolata)]'>
      <div className={`${scale}`}>
        {icon}
      </div>
      <p className='text-center text-sm text-white '>{legend}.txt</p>
    </div>
  );
}
