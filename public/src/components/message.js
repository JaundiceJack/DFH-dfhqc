const Message = ({ error, warning, info, success }) => {
  const msgColor = error   ? "bg-red-300" :
                   warning ? "bg-yellow-300" :
                   info    ? "bg-blue-300" :
                   success ? "bg-green-300" :
                             "bg-gray-300";
  return (
    <div className={" px-2 py-2 font-semibold text-black rounded-lg " +
                   " border-l border-gray-500  " +
                   " fadeError flex items-center justify-center "+msgColor}>
      {error ? error : warning ? warning : info ? info : success ? success : ""}
    </div>
  )
}

export default Message;
