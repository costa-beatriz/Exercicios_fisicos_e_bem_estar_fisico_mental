import { supabase } from "./supabaseClient.js";

const contatoForm = document.getElementById("contatoForm");

contatoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const notas = document.getElementById("notas").value;

  const retornoSelecionado = document.querySelector('input[name="retorno"]:checked');
  const retorno = retornoSelecionado ? retornoSelecionado.value : null;

  const { error } = await supabase
    .from("contatos_db")
    .insert([
      {
        nome: nome,
        email: email,
        telefone: telefone,
        mensagem: notas,
        retorno: retorno
      }
    ]);

  if (error) {
    alert("Erro ao enviar mensagem: " + error.message);
    console.log(error);
    return;
  }

  alert("Mensagem enviada com sucesso! Responderemos em breve.");
  contatoForm.reset();
});