import { IoAddCircleOutline, IoCalendarClearOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { CURRENCY_FORMAT, useDataStore } from '../store/app.store'
import { useCallback, useMemo } from 'react';
import DatePiker from 'react-datepicker'

interface Props {
  dataId: string
}

const AddPay = ({ dataId }: Props) => {
  const newData = useDataStore((store) => store.temporalData)
  const editTemporalData = useDataStore((store) => store.editTemporalDataItem)
  const totalToPay = useDataStore((store) => store.totalToPay)
  const initialPay = Number(totalToPay)

  const currentData = useMemo(() => newData.find(nd => nd.id === dataId), [newData, dataId])
  const currentIndex = useMemo(() => newData.findIndex(nd => nd.id === dataId), [newData, dataId])

  const indexToEdit = currentIndex === 0 ? 1 : currentIndex - 1

  const handleChangeDate = useCallback((value: Date) => {
    if (!currentData) return
    console.log(value)
    editTemporalData(
      currentIndex,
      {
        ...currentData,
        fecha: value
      }
    )
  }, [currentData, currentIndex, editTemporalData])

  const handleChangeTitle = useCallback((value: string) => {
    if (!currentData) return
    editTemporalData(
      currentIndex,
      {
        ...currentData,
        titulo: value
      })
  }, [currentData, editTemporalData, currentIndex]
  )

  const handlePayChange = useCallback((value: number) => {
    if (!currentData) return
    editTemporalData(
      currentIndex,
      {
        ...currentData,
        valor: value
      })
  }, [currentData, editTemporalData, currentIndex]
  )

  const handleChangePercentage = useCallback((action: 'add' | 'remove') => {
    if (!currentData || currentIndex === -1) return

    const totalPercentage = newData.reduce((acc, currentItem) => acc + currentItem.porcentaje, 0)

    const newPercentage = action === 'add' ? currentData.porcentaje + 1 : currentData.porcentaje - 1;
    const nextCardPercentage = action === 'add' ? newData[indexToEdit].porcentaje - 1 : newData[indexToEdit].porcentaje + 1

    if (totalPercentage > 100 || newPercentage < 0 || nextCardPercentage < 0) return

    // modifica la card actual
    editTemporalData(
      currentIndex,
      {
        ...currentData,
        porcentaje: newPercentage, valor: (newPercentage / 100) * initialPay
      })

    if ((currentIndex !== 0) && (newData[indexToEdit].estado === 'pagado')) {
      const beforeCardPercentage = action === 'add' ? newData[currentIndex + 1].porcentaje - 1 : newData[currentIndex + 1].porcentaje + 1

      // modifica la siguiente
      editTemporalData(
        currentIndex + 1,
        {
          ...newData[currentIndex + 1],
          porcentaje: beforeCardPercentage, valor: (beforeCardPercentage / 100) * initialPay
        })
    } else {
      // modifica la card anterior
      editTemporalData(
        indexToEdit,
        {
          ...newData[indexToEdit],
          porcentaje: nextCardPercentage, valor: (nextCardPercentage / 100) * initialPay
        })
    }
  }, [newData, currentData, editTemporalData, currentIndex, indexToEdit, initialPay])

  if (!currentData) {
    return <div>No se encontró la tarjeta</div>
  }

  return (
    <div
      className="w-36 flex flex-col items-center py-10 gap-2"
    >
      {
        currentData.estado === 'pagado'
          ? <div className="w-12 h-12 text-xl rounded-full z-50 border-2 border-green-700 bg-green-700 flex justify-center items-center">
            🎉
          </div>
          : <button className="w-12 h-12 rounded-full border-2 border-tangerine-700"></button>
      }
      <input
        className="font-bold w-full border border-graycustom rounded-sm px-1"
        value={currentData.titulo}
        disabled={currentData.estado === 'pagado'}
        onChange={(e) => handleChangeTitle(e.target.value)}
      />

      <div className="flex border border-graycustom rounded-sm px-1">
        <input
          className="font-semibold w-full outline-none"
          value={Number.isInteger(currentData.valor) ? currentData.valor : currentData.valor.toFixed(1)}
          disabled={currentData.estado === 'pagado'}
          onChange={(e) => handlePayChange(Number(e.target.value))}
        />
        <span className="text-graycustom">{CURRENCY_FORMAT}</span>
      </div>

      <div className="flex gap-4">
        <button
          disabled={currentData.estado === 'pagado'}
          onClick={() => handleChangePercentage('remove')}
        >
          <IoRemoveCircleOutline className="h-6 w-6 text-tangerine-700" />
        </button>
        <div>
          <p className="font-semibold w-full outline-none">
            {Number.isInteger(currentData.porcentaje) ? currentData.porcentaje : currentData.porcentaje.toFixed(1)} <span>%</span>
          </p>
        </div>
        <button
          disabled={currentData.estado === 'pagado'}
          onClick={() => handleChangePercentage('add')}
        >
          <IoAddCircleOutline className="h-6 w-6 text-tangerine-700 ml-2" />
        </button>
      </div>

      <div className="w-full font-semibold">
        <p className="text-graycustom">Vence</p>
        <div className="flex gap-1 item-center">
          <DatePiker
            disabled={currentData.estado === 'pagado'}
            className='flex w-full'
            selected={currentData.fecha}
            onChange={(date) => handleChangeDate(date ?? new Date())}
            placeholderText={!currentData.fecha ? 'Seleccionar' : ''}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            required

            showIcon
            icon={<IoCalendarClearOutline className="h-4 w-4 text-tangerine-700" />}
            toggleCalendarOnIconClick
          />
        </div>
      </div>
    </div>);
}

export default AddPay;