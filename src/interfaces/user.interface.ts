import { Data } from "./data.interface";

export interface User {
  id: string;
  nombreUsuario: string;
  pagoTotal: number;
  pagos: Data[];
}