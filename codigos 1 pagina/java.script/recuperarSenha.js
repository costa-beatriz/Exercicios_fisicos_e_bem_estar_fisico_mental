
import { supabase } from "./supabaseClient.js";
 
const recuperarForm = document.getElementById("recuperarForm");
 
recuperarForm.addEventListener("submit", async (event) => {
  event.preventDefault();
 
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const novaSenha = document.getElementById("novaSenha").value;
 
  const { data: { session } } = await supabase.auth.getSession();
 
  const resposta = await fetch(
    "https://vimslajwgmuanzohzydu.supabase.co/functions/v1/quick-endpoint",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (session ? session.access_token : "")
      },
      body: JSON.stringify({ nome, email, novaSenha })
    }
  );
 
  const resultado = await resposta.json();
 
  if (!resposta.ok) {
    alert(resultado.error || "Não foi possível redefinir a senha.");
    return;
  }
 
  alert("Senha redefinida com sucesso! Faça login com a nova senha.");
  window.location.href = "perfil_index.html";
});