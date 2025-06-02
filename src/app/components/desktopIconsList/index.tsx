import { AboutMeFolder } from '@/components/svg/aboutMeFolder';
import { ContactMeFolder } from '@/components/svg/contactMeFolder';
import { PersonalInformationFolder } from '@/components/svg/personalInformationFolder';
import { SkillsFolder } from '@/components/svg/skillsFolder';
import { WorkingExperienceFolder } from '@/components/svg/workingExperienceFolder';
import { DesktopIconHolder } from '@/components/desktopIconHolder';
import { WindowElementsType } from '@/assets/const';

interface DekstopIconProps {
  id: string;
  icon: React.JSX.Element;
  legend: string;
  scale?: string;
}

export const DesktopIconsList = () => {

  const shortcutsArray: Array<DekstopIconProps> = [
    {
      id:  WindowElementsType.ABOUT,
      icon: <AboutMeFolder />,
      legend: 'Acerca de mí',
    },
    {
      id: WindowElementsType.CONTACT,
      icon: <ContactMeFolder />,
      legend: 'Contactame',
    },
    {
      id: WindowElementsType.PERSONAL_INFORMATION,
      icon: <PersonalInformationFolder />,
      legend: 'Información personal',
    },
    {
      id: WindowElementsType.SKILLS,
      icon: <SkillsFolder />,
      legend: 'Habilidades',
    },
    {
      id: WindowElementsType.WORKING_EXPERIENCE,
      icon: <WorkingExperienceFolder />,
      legend: 'Experiencia laboral',
    },
  ];


  return (
    <div className='flex flex-col m-2 w-fit'>
        {shortcutsArray.map((shortcut, index) => {
          return (
            <div key={index} className='mb-2'>
              <DesktopIconHolder id={shortcut.id} icon={shortcut.icon} legend={shortcut.legend} />
            </div>
          )
        })}
    </div>
  );
};
