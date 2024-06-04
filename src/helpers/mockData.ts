import { User } from "../interfaces/user.interface"

// export const mockData = [
//   {
//     id: '1',
//     totalCobrar: 182,
//     titulo: 'Anticipo',
//     valor: 54.6,
//     porcentaje: 30,
//     fecha: '22 Ene, 2022',
//     estado: 'pendiente' 
//   },
//   {
//     id: '2',
//     totalCobrar: 182,
//     titulo: 'Pago 1',
//     valor: 36.4,
//     porcentaje: 20,
//     fecha: '24 Feb, 2022',
//     estado: 'pendiente' 
//   },
//   {
//     id: '3',
//     totalCobrar: 182,
//     titulo: 'Pago 2',
//     valor: 72.8,
//     porcentaje: 40,
//     fecha: '20 Mar, 2022',
//     estado: 'pendiente' 
//   },
// ]

export const mockUsersData: User[] = [
  {
    id: '12345',
    nombreUsuario: 'Esteban',
    pagoTotal: 182,
    pagos: [
      {
        id: '6af3e074-5e64-4e50-8035-5f56cab0c84a',
        estado: 'pendiente',
        fecha: new Date('2023-08-06'),
        porcentaje: 100,
        titulo: 'pago 1',
        valor: 182,
        fechaPago: undefined,
        metodoPago: undefined,
      }
    ]
  },
  {
    id: '67890',
    nombreUsuario: 'Maria',
    pagoTotal: 182,
    pagos: [
      {
        id: '7af3e074-5e64-4e50-8136-5f56cab0c84a',
        estado: 'pendiente',
        fecha: new Date('2024-05-05'),
        // porcentaje: 100,
        // titulo: 'pago 1',
        // valor: 182,
        porcentaje: 80,
        titulo: 'pago 1',
        valor: 145.6,
        fechaPago: undefined,
        metodoPago: undefined,
      },
      {
        id: '8af3e074-5e64-4e50-8237-5f56cab0c84a',
        estado: 'pendiente',
        fecha: new Date('2024-06-05'),
        porcentaje: 20,
        titulo: 'pago 2',
        valor: 36.4,
        fechaPago: undefined,
        metodoPago: undefined,
      },
    ]
  },
  
]

 