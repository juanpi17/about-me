import { SVGIcons } from "@/types";

export const PhoneIcon = (props: SVGIcons) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
    <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
    <path
      d="M8 30h32v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z"
      fill="#2F88FF"
      stroke="#000"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M40 30V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v24"
      stroke="#000"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path d="M22 37h4" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
  </svg>
);
