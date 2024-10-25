import Image from "next/image";
import CapaCarros from '/public/capacarros.jpg';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg bg-white border-black border-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Descubra qual personagem do filme Carros você é!</h2>
          <Image 
            src={CapaCarros}
            alt="Capa filme Carros"
            className="w-72 rounded"
            />
        </div>
        <br />
        <form>
          <div>
            <label className="block mb-2 font-medium">Digite aqui o número do seu cartão de crédito.</label>
            <input type="number" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-2 border border-gray-300 rounded-md" maxLength={19} required />
          </div>
          <br />
          <div>
            <label className="block mb-2 font-medium">Digite aqui a data de validade do seu cartão de crédito.</label>
            <input type="number" placeholder="MM/AAAA" className="w-full p-2 border border-gray-300 rounded-md" maxLength={7} required/>
          </div>
          <br />
          <div>
            <label className="block mb-2 font-medium">Digite aqui o código de segurança do seu cartão de crédito.</label>
            <input type="number" placeholder="XXX" className="w-full p-2 border border-gray-300 rounded-md" maxLength={3} required/>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <button type="submit" className="font-medium hover:font-bold px-4 py-2 hover:px-5 border-black border-2 rounded transition">Descobrir!</button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
