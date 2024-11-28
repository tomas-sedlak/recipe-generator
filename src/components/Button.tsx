interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    [key: string]: any;
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
    return (
        <button className={`${variant === "secondary" ? "bg-gray-200" : "bg-green-600"} rounded-lg ${className}`} {...props}>
            <span className={`${variant === "secondary" ? "text-gray-900 bg-gray-100" : "text-white bg-green-500"} block  text-lg font-semibold rounded-lg px-5 py-2.5 translate-y-[-4px] active:translate-y-0 transition-transform`}>
                {children}
            </span>
        </button>
    )
}
