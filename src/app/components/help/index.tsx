
import { touchToStart, clickToStart } from "@/assets/content/es";
import { useShowHelpContext } from "@/context/helpContext";
import { ArrowIcon } from "@/components/svg/arrowIcon";

export const Help = () => {
  const { showHelp, setShowHelp } = useShowHelpContext();

  const handleOnClick = () => {
    if (showHelp) {
      setShowHelp(false);
    }
  }
  
  return (
    <div onClick={handleOnClick} className="absolute flex justify-center items-center w-screen h-screen z-4">
      <div className="absolute w-screen h-screen bg-black opacity-40"></div>
      <div className="relative flex flex-row gap-3 justify-center w-100 md:w-160 h-fit border-dashed border-white border-4 p-6 rounded-3xl">
        <span className="">
          <ArrowIcon width={'70'} height={'70'} />
        </span>
        <div className='text-4xl text-center text-white'>
          <span className="hidden md:block">{clickToStart}</span>
          <span className="block md:hidden">{touchToStart}</span>
        </div>
      </div>
    </div>
  );
}
