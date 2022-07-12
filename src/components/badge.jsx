export const BadgeComponent = ({ text, ...props }) => {
  return (
    <div className="flex space-x-2">
      <div {...props} className="text-sm px-3 bg-red-100 text-red-600 rounded-full">{text}</div>

    </div>
  )
}