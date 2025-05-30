import { AchievementsSectionText, BasicSectionText, CombinedSectionText, ContactSectionText, EducationSectionText, LanguagesSectionText, SkillsSectionText, SVGIcons, WorkingExperienceSectionText } from "@/types";
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

const iconBig: SVGIcons = {
    width: '48',
    height: '48',
};

const iconSmall = {
    width: '32',
    height: '32',
};

const iconExtraSmall = {
    width: '18',
    height: '18',
};

export const about: BasicSectionText = {
    title: "Acerca de mí",
    description: "Sólida formación en el desarrollo de soluciones web a medida con énfasis en el diseño visual, con más de 5+ años de experiencia en JavaScript y 3+ años de especialización en TypeScript y tests unitarios.  Enfoque en innovación y mejora de la experiencia del usuario a través de desarrollo de software robusto. Aprendizaje continuo y adaptación a nuevos desafíos.",
};

export const contact: ContactSectionText = {
    title: "Contactame",
    description: "Para comunicarte conmigo, podés hacerlo mediante:",
    items: [
        {
            text: "(+54) 342 4785455",
            linkType: LinksType.TEL,
            icon: <PhoneIcon {...iconExtraSmall} />
        },
        {
            text: "juanplepore@gmail.com",
            linkType: LinksType.MAIL_TO,
            icon: <EmailIcon {...iconExtraSmall} />
        },
        {
            text: "linkedin.com/in/jplepore",
            linkType: LinksType.HTTPS,
            icon: <InternetIcon {...iconExtraSmall} />
        }
    ]
};

export const skills: SkillsSectionText = {
    title: "Habilidades",
    description: "A lo largo de mi vida profesional y como hobbista, utilicé diversos stacks tecnológicos según lo que el proyecto demandara. Es por esto, que divido mis habilidades técnicas en dos grandes grupos: principales y secundarias.",
    primarySkillsTitle: {
        key: "Habilidades principales",
        content: " las cuales utilicé a lo largo de toda mi carrera profesional",
    },
    primarySkills: [{
            name: "JavaScript",
            icon: <JavaScriptIcon {...iconBig} />,
            description: '5+ años de experiencia en desarrollo web con JavaScript, incluyendo la creación de aplicaciones interactivas y dinámicas.',
        },
        {
            name: "TypeScript",
            icon: <TypeScriptIcon {...iconBig} />,
            description: '3+ años de experiencia en desarrollo web con TypeScript, mejorando la calidad del código y la mantenibilidad de las aplicaciones.',
        },
        {
            name: "React",
            icon: <ReactIcon {...iconBig} />,
            description: '5+ años de experiencia en desarrollo de aplicaciones web/webview/nativas con React: implementación "vanilla" y uso del framework Next.js.',
        },
        {
            name: "Node.js",
            icon: <NodeJsIcon {...iconBig} />,
            description: '5+ años de experiencia en desarrollo de aplicaciones middle-end/back-end con Node.js, incluyendo la creación de APIs RESTful y servicios en tiempo real.',
        },
        {
            name: "Jest",
            icon: <JestIcon {...iconBig} />,
            description: '3+ años de experiencia en pruebas unitarias y de integración con Jest, asegurando la calidad y confiabilidad del código.',
        }
    ],
    secondarySkillsTitle: {
        key: "Otras habilidades",
        content: " (a.k.a. habilidades secundarias) con las que trabajé y de las cuales tengo conocimientos",
    },
    secondarySkills: [
        {
            name: "Angular",
            icon: <AngularIcon {...iconSmall} />,
        },
        {
            name: "C#",
            icon: <CSharpIcon {...iconSmall} />,
        },
        {
            name: "Docker",
            icon: <DockerIcon {...iconSmall} />,
        },
        {
            name: "Git / GitHub",
            icon: <GitIcon {...iconSmall} />,
        },
        {
            name: "Java",
            icon: <JavaIcon {...iconSmall} />,
        },
        {
            name: "MongoDB",
            icon: <MongoDbIcon {...iconSmall} />,
        },
        {
            name: "Next.js",
            icon: <NextJsIcon {...iconSmall} />,
        },
        {
            name: "PostgreSQL",
            icon: <PostgreSQLIcon {...iconSmall} />,
        },
        {
            name: "Ruby / Ruby On Rails",
            icon: <RubyIcon {...iconSmall} />,
        },
        {
            name: "TailwindCSS",
            icon: <TailwindCssIcon {...iconSmall} />,
        }
    ]
};

export const workingExperience : WorkingExperienceSectionText = {
    title: "Experiencia Laboral",
    description: "",
    jobs: [
        {
            title: "Mercado Libre",
            subtitle: "Software Engineer",
            fromTo: "2021 - 2025",
            items: [
                "Optimización de microservicios, aumentando performance al implementar código TypeScript mediante la utilización de buenas prácticas del lenguaje.",
                "Colaboración con diversos equipos para desarrollo e implementación de nuevas funcionalidades orientadas al usuario final.",
                "Recreación/implementación de diseños de UIs pixel-perfect mediante React y SCSS."
            ]
        },
        {
            title: "Serfe S.A.",
            subtitle: "Full Stack SSR developer",
            fromTo: "2017 - 2021",
            items: [
                "Desarrollo de sistemas web a medida para clientes procedentes del exterior.",
                "Diseño e implementación del back-end y front-end.",
                "Utilización de diferentes stacks tecnológicos para implementación de soluciones óptimas."
            ]
        },
        {
            title: "AcrilPal S.A.",
            subtitle: "Freelance developer",
            fromTo: "2016 - 2023",
            items: [
                "Diseño e implementación de un sistema de lotería para utilización en diferentes entes provinciales (Entre Ríos, Formosa, Chaco), con la capacidad de controlar PLCs para el manejo de bolillas, generación de estadísticas y visualización multi-dispositivos.",
            ]
        },
        {
            title: "Instituto Nacional de Enfermedades Respiratorias (INER)",
            subtitle: "Freelance developer",
            fromTo: "2015 - 2023",
            items: [
                "Desarrollo de un sistema web de estadística y seguimiento de enfermedades respiratorias de acceso nacional.",
                "Desarrollo de un sistema completo de vacunación para menores de edad, con foco en el seguimiento de pacientes. Creado para uso principal en sistemas desktop para los diferentes centros médicos de las localidades de Villa María, Gualeguaychú, Paraná y Concordia, y con funciones web para sincronización de datos y generación de estadísticas.",
            ]
        },
        {
            title: "Instituto Nacional de Enfermedades Respiratorias (INER)",
            subtitle: "Asesoría informática",
            fromTo: "2014 - 2015",
            items: [
                "Asesoría sobre actualización de equipamientos físicos y automatización de tareas cotidianas",
            ]
        }
    ]
};

const education: EducationSectionText = {
    title: "Educación",
    description: "",
    studies: [
        {
            title: "Ingeniería en Informática",
            subtitle: "Universidad Nacional del Litoral (UNL)",
            fromTo: "2008 - 2018",
            items: [
                "Graduado en la Facultad de Ingeniería y Ciencias Hídricas (FICH) de la Universidad Nacional del Litoral (UNL)",
            ]
        },
        {
            title: "Analista en Informática Aplicada",
            subtitle: "Universidad Nacional del Litoral (UNL)",
            fromTo: "2008 - 2012",
            items: [
                "Graduado en la Facultad de Ingeniería y Ciencias Hídricas (FICH) de la Universidad Nacional del Litoral (UNL)",
            ]
        },
        {
            title: "Bachiller Perito Mercantil",
            subtitle: 'EEMPI Nro. 8106 "Don Bosco"',
            fromTo: "1997 - 2001",
            items: [
                'Graduado en la Escuela de Enseñanza Media Particular Incorporada Nro. 8106 "Don Bosco"',
            ]
        }
    ]
}

const personalAchievements: AchievementsSectionText = {
    title: "Logros personales",
    description: "",
    achievements: [
        {
            title: "Web and Mobile UI Management",
            description: "Optimización de microservicios y mejora de interfaces mobile y web browser para aumentar la satisfacción de la navegación del usuario en un 25%."
        },
        {
            title: "Vaccination System Rollout",
            description: "Implementación de un sistema de vacunación en 4 ciudades, mejorando la eficiencia del proceso en un 50%."
        },
        {
            title: "Lottery System Maintenance",
            description: "Gestión y mantenimiento del sistema de lotería, logrando un tiempo de actividad del 99.9% durante 5 años."
        }
    ]
}

const idioms: LanguagesSectionText = {
    title: "Idiomas",
    description: "",
    languages: [
        "Inglés (Avanzado)",
        "Español (Nativo)",
        "Portugués (Básico)",
        "Japonés (Básico)"
    ]
}

export const personalInformation: CombinedSectionText = {
    title: "Información personal",
    description: "",
    sections: {
        education,
        idioms,
        personalAchievements,
    }
    
}
