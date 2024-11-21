interface CardProps {
  name: string,
  image: string,
  selected: boolean,
  onClick: () => void,
}

export default function Card({ name, image, selected, onClick }: CardProps) {
  return (
    <div onClick={onClick} className={`px-4 py-2.5 border-2 ${selected ? "border-green-500 bg-green-50" : "border-gray-200 hover:bg-gray-100"} transition-colors rounded-2xl relative cursor-pointer`}>
      <svg className={`w-6 h-6 fill-green-500 absolute top-2 right-2 transition-transform ${selected ? "scale-1" : "scale-0"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
      <img src={image} alt={name} className="aspect-square" />
      <p className="mt-2 font-medium text-center">{name}</p>
    </div>
  )
}