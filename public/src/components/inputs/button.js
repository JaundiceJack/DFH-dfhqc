
const Button = ({color, text, icon, onClick, disabled=false, type='button', title, extraClasses}) => {
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75 text-black " +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75 flex flex-row items-center justify-center " +
                   " focus:outline-none focus:ring-2 focus:ring-yellow-500 ";
  return (
    <button className={buttonCs+" "+color+" "+extraClasses}
            onClick={onClick}
            type={type}
            title={title}
            disabled={disabled}>
      {icon}{text}
    </button>
  );
};

export default Button;
