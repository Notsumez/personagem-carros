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

  // Função que define o personagem baseado nos inputs
  const determineCharacter = () => {
    const num = parseInt(number);
    const threeDigitNum = parseInt(threeDigitNumber);

    if (!isNaN(num) && !isNaN(threeDigitNum) && date) {
      // Lógica simples para determinar um personagem baseado nos valores
      if (num < 50 && threeDigitNum < 500) {
        setCharacter("Relâmpago McQueen");
      } else if (num >= 50 && threeDigitNum >= 500) {
        setCharacter("Mate");
      } else if (parseInt(date.slice(3, 7)) < 2000) { // Pegando o ano da data
        setCharacter("Doc Hudson");
      } else {
        setCharacter("Sally Carrera");
      }
    } else {
      setCharacter("Preencha todos os campos corretamente.");
    }
  };

  // Função que será disparada ao submeter o formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    determineCharacter();
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
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">Digite aqui o número do seu cartão de crédito.</label>
            <input 
              type="number" 
              placeholder="XXXX XXXX XXXX XXXX" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              maxLength={19} 
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required 
            />
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
            <input 
              type="number" 
              placeholder="XXX" 
              className="w-full p-2 border border-gray-300 rounded-md"
              maxLength={3} 
              value={threeDigitNumber}
              onChange={(e) => setThreeDigitNumber(e.target.value)}
              required
              min="100"
              max="999"
            />
          </div>
          <br />
          <div className="flex items-center justify-center">
            <button type="submit" className="font-medium hover:font-bold px-4 py-2 hover:px-5 border-black border-2 rounded transition">Descobrir!</button>
          </div>
          <br />
        </form>

        {character && <h3>Você é: {character}</h3>}
      </div>
    </div>
  );
}
