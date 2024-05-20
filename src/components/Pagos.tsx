import { useCallback, useState } from "react"
import ModalPaid from "./ModalPaid"
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5"
import { useDataStore } from "../store/app.store"
import AddPay from "../pages/AddPay"
import BtnAddPay from "./BtnAddPay"

const Pagos = () => {

  const { data, temporalData, addTemporalData, changeIsEditable, isEditable } = useDataStore((state) => state)

  const [isOpen, setIsOpen] = useState(false)
  const [saveDate, setSaveDate] = useState<Date | undefined>()
  const [payMethod, setPayMethod] = useState('')

  const handleClick = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const savePaid = () => {
    // aca hago un post al api para guardar la informacion de pago
    setSaveDate(new Date())
    closeModal()
  }

  const deletePaid = () => {
    // aca hago un delete al api para eliminar la informacion de pago
    closeModal()
  }

  const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Aca haria un post al backend para guardar la opcion que eligio el usuario
    setPayMethod(e.target.value)
  }
  console.log(payMethod)

  const handleAddCard = useCallback((index: number) => {
    if (!isEditable) {
      changeIsEditable()
    }
    addTemporalData(index + 1, {
      id: crypto.randomUUID(),
      totalCobrar: 182,
      titulo: 'Pago ' + (temporalData.length + 1),
      valor: 0,
      porcentaje: 0,
      estado: 'pendiente'
    })
  }, [addTemporalData, temporalData, changeIsEditable, isEditable])

  return (
    <>

      <div className="relative">

        {/* body */}
        <div className="flex justify-center border border-lime-500">
          <div className="w-[900px] flex border border-red-600 overflow-x-auto whitespace-nowrap">

            {
              isEditable
                ?
                temporalData.map((item, index) => {
                  return (
                    <div key={item.id} className="flex flex-row">
                      <AddPay
                        dataId={item.id}
                      />
                      {
                        (temporalData.length - 1 !== index) &&
                        <BtnAddPay handleAddCard={handleAddCard} index={index}/>
                      }
                    </div>
                  )
                })
                :
                data.map((item, index) => {
                  return (
                    <div key={item.id} className="flex flex-row">
                      <div  className="w-32 flex flex-col items-center border border-fuchsia-500 py-10 px-2">
                        <button className="w-12 h-12 rounded-full border-2 border-tangerine-700 flex justify-center items-center relative" onClick={handleClick}>
                          <IoPencilSharp className="h-5 w-5 text-tangerine-700 font-light opacity-0 hover:opacity-100 transition-opacity duration-75 absolute" />
                        </button>
                        <p className="font-bold">{item.titulo}</p>
                        <p className="font-semibold">{Number.isInteger(item.valor) ? item.valor : item.valor.toFixed(1)} USD <span>({Number.isInteger(item.porcentaje) ? item.porcentaje : item.porcentaje.toFixed(1)}%)</span></p>
                        {
                          !saveDate ? <span>{new Date(item?.fecha ?? '').toLocaleDateString()}</span> : <span>{new Date(saveDate).toLocaleDateString()}</span>
                        }
                      </div>

                      {
                        (data.length - 1 !== index || index===0) &&
                        <BtnAddPay handleAddCard={handleAddCard} index={index}/>
                        
                      }

                    </div>
                  )
                })
            }

          </div>
        </div>

      </div>

      <ModalPaid
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <section className="border border-red-500 py-2">
          <p>Selecciona metodo de pago.</p>

          <main className="flex flex-col sm:flex-row border border-green-500 justify-between">
            <form action="submit" >
              <label htmlFor="paid" className="flex flex-col pt-5">
                <span>Estado</span>
                <select name="paid" id="paid" className="border-2 border-graycustom-400 rounded-md p-2" onChange={selectOption}>
                  <option value="">Selecciona</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </label>
            </form>

            <div className="flex mt-5 justify-center gap-5 items-end">
              <button className="h-10 text-graycustom" onClick={deletePaid}>
                <IoTrashOutline className="h-6 w-6" />
              </button>
              <button className="h-10 bg-tangerine-700 text-white rounded-md px-4 hover:bg-tangerine-600 outline-none focus:outline-none" onClick={savePaid}>Guardar</button>
            </div>
          </main>
        </section>
      </ModalPaid>

    </>
  )
}

export default Pagos