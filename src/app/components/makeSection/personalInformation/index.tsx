import type { CombinedSectionText } from "@/types";

export const PersonalInformationSection = ({ info } : { info: CombinedSectionText }) => {
  if (!info.sections) return null;

  const { education, idioms, personalAchievements } = info.sections;

  return (
    <div >
      <fieldset className="title text-lg mb-3 uppercase">
        <legend className=''>{education.title}</legend>
      </fieldset>
      {education.studies.map((study, index) => (
        <div key={study.title + index} className={`${index === education.studies.length - 1 ? `mb-0` : `mb-5`}`}>
          <span className='retro-title'>{study.title}</span>
          <div className='flex justify-between items-center my-2'>
            <span className='text-sm font-bold'>{study.subtitle}</span>
            <span className='text-sm'>{study.fromTo}</span>
          </div>
          <ul className='ml-6 list-outside list-disc mt-1'>
            {study.items.map((item, index) => (
              <li key={item + index} className='text-md'>{item}</li>
            ))}
          </ul>
        </div>
      ))}


      <fieldset className="title text-lg mt-6 mb-3 uppercase">
        <legend>{idioms.title}</legend>
      </fieldset>
      <ul className='ml-6 list-outside list-disc mt-1'>
        {idioms.languages.map((language, index) => (
          <li key={language + index} className='text-md'>{language}</li>
        ))}
      </ul>


      <fieldset className="title text-lg mt-6 mb-3 uppercase">
        <legend>{personalAchievements.title}</legend>
      </fieldset>
      {personalAchievements.achievements.map((achievement, index) => (
        <div key={achievement.title + index} className={`${index === personalAchievements.achievements.length - 1 ? `mb-0` : `mb-5`}`}>
          <span className='text-md font-bold'>{achievement.title}</span>
          <p className='text-md mt-2'>{achievement.description}</p>
        </div>
      ))}
    </div>
  )
};
