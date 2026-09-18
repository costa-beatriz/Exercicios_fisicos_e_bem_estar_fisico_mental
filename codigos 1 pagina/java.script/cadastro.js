import { supabase } from "./supabaseClient.js";

const cadastroForm = document.getElementById("cadastroForm");

cadastroForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não são iguais!");
    return;
  }

  const { data: cadastro, error: erroCadastro } = await supabase.auth.signUp({
    email: email,
    password: senha
  });

  if (erroCadastro) {
    alert("Erro ao criar conta: " + erroCadastro.message);
    return;
  }

  const { data: usuario, error: erroUsuario } = await supabase
    .from("usuarios_db")
    .insert([{ nome: nome, email: email }])
    .select();

  if (erroUsuario) {
    console.log("Erro ao inserir usuário:", erroUsuario);
    return;
  }

  await supabase.auth.signOut();

  alert("Conta criada com sucesso! Faça login para continuar.");
  window.location.href = "perfil_index.html";
});