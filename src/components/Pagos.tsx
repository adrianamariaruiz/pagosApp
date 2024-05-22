import { useCallback, useMemo, useState } from "react"
import ModalPaid from "./ModalPaid"
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5"
import { CURRENCY_FORMAT, PaymentMethod, useDataStore } from "../store/app.store"
import AddPay from "./AddPay"
import BtnAddPay from "./BtnAddPay"
import { dataFormatMonths } from "../helpers/dataFormatMonths"

const Pagos = () => {

  const { data, saveToData, temporalData, editTemporalDataItem, addTemporalData, changeIsEditable, isEditable } = useDataStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)
  const [dataId, setDataId] = useState('')

  const currentData = useMemo(() => temporalData.find(nd => nd.id === dataId), [temporalData, dataId])
  const currentIndex = useMemo(() => temporalData.findIndex(nd => nd.id === dataId), [temporalData, dataId])

  const opacityButton = useCallback(() => {
    if (temporalData.length > 1) {
      return 'opacity-0'
    } else {
      return 'opacity-100'
    }
  }, [temporalData])

  const handleClick = (id: string) => {
    setDataId(id)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const savePaid = () => {
    // cambiar el estado a pagado
    handleChangePay(new Date())

    // guardar en la data definitiva una copia
    saveToData()
    closeModal()
  }

  const handleChangePay = useCallback((value: Date) => {
    if (!currentData) return
    editTemporalDataItem(
      currentIndex,
      {
        ...currentData,
        fechaPago: value,
        estado: "pagado"
      })
  }, [currentData, editTemporalDataItem, currentIndex]
  )

  const deletePaid = () => {
    // aca hago un delete al api para eliminar la informacion de pago
    closeModal()
  }

  // guardo el metodo de pago en la data temporal
  const onChangeMethodPay = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    // Aca haria un post al backend para guardar la opcion que eligio el usuario
    if (!currentData) return
    editTemporalDataItem(
      currentIndex, {
      ...currentData,
      metodoPago: e.target.value as PaymentMethod
    }
    )
  }, [currentData, currentIndex, editTemporalDataItem])


  const handleAddCard = useCallback((index: number) => {
    if (!isEditable) {
      changeIsEditable();
    }

    if (temporalData[index].estado === 'pagado') {
      const nextPendingIndex = temporalData.findIndex((item, i) => i > index && item.estado === 'pendiente')

      if (nextPendingIndex !== -1) {
        const totalValue = temporalData[nextPendingIndex].valor;
        const totalPercentage = temporalData[nextPendingIndex].porcentaje;

        addTemporalData(nextPendingIndex + 1, {
          id: crypto.randomUUID(),
          titulo: 'Pago ' + (temporalData.length + 1),
          valor: totalValue / 2,
          porcentaje: totalPercentage / 2,
          estado: 'pendiente',
          fechaPago: temporalData[index].fechaPago
        })
        editTemporalDataItem(
          nextPendingIndex,
          {
            id: temporalData[index].id,
            titulo: temporalData[index].titulo,
            valor: totalValue / 2,
            porcentaje: totalPercentage / 2,
            estado: temporalData[index].estado,
            fecha: temporalData[index].fecha,
            metodoPago: temporalData[index].metodoPago,
            fechaPago: temporalData[index].fechaPago
          })
      } else {
        console.error('No hay pagos pendientes para dividir.');
        return
      }
    } else {
      const totalValue = temporalData[index].valor
      const totalPercentage = temporalData[index].porcentaje

      addTemporalData(index + 1, {
        id: crypto.randomUUID(),
        titulo: 'Pago ' + (temporalData.length + 1),
        valor: totalValue / 2,
        porcentaje: totalPercentage / 2,
        estado: 'pendiente',
        fechaPago: temporalData[index].fechaPago
      })
      editTemporalDataItem(
        index,
        {
          id: temporalData[index].id,
          titulo: temporalData[index].titulo,
          valor: totalValue / 2,
          porcentaje: totalPercentage / 2,
          estado: temporalData[index].estado,
          fecha: temporalData[index].fecha,
          metodoPago: temporalData[index].metodoPago,
          fechaPago: temporalData[index].fechaPago
        })
    }

  }, [addTemporalData, temporalData, changeIsEditable, isEditable, editTemporalDataItem])

  const formatDate = (dateToFormat: string) => {
    const [day, month, year] = dateToFormat.split('/')
    const monthName = dataFormatMonths(month)
    return `${day} ${monthName}, ${year}`;
  }

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
                        <BtnAddPay handleAddCard={handleAddCard} index={index} opacityButton={opacityButton} />
                      }
                    </div>
                  )
                })
                :
                data.map((item, index) => {
                  return (
                    <div key={item.id} className="flex flex-row">
                      <div className="relative w-36 flex flex-col items-center border bg-green-400 py-10 px-2">

                        {
                          item.estado === 'pendiente' ?
                            <>
                              <button
                                className="w-12 h-12 rounded-full border-2 border-tangerine-700 flex justify-center items-center"
                                onClick={() => handleClick(item.id)}
                                disabled={temporalData[index - 1]?.estado === 'pendiente'}
                              >
                                <IoPencilSharp className="h-5 w-5 text-tangerine-700 font-light opacity-0 hover:opacity-100 transition-opacity duration-75 absolute" />
                              </button>
                            </>
                            :
                            <>
                              <div
                                className="w-12 h-12 text-xl rounded-full z-50 border-2 border-green-700 bg-green-700 flex justify-center items-center"
                              >
                                🎉
                              </div>
                              <hr className="border border-green-700 w-1/2 absolute right-0 top-16" />
                            </>
                        }
                        <p className="font-bold">{item.titulo}</p>
                        <p className="font-semibold">{Number.isInteger(item.valor) ? item.valor : item.valor.toFixed(1)} {CURRENCY_FORMAT} <span>({Number.isInteger(item.porcentaje) ? item.porcentaje : item.porcentaje.toFixed(1)}%)</span></p>
                        {
                          item.estado === 'pagado'
                            ? <div className="text-green-700"><p>{item.estado}</p> <p>{formatDate(new Date(item?.fechaPago ?? '').toLocaleDateString())}</p> <p>con {item.metodoPago}</p></div>
                            : <span>{formatDate(new Date(item?.fecha ?? '').toLocaleDateString())}</span>
                        }
                      </div>

                      {
                        (data.length - 1 !== index || index === 0) &&
                        <BtnAddPay handleAddCard={handleAddCard} index={index} opacityButton={opacityButton} />

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
                <select name="paid" id="paid" className="border-2 border-graycustom-400 rounded-md p-2" onChange={onChangeMethodPay}>
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
              <button
                className="h-10 bg-tangerine-700 text-white rounded-md px-4 hover:bg-tangerine-600 outline-none focus:outline-none"
                onClick={savePaid}
              >Guardar</button>
            </div>
          </main>
        </section>
      </ModalPaid>

    </>
  )
}

export default Pagos