import { supabase } from "./supabaseClient.js";

async function carregarAvatar() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  document.querySelectorAll(".item-perfil").forEach(el => el.style.display = "none");
  document.querySelectorAll(".continuar-sem-login").forEach(el => el.style.display = "none");
  document.querySelectorAll(".link-sair").forEach(el => el.style.display = "block");
  document.querySelectorAll(".voltar-inicio").forEach(el => el.style.display = "block");

  const { data: perfil, error } = await supabase
    .from("usuarios_db")
    .select("nome")
    .eq("email", user.email)
    .single();

  if (error || !perfil) return;

  const nome = encodeURIComponent(perfil.nome.trim());
  const avatarImg = document.querySelector("#avatarConteudo img");

  avatarImg.src = `https://ui-avatars.com/api/?name=${nome}&color=fff&size=64`;
}

document.querySelectorAll(".link-sair").forEach(link => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
});

carregarAvatar();