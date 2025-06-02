import { ArrowIcon } from "@/components/svg/arrowIcon";

export const Help = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 flex justify-center bg-black w-screen h-screen"></div>
      <div className='absolute left-0 top-20 flex flex-col items-center justify-start text-white w-screen h-screen font-[family-name:var(--font-inconsolata)]'>
        <div className='flex flex-col items-end w-2/3 gap-8'>
          <span className='block animate-bounce -mb-8'>
            <ArrowIcon width={'150'} height={'150'} fill={'#fff'}/>
          </span>
          <span className='block text-5xl text-center border-dashed border-white border-9 p-8 rounded-4xl'>Haz click sobre un elemento del menú para acceder a las distintas secciones</span>
        </div>
      </div>
    </div>
  );
}
