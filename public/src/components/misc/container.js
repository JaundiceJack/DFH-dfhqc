import Divider from './divider.js';
import Spinner from './spinner.js';

const Container = ({ title, contents, loading, extraClasses }) => {
  return (
    <div className={
      "bg-gray-600 rounded text-blue-100 border-l-2 border-gray-500 flex flex-col " +
      extraClasses
    } style={{minHeight: 150+"px"}}>
      <h2 className={
        "text-lg text-left text-blue-200 font-semibold " +
        "px-2 py-1 rounded-t bg-gradient-to-t from-gray-700 to gray-800"
      }>
        {title}
      </h2>
      <Divider />
      {loading ?
        <Spinner extraClasses="" /> :
        <div className="flex flex-col p-2">
          {contents}
        </div>
      }
    </div>
  )
}

export default Container;
