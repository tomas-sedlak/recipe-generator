import Spinner from "./Spinner";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "white";
    className?: string;
    loading?: boolean;
    [key: string]: any;
}

export default function Button({ children, variant = "primary", loading = false, className, ...props }: ButtonProps) {
    return (
        <button className={`${variant === "secondary" ? "bg-gray-200" : variant === "white" ? "bg-gray-200" : "bg-purple-600"} rounded-lg ${className && className}`} {...props}>
            <span className={`${variant === "secondary" ? "text-gray-900 bg-gray-100" : variant === "white" ? "text-gray-900 bg-white" : "text-white bg-purple-500"} w-full inline-flex items-center justify-center gap-2 text-lg font-semibold rounded-lg px-5 py-2.5 translate-y-[-4px] active:translate-y-0 transition-transform relative`}>
                <span className={`${loading ? 'invisible' : 'visible'} inline-flex items-center justify-center gap-2 text-lg font-semibold`}>
                    {children}
                </span>
                {loading && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Spinner color={variant === "secondary" ? "dark" : "light"} />
                    </span>
                )}
            </span>
        </button>
    )
}
