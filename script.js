(() => {
  "use strict";

  const chapters = [
    {
      title: "Mundos Diferentes",
      eyebrow: "O som como ponte",
      text: "Uma série sobre quem transforma trabalho de bastidor em pertencimento na experiência do público — da operação ao acolhimento, da pesquisa à imagem.",
      image: "https://images.pexels.com/photos/6860821/pexels-photo-6860821.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Grupo diverso cantando junto em um encontro musical",
      theme: "lime"
    },
    {
      title: "Encontro Geracional",
      eyebrow: "Memórias em comum",
      text: "A música como território compartilhado entre quem viveu diferentes épocas, mas reconhece no mesmo refrão uma história, um afeto e um futuro.",
      image: "https://images.pexels.com/photos/8412363/pexels-photo-8412363.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Pai e filha assistindo juntos a uma apresentação musical",
      theme: "pink"
    },
    {
      title: "Espaço Plural",
      eyebrow: "Pertencimento em ação",
      text: "Cobertura de um espaço que converte valores em encontros: sua narrativa, as pessoas que o fazem existir e as ativações que convidam à escuta e à mudança.",
      image: "https://images.pexels.com/photos/16521726/pexels-photo-16521726.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Pessoas diversas reunidas em um festival ao ar livre",
      theme: "cyan"
    }
  ];

  const filters = [
    ["todos", "Todos"], ["acessibilidade", "Acessibilidade"], ["acolhimento", "Acolhimento"],
    ["pluralidade", "Pluralidade"], ["geracoes", "Gerações"], ["social", "Impacto social"], ["pesquisa", "Pesquisa"]
  ];

  const coverage = [
    ["Central de Acessibilidade", "acessibilidade", "prioridade", "Espaço, serviços, fluxo, staffs e público"],
    ["Sala sensorial", "acessibilidade", "prioridade", "Ambiente, recursos e cuidado sem expor crises"],
    ["Kit sensorial", "acessibilidade", "prioridade", "Itens, orientação de uso e benefício"],
    ["Kit Livre e plataformas", "acessibilidade", "prioridade", "Autonomia, visibilidade e contexto de uso"],
    ["Mochila-pirulito", "acessibilidade", "planejado", "Equipe em deslocamento e identificação visual"],
    ["PCD nos brinquedos", "acessibilidade", "planejado", "Participação, preparação e emoção"],
    ["Libras nos telões", "acessibilidade", "prioridade", "Enquadramento que mostre show e tradução"],
    ["Espaço com cães", "acessibilidade", "confirmar", "Validar operação antes de pautar"],
    ["Espaço Plural", "pluralidade", "prioridade", "Narrativa, equipe, ativações e público"],
    ["Espaço Delas", "acolhimento", "prioridade", "Estrutura, rede de apoio e atendimento"],
    ["Pró-Medula", "pluralidade", "planejado", "Informação, mobilização e possíveis presenças"],
    ["Espaços de Acolhimento", "acolhimento", "prioridade", "Ambientes, staffs e orientação"],
    ["Equipe no campo", "acolhimento", "prioridade", "Uniforme, deslocamento e suporte"],
    ["Público plural", "pluralidade", "contínuo", "Retratos consentidos, grupos e encontros"],
    ["Instituições sociais", "social", "planejado", "Preview Social e dias de festival"],
    ["Rock in Family", "geracoes", "planejado", "Famílias, vínculos e memória musical"],
    ["Cria do Rock", "geracoes", "planejado", "Infância, juventude e pertencimento"],
    ["Pesquisa Casa Brasil", "pesquisa", "prioridade", "Pesquisa em andamento e escuta do público"],
    ["Cartazes nos banheiros", "acolhimento", "planejado", "Masculino, feminino e “Não é Não”"],
    ["Avisos nos telões", "pluralidade", "planejado", "Mensagem integrada à escala do festival"],
    ["Espaço Recharge", "acolhimento", "confirmar", "Aguardar confirmação operacional"],
    ["Espaço Família", "geracoes", "confirmar", "Aguardar confirmação operacional"]
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    $("#scrollProgress").style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  $$(".chapter-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.chapter);
      const chapter = chapters[index];
      $$(".chapter-tab").forEach((tab) => {
        const selected = tab === button;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      const panel = $("#chapterPanel");
      panel.className = `chapter-panel theme-${chapter.theme}`;
      $("#chapterImage").src = chapter.image;
      $("#chapterImage").alt = chapter.alt;
      $("#chapterEyebrow").textContent = chapter.eyebrow;
      $("#chapterTitle").textContent = chapter.title;
      $("#chapterText").textContent = chapter.text;
    });
  });

  let activeFilter = "todos";
  const labelFor = (value) => filters.find(([key]) => key === value)?.[1] || value;
  const renderCoverage = () => {
    const visible = coverage.filter(([, category]) => activeFilter === "todos" || category === activeFilter);
    $("#coverageCount").textContent = String(visible.length);
    $("#coverageGrid").innerHTML = visible.map(([title, category, status, description], index) => `
      <article class="coverage-card">
        <div class="coverage-number">${String(index + 1).padStart(2, "0")}</div>
        <div>
          <div class="coverage-meta"><span>${labelFor(category)}</span><b class="status-${status}">${status}</b></div>
          <h3>${title}</h3><p>${description}</p>
        </div>
        <i class="bi bi-camera-reels" aria-hidden="true"></i>
      </article>`).join("");
  };
  filters.forEach(([value, label]) => {
    const button = document.createElement("button");
    button.className = `filter-chip${value === activeFilter ? " active" : ""}`;
    button.textContent = label;
    button.setAttribute("aria-pressed", String(value === activeFilter));
    button.addEventListener("click", () => {
      activeFilter = value;
      $$(".filter-chip").forEach((chip) => {
        const selected = chip === button;
        chip.classList.toggle("active", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });
      renderCoverage();
    });
    $("#filterBar").append(button);
  });
  renderCoverage();

  const trigger = $("#accessTrigger");
  const panel = $("#accessPanel");
  const setPanel = (open) => {
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    trigger.setAttribute("aria-expanded", String(open));
  };
  trigger.addEventListener("click", () => setPanel(!panel.classList.contains("open")));
  $("#accessClose").addEventListener("click", () => setPanel(false));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setPanel(false); });

  let fontScale = Number(localStorage.getItem("plural-font-scale")) || 1;
  const applyFont = () => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
    localStorage.setItem("plural-font-scale", String(fontScale));
  };
  $$('[data-font]').forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.font;
    fontScale = action === "increase" ? Math.min(1.24, fontScale + .08) : action === "decrease" ? Math.max(.92, fontScale - .08) : 1;
    applyFont();
  }));
  applyFont();

  const contrast = $("#contrastToggle");
  const motion = $("#motionToggle");
  contrast.checked = localStorage.getItem("plural-contrast") === "true";
  motion.checked = localStorage.getItem("plural-motion") === "true";
  document.body.classList.toggle("high-contrast", contrast.checked);
  document.body.classList.toggle("reduce-motion", motion.checked);
  contrast.addEventListener("change", () => {
    document.body.classList.toggle("high-contrast", contrast.checked);
    localStorage.setItem("plural-contrast", String(contrast.checked));
  });
  motion.addEventListener("change", () => {
    document.body.classList.toggle("reduce-motion", motion.checked);
    localStorage.setItem("plural-motion", String(motion.checked));
  });
})();
