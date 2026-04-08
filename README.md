# ☢️ АТОМНАЯ ЭЛЕКТРОСТАНЦИЯ - Simulador de Reator Nuclear

> **Um jogo de simulação nuclear ambientado na República Popular Democrática de Krasnostan, 1994**

---

## 🎮 Sobre o Jogo

Você é o novo operador de uma usina nuclear em uma república socialista fictícia pós-colapso da URSS. Todos os engenheiros qualificados fugiram para o Ocidente, e agora VOCÊ é responsável por manter o reator funcionando sem causar um desastre nuclear!

###  Características
- **Interface 100% em russo** (cirílico) - imersão total!
- **Manual técnico em inglês** - documento "secreto" para consulta
- **Visualização 2D/3D** do reator RBMK-1000
- **Estética soviética/brutalista** com cores vermelhas e douradas
- **Sistema de missões** desafiadoras
- **Eventos aleatórios** - acidentes, inspeções, diretivas do governo
- **Simulação realista** de física nuclear

---

## 🌐 JOGAR ONLINE

### **🎮 [JOGAR AGORA NO GITHUB PAGES](https://SEU-USUARIO.github.io/game-reator/)**

> ⚠️ **IMPORTANTE:** Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub após fazer o deploy!

---

## 🚀 Como Fazer Deploy no GitHub Pages

### **Opção 1: Deploy Automático (Recomendado)**

1. **Crie um repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Nuclear Reactor Simulator"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/game-reator.git
   git push -u origin main
   ```

2. **Ative o GitHub Pages:**
   - Vá para `Settings` > `Pages`
   - Em "Source", selecione `GitHub Actions`
   - O workflow de deploy está configurado em `.github/workflows/deploy.yml`

3. **Aguarde o deploy:**
   - O GitHub Actions fará o deploy automaticamente
   - Seu jogo estará disponível em: `https://SEU-USUARIO.github.io/game-reator/`

### **Opção 2: Deploy Manual**

1. Crie um repositório e faça push do código
2. Vá para `Settings` > `Pages`
3. Em "Source", selecione a branch `main` e a pasta `/ (root)`
4. Salve e aguarde alguns minutos

---

## 🎯 Como Jogar

### **Primeiros Passos**

1. **Selecione o idioma** (Português ou English)
2. **Leia a introdução** com a história de Krasnostan
3. **Familiarize-se com os controles** no tutorial
4. **Clique "INICIAR OPERAÇÃO"** para começar

### **Controles Principais**

| Controle Russo | Tradução | Função |
|----------------|----------|--------|
| **Стержни** | Barras de Controle | Controlam a potência (40-70% = normal) |
| **Главный насос** | Bomba Principal | Sistema de refrigeração (>50%) |
| **Аварийное охлаждение** | Resfriamento de Emergência | ATIVE se temp > 320°C |
| **АЗ-5** | Botão de Emergência | PARADA TOTAL (irreversível!) |

### **Indicadores Importantes**

| Indicador | Normal | Perigo | Crítico |
|-----------|--------|--------|---------|
| Температура (Temperatura) | < 300°C | > 350°C | > 400°C |
| Давление (Pressão) | < 17 MPa | > 19 MPa | > 22 MPa |
| Радиация (Radiação) | < 1.0 mSv/h | > 5.0 mSv/h | > 20 mSv/h |

---

## 📂 Estrutura do Projeto

```
game-reator/
├── index.html                  # Página principal
├── .github/
│   └── workflows/
│       └── deploy.yml         # Workflow do GitHub Pages
├── styles/
│   ├── main.css               # Estilos principais (tema soviético)
│   └── intro.css              # Estilos da introdução
├── js/
│   ├── main.js                # Aplicação principal
│   ├── intro-system.js        # Sistema de introdução e seleção de idioma
│   ├── reactor-simulation.js  # Motor de simulação do reator
│   ├── 3d-viewport.js         # Visualização 2D/3D do reator
│   ├── ui-controller.js       # Controlador da interface
│   ├── event-system.js        # Sistema de eventos e missões
│   ├── manual-content.js      # Conteúdo do manual técnico (inglês)
│   └── three.min.js           # Three.js local (renderização 3D)
├── README.md                   # Este arquivo
└── .gitignore                  # Arquivos ignorados pelo Git
```

---

## 🛠️ Tecnologias

- **HTML5/CSS3** - Estrutura e estilização
- **JavaScript (ES5)** - Lógica do jogo (compatibilidade máxima)
- **Three.js r128** - Renderização 3D (com fallback 2D)
- **Zero dependências externas** - Funciona 100% no browser!

---

## 🎨 Estética Soviética

O jogo incorpora elementos visuais da era soviética:

- ⭐ **Estrela Vermelha** - Símbolo icônico
- 🔴 **Vermelho Soviético** (#cc0000) - Cor predominante
- ⚒️ **Dourado** (#ffd700) - Detalhes e títulos
- 📰 **Tipografia Brutalista** - Fontes monoespaçadas estilo terminal
- 🏭 **Cinza Industrial** - Backgrounds e painéis

---

## 🌍 Idiomas

- **Interface do jogo:** Russo (cirílico)
- **Introdução:** Português ou English (seleção no início)
- **Manual técnico:** English

---

## ⚠️ Dicas de Segurança

1. **NUNCA deixe a temperatura passar de 350°C**
2. **Mantenha as barras entre 40-70% durante operação normal**
3. **Use o botão АЗ-5 apenas em emergências reais**
4. **Monitore o journal de eventos (ЖУРНАЛ СОБЫТИЙ)**
5. **Consulte o manual quando estiver em dúvida!**

---

## 🎯 Objetivo Final

Gerenciar a usina nuclear com segurança, completar missões e evitar desastres nucleares! A República Popular Democrática de Krasnostan conta com você, camarada! ☭

---

## 📝 Notas

Este é um jogo fictício criado para fins educacionais e de entretenimento. Não representa nenhuma instalação nuclear real.

**Desenvolvido com ☭ para a República Popular Democrática de Krasnostan**

---

## 🚀 Rodando Localmente

Se quiser rodar localmente (necessário para evitar bloqueios de segurança do browser):

```bash
# Usando Python 3
python -m http.server 8080

# Acesse: http://localhost:8080
```

Ou simplesmente abra o arquivo `index.html` em um navegador (alguns recursos podem ser limitados).

---

## 📜 Licença

Projeto educacional - uso livre para fins de aprendizado.

---

## ☭ СЛАВА КРАСНОСТАНУ!

**"O átomo é um bom servo, mas um mau mestre."**
