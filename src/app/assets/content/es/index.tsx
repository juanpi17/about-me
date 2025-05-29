import { BasicSectionText, SkillsSectionText, SVGSkillIcons, WorkingExperienceSectionText } from "@/types";
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

const iconBig: SVGSkillIcons = {
    width: '48',
    height: '48',
};

const iconSmall = {
    width: '32',
    height: '32',
};

export const about: BasicSectionText = {
    title: "Acerca de mí",
    description: "Sólida formación en el desarrollo de soluciones web a medida con énfasis en el diseño visual, con más de 5+ años de experiencia en JavaScript y 3+ años de especialización en TypeScript y tests unitarios.  Enfoque en innovación y mejora de la experiencia del usuario a través de desarrollo de software robusto. Aprendizaje continuo y adaptación a nuevos desafíos.",
};

export const contact: BasicSectionText = {
    title: "¿Cómo contactarme?",
    description: "Para llamarme, podés hacerlo al 1234567890. Para escribirme, puedes hacerlo a mi correo electrónico: juanpi17@gmail.com",
};

export const skills: SkillsSectionText = {
    title: "Habilidades",
    description: "Habilidades principales y secundarias con las que trabajé a lo largo de mi carrera profesional:",
    primarySkillsTitle: "Habilidades principales",
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
    secondarySkillsTitle: "Habilidades complementarias",
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
    description: "Experiencias laborales destacadas de los últimos años",
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
            subtitle: "Full Stack SSR Developer",
            fromTo: "2017 - 2021",
            items: [
                "Desarrollo de sistemas web a medida para clientes procedentes del exterior.",
                "Diseño e implementación del back-end y front-end.",
                "Utilización de diferentes stacks tecnológicos para implementación de soluciones óptimas."
            ]
        },
        {
            title: "AcrilPal S.A.",
            subtitle: "Freelance development",
            fromTo: "2016 - 2023",
            items: [
                "Diseño e implementación de un sistema de lotería para utilización en diferentes entes provinciales (Entre Ríos, Formosa, Chaco), con la capacidad de controlar PLCs para el manejo de bolillas, generación de estadísticas y visualización multi-dispositivos.",
            ]
        },
        {
            title: "Instituto Nacional de Enfermedades Respiratorias (INER)",
            subtitle: "Freelance development",
            fromTo: "2015 - 2023",
            items: [
                "Desarrollo de un sistema web de estadística y seguimiento de enfermedades respiratorias de acceso nacional.",
                "Desarrollo de un sistema completo de vacunación para menores de edad, con foco en el seguimiento de pacientes. Creado para uso principal en sistemas desktop para los diferentes centros médicos de las localidades de Villa María, Gualeguaychú, Paraná y Concordia, y con funciones web para sincronización de datos y generación de estadísticas.",
            ]
        }
    ]
};