import { IoPencilSharp } from "react-icons/io5"
import Pagos from "../components/Pagos"
import { useDataStore } from "../store/app.store"

export const INITIAL_PAY = 182

const HomePage = () => {

   const isEditable = useDataStore((store)=>store.isEditable)
   const changeIsEditable = useDataStore((store)=>store.changeIsEditable)

  const totalValue = 182

  return (
    <div className="m-4">
      {/* header */}
      <div className="flex justify-between my-10">
        <div className="text-tangerine-600 text-xl font-bold">Pagos</div>

        <div className="flex gap-5">
          <div className="flex justify-center items-center gap-1 text-tangerine-600 font-semibold">
            {
              isEditable ?
              <>
              <div 
                className="flex justify-center items-center gap-1 text-tangerine-600 font-semibold"
              >
                <button className="h-10 bg-tangerine-700 text-white rounded-md px-4" onClick={changeIsEditable}>Guardar</button>
              </div>
              </>
              :
              <div onClick={changeIsEditable} className="flex gap-1 justify-center items-center hover:cursor-pointer">
                <p>Editar</p>
                <IoPencilSharp className="h-5 w-5 text-tangerine-700 font-light" />
              </div>
            }
          </div>
          <div className="flex gap-2">
            <p className="text-graycustom">Por cobrar</p>
            <p className="font-bold text-xl">{totalValue} USD</p>
          </div>
        </div>
      </div>

      <Pagos />

    </div>
  )
}

export default HomePage