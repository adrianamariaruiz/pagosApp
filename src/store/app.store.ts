import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import currentFormat from '../helpers/currentFormat'
import { Data } from '../interfaces/data.interface'

// Usé Zustand para el manejo de estado global porque es escalable, fácil y tiene el persist() para el manejo del localStoage

interface State {
  data: Data[]
  temporalData: Data[]
  isEditable: boolean
  totalToPay: string
  addData: (index:number,data: Data) => void
  addTemporalData: (index:number,data: Data) => void
  changeIsEditable: ()=>void
  editTemporalDataItem: (index:number, data:Data)=>void
  editDataItem: (index:number, data:Data)=>void
  saveToData: ()=>void
}

// esto genera la opcion de usar la moneda que desee, la puse aca para poderla usar en cualquier parte del proyecto
const initialId= crypto.randomUUID()
export const INITIAL_PAY = 182
export const CURRENCY_FORMAT = 'USD'
const FORMAT_COUNTRY = 'en-US'

export const useDataStore = create<State>()(
  // use persist porque es una forma muy sencilla que tiene Zustand para usar el localStorage
  persist(
    (set) => ({
      isEditable:false,
      totalToPay: currentFormat(INITIAL_PAY, CURRENCY_FORMAT, FORMAT_COUNTRY),
      data: [
        {
          id: initialId,
          titulo: 'Anticipo',
          valor: 182,
          porcentaje: 100,
          fecha: new Date('2024-05-05'),
          estado: 'pendiente',
          metodoPago: undefined,
          fechaPago: undefined
        },
      ],
      temporalData: [
        {
          id: initialId,
          titulo: 'Anticipo',
          valor: 182,
          porcentaje: 100,
          fecha: new Date('2024-05-05'),
          estado: 'pendiente',
          metodoPago: undefined,
          fechaPago: undefined
        },
      ],

      // methods
      addData: (index:number, data: Data) => set((state)=>({
        data: [...state.data.slice(0,index), data, ...state.data.slice(index)]
      })),


      addTemporalData: (index:number, data: Data) => set((state)=>({
        temporalData: [...state.temporalData.slice(0,index), data, ...state.temporalData.slice(index)]
      })),
      changeIsEditable: ()=>set((state)=>({isEditable: !state.isEditable, data:[...state.temporalData]})),
      
      saveToData: ()=>set((state)=>({data:[...state.temporalData]})),
      
      editTemporalDataItem: (index, data)=>{
        set((state)=>({
          temporalData: state.temporalData.map((td, i)=>{
            if(i===index){
              return data
            }
            return td
        })}))
      },
      editDataItem: (index, info)=>{
        set((state)=>({
          data: state.data.map((td, i)=>{
            if(i===index){
              return info
            }
            return td
        })}))
      },
    }),
    {
      name: 'data'
    }
  )
)
