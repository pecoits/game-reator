# ☢️ АТОМНАЯ ЭЛЕКТРОСТАНЦИЯ - Simulador de Reator Nuclear

> **Um jogo de simulação nuclear em desenvolvimento, ambientado na República Popular Democrática de Krasnostan, 1994**

---

## 🚧 Projeto em Desenvolvimento Ativo

Este jogo está **ativamente sendo desenvolvido** e novas funcionalidades são adicionadas regularmente. A versão atual já é jogável, mas muitas melhorias e features estão planejadas para as próximas atualizações!

### 🌐 JOGAR AGORA

**https://pecoits.github.io/game-reator/**

---

## 🎮 Sobre o Jogo

Você é o novo operador de uma usina nuclear em uma república socialista fictícia pós-colapso da URSS. Todos os engenheiros qualificados fugiram para o Ocidente, e agora VOCÊ é responsável por manter o reator RBMK-1000 funcionando sem causar um desastre nuclear!

### ✨ Funcionalidades Atuais

- **🌍 Introdução Cinematográfica** com seleção de idioma (Português/Inglês)
- **📖 Manual Técnico Bilíngue** (PT/EN) com termos russos para referência
- **🎛️ Interface 100% em Russo** (cirílico) - imersão total!
- **⚛️ Simulação Realista** de reator nuclear RBMK-1000
- **🎨 Visualização 2D** do reator (com fallback automático)
- **🔊 Sistema de Sons** com alarmes e beeps de alerta
- **⏱️ Período de Graça** (2 minutos) para ambientação antes dos primeiros eventos
- **🎯 Sistema de Missões** desafiadoras
- **📊 Configuração Estável Inicial** para aprendizado gradual
- **🔇 Controles de Volume** e mute no header

---

## 🚀 Próximas Implementações (Em Breve!)

Estamos trabalhando ativamente nas seguintes melhorias:

### 🎛️ Interface e Visual
- **Sala de Controle Imersiva** - Painel estilo soviético com mostradores analógicos (ponteiros) e displays digitais (7 segmentos)
- **Monitor de Sistema** - Pequena tela para mensagens em cirílico (erros, avisos, sucesso)
- **Controles Físicos Estilizados** - Interruptores, botões e knobs que simulam hardware real
- **Remoção da visualização externa** - Foco total no painel interno

### 💀 Sistema de Game Over
- **Final Explosão** - Fusão do reator com efeitos dramáticos
- **Final Demissão Misteriosa** - Carta oficial do Ministério + "transferência para reeducação"
- **Tela de Estatísticas** - Tempo sobrevivido, energia gerada, incidentes

### 🏆 Ranking e Placar
- **Ficha de Pessoal Soviética** - Sistema de ranking com tema de documentos oficiais
- **Salvamento Local** - Histórico de partidas no navegador
- **Métricas Diversas** - Tempo, eficiência, incidentes evitados

### 📱 Melhorias de Acessibilidade
- **Responsividade Mobile** - Jogar em celulares e tablets
- **Mais Idiomas** - Espanhol e Francês

### 🔊 Áudio e Atmosfera
- **Sons Ambientais** - Ruído industrial, hum do reator
- **Efeitos Sonoros Expandidos** - Mais variedade de alertas

### 📊 Dados e Gráficos
- **Gráficos Históricos** - Linhas de temperatura/potência em tempo real
- **Dashboard de Performance** - Métricas detalhadas da operação

---

## 🎯 Como Jogar (Versão Atual)

1. **Selecione o idioma** na tela inicial (Português ou English)
2. **Leia a introdução** com a história de Krasnostan
3. **Familiarize-se com os controles** no tutorial
4. **Clique "INICIAR OPERAÇÃO"** para começar
5. **Monitore os indicadores** e mantenha o reator estável!

### Controles Principais

| Controle Russo | Tradução | Função |
|----------------|----------|--------|
| **Стержни** | Barras de Controle | Controlam a potência (40-70% = normal) |
| **Главный насос** | Bomba Principal | Sistema de refrigeração (>50%) |
| **Аварийное охлаждение** | Resfriamento de Emergência | ATIVE se temp > 320°C |
| **АЗ-5** | Botão de Emergência | PARADA TOTAL (irreversível!) |

### Indicadores Importantes

| Indicador | Normal | Perigo | Crítico |
|-----------|--------|--------|---------|
| Температура (Temperatura) | < 300°C | > 350°C | > 400°C |
| Давление (Pressão) | < 17 MPa | > 19 MPa | > 22 MPa |
| Радиация (Radiação) | < 1.0 mSv/h | > 5.0 mSv/h | > 20 mSv/h |

---

## 🛠️ Tecnologias

- **HTML5/CSS3** - Estrutura e estilização com tema soviético
- **JavaScript (ES5)** - Lógica do jogo (máxima compatibilidade)
- **Three.js r128** - Renderização 3D (com fallback 2D)
- **Web Audio API** - Sistema de sons procedural
- **Zero dependências externas** - 100% browser!

---

## 📂 Estrutura do Projeto

```
game-reator/
├── index.html                  # Página principal
├── styles/
│   ├── main.css               # Estilos principais
│   └── intro.css              # Estilos da introdução
├── js/
│   ├── main.js                # Aplicação principal
│   ├── intro-system.js        # Sistema de introdução e idiomas
│   ├── reactor-simulation.js  # Motor de simulação
│   ├── 3d-viewport.js         # Visualização 2D/3D
│   ├── ui-controller.js       # Controlador da interface
│   ├── sound-system.js        # Sistema de sons
│   ├── event-system.js        # Eventos e missões
│   └── manual-content.js      # Manuais PT/EN
├── .github/workflows/
│   └── deploy.yml             # Deploy automático GitHub Pages
└── README.md                  # Este arquivo
```

---

## 🎨 Estética Soviética

O jogo incorpora elementos visuais da era soviética dos anos 90:

- ⭐ **Estrela Vermelha** - Símbolo icônico
- 🔴 **Vermelho Soviético** (#cc0000) - Cor predominante
- ⚒️ **Dourado** (#ffd700) - Detalhes e títulos
- 📰 **Tipografia Brutalista** - Fontes monoespaçadas estilo terminal
- 🏭 **Cinza Industrial** - Backgrounds e painéis
- 🎛️ **Instrumentação Analógica** - Mostradores com ponteiros e displays de 7 segmentos

---

## 🌍 Idiomas

- **Interface do jogo:** Russo (cirílico)
- **Introdução:** Português ou English (seleção no início)
- **Manual técnico:** Português ou English (baseado na seleção)
- **Mensagens do sistema:** Russo (cirílico)

---

## ⚠️ Dicas de Segurança

1. **NUNCA deixe a temperatura passar de 350°C**
2. **Mantenha as barras entre 40-70% durante operação normal**
3. **Use o botão АЗ-5 apenas em emergências reais**
4. **Monitore o journal de eventos (ЖУРНАЛ СОБЫТИЙ)**
5. **Consulte o manual quando estiver em dúvida!**

---

## 🚀 Rodando Localmente

```bash
# Usando Python 3
python -m http.server 8080

# Acesse: http://localhost:8080
```

---

## 📝 Notas

Este é um jogo fictício criado para fins educacionais e de entretenimento. Não representa nenhuma instalação nuclear real.

**Desenvolvido com ☭ para a República Popular Democrática de Krasnostan**

---

## 🔮 Roadmap Futuro

| Versão | Features Planejadas |
|--------|---------------------|
| **v1.0** (Atual) | Jogo base, introdução, manual, sons básicos |
| **v1.1** | Painel de controle imersivo, game over com 2 finais |
| **v1.2** | Ranking/placar, responsividade mobile |
| **v1.3** | Mais idiomas, gráficos históricos, efeitos visuais |
| **v2.0** | Sistema de shifts, tutorial interativo, eventos expandidos |

---

## 📜 Licença

Projeto educacional - uso livre para fins de aprendizado.

---

## ☭ СЛАВА КРАСНОСТАНУ!

**"O átomo é um bom servo, mas um mau mestre."**

---

*Última atualização: Abril 2026 | Status: 🟢 Em Desenvolvimento Ativo*
