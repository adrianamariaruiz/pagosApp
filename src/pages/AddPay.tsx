import { IoAddCircleOutline, IoCalendarClearOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { useDataStore} from '../store/app.store'
import { useCallback, useMemo } from 'react';
import { INITIAL_PAY } from './HomePage';
import DatePiker from 'react-datepicker'

const AddPay = ({dataId}:{dataId:string}) => {
  const newData = useDataStore((store)=>store.temporalData)
  const editTemporalData = useDataStore((store)=>store.editTemporalDataItem)

  const currentData = useMemo(()=>newData.find(nd=>nd.id===dataId),[newData, dataId])
  const currentIndex = useMemo(()=>newData.findIndex(nd=>nd.id===dataId),[newData, dataId])
  
  const indexToEdit = currentIndex === 0 ? 1 : currentIndex-1
  const getBeforeDate = newData[indexToEdit].fecha

  const handleChangeDate = useCallback( (value: Date) => {
    if(!currentData) return
    editTemporalData(
      currentIndex,
      {
        ...currentData,
        fecha:value
      }
    )
  }, [currentData, currentIndex, editTemporalData] )

  const handleChangeTitle = useCallback((value: string) => {
    if(!currentData) return
    editTemporalData(
      currentIndex,
      {
      ...currentData,
      titulo:value
    })
    },[currentData, editTemporalData, currentIndex]
  )
 
  const handlePayChange = useCallback((value: number) => {
    if(!currentData) return
    editTemporalData(
      currentIndex,
      {
      ...currentData,
      valor:value
    })
    },[currentData, editTemporalData, currentIndex]
  )

  const handleChangePercentage = useCallback((action:'add'|'remove')=>{
    if(!currentData || currentIndex===-1) return

    const newPercentage = action === 'add' ? currentData.porcentaje+1 : currentData.porcentaje-1;
    const nextCardPercentage = action === 'add' ? newData[indexToEdit].porcentaje-1 : newData[indexToEdit].porcentaje+1

    const totalPercentage = newData.reduce((acc, currentItem) => acc + currentItem.porcentaje, 0)
    console.log("Tta", totalPercentage)
    if(totalPercentage>100 || newPercentage<0 || nextCardPercentage<0)return

    editTemporalData(
      currentIndex,
      { 
      ...currentData, 
      porcentaje: newPercentage, valor: (newPercentage / 100) * INITIAL_PAY 
    })
    editTemporalData(
      indexToEdit,
      { 
      ...newData[indexToEdit], 
      porcentaje: nextCardPercentage, valor: (nextCardPercentage / 100) * INITIAL_PAY 
    })


  },[newData, currentData, editTemporalData, currentIndex, indexToEdit])

 

  if(!currentData){
    return <div>No se encontró la tarjeta</div>
  }

  return ( 
  <div
    className="w-48 flex flex-col items-center border border-blue-600 py-10 gap-2"
  >
    <button className="w-12 h-12 rounded-full border-2 border-tangerine-700"></button>
    <input
      className="font-bold w-full border border-graycustom rounded-sm px-1"
      value={currentData.titulo}
      onChange={(e) => handleChangeTitle(e.target.value)}
    />

    <div className="flex border border-graycustom rounded-sm px-1">
      <input
        className="font-semibold w-full outline-none"
        value={Number.isInteger(currentData.valor) ? currentData.valor : currentData.valor.toFixed(1)}
        onChange={(e) => handlePayChange(Number(e.target.value))}
      />
      <span className="text-graycustom">USD</span>
    </div>

    <div className="flex gap-4">
      <button 
      onClick={() => handleChangePercentage('remove')}
      >
        <IoRemoveCircleOutline className="h-6 w-6 text-tangerine-700" />
      </button>
      <div>
        <input
          className="font-semibold w-full outline-none"
          value={Number.isInteger(currentData.porcentaje) ? currentData.porcentaje : currentData.porcentaje.toFixed(1)}
         //onChange={(e) => hanldeChangePercentage(currentData.porcentaje, Number(e.target.value))}
        />
        <span>%</span>
      </div>
      <button 
        onClick={() => handleChangePercentage('add')}
      >
        <IoAddCircleOutline className="h-6 w-6 text-tangerine-700 ml-2" />
      </button>
    </div>

    <div className="w-full font-semibold">
      <p className="text-graycustom">Vence</p>
      <div className="flex gap-1 item-center">
         <DatePiker 
          className='flex w-full'
          selected={currentData.fecha}
          onChange={(date)=>handleChangeDate(date ?? new Date())} 
          placeholderText={!currentData.fecha && 'Seleccionar'}
          minDate={getBeforeDate}
          dateFormat="dd/MM/yyyy"

          showIcon
          icon= {<IoCalendarClearOutline className="h-4 w-4 text-tangerine-700"/>}
          toggleCalendarOnIconClick
         />
      </div>
    </div>
  </div> );
}
 
export default AddPay;