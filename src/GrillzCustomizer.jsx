import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Opções personalizáveis para os Grillz
const grillzOptions = {
  tipo: [
    { id: "grillz", name: "Grillz Completo", price: 1000, icon: "fa-gem" },
    { id: "cap", name: "Cap", price: 700, icon: "fa-crown" },
    { id: "mini", name: "Mini-Grillz", price: 500, icon: "fa-star" }
  ],
  material: [
    { id: "ouro", name: "Ouro 18K", price: 1200, color: "#FFD700" },
    { id: "prata", name: "Prata", price: 800, color: "#C0C0C0" },
    { id: "banhado", name: "Banhado a Ouro", price: 300, color: "#D4AF37" }
  ],
  acabamento: [
    { id: "cravejado", name: "Cravejado", price: 500, icon: "fa-diamond" },
    { id: "liso", name: "Liso", price: 0, icon: "fa-circle" },
    { id: "laser", name: "Laser", price: 300, icon: "fa-bolt" }
  ]
};

// Componente do Carrossel para seleção de opções
const Carousel = ({ title, options, selectedIndex, onChange }) => {
  const prev = () => onChange((selectedIndex - 1 + options.length) % options.length);
  const next = () => onChange((selectedIndex + 1) % options.length);

  return (
    <div className="border rounded-xl p-4 m-3 text-center shadow-lg bg-white">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
      <div className="flex justify-between items-center">
        <button 
          onClick={prev} 
          className="text-gray-600 p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex-1 mx-2">
          <div className="text-xl font-bold text-gray-800">
            {options[selectedIndex].name}
          </div>
          <div className="text-md text-blue-600 font-medium">
            R$ {options[selectedIndex].price.toFixed(2)}
          </div>
        </div>
        
        <button 
          onClick={next} 
          className="text-gray-600 p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// Visualização do Grillz sendo montado
const GrillzPreview = ({ tipo, material, acabamento }) => {
  return (
    <div className="flex justify-center items-center mb-5">
      <div className="relative">
        {/* Base do dente */}
        <div className="w-48 h-32 bg-white rounded-full border-4 border-gray-200"></div>
        
        {/* Grillz selecionado */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-5xl" style={{ color: material.color }}>
            <i className={`fas ${tipo.icon}`}></i>
          </div>
          
          {/* Detalhes do acabamento */}
          {acabamento.id === "cravejado" && (
            <div className="absolute top-2 right-2 text-yellow-500">
              <i className="fas fa-diamond text-xs"></i>
              <i className="fas fa-diamond text-xs ml-1"></i>
            </div>
          )}
          
          {acabamento.id === "laser" && (
            <div className="absolute bottom-2 left-2 text-blue-500">
              <i className="fas fa-bolt"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal
export default function GrillzCustomizer() {
  const [tipoIndex, setTipoIndex] = useState(0);
  const [materialIndex, setMaterialIndex] = useState(0);
  const [acabamentoIndex, setAcabamentoIndex] = useState(0);
  const [nomeCliente, setNomeCliente] = useState("");
  const [total, setTotal] = useState(0);

  // Atualiza o preço total sempre que as seleções mudarem
  useEffect(() => {
    const tipo = grillzOptions.tipo[tipoIndex];
    const material = grillzOptions.material[materialIndex];
    const acabamento = grillzOptions.acabamento[acabamentoIndex];
    
    setTotal(tipo.price + material.price + acabamento.price);
  }, [tipoIndex, materialIndex, acabamentoIndex]);

  // Gera o link para WhatsApp com as escolhas
  const generateWhatsAppLink = () => {
    const tipo = grillzOptions.tipo[tipoIndex];
    const material = grillzOptions.material[materialIndex];
    const acabamento = grillzOptions.acabamento[acabamentoIndex];
    
    const mensagem = `Olá Gabriel! Vi seu site e quero um Grillz personalizado:%0A%0A*Nome:* ${nomeCliente || "Não informado"}%0A*Tipo:* ${tipo.name}%0A*Material:* ${material.name}%0A*Acabamento:* ${acabamento.name}%0A%0A*Valor Total:* R$ ${total.toFixed(2)}%0A%0APode me enviar mais informações?`;
    
    return `https://wa.me/SEUNUMEROAQUI?text=${encodeURIComponent(mensagem)}`;
  };

  return (
    <div className="p-5">
      <header className="text-center py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-3xl font-bold mb-2">GRILLZ PERSONALIZADOS</h1>
        <p className="opacity-90">Monte seu Grillz perfeito em 3 passos</p>
      </header>

      <GrillzPreview
        tipo={grillzOptions.tipo[tipoIndex]}
        material={grillzOptions.material[materialIndex]}
        acabamento={grillzOptions.acabamento[acabamentoIndex]}
      />

      <Carousel
        title="Tipo de Grillz"
        options={grillzOptions.tipo}
        selectedIndex={tipoIndex}
        onChange={setTipoIndex}
      />

      <Carousel
        title="Material"
        options={grillzOptions.material}
        selectedIndex={materialIndex}
        onChange={setMaterialIndex}
      />

      <Carousel
        title="Acabamento"
        options={grillzOptions.acabamento}
        selectedIndex={acabamentoIndex}
        onChange={setAcabamentoIndex}
      />

      <div className="border rounded-xl p-4 m-3 text-center shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <h2 className="text-xl font-semibold text-gray-800">Resumo do Pedido</h2>
        <div className="my-3">
          <p className="text-lg text-gray-700">
            {grillzOptions.tipo[tipoIndex].name} + {grillzOptions.material[materialIndex].name} + {grillzOptions.acabamento[acabamentoIndex].name}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-medium text-gray-700">Total:</span>
          <span className="text-2xl font-bold text-green-600">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-3">
        <label className="block text-sm font-medium mb-2 text-gray-700">Seu nome</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Como devo te chamar?"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />
        
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
        >
          <i className="fab fa-whatsapp mr-2"></i> Finalizar pelo WhatsApp
        </a>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Seu pedido será enviado diretamente para o Gabriel</p>
        </div>
      </div>
    </div>
  );
}
