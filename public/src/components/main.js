// Import components
import Nav    from './nav';
import Routes from './routes';
import { useLocation } from 'react-router-dom';

const Main = () => {
  const location = useLocation();

  return (
    <main className={
      `flex flex-col 2xl:flex-row min-h-screen ` +
      `${(!location.pathname.startsWith("/certificate") &&
          !location.pathname.startsWith("/labels")) &&
          !location.pathname.startsWith("/rawspec") ?
            "bg-gradient-to-br from-black via-gray-900 to-blue-900" :
            "bg-white"}`}>
      <Nav />
      <div className="p-4 w-full flex min-h-screen">
        <Routes />
      </div>

    </main>
  )
}

export default Main;
