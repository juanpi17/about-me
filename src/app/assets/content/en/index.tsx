import { AboutMeSectionText, AchievementsSectionText, BasicSectionText, CombinedSectionText, ContactSectionText, EducationSectionText, LanguagesSectionText, SkillsSectionText, WorkingExperienceSectionText } from "@/types";
import { JavaScriptIcon } from "@/components/svg/javascriptIcon";
import { JestIcon } from "@/components/svg/jestIcon";
import { NodeJsIcon } from "@/components/svg/nodeJsIcon";
import { ReactIcon } from "@/components/svg/reactIcon";
import { TypeScriptIcon } from "@/components/svg/typescriptIcon";
import { AngularIcon } from "@/components/svg/angularIcon";
import { CSharpIcon } from "@/components/svg/csharpIcon";
import { DockerIcon } from "@/components/svg/dockerIcon";
import { GitIcon } from "@/components/svg/gitIcon";
import { JavaIcon } from "@/components/svg/javaIcon";
import { MongoDbIcon } from "@/components/svg/mongodbIcon";
import { NextJsIcon } from "@/components/svg/nextjsIcon";
import { PostgreSQLIcon } from "@/components/svg/postgresqlIcon";
import { RubyIcon } from "@/components/svg/rubyIcon";
import { TailwindCssIcon } from "@/components/svg/tailwindcssIcon";
import { LinksType } from "@/assets/const";
import { PhoneIcon } from "@/components/svg/phoneIcon";
import { EmailIcon } from "@/components/svg/emailIcon";
import { InternetIcon } from "@/components/svg/internetIcon";

import Me from '@/assets/images/me_1.jpg';
import { WordpressIcon } from "@/components/svg/wordpressIcon";
import { iconSizeExtraSmall, iconSizeBig, iconSizeSmall } from "@/assets/sizes";

export const noWindowsTitle = "Active Windows";
export const noWindowsActive = "No active windows";
export const clickToStart = "Click on an icon to access the different sections";
export const touchToStart = "Tap on an icon to access the different sections";

export const about: AboutMeSectionText = {
    title: "About me",
    description: "",
    information: [
        "Strong background in developing custom web solutions with an emphasis on visual design, with 5+ years of experience in JavaScript and 3+ years of specialization in TypeScript and unit testing.",
        "Focus on innovation and improving the user experience through robust software development. Continuous learning and adaptation to new challenges.",
    ],
    images: [
        Me,
    ]
};

export const contact: ContactSectionText = {
    title: "Contact me",
    description: "To contact me, you can do so throught:",
    items: [
        {
            text: "(+54) 342 4785455",
            linkType: LinksType.TEL,
            icon: <PhoneIcon {...iconSizeExtraSmall} />
        },
        {
            text: "juanplepore@gmail.com",
            linkType: LinksType.MAIL_TO,
            icon: <EmailIcon {...iconSizeExtraSmall} />
        },
        {
            text: "linkedin.com/in/jplepore",
            linkType: LinksType.HTTPS,
            icon: <InternetIcon {...iconSizeExtraSmall} />
        }
    ]
};

export const skills: SkillsSectionText = {
    title: "Skills",
    description: "Throughout my professional and hobbyist career, I've used various technology stacks depending on the project's needs. This is why I divide my technical skills into two broad groups: primary and secondary.",
    primarySkillsTitle: {
        key: "Main skills",
        content: " which I used throughout my professional career and with which I have extensive experience",
    },
    primarySkills: [{
            name: "JavaScript",
            icon: <JavaScriptIcon {...iconSizeBig} />,
            description: '5+ years of experience in web development with JavaScript, including creating interactive and dynamic applications.',
        },
        {
            name: "TypeScript",
            icon: <TypeScriptIcon {...iconSizeBig} />,
            description: '3+ years of experience in web development with TypeScript, improving code quality and application maintainability.',
        },
        {
            name: "React",
            icon: <ReactIcon {...iconSizeBig} />,
            description: '5+ years of experience developing web/webview/native applications with React: "vanilla" implementation and use of the Next.js framework.',
        },
        {
            name: "Node.js",
            icon: <NodeJsIcon {...iconSizeBig} />,
            description: '5+ years of experience developing middle-end/back-end applications with Node.js, including building RESTful APIs and real-time services.',
        },
        {
            name: "Jest",
            icon: <JestIcon {...iconSizeBig} />,
            description: '3+ years of experience in unit and integration testing with Jest, ensuring code quality and reliability.',
        }
    ],
    secondarySkillsTitle: {
        key: "Secondary skills",
        content: " that I worked with and of which I have knowledge",
    },
    secondarySkills: [
        {
            name: "Angular",
            icon: <AngularIcon {...iconSizeSmall} />,
        },
        {
            name: "Wordpress",
            icon: <WordpressIcon {...iconSizeSmall} />,
        },
        {
            name: "TailwindCSS",
            icon: <TailwindCssIcon {...iconSizeSmall} />,
        },
        {
            name: "Next.js",
            icon: <NextJsIcon {...iconSizeSmall} />,
        },
        {
            name: "Git / GitHub",
            icon: <GitIcon {...iconSizeSmall} />,
        },
        {
            name: "Docker",
            icon: <DockerIcon {...iconSizeSmall} />,
        },
        {
            name: "Java",
            icon: <JavaIcon {...iconSizeSmall} />,
        },
        {
            name: "MongoDB",
            icon: <MongoDbIcon {...iconSizeSmall} />,
        },
        {
            name: "PostgreSQL",
            icon: <PostgreSQLIcon {...iconSizeSmall} />,
        },
        {
            name: "Ruby / Ruby On Rails",
            icon: <RubyIcon {...iconSizeSmall} />,
        },
        {
            name: "C#",
            icon: <CSharpIcon {...iconSizeSmall} />,
        },
    ]
};

export const workingExperience : WorkingExperienceSectionText = {
    title: "Working experience",
    description: "",
    jobs: [
        {
            title: "Mercado Libre",
            subtitle: "Software Engineer",
            fromTo: "2021 - 2025",
            items: [
                "Microservice optimization, increasing performance by implementing TypeScript code through the use of language best practices.",
                "Collaboration with various teams to develop and implement new end-user-oriented functionalities.",
                "Recreation/implementation of pixel-perfect UI designs using React and SCSS."
            ]
        },
        {
            title: "Serfe S.A.",
            subtitle: "Full Stack SSR developer",
            fromTo: "2017 - 2021",
            items: [
                "Development of custom web systems for international clients.",
                "Design and implementation of the back-end and front-end.",
                "Using different technology stacks to implement optimal solutions."
            ]
        },
        {
            title: "AcrilPal S.A.",
            subtitle: "Freelance developer",
            fromTo: "2016 - 2023",
            items: [
                "Design and implementation of a lottery system for use in different provincial entities (Entre Ríos, Formosa, Chaco), with the ability to control PLCs for ball management, statistics generation, and multi-device visualization.",
            ]
        },
        {
            title: 'INER "Dr. Emilio Coni"',
            subtitle: "Freelance developer",
            fromTo: "2015 - 2023",
            items: [
                "Development of a nationwide web-based respiratory disease statistics and monitoring system.",
                "Development of a comprehensive vaccination system for minors, focusing on patient follow-up. Designed primarily for desktop systems for the various medical centers in Villa María, Gualeguaychú, Paraná, and Concordia, it also includes web-based capabilities for data synchronization and statistics generation.",
            ]
        },
        {
            title: 'INER "Dr. Emilio Coni"',
            subtitle: "Asesoría informática",
            fromTo: "2014 - 2015",
            items: [
                "Consulting on updating physical equipment and automating daily tasks.",
            ]
        }
    ]
};

const education: EducationSectionText = {
    title: "Education",
    description: "",
    studies: [
        {
            title: "Computer Engineering",
            subtitle: "Universidad Nacional del Litoral (UNL)",
            fromTo: "2008 - 2018",
            items: [
                "Graduated from the Faculty of Engineering and Water Sciences (FICH) of the National University of Litoral (UNL)",
            ]
        },
        {
            title: "Computer Analyst",
            subtitle: "Universidad Nacional del Litoral (UNL)",
            fromTo: "2008 - 2012",
            items: [
                "Graduated from the Faculty of Engineering and Water Sciences (FICH) of the National University of Litoral (UNL)",
            ]
        },
        {
            title: "Bachelor's Degree in Commercial Expertise",
            subtitle: 'EEMPI Nro. 8106 "Don Bosco"',
            fromTo: "1997 - 2001",
            items: [
                'Graduated from the Private Secondary School "Don Bosco"',
            ]
        }
    ]
}

const personalAchievements: AchievementsSectionText = {
    title: "Personal achievements",
    description: "",
    achievements: [
        {
            title: "Web and Mobile UI Management",
            description: "Optimized micro-services and enhancing mobile and desktop UIs to improve user's browsing satisfaction by 25%."
        },
        {
            title: "Vaccination System Rollout",
            description: "Implemented vaccination system for 4 cities, improving process efficiency by 50%."
        },
        {
            title: "Lottery System Maintenance",
            description: "Managed and maintained lottery system, achieving uptime of 99.9% over 5 years."
        }
    ]
}

const idioms: LanguagesSectionText = {
    title: "Languages",
    description: "",
    languages: [
        "English (Advanced)",
        "Spanish (Native)",
        "Portuguese (Basic)",
        "Japanese (Basic)"
    ]
}

export const personalInformation: CombinedSectionText = {
    title: "Personal information",
    description: "",
    sections: {
        education,
        idioms,
        personalAchievements,
    }
    
}

export const musicPlayer: BasicSectionText = {
    title: "Music Player",
    description: "Interactive music player. Click the play button to start listening to music.",
};
