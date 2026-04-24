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

- **🌍 Introdução Cinematográfica** com seleção de idioma
- **📖 Manual Técnico** em Português, Inglês, Espanhol e Francês com termos russos
- **🎛️ Sala de Controle Imersiva** com medidores analógicos, displays digitais, knobs e chaves
- **⚛️ Simulação Realista** de reator nuclear RBMK-1000
- **🔊 Sistema de Sons** com alarmes, beeps de falha e ambiência industrial
- **⏱️ Período de Graça** para ambientação antes dos primeiros eventos
- **🎯 Sistema de Missões** e eventos operacionais
- **📡 Sistema de Demanda do Partido** com cotas de energia e telex burocráticos
- **💀 Game Over** por explosão, demissão misteriosa ou turno concluído
- **🏆 Ranking Local** com arquivo de operadores
- **🧹 Tutorial Interativo** conduzido por Domingos Ferreira

---

## 🚀 Próximas Implementações

Estamos trabalhando ativamente nas seguintes melhorias:

### 🎛️ Interface e Visual
- **Polimento da Sala de Controle** - Ajustes finos de responsividade, densidade visual e legibilidade
- **Estados de Falha Mais Claros** - Feedback visual e sonoro mais específico para cada tipo de falha
- **Mais Instrumentos Operacionais** - Leituras adicionais de fluxo, cota e estabilidade

### 💀 Sistema de Game Over
- **Finais Expandidos** - Mais variações narrativas para explosão, demissão e turno concluído
- **Estatísticas Pós-Partida** - Eficiência, estabilidade, resposta a falhas e cumprimento de cotas

### 🏆 Ranking e Placar
- **Métricas Mais Ricas** - Eficiência média, incidentes evitados e energia entregue à cota

### 📱 Melhorias de Acessibilidade
- **Responsividade Mobile** - Melhorar a ergonomia em celulares e tablets
- **Acessibilidade de Controles** - Suporte mais completo a teclado e foco visível

### 🔊 Áudio e Atmosfera
- **Efeitos Sonoros Expandidos** - Mais variedade de alertas e sons de operação

### 📊 Dados e Gráficos
- **Histórico Operacional Expandido** - Tendências mais longas e diagnóstico por evento
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

- **HTML5/CSS3** - Estrutura e estilização com tema soviético industrial
- **JavaScript ESM** - Sistemas modulares de simulação, UI, eventos, save e ranking
- **Vite** - Build e servidor de desenvolvimento
- **Web Audio API** - Sistema de sons procedural e ambiência
- **localStorage** - Salvamento local, ranking e progresso do tutorial
- **ESLint** - Verificação estática dos módulos JS e testes

---

## 📂 Estrutura do Projeto

```
game-reator/
├── index.html                  # Página principal
├── styles/
│   ├── control-room.css       # Sala de controle, HUD, modais e game over
│   ├── intro.css              # Estilos da introdução
│   └── main.css               # Estilos legados/apoio
├── js/
│   ├── main.js                # Aplicação principal
│   ├── intro-system.js        # Sistema de introdução e idiomas
│   ├── reactor-simulation.js  # Motor de simulação
│   ├── ui-controller-new.js   # Controlador da sala de controle atual
│   ├── sound-system.js        # Sistema de sons
│   ├── event-system.js        # Eventos e missões
│   ├── demand-system.js       # Cotas de energia e telex do Partido
│   ├── game-over-system.js    # Finais e estatísticas
│   ├── ranking-system.js      # Arquivo local de operadores
│   ├── tutorial-system.js     # Tutorial interativo
│   └── manual-content.js      # Manuais PT/EN/ES/FR
├── tests/
│   └── reactor.test.js        # Testes da simulação
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
npm install
npm run dev

# Em outro terminal, quando quiser validar:
npm test
npm run lint
npm run build
```

---

## 📝 Notas

Este é um jogo fictício criado para fins educacionais e de entretenimento. Não representa nenhuma instalação nuclear real.

**Desenvolvido com ☭ para a República Popular Democrática de Krasnostan**

---

## 🔮 Roadmap Futuro

| Versão | Features Planejadas |
|--------|---------------------|
| **v1.0** (Atual) | Sala de controle, simulação, tutorial, ranking, game over e cotas |
| **v1.1** | Polimento mobile, acessibilidade e feedback de falhas |
| **v1.2** | Histórico operacional expandido e métricas pós-partida |
| **v1.3** | Eventos expandidos, sons adicionais e balanceamento |
| **v2.0** | Sistema de turnos avançado e progressão de operadores |

---

## 📜 Licença

Projeto educacional - uso livre para fins de aprendizado.

---

## ☭ СЛАВА КРАСНОСТАНУ!

**"O átomo é um bom servo, mas um mau mestre."**

---

*Última atualização: Abril 2026 | Status: 🟢 Em Desenvolvimento Ativo*
