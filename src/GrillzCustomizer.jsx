import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const grillzOptions = {
  material: [
    { name: "Ouro", price: 1200 },
    { name: "Prata", price: 800 },
    { name: "Ouro Branco", price: 1500 }
  ],
  cravejado: [
    { name: "Sim", price: 500 },
    { name: "Não", price: 0 }
  ],
  formato: [
    { name: "Top 6", price: 0 },
    { name: "Top 8", price: 300 },
    { name: "Completo", price: 800 }
  ]
};

const Carousel = ({ title, options, selectedIndex, onChange }) => {
  const prev = () => onChange((selectedIndex - 1 + options.length) % options.length);
  const next = () => onChange((selectedIndex + 1) % options.length);

  return (
    <div className="border rounded-xl p-4 m-2 text-center shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex justify-between items-center">
        <button onClick={prev} className="text-gray-600 p-2">
          <ChevronLeft />
        </button>
        <div>
          <div className="text-xl font-bold">{options[selectedIndex].name}</div>
          <div className="text-sm text-gray-500">R$ {options[selectedIndex].price}</div>
        </div>
        <button onClick={next} className="text-gray-600 p-2">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default function GrillzCustomizer() {
  const [materialIndex, setMaterialIndex] = useState(0);
  const [cravejadoIndex, setCravejadoIndex] = useState(0);
  const [formatoIndex, setFormatoIndex] = useState(0);
  const [nomeCliente, setNomeCliente] = useState("");

  const material = grillzOptions.material[materialIndex];
  const cravejado = grillzOptions.cravejado[cravejadoIndex];
  const formato = grillzOptions.formato[formatoIndex];

  const total = material.price + cravejado.price + formato.price;

  const mensagem = `Olá, quero fazer um Grillz com:%0A%0ANome: ${nomeCliente || "(não informado)"}%0AMaterial: ${material.name}%0ACravejado: ${cravejado.name}%0AFormato: ${formato.name}%0APreço: R$ ${total}`;
  const linkWhatsapp = `https://wa.me/SEUNUMERO?text=${mensagem}`;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Personalize seu Grillz</h1>
      <Carousel title="Material" options={grillzOptions.material} selectedIndex={materialIndex} onChange={setMaterialIndex} />
      <Carousel title="Cravejado" options={grillzOptions.cravejado} selectedIndex={cravejadoIndex} onChange={setCravejadoIndex} />
      <Carousel title="Formato" options={grillzOptions.formato} selectedIndex={formatoIndex} onChange={setFormatoIndex} />
      <div className="border rounded-xl p-4 mt-4 text-center shadow bg-white">
        <h2 className="text-xl font-semibold">Preço Total</h2>
        <p className="text-2xl font-bold text-green-600">R$ {total}</p>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium mb-1">Seu nome</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 mb-4"
          placeholder="Digite seu nome"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl transition"
        >
          Finalizar Pedido via WhatsApp
        </a>
      </div>
    </div>
  );
}
