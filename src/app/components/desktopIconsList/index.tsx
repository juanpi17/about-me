import { AboutMeFolder } from '@/components/svg/aboutMeFolder';
import { ContactMeFolder } from '@/components/svg/contactMeFolder';
import { PersonalInformationFolder } from '@/components/svg/personalInformationFolder';
import { SkillsFolder } from '@/components/svg/skillsFolder';
import { WorkingExperienceFolder } from '@/components/svg/workingExperienceFolder';
import { DesktopIconHolder } from '@/components/desktopIconHolder';

interface DekstopIconProps {
  icon: React.JSX.Element;
  legend: string;
  scale?: string;
}

export const DesktopIconsList = () => {

  const shortcutsArray: Array<DekstopIconProps> = [
    {
      icon: <AboutMeFolder />,
      legend: 'Acerca de mí',
    },
    {
      icon: <ContactMeFolder />,
      legend: 'Contactame',
    },
    {
      icon: <PersonalInformationFolder />,
      legend: 'Información personal',
    },
    {
      icon: <SkillsFolder />,
      legend: 'Habilidades',
    },
    {
      icon: <WorkingExperienceFolder />,
      legend: 'Experiencia laboral',
    },
  ];


  return (
    <div className='flex flex-col m-2 w-fit'>
        {shortcutsArray.map((shortcut, index) => {
          return (
            <div key={index} className='mb-2'>
              <DesktopIconHolder icon={shortcut.icon} legend={shortcut.legend} />
            </div>
          )
        })}
    </div>
  );
};
