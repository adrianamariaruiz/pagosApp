import { IoChevronDown, IoPencilSharp } from "react-icons/io5"
import Pagos from "../components/Pagos"
import { CURRENCY_FORMAT, useDataStore } from "../store/app.store"
import { useState } from "react"

const HomePage = () => {

   const isEditable = useDataStore((store)=>store.isEditable)
   const changeIsEditable = useDataStore((store)=>store.changeIsEditable)
   const totalToPay = useDataStore((store)=>store.totalToPay)
   const saveToData = useDataStore((store)=>store.saveToData)
   const newData = useDataStore((store) => store.temporalData)

   const [isSaveDate, setIsSaveDate] = useState(true)
   
   const onClickSaveData = () => {
    const isSaveDateSet = newData.every((item) => item.fecha !== undefined)
    setIsSaveDate(isSaveDateSet)

    if(!isSaveDateSet) return

    saveToData()
    changeIsEditable()
   }

  return (
    <div className="m-4">
      {/* header */}
      <div className="flex justify-between my-10">
        <div className="text-tangerine text-xl font-bold flex items-center gap-2">
          <p>Pagos</p>
          <IoChevronDown className="h-full w-5 text-tangerine font-light flex items-end"/>
        </div>

        {
          !isSaveDate && <p className="text-tangerine font-bold text-xl">Porfavor escoja una fecha en el calendario</p>
        }
           

        <div className="flex gap-5">
          <div className="flex justify-center items-center gap-1 text-tangerine-600 font-semibold">
            {
              isEditable ?
              <>
              <div className="flex justify-center items-center gap-1 text-tangerine-600 font-semibold">
                <button className="h-10 bg-tangerine text-white rounded-md px-4" onClick={onClickSaveData}>Guardar</button>
              </div>
              </>
              :
              <button onClick={changeIsEditable} className="flex gap-1 justify-center items-center hover:cursor-pointer">
                Editar
                <IoPencilSharp className="h-5 w-5 text-tangerine font-light" />
              </button>
            }
          </div>
          <div className="flex gap-2">
            <p className="text-graycustom">Por cobrar</p>
            <p className="font-bold text-xl">{totalToPay} {CURRENCY_FORMAT}</p>
          </div>
        </div>
      </div>

      <Pagos />

    </div>
  )
}

export default HomePage