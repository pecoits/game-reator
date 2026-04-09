## Qwen Added Memories
- ## Game-Reator - Implementações Futuras Planejadas

### ✅ JÁ IMPLEMENTADO:
- Jogo standalone HTML/JS/CSS (sem dependência Roblox)
- Tema: República Socialista fictícia (Krasnostan) nos anos 90
- Interface 100% em russo (cirílico)
- Manual técnico em Português e Inglês com termos russos
- Introdução cinematográfica com seleção de idioma
- História humorada (engenheiros fugiram para o Ocidente)
- Simulação de reator RBMK-1000 realista
- Visualização 2D do reator (fallback quando 3D não disponível)
- Configuração estável inicial (280°C, 75% potência)
- Período de graça de 2 minutos (ОБКАТКА) sem eventos
- Sistema de sons (alarmes, beeps de warning)
- Controles de volume e mute no header
- Deploy no GitHub Pages (https://pecoits.github.io/game-reator/)

### 🔄 PARA PRÓXIMA SESSÃO:
1. **Sons de fundo ambientais** - Ruído de fundo industrial, hum do reator
2. **Melhorar visualização 2D/3D** - Animações mais suaves, mais detalhes
3. **Sistema de missões mais rico** - Mais variedade de missões e eventos
4. **Ranking/Placar** - Salvar pontuação baseada em tempo de sobrevivência e eficiência
5. **Responsividade mobile** - Melhorar para celulares
6. **Mais idiomas** - Espanhol, Francês
7. **Gráficos históricos** - Gráficos de linha mostrando temperatura/potência ao longo do tempo
8. **Efeitos visuais de emergência** - Tela piscando vermelho em situações críticas
9. **Sistema de "shift"** - Turnos de trabalho com mudanças de equipe
10. **Mini-tutorial interativo** - Guiar o jogador nas primeiras ações

### 📁 Estrutura do Projeto:
- Repositório GitHub: https://github.com/pecoits/game-reator
- Arquivos principais: index.html, styles/main.css, styles/intro.css
- JS: main.js, intro-system.js, reactor-simulation.js, 3d-viewport.js, ui-controller.js, sound-system.js, event-system.js, manual-content.js
- Workflow GitHub Actions em .github/workflows/deploy.yml

### 🔧 Configurações Importantes:
- Push requer autenticação via browser
- Server local: python -m http.server 8080
- GitHub Pages deploy automático via Actions
- ## Game-Reator - PRIORIDADE MÁXIMA PRÓXIMA SESSÃO: REVISÃO COMPLETA DO MANUAL

### 🚨 PRIMEIRO ITEM A TRABALHAR: Manual Técnico
O manual ainda está inconsistente e precisa de revisão completa:
- Algumas traduções ainda faltam ou estão inconsistentes
- Formatação RUSSO(Tradução) precisa ser aplicada uniformemente em TODAS as páginas
- Tamanho das páginas ainda precisa de ajuste fino para caber tudo sem cortes
- Verificar se "Коллюции" (erro charmoso) está apenas na página de problemas em PT
- Garantir que todas as tabelas tenham cabeçalhos traduzidos
- Revisar paginação para que nenhuma informação seja cortada

### ✅ JÁ IMPLEMENTADO:
- Jogo standalone HTML/JS/CSS (sem dependência Roblox)
- Tema: República Socialista fictícia (Krasnostan) nos anos 90
- Interface 100% em russo (cirílico)
- Manual técnico em Formato de Livreto com 10 páginas (PT/EN)
- Fonte monoespaçada (Courier New) estilo máquina de escrever
- Introdução cinematográfica com seleção de idioma
- História humorada (engenheiros fugiram para o Ocidente)
- Simulação de reator RBMK-1000 realista
- Visualização 2D do reator (fallback quando 3D não disponível)
- Configuração estável inicial (280°C, 75% potência)
- Período de graça de 2 minutos (ОБКАТКА) sem eventos
- Sistema de sons (alarmes, beeps de warning)
- Controles de volume e mute no header
- Botão MANUAL em latim (única palavra não-cirílica na interface)
- Deploy no GitHub Pages (https://pecoits.github.io/game-reator/)

### 🔄 PARA PRÓXIMA SESSÃO (Prioridade):
1. **🚨 CONSISTÊNCIA DO MANUAL** (PRIMEIRO ITEM)
2. **🎛️ Painel de Controle Imersivo** - Sala sem janelas, mostradores analógicos/digitais
3. **💀 Game Over com 2 Finais** - Explosão vs Demissão Misteriosa
4. **🏆 Ranking/Placar** - Ficha de pessoal soviética
5. **📱 Responsividade mobile**
6. **🌍 Mais idiomas** - Espanhol, Francês
7. **📊 Gráficos históricos**
8. ** Efeitos visuais de emergência**
9. **⏱️ Sistema de shifts**
10. **🔊 Sons ambientais**

### 📁 Estrutura do Projeto:
- Repositório: https://github.com/pecoits/game-reator
- Arquivos: index.html, styles/main.css, styles/intro.css
- JS: main.js, intro-system.js, reactor-simulation.js, 3d-viewport.js, ui-controller.js, sound-system.js, event-system.js, manual-content.js
- Workflow: .github/workflows/deploy.yml

### 🔧 Configurações:
- Push requer autenticação via browser
- Server local: python -m http.server 8080
- GitHub Pages deploy automático via Actions
- ## Game-Reator - DIREÇÃO VISUAL DEFINITIVA: Sala de Controle Imersiva

### 🎨 Novo Conceito Visual (Baseado em control-room-concept.html)
- **Estética:** Painel industrial bege/marrom com textura de metal desgastado
- **Layout:** 3 colunas em tela ÚNICA (sem abas)
- **Tema:** Sala de controle soviética real dos anos 90

### 📐 Layout da Tela Única

**Coluna Esquerda - Instrumentos Analógicos (4 medidores com ponteiros):**
- ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (0-450°C)
- ДАВЛЕНИЕ В КОНТУРЕ (0-25 MPa)
- МОЩНОСТЬ РЕАКТОРА (0-110%)
- УРОВЕНЬ РАДИАЦИИ (0-20 мЗв/ч)
- Zonas de cor: verde/normal, amarelo/atenção, vermelho/perigo

**Coluna Central - Displays Digitais 7 Segmentos + Luzes:**
- 4 displays com números estilo LED (glow verde/amarelo/vermelho)
- Luzes indicadoras: НОРМА, ВНИМАНИЕ, ОПАСНОСТЬ, АЗ-5
- Journal de eventos integrado em display menor

**Coluna Direita - Controles Físicos:**
- Knobs rotativos (substituem sliders): Стержни, Главный насос
- Alavancas: Аварийное охлаждение, Дополнительный насос
- Botões industriais: Сброс тревог, Изолировать сеть, АЗ-5

### ✅ Decisões Confirmadas
1. ✅ Manter CIRÍLICO em todos os indicadores
2. ✅ Sliders → KNOBS (controles rotativos)
3. ✅ Tudo em UMA TELA (sem abas/tabs)
4. ✅ Journal de eventos em display menor integrado

### 🔄 Status Atual
- Arquivo de conceito: control-room-concept.html (visualização do design)
- Arquivo React: control-room-concept.canvas.tsx (componente React de referência)
- Projeto atual: versão com tabs e barras horizontais (será substituído)

### 📋 Próximos Passos de Implementação
1. Criar novo CSS com paleta industrial bege/marrom
2. Implementar medidores analógicos SVG com ponteiros
3. Implementar displays 7 segmentos com glow CSS
4. Implementar knobs rotativos interativos
5. Implementar alavancas com animação
6. Reorganizar layout para grid de 3 colunas
7. Integrar journal de eventos como display menor
8. Conectar tudo à simulação existente
