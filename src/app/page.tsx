"use client"; // Diretiva necessária para habilitar o uso de hooks no componente
import Image from "next/image";
import CapaCarros from '/public/capacarros.jpg';
import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [threeDigitNumber, setThreeDigitNumber] = useState("");
  const [character, setCharacter] = useState<string | null>(null);
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(true); // Estado para controlar a visibilidade do formulário

  // Função para formatar o número para XXXX XXXX XXXX XXXX
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = value.replace(/(\d{4})(\d)/, "$1 $2") // Insere espaço após os 4 primeiros dígitos
                                 .replace(/(\d{4}) (\d{4})(\d)/, "$1 $2 $3") // Insere espaço após os 8 primeiros dígitos
                                 .replace(/(\d{4} \d{4}) (\d{4})(\d)/, "$1 $2 $3") // Insere espaço após os 12 primeiros dígitos
                                 .trim(); // Remove espaços no início e no final
    setNumber(formattedValue);
  };

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
      let characterName: string | null = null;
      let characterImg: string | null = null;

      if (num < 50 && threeDigitNum < 500) {
        characterName = "Relâmpago McQueen";
        characterImg  = "/mcqueen.png";
      } else if (num >= 50 && threeDigitNum >= 500) {
        characterName = "Mate";
        characterImg = "/mater.jpg";
      } else if (parseInt(date.slice(3, 7)) < 2000) { // Pegando o ano da data
        characterName = "Doc Hudson";
        characterImg = "/docHudson.jpg";
      } else {
        characterName = "Sally Carrera";
        characterImg = "/sally.jpg";
      }

      setCharacter(characterName);
      setCharacterImage(characterImg);
      setFormVisible(false); // Esconde o formulário após a submissão
    } else {
      setCharacter("Preencha todos os campos corretamente.");
      setCharacterImage(null); // Limpa a imagem em caso de erro
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
        <h2 className="text-2xl font-bold mb-4 text-center">Descubra qual personagem do filme Carros você é!</h2>
        {formVisible ? (
          <>
            <div className="flex flex-col items-center justify-center">
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
                  type="text" 
                  placeholder="XXXX XXXX XXXX XXXX" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  maxLength={19} 
                  value={number}
                  onChange={handleNumberChange}
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
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                    if (value.length <= 3) {
                      setThreeDigitNumber(value); // Atualiza o estado se o valor tiver 3 dígitos ou menos
                    }
                  }}
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
          </>
        ) : (
          <div>
            <h3>Legal, você é: {character}</h3>
            {characterImage && (
              <img src={characterImage} alt={character ?? "Personagem"} style={{ width: '200px', height: 'auto' }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
