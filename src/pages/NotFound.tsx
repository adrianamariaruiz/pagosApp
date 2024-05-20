import { Link, useRouteError } from "react-router-dom"

type ErrorResponse = {
  data: string;
  status: number;
  statusText: string;
  message?: string;
};

const NotFound = () => {

  const error = useRouteError() as ErrorResponse

  return (

    <div className="flex flex-col-reverse md:flex-row h-[650px] w-full justify-center items-center align-middle">
      <div className="text-center px-5">
        <h1>404</h1>
        <h2 className="text-danger">La página no existe</h2>
        <h4>{error.statusText || error.message}</h4>
        <Link to="/" className="hover:underline transition-all">Volver al Inicio</Link>
        <picture>
          <img src="./notFoundImage.jpeg" alt="Not Found" />
        </picture>
      </div>
    </div>
  )
}

export default NotFound