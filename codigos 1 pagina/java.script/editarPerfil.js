
import { supabase } from "./supabaseClient.js";
 
const form = document.getElementById("editarPerfilForm");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("novaSenha");
const avatarGrande = document.querySelector("#avatarGrande img");
 
async function carregarDados() {
  const { data: { user } } = await supabase.auth.getUser();
 
  if (!user) {
    window.location.href = "perfil_index.html";
    return;
  }
 
  inputEmail.value = user.email;
 
  const { data: perfil, error } = await supabase
    .from("usuarios_db")
    .select("nome")
    .eq("email", user.email)
    .single();
 
  if (error || !perfil) return;
 
  inputNome.value = perfil.nome;
 
  const nome = encodeURIComponent(perfil.nome.trim());
  avatarGrande.src = `https://ui-avatars.com/api/?name=${nome}&color=fff&size=128`;
}
 
form.addEventListener("submit", async (event) => {
  event.preventDefault();
 
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
 
  const novoNome = inputNome.value.trim();
  const novaSenha = inputSenha.value.trim();
 
  const { error: erroNome } = await supabase
    .from("usuarios_db")
    .update({ nome: novoNome })
    .eq("email", user.email);
 
  if (erroNome) {
    alert("Erro ao atualizar nome: " + erroNome.message);
    return;
  }
 
  if (novaSenha) {
    const { error: erroSenha } = await supabase.auth.updateUser({
      password: novaSenha
    });
 
    if (erroSenha) {
      alert("Erro ao atualizar senha: " + erroSenha.message);
      return;
    }
  }
 
  alert("Perfil atualizado com sucesso!");
  window.location.href = "index.html";
});
 
carregarDados();
 










