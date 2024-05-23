import { metodosPago } from "../validations/dataSchema"

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

export type PaymentMethod = (typeof metodosPago)[number]
