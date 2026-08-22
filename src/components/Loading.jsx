const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary ${sizeMap[size]}`}
      />
      <p className="mt-3 text-gray-600 text-sm">{text}</p>
    </div>
  )
}

export default Loading
