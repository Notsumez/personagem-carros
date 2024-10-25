"use client"; // Diretiva necessária para habilitar o uso de hooks no componente
import Image from "next/image";
import CapaCarros from '/public/capacarros.jpg';
import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [threeDigitNumber, setThreeDigitNumber] = useState("");
  const [character, setCharacter] = useState<string | null>(null);

  // Função para formatar o input no padrão MM/YYYY
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2); // Insere a barra após o mês
    }

    // Limita a entrada a 7 caracteres (MM/YYYY)
    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    setDate(value);
  };
  
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
            <input 
              type="text" 
              placeholder="MM/AAAA" 
              value={date} 
              maxLength={7} 
              onChange={handleDateChange} 
              className="w-full p-2 border border-gray-300 rounded-md" 
              required
            />
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
