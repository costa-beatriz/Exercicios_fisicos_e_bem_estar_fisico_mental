import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://vimslajwgmuanzohzydu.supabase.co";
const supabaseKey = "sb_publishable_wwJAaeTYapELQmcBD0qDKg_4DCUy1YU";

const supabase = createClient(supabaseUrl, supabaseKey);

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

  const { data: cadastro, error: erroCadastro } =
    await supabase.auth.signUp({
      email: email,
      password: senha
    });

  if (erroCadastro) {
    alert("Erro ao criar conta: " + erroCadastro.message);
    return;
  }

  const { data: usuario, error: erroUsuario } = await supabase
    .from("usuarios_db")
    .insert([
      {
        nome: nome,
        email: email
      }
    ])
    .select();

  if (erroUsuario) {
    console.log("Erro ao inserir usuário:", erroUsuario);
    return;
  }

  console.log("Usuário inserido:", usuario);

  alert("Conta criada com sucesso!");

  window.location.href = "perfil_index.html";
});