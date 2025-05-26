import { SectionPageElementText } from "@/app/models";
import { JavaScriptIcon } from "@/app/_components/svg/javascriptIcon";
import { JestIcon } from "@/app/_components/svg/jestIcon";
import { NodeJsIcon } from "@/app/_components/svg/nodeJsIcon";
import { ReactIcon } from "@/app/_components/svg/reactIcon";
import { TypeScriptIcon } from "@/app/_components/svg/typescriptIcon";

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
    additional: [{
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

        // "React",
        // "Next.js",
        // "Tailwind CSS",
        // "Node.js",
        // "Express.js",
        // "MongoDB",
        // "PostgreSQL",
        // "GraphQL",
        // "Docker",
    ],
};
