import { snakeCase } from "lodash";

interface PreviewProps {
    folder: string;
    items: string[];
    className?: string;
}

export default function Preview({ folder, items, className }: PreviewProps) {
    return (
        <div className={`aspect-square bg-gray-100 border-2 border-gray-200 rounded-2xl p-4 ${className}`}>
            <div className="relative">
                {items.map((item) =>
                    <img key={item} src={`/images/${folder}/${snakeCase(item)}_stack.png`} alt={item} className="absolute top-0 left-0" />
                )}
            </div>
        </div>
    )
}
