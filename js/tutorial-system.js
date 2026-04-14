// ===== TUTORIAL SYSTEM — DOMINGOS FERREIRA =====
// Painel lateral com tutorial narrativo do faxineiro angolano.
// Mostrado apenas na primeira sessão (flag localStorage).
// Passos 2 e 3 são interativos: o jogador precisa agir antes de avançar.

var TUTORIAL_STEPS = {
    pt: [
        {
            title: 'Um momento, camarada',
            text:  'Eu sou Domingos Ferreira. Faxineiro daqui desde 1979 — vim de Angola estudar engenharia, reprovei no primeiro ano, mas fiquei. Já são 15 anos varrendo esses corredores. Conheço cada parafuso desta usina. Você parece novo. Deixa eu te explicar o básico.'
        },
        {
            title: 'Temperatura do núcleo',
            text:  'Esse indicador é o mais importante — ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ. Acima de 300°C, você precisa agir. Acima de 400°C, você precisa agir AGORA. Não espere os alarmes gritarem. Quando eles gritam, já demorou.'
        },
        {
            title: 'Barras de controle',
            text:  'As barras — СТЕРЖНИ РЕГУЛИРОВАНИЯ — são os freios do reator. Mais inseridas significa menos potência, menos calor. O operador anterior esqueceu disso. Trabalha em Moscou agora... numa fábrica de caixas.',
            actionInstruction: 'Gire o dial СТЕРЖНИ para 70% ou mais.',
            actionWait: 'aguardando ação...',
            actionDone: '✓ CORRETO'
        },
        {
            title: 'Bomba de circulação',
            text:  'A bomba — ГЦН — circula o refrigerante pelo núcleo. Sem ela, a temperatura sobe mesmo com as barras inseridas. Nunca deixe abaixo de 40% com o reator operando. Aprendi isso sozinho. Do jeito difícil.',
            actionInstruction: 'Ajuste a bomba ГЦН para 75% ou mais.',
            actionWait: 'aguardando ação...',
            actionDone: '✓ CORRETO'
        },
        {
            title: 'Resfriamento de emergência',
            text:  'Se a temperatura passar de 350°C, ative o resfriamento de emergência — АВАРИЙНОЕ ОХЛАЖДЕНИЕ. É o interruptor ao lado da bomba. Não tem hora errada para ligar. Só tem hora errada para não ligar.'
        },
        {
            title: 'O botão АЗ-5',
            text:  'АЗ-5 é a proteção de emergência total. Insere todas as barras, ativa resfriamento, desconecta da rede. Irreversível. Use quando a temperatura passar de 400°C e você não conseguir controlar. Não hesite. O reator pode ser reiniciado. Você não.'
        },
        {
            title: 'As cotas de energia',
            text:  'O Partido tem uma cota de energia que você precisa cumprir. Se ficar abaixo, chegam os telegramas. Depois as advertências. Depois... bem, o operador anterior de novo. Mas não force o reator além do seguro só por causa de números. Os números mudam. O acidente, não.'
        },
        {
            title: 'Boa sorte, camarada',
            text:  'É isso. Não é tão complicado — só parece. Qualquer um que chegou até aqui e ainda está ouvindo um faxineiro deve ser inteligente o suficiente. Boa sorte. Vou continuar varrendo.'
        }
    ],

    en: [
        {
            title: 'One moment, comrade',
            text:  'I am Domingos Ferreira. Janitor here since 1979 — I come from Angola to study engineering, failed the first year, but I stay. Already 15 years sweeping these corridors. I know every bolt in this plant. You look new. Let me explain the basics.'
        },
        {
            title: 'Core temperature',
            text:  'This indicator is the most important — ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ. Above 300°C, you need to act. Above 400°C, you need to act NOW. Don\'t wait the alarms to shout before you notice. When the alarms shout, is already too late.'
        },
        {
            title: 'Control rods',
            text:  'The rods — СТЕРЖНИ РЕГУЛИРОВАНИЯ — are the brakes of the reactor. More inserted means less power, less heat. The previous operator forgot this. He work in Moscow now... in a box factory.',
            actionInstruction: 'Turn the СТЕРЖНИ dial to 70% or more.',
            actionWait: 'waiting for action...',
            actionDone: '✓ CORRECT'
        },
        {
            title: 'Circulation pump',
            text:  'The pump — ГЦН — circulates the coolant through the core. Without it, temperature rises even with rods inserted. Never let it go below 40% when reactor is operating. I learn this myself. The hard way.',
            actionInstruction: 'Set the ГЦН pump to 75% or more.',
            actionWait: 'waiting for action...',
            actionDone: '✓ CORRECT'
        },
        {
            title: 'Emergency cooling',
            text:  'If temperature pass 350°C, activate the emergency cooling — АВАРИЙНОЕ ОХЛАЖДЕНИЕ. It is the switch next to the pump. There is no wrong time to turn this on. There is only wrong time to not turn it on.'
        },
        {
            title: 'The АЗ-5 button',
            text:  'АЗ-5 is the total emergency protection. Inserts all rods, activates cooling, disconnects from grid. Irreversible. Use when temperature pass 400°C and you cannot control. Don\'t hesitate. The reactor can be restart. You cannot.'
        },
        {
            title: 'The energy quota',
            text:  'The Party has an energy quota you need to meet. If you fall below, the telegrams come. Then the warnings. Then... well, the previous operator again. But don\'t push the reactor beyond safe just because of numbers. The numbers change. The accident, it don\'t.'
        },
        {
            title: 'Good luck, comrade',
            text:  'That\'s it. Is not so complicated — it only seem like it. Anyone who come this far and still listen a janitor must be intelligent enough. Good luck. I will continue sweeping.'
        }
    ],

    es: [
        {
            title: 'Un momento, camarada',
            text:  'Soy Domingos Ferreira. Conserje aquí desde 1979 — vine de Angola para estudiar ingeniería, reprobé el primer año, pero me quedé. Ya son 15 años barriendo estos pasillos. Conozco cada tornillo de esta planta. Pareces nuevo. Déjame explicarte lo básico.'
        },
        {
            title: 'Temperatura del núcleo',
            text:  'Este indicador es el más importante — ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ. Encima de 300°C tienes que actuar. Encima de 400°C tienes que actuar AHORA. No esperes los alarmas griten para que notes. Cuando los alarmas gritan, ya es tarde.'
        },
        {
            title: 'Barras de control',
            text:  'Las barras — СТЕРЖНИ РЕГУЛИРОВАНИЯ — son los frenos del reactor. Más insertadas significa menos potencia, menos calor. El operador anterior olvidó esto. Trabaja en Moscú ahora... en una fábrica de cajas.',
            actionInstruction: 'Gira el dial СТЕРЖНИ hasta el 70% o más.',
            actionWait: 'esperando acción...',
            actionDone: '✓ CORRECTO'
        },
        {
            title: 'Bomba de circulación',
            text:  'La bomba — ГЦН — circula el refrigerante por el núcleo. Sin ella, la temperatura sube aunque las barras estén insertadas. Nunca dejes bajar de 40% con el reactor operando. Aprendí esto solo. De la manera difícil.',
            actionInstruction: 'Ajusta la bomba ГЦН al 75% o más.',
            actionWait: 'esperando acción...',
            actionDone: '✓ CORRECTO'
        },
        {
            title: 'Enfriamiento de emergencia',
            text:  'Si la temperatura pasa de 350°C, activa el enfriamiento de emergencia — АВАРИЙНОЕ ОХЛАЖДЕНИЕ. Es el interruptor al lado de la bomba. No hay momento incorrecto para activar esto. Solo hay momento incorrecto para no activarlo.'
        },
        {
            title: 'El botón АЗ-5',
            text:  'АЗ-5 es la protección de emergencia total. Inserta todas las barras, activa el enfriamiento, desconecta de la red. Irreversible. Úsalo cuando la temperatura pase de 400°C y no puedas controlar. No dudes. El reactor puede reiniciarse. Tú no.'
        },
        {
            title: 'La cuota de energía',
            text:  'El Partido tiene una cuota de energía que debes cumplir. Si bajas, vienen los telegramas. Luego las advertencias. Luego... bueno, el operador anterior de nuevo. Pero no fuerzas el reactor más allá de lo seguro solo por los números. Los números cambian. El accidente, no.'
        },
        {
            title: 'Buena suerte, camarada',
            text:  'Eso es todo. No es tan complicado — solo lo parece. Cualquiera que llegó hasta aquí y todavía escucha a un conserje debe ser suficientemente inteligente. Buena suerte. Voy a seguir barriendo.'
        }
    ],

    fr: [
        {
            title: 'Un moment, camarade',
            text:  'Je suis Domingos Ferreira. Concierge ici depuis 1979 — je suis venu d\'Angola pour étudier l\'ingénierie, j\'ai échoué la première année, mais je reste. Déjà 15 ans à balayer ces couloirs. Je connais chaque boulon de cette centrale. Tu as l\'air nouveau. Laisse-moi t\'expliquer les bases.'
        },
        {
            title: 'Température du cœur',
            text:  'Cet indicateur est le plus important — ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ. Au-dessus de 300°C tu dois agir. Au-dessus de 400°C tu dois agir MAINTENANT. N\'attend pas que les alarmes crient avant que tu remarques. Quand les alarmes crie, c\'est déjà trop tard.'
        },
        {
            title: 'Barres de contrôle',
            text:  'Les barres — СТЕРЖНИ РЕГУЛИРОВАНИЯ — sont les freins du réacteur. Plus insérées signifie moins de puissance, moins de chaleur. L\'opérateur précédent a oublié ça. Il travaille à Moscou maintenant... dans une usine de boîtes.',
            actionInstruction: 'Tourne le cadran СТЕРЖНИ à 70% ou plus.',
            actionWait: 'en attente d\'action...',
            actionDone: '✓ CORRECT'
        },
        {
            title: 'Pompe de circulation',
            text:  'La pompe — ГЦН — fait circuler le réfrigérant dans le cœur. Sans elle, la température monte même avec les barres insérées. Ne laisse jamais descendre en-dessous de 40% quand le réacteur fonctionne. J\'ai appris ça tout seul. De la manière difficile.',
            actionInstruction: 'Règle la pompe ГЦН à 75% ou plus.',
            actionWait: 'en attente d\'action...',
            actionDone: '✓ CORRECT'
        },
        {
            title: 'Refroidissement d\'urgence',
            text:  'Si la température dépasse 350°C, active le refroidissement d\'urgence — АВАРИЙНОЕ ОХЛАЖДЕНИЕ. C\'est l\'interrupteur à côté de la pompe. Il n\'y a pas de mauvais moment pour allumer ça. Il y a seulement le mauvais moment pour ne pas l\'allumer.'
        },
        {
            title: 'Le bouton АЗ-5',
            text:  'АЗ-5 est la protection d\'urgence totale. Insère toutes les barres, active le refroidissement, déconnecte du réseau. Irréversible. Utilise quand la température passe 400°C et tu ne peux pas contrôler. N\'hésite pas. Le réacteur peut être redémarré. Toi, non.'
        },
        {
            title: 'Le quota d\'énergie',
            text:  'Le Parti a un quota d\'énergie que tu dois respecter. Si tu descends en-dessous, les télégrammes arrivent. Puis les avertissements. Puis... bon, l\'opérateur précédent encore. Mais ne force pas le réacteur au-delà du sûr juste à cause des chiffres. Les chiffres changent. L\'accident, non.'
        },
        {
            title: 'Bonne chance, camarade',
            text:  'C\'est tout. C\'est pas si compliqué — ça semble seulement. N\'importe qui qui est venu jusqu\'ici et écoute encore un concierge doit être assez intelligent. Bonne chance. Je vais continuer à balayer.'
        }
    ]
};

// Condições dos passos interativos (por índice de passo, igual para todos os idiomas)
var TUTORIAL_ACTION_CHECKS = {
    2: function(sim) { return sim.controlRodsPosition >= 70; },
    3: function(sim) { return sim.mainPumpSpeed >= 75; }
};

var TUTORIAL_LABELS = {
    pt: { header: 'INSTRUÇÕES',    skip: 'PULAR',    next: 'PRÓXIMO', close: 'ENTENDIDO', of: 'de' },
    en: { header: 'BRIEFING',      skip: 'SKIP',     next: 'NEXT',    close: 'GOT IT',    of: 'of' },
    es: { header: 'INSTRUCCIONES', skip: 'SALTAR',   next: 'SIGUIENTE',close: 'ENTENDIDO',of: 'de' },
    fr: { header: 'INSTRUCTIONS',  skip: 'PASSER',   next: 'SUIVANT', close: 'COMPRIS',   of: 'sur' }
};

// ===== TUTORIAL SYSTEM =====
import { REACTOR_CONFIG } from './config.js';

export class TutorialSystem {
    constructor(simulation) {
        this.simulation     = simulation;
        this.lang           = window.selectedLanguage || 'en';
        this.steps          = TUTORIAL_STEPS[this.lang]  || TUTORIAL_STEPS['en'];
        this.labels         = TUTORIAL_LABELS[this.lang] || TUTORIAL_LABELS['en'];
        this.currentStep    = 0;
        this.panel          = null;
        this._actionInterval = null;
    }

    shouldShow() {
        return !localStorage.getItem('game_reator_tutorial_done');
    }

    show() {
        if (!this.shouldShow()) return;
        this._buildPanel();
        setTimeout(() => {
            if (this.panel) this.panel.classList.add('visible');
        }, 600);
    }

    _buildPanel() {
        const panel = document.createElement('div');
        panel.id = 'tutorial-panel';
        panel.innerHTML =
            '<div class="tut-header">' +
                '<span class="tut-header-label">' + this.labels.header + '</span>' +
                '<span class="tut-station">KJNP-1 · 1994</span>' +
            '</div>' +
            '<div class="tut-character">' +
                '<div class="tut-name">DOMINGOS FERREIRA</div>' +
                '<div class="tut-role">Faxineiro · Janitor · Concierge</div>' +
            '</div>' +
            '<div class="tut-body">' +
                '<div class="tut-step-title" id="tut-step-title"></div>' +
                '<div class="tut-step-text"  id="tut-step-text"></div>' +
                '<div class="tut-action"     id="tut-action" style="display:none">' +
                    '<div class="tut-action-instruction" id="tut-action-instruction"></div>' +
                    '<div class="tut-action-status"      id="tut-action-status"></div>' +
                '</div>' +
            '</div>' +
            '<div class="tut-footer">' +
                '<div class="tut-progress">' +
                    '<div class="tut-dots"    id="tut-dots"></div>' +
                    '<div class="tut-counter" id="tut-counter"></div>' +
                '</div>' +
                '<div class="tut-actions">' +
                    '<button class="tut-btn tut-btn-skip" id="tut-skip">' + this.labels.skip + '</button>' +
                    '<button class="tut-btn tut-btn-next" id="tut-next"></button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(panel);
        this.panel = panel;

        document.getElementById('tut-skip').addEventListener('click', () => this._complete());
        document.getElementById('tut-next').addEventListener('click', () => this._next());

        this._renderStep();
    }

    _renderStep() {
        const step   = this.steps[this.currentStep];
        const total  = this.steps.length;
        const isLast = this.currentStep === total - 1;
        const check  = TUTORIAL_ACTION_CHECKS[this.currentStep];

        document.getElementById('tut-step-title').textContent = step.title;
        document.getElementById('tut-step-text').textContent  = step.text;
        document.getElementById('tut-counter').textContent    =
            (this.currentStep + 1) + ' ' + this.labels.of + ' ' + total;

        // Dots
        let dots = '';
        for (let i = 0; i < total; i++) {
            dots += '<span class="tut-dot' + (i === this.currentStep ? ' active' : '') + '"></span>';
        }
        document.getElementById('tut-dots').innerHTML = dots;

        // Passo interativo
        const actionEl = document.getElementById('tut-action');
        const nextBtn  = document.getElementById('tut-next');

        this._stopActionCheck();

        if (check && step.actionInstruction) {
            actionEl.style.display = 'block';
            document.getElementById('tut-action-instruction').textContent = step.actionInstruction;
            document.getElementById('tut-action-status').textContent      = step.actionWait || '...';
            document.getElementById('tut-action-status').className        = 'tut-action-status waiting';
            nextBtn.textContent  = isLast ? this.labels.close : this.labels.next + ' →';
            nextBtn.disabled     = true;
            nextBtn.classList.add('disabled');
            this._startActionCheck(check, step.actionDone || '✓');
        } else {
            actionEl.style.display = 'none';
            nextBtn.textContent    = isLast ? this.labels.close : this.labels.next + ' →';
            nextBtn.disabled       = false;
            nextBtn.classList.remove('disabled');
        }
    }

    _startActionCheck(checkFn, doneLabel) {
        const sim = this.simulation;
        this._actionInterval = setInterval(() => {
            if (!checkFn(sim)) return;
            // Condição satisfeita
            this._stopActionCheck();
            const statusEl = document.getElementById('tut-action-status');
            const nextBtn  = document.getElementById('tut-next');
            if (statusEl) {
                statusEl.textContent = doneLabel;
                statusEl.className   = 'tut-action-status done';
            }
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('disabled');
            }
        }, 300);
    }

    _stopActionCheck() {
        if (this._actionInterval) {
            clearInterval(this._actionInterval);
            this._actionInterval = null;
        }
    }

    _next() {
        this.currentStep++;
        if (this.currentStep >= this.steps.length) {
            this._complete();
        } else {
            this._renderStep();
        }
    }

    _complete() {
        this._stopActionCheck();
        localStorage.setItem('game_reator_tutorial_done', '1');
        if (this.panel) {
            this.panel.classList.remove('visible');
            setTimeout(() => {
                if (this.panel && this.panel.parentNode) {
                    this.panel.parentNode.removeChild(this.panel);
                }
                this.panel = null;
            }, 400);
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TutorialSystem;
}
