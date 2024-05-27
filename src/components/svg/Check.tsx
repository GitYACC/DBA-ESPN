import SVGProps from "./svg"

export default function Check(props: SVGProps) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24" 
            strokeWidth={3}
            className={props.className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    )
}