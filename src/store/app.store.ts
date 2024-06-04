import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import currentFormat from '../helpers/currentFormat'
import { Data } from '../interfaces/data.interface'
import { mockUsersData } from '../helpers/mockData'
import { User } from '../interfaces/user.interface'

// toca hacer algo antes de entrar, que al seleccionar el cliente traiga de base de datos todo, y lo guarda en zustand
interface State {
  userId: string
  users: User[]
  data: Data[]
  temporalData: Data[]
  isEditable: boolean
  totalToPay: string
  userData: { [key: string]: Data[] };

  addTemporalData: (index:number,data: Data) => void
  changeIsEditable: ()=>void
  editTemporalDataItem: (index:number, data:Data)=>void
  saveToData: ()=>void
  setUserId: (info: string)=>void
  saveInitialData: (data: Data[], userId: string) => void
  getUserPayments: () => Data[];
}

// esto genera la opcion de usar la moneda que desee, la puse aca para poderla usar en cualquier parte del proyecto
// const initialId= crypto.randomUUID()
export const INITIAL_PAY = 182
export const CURRENCY_FORMAT = 'USD'
const FORMAT_COUNTRY = 'en-US'

export const useDataStore = create<State>()(
  
  persist(
    (set, get) => ({
      userId: '',
      isEditable:false,
      totalToPay: currentFormat(INITIAL_PAY, CURRENCY_FORMAT, FORMAT_COUNTRY),
      users: mockUsersData,
      userData: {},
      data: [],
      temporalData: [],

      // methods
      setUserId: (info: string) => set(() => ({userId: info})),
      


      saveInitialData: (data: Data[], userId: string) => set((state)=>{

        const currentDataIds = new Set((state.userData[userId] || []).map((item) => item.id));
        const uniqueNewData = data.filter((item) => !currentDataIds.has(item.id));
        
        return {
        userData: {
          ...state.userData,
          [userId]: [...(state.userData[userId] || []), ...uniqueNewData]
        },
        temporalData: userId === state.userId ? [...(state.userData[userId] || []), ...uniqueNewData] : state.temporalData,
        data: userId === state.userId ? [...(state.userData[userId] || []), ...uniqueNewData] : state.data
      }
    }),



      addTemporalData: (index:number, data: Data) => set((state)=>({
        temporalData: [...state.temporalData.slice(0,index), data, ...state.temporalData.slice(index)]
      })),

      changeIsEditable: ()=>set((state)=>({isEditable: !state.isEditable, data:[...state.temporalData]})),
      
      // guarda en la data original
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
      getUserPayments: () => {
        const state = get();
        return state.userData[state.userId] || [];
      }
    }),
    {
      name: 'data'
    }
  )
)
