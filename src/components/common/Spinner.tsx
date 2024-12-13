export default function Spinner({ color = "dark" }: { color?: string }) {
    return (
        <div className={`w-5 h-5 border-2 border-t-2 ${color === "dark" ? "border-gray-900" : "border-white"} border-t-purple-500 rounded-full animate-spin`}></div>
    )
}
