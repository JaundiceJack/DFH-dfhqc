const Message = ({ error, warning, info, success, extraClasses="" }) => {
  const msgColor = error   ? "bg-red-300" :
                   warning ? "bg-yellow-300" :
                   info    ? "bg-blue-300" :
                   success ? "bg-green-300" :
                             "bg-gray-300";
  return (
    <div className={" my-4 mx-4 px-2 py-2 font-semibold text-black rounded-lg " +
                   " border-l border-gray-500  " +
                   " fadeError flex items-center justify-center "+msgColor+" "+extraClasses}>
      {error ? error : warning ? warning : info ? info : success ? success : ""}
    </div>
  )
}

export default Message;
