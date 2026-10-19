/*
  CONFIGURAÇÃO OBRIGATÓRIA:
  Troque o valor abaixo pelo número comercial da Top Fort, com código do país e DDD,
  somente números. Exemplo de formato: 5521999999999.
*/
const WHATSAPP_NUMBER = "CONFIGURE_SEU_NUMERO";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelectorAll("[data-interest]").forEach(link => {
  link.addEventListener("click", () => {
    const interest = document.querySelector("#interest");
    const value = link.dataset.interest;
    const matchingOption = [...interest.options].find(option => option.textContent === value);
    if (matchingOption) interest.value = matchingOption.value;
  });
});

document.querySelector("#quote-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Olá, Top Fort! Gostaria de solicitar um orçamento.",
    "",
    `Nome: ${data.get("name")}`,
    `Interesse: ${data.get("interest")}`,
    `Cidade/região da obra: ${data.get("region")}`,
    `Quantidade aproximada: ${data.get("quantity") || "Não informada"}`,
    `Detalhes: ${data.get("details") || "Não informados"}`
  ].join("\n");
  const status = document.querySelector("#form-status");
  if (!/^\d{12,15}$/.test(WHATSAPP_NUMBER)) {
    status.textContent = "O formulário está validado, mas o WhatsApp ainda não foi configurado. Edite a variável WHATSAPP_NUMBER em script.js com o número comercial da empresa.";
    return;
  }
  status.textContent = "Abrindo o WhatsApp com sua mensagem. Revise e envie para concluir o contato.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
document.querySelector("#year").textContent = new Date().getFullYear();
