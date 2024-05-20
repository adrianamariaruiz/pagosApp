import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Data {
  estado: 'pendiente' | 'pagado'
  fecha?: Date
  id: string
  porcentaje: number
  titulo: string
  totalCobrar: number
  valor: number
}

interface State {
  data: Data[]
  temporalData: Data[]
  isEditable: boolean
  addData: (index:number,data: Data) => void
  addTemporalData: (index:number,data: Data) => void
  changeIsEditable: ()=>void
  editTemporalDataItem: (index:number, data:Data)=>void
}


export const useDataStore = create<State>()(
  persist(
    (set) => ({
      isEditable:false,
      data: [
        {
          id: crypto.randomUUID(),
          totalCobrar: 182,
          titulo: 'Anticipo',
          valor: 182,
          porcentaje: 100,
          fecha: new Date('2024-05-05'),
          estado: 'pendiente' 
        },
      ],
      temporalData: [
        {
          id: crypto.randomUUID(),
          totalCobrar: 182,
          titulo: 'Anticipo',
          valor: 182,
          porcentaje: 100,
          fecha: new Date('2024-05-05'),
          estado: 'pendiente' 
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
      editTemporalDataItem: (index, data)=>{
        set((state)=>({
          temporalData: state.temporalData.map((td, i)=>{
            if(i===index){
              return data
            }
            return td
        })}))
      }
    }),
    {
      name: 'data'
    }
  )
)

// updateProductQuantity: (product: CartProduct, quantity: number) => {
//   const { cart } = get();

//   const updateQuantity = cart.map( (item) => {
//     if (item.id === product.id && item.size === product.size) {
//       return { ...item, quantity: quantity };
//     }
//     return item;
//   } )

//   set({cart: updateQuantity})
// },

//   // actualiza (agrego) la cantidad de productos por talla en el carrito
//   const updatedCartProducts = cart.map((item) => {
//     if (item.id === product.id && item.size === product.size) {
//       return { ...item, quantity: item.quantity + product.quantity };
//     }

//     return item;
//   });

//   set({ cart: updatedCartProducts });
// },

// export const useUiStore = create<State>()((set) => ({
//   isSideMenuOpen: false,
//   openSideMenu: () => set({isSideMenuOpen: true}),
//   closeSideMenu: () => set({isSideMenuOpen: false})
// }))