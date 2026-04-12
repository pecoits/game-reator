# Game Over com 2 Finais — Design Spec

**Data:** 2026-04-12  
**Projeto:** game-reator  
**Status:** Aprovado

---

## Resumo

Implementar dois finais distintos para o jogo:

1. **ВЗРЫВ (Explosão)** — falha catastrófica do reator por parâmetros críticos
2. **Demissão Misteriosa** — falha em atender a cota energética do Partido soviético

---

## Arquitetura

### Novos Arquivos

**`js/game-over-system.js`**  
Responsabilidade única: detectar condição de game over e exibir a tela correta.

- Recebe referência à `ReactorSimulation` e ao `DemandSystem`
- Registra-se no `simulation.onUpdate` para checar parâmetros críticos (explosão)
- Expõe método `triggerDismissal(stats)` chamado pelo `DemandSystem`
- Ao disparar: chama `simulation.stop()`, limpa save, exibe tela
- Padrão IIFE ES5 (consistente com `ui-controller-new.js`)

**`js/demand-system.js`**  
Responsabilidade única: gerenciar cota de energia e escalar avisos burocráticos.

- Cota inicial: 300 MW
- Monitora `simulation.energyGeneration` via tick manual (chamado pelo game loop)
- Gerencia estado dos 3 avisos com timestamps
- Dispara eventos aleatórios de demanda (após `gracePeriod`)
- Expõe método `update(deltaTime)` — chamado em `GameApp.startGameLoop()`
- Padrão IIFE ES5

### Arquivos Modificados

**`js/main.js`**
- Instanciar `DemandSystem` e `GameOverSystem` em `initializeSystems()`
- Chamar `demandSystem.update(delta)` no game loop
- Passar referências corretas entre sistemas

**`index.html`**
- Adicionar HTML das duas telas de game over (ocultas por padrão)
- Adicionar HTML do popup de telegrama (oculto por padrão)
- Adicionar `<script>` para os dois novos arquivos

---

## Gatilhos

### Explosão

Verificado a cada tick em `GameOverSystem`. Dispara se qualquer valor ultrapassar os limites críticos já definidos em `config.js`:

| Parâmetro | Limite Crítico |
|-----------|---------------|
| `coreTemperature` | > 400°C |
| `pressure` | > 22 MPa |
| `radiationLevel` | > 20 mZv/h |

### Demissão Misteriosa

**Eventos de demanda** — gerados aleatoriamente pelo `DemandSystem` após o `gracePeriod`. Apenas um evento por vez (não acumulam enquanto há aviso ativo). Probabilidade ~1 a cada 3-5 minutos em média.

| Evento | Delta de cota |
|--------|--------------|
| Nova fábrica em Krasnogorsk | +120 MW |
| Nova mina de urânio | +80 MW |
| Nova cidade satélite de Krasnovosk | +150 MW |

Cota inicial: **300 MW**. Teto máximo após todos os eventos: **~650 MW**.

**Escalada de avisos** — iniciada quando `energyGeneration < cotaAtual` por 30 segundos contínuos:

| Etapa | Offset desde início da deficiência | Ação |
|-------|------------------------------------|------|
| Início da deficiência | t=0 | Nada (30s de tolerância) |
| Telegrama 1 | t=30s | Popup gentil: nova cota informada |
| Telegrama 2 | t=150s (+120s) | Popup sério: apagões relatados |
| Telegrama 3 + Game Over | t=240s (+90s) | Popup final → game over |

Se a energia voltar acima da cota antes do Telegrama 3, o contador é resetado (avisos anteriores já exibidos permanecem como parte da narrativa).

---

## Popup de Telegrama (em jogo)

Modal que pausa o jogo enquanto aberto.

**Estrutura HTML:**
```
overlay escuro
└── documento bege (papel datilografado)
    ├── cabeçalho: МИНГОСЭНЕРГО СССР / Nº do pedido
    ├── corpo: texto do telegrama (varia por etapa)
    ├── nova cota em destaque (vermelho)
    └── botão: "ПРИНЯТО — RECEBIDO"
```

**Textos por etapa:**

*Telegrama 1 (gentil):*
> Tovarisch operador, em virtude da inauguração de [evento], a demanda energética de Krasnostan foi atualizada para **[X] MW**. Confiamos em sua dedicação ao Partido.

*Telegrama 2 (sério):*
> Apagões foram registrados em [N] regiões. O Ministério observa que a produção atual de **[Y] MW** é insatisfatória. Cota obrigatória: **[X] MW**. Prazo final se aproxima.

*Nota de implementação: [N] = número de eventos de demanda disparados até o momento (começa em 1 e sobe com cada novo evento). [Y] = `energyGeneration` atual arredondado. [X] = cota atual do `DemandSystem`.*

*Telegrama 3 (ameaçador):*
> Tovarisch [████████], sua contribuição foi… notada. Uma visita foi organizada. Traga agasalho.

---

## Telas de Game Over

### ВЗРЫВ — Explosão (Estilo A)

**Visual:** Fundo preto/vermelho escuro. Overlay sobre o jogo inteiro.

```
[fundo escuro com gradiente vermelho radial]

    ☢  (pulsando, CSS animation)

  ВЗРЫВ
  EXPLOSÃO DO REATOR

  ┌─────────────────────────────┐
  │  CAUSA:      [parâmetro]    │
  │  TEMPERATURA: [valor]°C     │
  │  PRESSÃO:    [valor] MPa    │
  │  RADIAÇÃO:   [valor] мЗв/ч  │
  │  TEMPO DE SERVIÇO: MM:SS    │
  └─────────────────────────────┘

  [ НОВАЯ ИГРА — NOVA PARTIDA ]
```

**Causa** é determinada pelo parâmetro que cruzou o limite primeiro: "Superaquecimento do núcleo" / "Ruptura do circuito primário" / "Contaminação por radiação".

### Demissão Misteriosa (Estilo C)

**Visual:** Fundo do painel de controle (bege/marrom `#c8bfa8`). Documento datilografado centralizado.

```
[fundo painel de controle]

  ┌────────────────────────────────┐  ← papel bege amarelado
  │        МИНГОСЭНЕРГО СССР       │
  │           — ПРИКАЗ —           │  [ЗАСЕКРЕЧЕНО] ← carimbo rotacionado
  │                                │
  │  Tovarisch operador,           │
  │                                │
  │  Após [N] apagões registrados  │
  │  em Krasnostan, o Partido      │
  │  agradece seus [MM:SS] de      │
  │  serviço dedicado.             │
  │                                │
  │  [████████████████████████]    │
  │  Uma viagem foi organizada.    │
  │  Traga agasalho.               │
  │                                │
  │  Cota não cumprida: [X] MW     │
  │  Déficit final: [Y] MW         │
  └────────────────────────────────┘

  [ НОВАЯ ИГРА — NOVA PARTIDA ]
```

---

## Restart

Botão "НОВАЯ ИГРА" em ambas as telas:
1. Chama `localStorage.removeItem('reactorSave')` (ou `saveSystem.clear()`)
2. Chama `location.reload()`

Leva de volta à tela de introdução (comportamento já existente do `IntroSystem`).

---

## Integração com Sistemas Existentes

- `DemandSystem.update(delta)` — chamado no game loop de `main.js`, após `simulation.tick()`
- `GameOverSystem` — instanciado em `initializeSystems()`, recebe `simulation` e `demandSystem`
- Os novos `<script>` são carregados antes de `main.js` em `index.html`
- O save é apagado no game over para evitar recarregar estado de derrota

---

## O Que Este Spec NÃO Inclui

- Ranking/placar (item futuro)
- Animação de explosão visual no painel (item futuro)
- Música/sons de game over (item futuro)
