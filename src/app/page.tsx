import Image from "next/image";
import CapaCarros from '/public/capacarros.jpg';

export default function Home() {
  return (
    <div className="container">
      <h2 className="">Descubra qual personagem do filme Carros você é!</h2>
      <Image 
        src={CapaCarros}
        alt="Capa filme Carros"
        className="w-72"
      />
      <form>
        <div>
          <label>Digite aqui o número do seu cartão de crédito.</label>
          <input type="number" required />
        </div>
        <div>
          <label>Digite aqui a data de validade do seu cartão de crédito.</label>
          <input type="number" placeholder="MM/AAAA" maxLength={7} required/>
        </div>
        <div>
          <label>Digite aqui o código de segurança do seu cartão de crédito.</label>
          <input type="number" placeholder="XXX" maxLength={3} required/>
        </div>
        <button type="submit">Descobrir!</button>
      </form>
    </div>
  );
}
