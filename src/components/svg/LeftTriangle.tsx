import SVGProps from "./svg";

export default function LeftTriangle(props: SVGProps) {
    return (
        <svg
        width="800px"
        height="800px"
        viewBox="0 0 15 15"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        >
            <path d="M9 4L9 11L4.5 7.5L9 4Z" />
        </svg>
    )
}