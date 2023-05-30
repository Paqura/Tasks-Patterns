type TIconProps = {
    className?: string
}

export const Icon: React.FC<TIconProps> = ({ className }) => {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle
                cx="7.5"
                cy="7.5"
                r="7"
                transform="rotate(-90 7.5 7.5)"
                fill="#F3F4F5"
                stroke="#FC3E24"
            />
            <ellipse
                cx="7.5"
                cy="7.5"
                rx="3.5"
                ry="3.5"
                transform="rotate(-90 7.5 7.5)"
                fill="#FC3E24"
            />
        </svg>
    )
}
