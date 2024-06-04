import { useNavigate } from "react-router-dom";
// import { mockUsersData } from "../helpers/mockData"
import { useDataStore } from "../store/app.store";
import { useCallback } from "react";

const ListPage = () => {

  const setUserId = useDataStore((state) => state.setUserId)
  const users = useDataStore((state) => state.users)
  const saveInitialData = useDataStore((state) => state.saveInitialData)

  const navegate = useNavigate();

  const selectOption = useCallback( (userId: string) => {
    setUserId(userId);

    const initialData = users.find(paymentData => paymentData.id === userId)

    saveInitialData(initialData?.pagos || [], userId)
    navegate("/pagos");
  }, [navegate, saveInitialData, setUserId, users] )

  return (
    <>
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Lista de Pagos</h3>
              </div>
            </div>
          </div>

          <div className="w-full p-10 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-tangerine-700 text-white font-bold">
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Nombre
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Ver pagos
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => selectOption(user.id)}
                    className="cursor-pointer hover:bg-tangerine-600 hover:text-white"
                  >
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.id}</td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.nombreUsuario}</td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">Ver pagos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

export default ListPage