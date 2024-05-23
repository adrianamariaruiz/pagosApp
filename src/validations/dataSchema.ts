import {z} from 'zod'

export const metodosPago = ['Efectivo','Tarjeta'] as const;

export const dataSchema = z.object({
  estado: z.string(),
  fecha: z.date({
    errorMap: () => ({
      message: "Porfavor seleccione una fecha en el calendario"
    })
  }),
  id: z.string(),
  porcentaje: z.number(),
  titulo: z.string(),
  valor: z.number(),
  fechaPago: z.date({
    errorMap: () => ({
      message: "Porfavor seleccione un método de pago"
    })
  }).optional(),
  metodoPago: z.enum(metodosPago, {
    errorMap: () => ({
      message: "Porfavor seleccione una opción"
    })
  }).optional()
})

export const dataArrayValidation = z.array(dataSchema)

export const dataRequiredSchema = z.object({
  estado: z.string(),
  fecha: z.date({
    errorMap: () => ({
      message: "Porfavor seleccione una fecha en el calendario"
    })
  }),
  id: z.string(),
  porcentaje: z.number(),
  titulo: z.string(),
  valor: z.number(),
  fechaPago: z.date({
    errorMap: () => ({
      message: "Porfavor seleccione un método de pago"
    })
  }).optional(),
  metodoPago: z.enum(metodosPago, {
    errorMap: () => ({
      message: "Porfavor seleccione una opción"
    })
  })
})



