import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import currentFormat from '../helpers/currentFormat'

export type PaymentMethod =  'Efectivo' | 'Tarjeta'

export interface Data {
  estado: 'pendiente' | 'pagado'
  fecha?: Date
  id: string
  porcentaje: number
  titulo: string
  valor: number
  fechaPago?: Date
  metodoPago?: PaymentMethod
}

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

const initialId= crypto.randomUUID()
export const INITIAL_PAY = 182
export const CURRENCY_FORMAT = 'USD'
const FORMAT_COUNTRY = 'en-US'

export const useDataStore = create<State>()(
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
          metodoPago: 'Tarjeta'
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
          metodoPago: 'Tarjeta'
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
