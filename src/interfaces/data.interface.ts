import { metodosPago } from "../validations/dataSchema"

export interface Data {
  id: string
  estado: 'pendiente' | 'pagado'
  fecha?: Date
  porcentaje: number
  titulo: string
  valor: number
  fechaPago?: Date
  metodoPago?: PaymentMethod
}

export type PaymentMethod = (typeof metodosPago)[number]
