
import { ArrowIcon } from "../svg/arrowIcon";

export const Help = () => {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen z-4">
      <div className="absolute w-screen h-screen bg-black opacity-40"></div>
      <div className="relative flex flex-row gap-3 justify-center w-160 h-fit border-dashed border-white border-4 p-6 rounded-3xl">
        <span className="">
          <ArrowIcon width={'70'} height={'70'} />
        </span>
        <p className='text-4xl text-center text-white'>
          Haz click sobre un ícono para acceder a las distintas secciones
        </p>
      </div>
    </div>
  );
}
