export default function EmptyList() {
  return (
    <div className="flex flex-col items-center p-5 h-[600px]">
      <img src="./illustration-empty.svg" alt="empty" />
      <h2 className="pb-5 pt-16 text-4xl font-bold text-gray-800">
        Let's get you started
      </h2>
      <p className="max-w-[49rem] text-center text-xl text-gray-500">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We're here to help you share
        your profiles with everyone!
      </p>
    </div>
  )
}
