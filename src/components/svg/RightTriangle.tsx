import SVGProps from "./svg";

export default function RightTriangle(props: SVGProps) {
    return (
        <svg
            width="800px"
            height="800px"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
        <path d="M6 11L6 4L10.5 7.5L6 11Z" />
        </svg>
    )
}