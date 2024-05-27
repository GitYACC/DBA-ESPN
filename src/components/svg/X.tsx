import SVGProps from "./svg"

export default function X(props: SVGProps) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24" 
            strokeWidth={3} 
            className={props.className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}