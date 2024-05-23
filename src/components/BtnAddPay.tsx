import { IoAdd } from "react-icons/io5"

interface Props {
  index: number
  opacityButton: ()=>void
  handleAddCard: (index:number) => void
}

const BtnAddPay = ({handleAddCard, index, opacityButton}: Props) => {
  return (
    <div className="w-24 py-12 px-5">
      <div className={`flex flex-col items-center ${opacityButton()} hover:opacity-100`}>
        <button
          className="z-50 w-10 h-10 rounded-full bg-graycustom-400 text-tangerine-700 flex justify-center items-center"
          onClick={() => handleAddCard(index)}
        >
          <IoAdd className="z-50 h-7 w-7 text-tangerine-700 font-bold" />
        </button>
        <p className="py-2 text-xs text-graycustom">Agregar Pago</p>
      </div>
    </div>
  )
}

export default BtnAddPay