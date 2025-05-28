import { SectionPageElementText } from "@/models";
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

export const about: SectionPageElementText = {
    title: "Acerca de mí",
    description: "Esta es una aplicación de ejemplo creada con Next.js y Tailwind CSS, que además va a contener algo de mi persona y mis intereses. Espero que te guste.",
};

export const contact: SectionPageElementText = {
    title: "¿Cómo contactarme?",
    description: "Para llamarme, podés hacerlo al 1234567890. Para escribirme, puedes hacerlo a mi correo electrónico: juanpi17@gmail.com",
};

export const skills: SectionPageElementText = {
    title: "Habilidades",
    description: "Habilidades que tengo y que me gustaría aprender en el futuro.",
    primarySkills: [{
            name: "JavaScript",
            icon: <JavaScriptIcon width="48" height="48" />,
            description: '5+ años de experiencia en desarrollo web con JavaScript, incluyendo la creación de aplicaciones interactivas y dinámicas.',
        },
        {
            name: "TypeScript",
            icon: <TypeScriptIcon width="48" height="48" />,
            description: '3+ años de experiencia en desarrollo web con TypeScript, mejorando la calidad del código y la mantenibilidad de las aplicaciones.',
        },
        {
            name: "React",
            icon: <ReactIcon width="48" height="48" />,
            description: '5+ años de experiencia en desarrollo de aplicaciones web/webview/nativas con React: implementación "vanilla" y uso del framework Next.js.',
        },
        {
            name: "Node.js",
            icon: <NodeJsIcon width="48" height="48" />,
            description: '5+ años de experiencia en desarrollo de aplicaciones middle-end/back-end con Node.js, incluyendo la creación de APIs RESTful y servicios en tiempo real.',
        },
        {
            name: "Jest",
            icon: <JestIcon width="48" height="48" />,
            description: '3+ años de experiencia en pruebas unitarias y de integración con Jest, asegurando la calidad y confiabilidad del código.',
        }
    ],
    secondarySkills: [
        {
            name: "Angular",
            icon: <AngularIcon width="48" height="48" />,
        },
        {
            name: "C#",
            icon: <CSharpIcon width="48" height="48" />,
        },
        {
            name: "Docker",
            icon: <DockerIcon width="48" height="48" />,
        },
        {
            name: "Git / GitHub",
            icon: <GitIcon width="48" height="48" />,
        },
        {
            name: "Java",
            icon: <JavaIcon width="48" height="48" />,
        },
        {
            name: "MongoDB",
            icon: <MongoDbIcon width="48" height="48" />,
        },
        {
            name: "Next.js",
            icon: <NextJsIcon width="48" height="48" />,
        },
        {
            name: "PostgreSQL",
            icon: <PostgreSQLIcon width="48" height="48" />,
        },
        {
            name: "Ruby / Ruby On Rails",
            icon: <RubyIcon width="48" height="48" />,
        },
        {
            name: "TailwindCSS",
            icon: <TailwindCssIcon width="48" height="48" />,
        }
    ]
};
