
interface ModalPaidProps extends React.PropsWithChildren {
  isOpen: boolean
  closeModal: () => void;
}

const ModalPaid = ({isOpen, closeModal, children}: ModalPaidProps) => {

  return (
    <div className={`${isOpen ? 'flex' : 'hidden'} z-50  absolute inset-0 bg-black bg-opacity-70 justify-center items-center`}>
      <div className="w-full flex justify-center">
        <div className="mt-10 bg-white sm:w-1/2 max-w-[500px] p-4 rounded-lg shadow-md border border-graycustom">
          <header className="flex justify-between text-xl font-bold">
            <p>Pagar</p>
            <button onClick={closeModal}>x</button>
          </header>

          {children}
          
        </div>
      </div>
    </div>
  )
}

export default ModalPaid