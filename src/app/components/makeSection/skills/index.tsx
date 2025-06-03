import { Accordion } from '@/components/accordion';
import Tooltip from '@/components/tooltip';
import type { SkillsSectionText } from "@/types";

export const SkillsSection = ({ info, onTop } : { info: SkillsSectionText, onTop: boolean }) => {
  if (!info.primarySkills && !info.secondarySkills) return null;
  
  return (
    <div className='mt-3'>
      {info.primarySkillsTitle && info.primarySkills && (
        <div className="primary-skills flex flex-col">
          <div className='mt-1'>
            <span className='retro-title'>{info.primarySkillsTitle.key}</span>
            <span>{info.primarySkillsTitle.content}</span>
          </div>
          <Accordion items={info.primarySkills} enabled={onTop} />
        </div>
      )}

      {info.secondarySkillsTitle && info.secondarySkills && (
        <div className="secondary-skills flex flex-col mt-4">
          <div className='mt-1'>
            <span className='retro-title'>{info.secondarySkillsTitle.key}</span>
            <span>{info.secondarySkillsTitle.content}</span>
          </div>
          <div className="grid grid-cols-6 justify-items-center justify-between mt-3 px-2">
            {info.secondarySkills.map((item, index) => (
              <div key={index} className='py-3 not-hover:grayscale hover:scale-120'>
                <Tooltip text={item.name}>
                  {item.icon}
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
};
