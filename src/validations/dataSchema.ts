import {z} from 'zod'


//Realice 2 schemas diferentes porque en la dataArrayValidation es para usarla en el momento de agregar un pago y ahi debe validar un array que en ese momento tiene metodoPago y fechaPago en undefined y dataRequiredSchema se usa en el momento de guardar el metodoPago y fechaPago, en ese momento ya debe tener toda la otra información.

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



