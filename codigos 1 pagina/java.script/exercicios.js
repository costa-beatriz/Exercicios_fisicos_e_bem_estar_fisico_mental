import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://vimslajwgmuanzohzydu.supabase.co";

const supabaseKey = "SUA_CHAVE";

const supabase = createClient(supabaseUrl, supabaseKey);


async function buscarExercicios() {
  const { data, error } = await supabase
    .from("exercicios")
    .select("*");

  if (error) {
    console.log("Erro:", error);
    return;
  }

  console.log("Exercícios encontrados:", data);

  const lista = document.querySelector("#lista-exercicios");

  data.forEach(function (exercicio) {
    lista.innerHTML += `
      <div>
        <h3>${exercicio.nome}</h3>
        <p>${exercicio.descricao}</p>
        <p>Categoria: ${exercicio.categoria}</p>
        <p>Dificuldade: ${exercicio.dificuldade}</p>
        <p>Duração: ${exercicio.duracao} minutos</p>
      </div>
    `;
  });
}


buscarExercicios();