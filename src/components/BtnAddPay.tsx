import { IoAdd } from "react-icons/io5"

interface Props {
  index: number
  opacityButton: ()=>void
  handleAddCard: (index:number) => void
}

const BtnAddPay = ({handleAddCard, index, opacityButton}: Props) => {
  return (
    <div className="w-24 border border-green-600 py-12 px-5">
      <div className={`flex flex-col items-center ${opacityButton()} hover:opacity-100 border`}>
      {/* <div className="flex flex-col items-center  opacity-0 hover:opacity-100 border"> */}
        <button
          className="w-10 h-10 rounded-full bg-graycustom-400 text-tangerine-700 flex justify-center items-center"
          onClick={() => handleAddCard(index)}
        >
          <IoAdd className="h-7 w-7 text-tangerine-700 font-bold" />
        </button>
        <p className="py-2 text-xs text-graycustom">Agregar Pago</p>
      </div>
    </div>
  )
}

export default BtnAddPay