// ===== INTRO SYSTEM =====
var introTexts = {
    pt: {
        title: "REPÚBLICA POPULAR DEMOCRÁTICA DE KRASNOSTAN",
        subtitle: "Ministério da Energia Nuclear | Departamento de Pessoal",
        classified: "DOCUMENTO CLASSIFICADO - NÍVEL SECRETO",
        
        story: {
            title: "SUA MISSÃO",
            text: '<p>Camarada, seja bem-vindo à <span class="highlight">República Popular Democrática de Krasnostan</span>!</p>' +
                '<p>Com o recente colapso da União Soviética em 1991, nosso glorioso país enfrentou uma situação <span class="warning">CRÍTICA</span>: ' +
                'todos os nossos engenheiros nucleares qualificados fugiram para o Ocidente em busca de salários melhores (os traidores!).</p>' +
                '<p>A <span class="highlight">Usina Nuclear de Krasnostan-4</span>, nossa maior fonte de energia, está ' +
                'operando no automático há 3 meses. O último operador deixou um bilhete dizendo ' +
                '<em>"Boa sorte, vocês vão precisar"</em> e pegou o primeiro voo para Frankfurt.</p>' +
                '<p>O Presidente Volkov, em sua infinita sabedoria (e desespero), autorizou a contratação de ' +
                '<span class="warning">qualquer pessoa com conhecimento básico de física nuclear</span>. ' +
                'É aqui que VOCÊ entra!</p>' +
                '<p>Sua missão: <span class="highlight">operar o reator nuclear RBMK-1000</span> e evitar ' +
                'que Krasnostan fique sem energia (ou piore... muito pior).</p>'
        },
        
        objective: {
            title: "OBJETIVO DO JOGO",
            text: '<p>Você é o <span class="highlight">novo Operador Chefe</span> da Usina Nuclear de Krasnostan-4. ' +
                'Seu trabalho é manter o reator funcionando de forma segura e eficiente.</p>' +
                '<p>O jogo simula a operação de um reator nuclear real com:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Controle de temperatura e pressão</li>' +
                '<li>Sistema de refrigeração</li>' +
                '<li>Geração de energia elétrica</li>' +
                '<li>Eventos aleatórios (acidentes, inspeções, diretivas do governo)</li>' +
                '<li>Missões desafiadoras</li></ul>' +
                '<p class="warning">⚠ LEMBRE-SE: Um reator desligado pode ser religado. Um reator derretido... não.</p>'
        },
        
        controls: {
            title: "CONTROLES PRINCIPAIS",
            text: '<p>A interface do reator está <span class="highlight">inteiramente em russo</span> (como na vida real!). Aqui está seu guia de sobrevivência:</p>',
            items: [
                {
                    key: "Стержни (Barras de Controle)",
                    desc: "Controlam a potência do reator. MENOS barras inseridas = MAIS potência. Mantenha entre 40-70% para operação normal."
                },
                {
                    key: "Главный насос (Bomba Principal)",
                    desc: "Controla o sistema de refrigeração. Aumente se a temperatura subir. Mantenha acima de 50%."
                },
                {
                    key: "Аварийное охлаждение (Resfriamento de Emergência)",
                    desc: "ATIVA em caso de superaquecimento! Use quando a temperatura passar de 320°C."
                },
                {
                    key: "Дополнительный насос (Bomba Extra)",
                    desc: "Liga/desliga uma bomba adicional de refrigeração. Útil em emergências."
                },
                {
                    key: "Подключено (Conexão à Rede)",
                    desc: "Conecta/desconecta a usina da rede elétrica. Desconecte antes de fazer ajustes grandes."
                },
                {
                    key: "АЗ-5 (Botão de Emergência)",
                    desc: "PARADA TOTAL DO REATOR! Irreversível. Use APENAS em emergências reais. Você foi avisado!"
                }
            ]
        },
        
        indicators: {
            title: "INDICADORES IMPORTANTES",
            text: "<p>Monitore constantemente estes valores:</p>",
            items: [
                { key: "Температура (Temperatura)", desc: "Normal: &lt; 300°C | Perigo: &gt; 350°C | Crítico: &gt; 400°C" },
                { key: "Давление (Pressão)", desc: "Normal: &lt; 17 MPa | Perigo: &gt; 19 MPa | Crítico: &gt; 22 MPa" },
                { key: "Радиация (Radiação)", desc: "Normal: &lt; 1.0 mSv/h | Perigo: &gt; 5.0 mSv/h | Crítico: &gt; 20 mSv/h" },
                { key: "Мощность (Potência)", desc: "Normal: 70-90% | Perigo: &gt; 100%" }
            ]
        },
        
        manual: {
            title: "MANUAL TÉCNICO",
            text: '<p>Durante o jogo, você pode acessar o <span class="highlight">Manual Técnico</span> clicando no botão ' +
                '<strong>"РУКОВОДСТВО"</strong> no topo da tela.</p>' +
                '<p>O manual estará <span class="highlight">no idioma que você selecionou</span> e contém:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Especificações técnicas do reator RBMK-1000</li>' +
                '<li>Procedimentos de operação normal</li>' +
                '<li>Procedimentos de emergência</li>' +
                '<li>Guia de solução de problemas</li>' +
                '<li>Tabelas de referência rápida</li></ul>' +
                '<p class="highlight">💡 DICA: Consulte o manual sempre que estiver em dúvida!</p>'
        },
        
        tips: {
            title: "DICAS DO SEU ANTECESSOR",
            text: '<p><em>(Encontrado rabiscado em um guardanapo no painel de controle)</em></p>' +
                '<p>"Ei, novo operador! Aqui vai uns conselhos de quem sobreviveu 6 meses neste emprego:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li><span class="highlight">NUNCA</span> deixe a temperatura passar de 350°C</li>' +
                '<li>Se o alarme tocar, não entre em pânico (mas se preocupe)</li>' +
                '<li>O botão АЗ-5 é tipo o botão vermelho dos filmes - só aperte se quiser explodir tudo (brincadeira... ou não)</li>' +
                '<li>O Ministério vai te ligar pedindo MAIS energia. Diga não. Ou melhor, minta e diga que não pode.</li>' +
                '<li>Se tudo der errado, finja que é um "teste de segurança programado"</li>' +
                '<li>Boa sorte, camarada. Você vai precisar. ☭"</li></ul>'
        },
        
        start: "INICIAR OPERAÇÃO",
        goodLuck: "☭ Boa sorte, Camarada Operador! Krasnostan conta com você! ☭"
    },
    
    en: {
        title: "PEOPLE'S DEMOCRATIC REPUBLIC OF KRASNOSTAN",
        subtitle: "Ministry of Nuclear Energy | Personnel Department",
        classified: "CLASSIFIED DOCUMENT - SECRET LEVEL",
        
        story: {
            title: "YOUR MISSION",
            text: '<p>Comrade, welcome to the <span class="highlight">People\'s Democratic Republic of Krasnostan</span>!</p>' +
                '<p>Following the recent collapse of the Soviet Union in 1991, our glorious nation faced a ' +
                '<span class="warning">CRITICAL</span> situation: all our qualified nuclear engineers fled to the West ' +
                'seeking better salaries (the traitors!).</p>' +
                '<p>The <span class="highlight">Krasnostan-4 Nuclear Power Plant</span>, our largest energy source, ' +
                'has been running on autopilot for 3 months. The last operator left a note saying ' +
                '<em>"Good luck, you\'ll need it"</em> and caught the first flight to Frankfurt.</p>' +
                '<p>President Volkov, in his infinite wisdom (and desperation), authorized hiring ' +
                '<span class="warning">anyone with basic knowledge of nuclear physics</span>. ' +
                'That\'s where YOU come in!</p>' +
                '<p>Your mission: <span class="highlight">operate the RBMK-1000 nuclear reactor</span> and prevent ' +
                'Krasnostan from losing power (or worse... much worse).</p>'
        },
        
        objective: {
            title: "GAME OBJECTIVE",
            text: '<p>You are the new <span class="highlight">Chief Operator</span> of Krasnostan-4 Nuclear Power Plant. ' +
                'Your job is to keep the reactor running safely and efficiently.</p>' +
                '<p>The game simulates real nuclear reactor operation with:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Temperature and pressure control</li>' +
                '<li>Cooling system management</li>' +
                '<li>Electric power generation</li>' +
                '<li>Random events (accidents, inspections, government directives)</li>' +
                '<li>Challenging missions</li></ul>' +
                '<p class="warning">⚠ REMEMBER: A shutdown reactor can be restarted. A melted reactor... cannot.</p>'
        },
        
        controls: {
            title: "MAIN CONTROLS",
            text: '<p>The reactor interface is <span class="highlight">entirely in Russian</span> (like in real life!). Here\'s your survival guide:</p>',
            items: [
                {
                    key: "Стержни (Control Rods)",
                    desc: "Control reactor power. FEWER rods inserted = MORE power. Keep between 40-70% for normal operation."
                },
                {
                    key: "Главный насос (Main Pump)",
                    desc: "Controls the cooling system. Increase if temperature rises. Keep above 50%."
                },
                {
                    key: "Аварийное охлаждение (Emergency Cooling)",
                    desc: "ACTIVATES in case of overheating! Use when temperature exceeds 320°C."
                },
                {
                    key: "Дополнительный насос (Extra Pump)",
                    desc: "Turns on/off an additional cooling pump. Useful in emergencies."
                },
                {
                    key: "Подключено (Grid Connection)",
                    desc: "Connects/disconnects the plant from the power grid. Disconnect before making large adjustments."
                },
                {
                    key: "АЗ-5 (Emergency Button)",
                    desc: "TOTAL REACTOR SHUTDOWN! Irreversible. Use ONLY in real emergencies. You've been warned!"
                }
            ]
        },
        
        indicators: {
            title: "IMPORTANT INDICATORS",
            text: "<p>Constantly monitor these values:</p>",
            items: [
                { key: "Температура (Temperature)", desc: "Normal: &lt; 300°C | Danger: &gt; 350°C | Critical: &gt; 400°C" },
                { key: "Давление (Pressure)", desc: "Normal: &lt; 17 MPa | Danger: &gt; 19 MPa | Critical: &gt; 22 MPa" },
                { key: "Радиация (Radiation)", desc: "Normal: &lt; 1.0 mSv/h | Danger: &gt; 5.0 mSv/h | Critical: &gt; 20 mSv/h" },
                { key: "Мощность (Power)", desc: "Normal: 70-90% | Danger: &gt; 100%" }
            ]
        },
        
        manual: {
            title: "TECHNICAL MANUAL",
            text: '<p>During the game, you can access the <span class="highlight">Technical Manual</span> by clicking the ' +
                '<strong>"РУКОВОДСТВО"</strong> button at the top of the screen.</p>' +
                '<p>The manual will be in <span class="highlight">the language you selected</span> and contains:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>RBMK-1000 reactor technical specifications</li>' +
                '<li>Normal operating procedures</li>' +
                '<li>Emergency procedures</li>' +
                '<li>Troubleshooting guide</li>' +
                '<li>Quick reference tables</li></ul>' +
                '<p class="highlight">💡 TIP: Consult the manual whenever in doubt!</p>'
        },
        
        tips: {
            title: "TIPS FROM YOUR PREDECESSOR",
            text: '<p><em>(Found scribbled on a napkin at the control panel)</em></p>' +
                '<p>"Hey, new operator! Here\'s some advice from someone who survived 6 months in this job:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li><span class="highlight">NEVER</span> let the temperature exceed 350°C</li>' +
                '<li>If the alarm rings, don\'t panic (but do worry)</li>' +
                '<li>The АЗ-5 button is like the red button in movies - only press if you want to blow everything up (joking... or not)</li>' +
                '<li>The Ministry will call asking for MORE power. Say no. Or better, lie and say you can\'t.</li>' +
                '<li>If everything goes wrong, pretend it\'s a "scheduled safety test"</li>' +
                '<li>Good luck, comrade. You\'ll need it. ☭"</li></ul>'
        },
        
        start: "BEGIN OPERATION",
        goodLuck: "☭ Good luck, Comrade Operator! Krasnostan counts on you! ☭"
    }
};

var IntroSystem = (function() {
    function IntroSystem(gameApp) {
        this.gameApp = gameApp;
        this.selectedLanguage = null;
        this.init();
    }

    IntroSystem.prototype.init = function() {
        this.showLanguageSelection();
    };

    IntroSystem.prototype.showLanguageSelection = function() {
        var self = this;
        var screen = document.createElement('div');
        screen.className = 'language-screen';
        screen.id = 'language-screen';
        
        screen.innerHTML = '<div class="language-content">' +
            '<div class="soviet-star">★</div>' +
            '<h1>АТОМНАЯ ЭЛЕКТРОСТАНЦИЯ</h1>' +
            '<p>Select your language / Selecione seu idioma</p>' +
            '<div class="language-buttons">' +
            '<button class="lang-btn" data-lang="pt"><span class="flag">🇧🇷</span>Português</button>' +
            '<button class="lang-btn" data-lang="en"><span class="flag">🇺🇸</span>English</button>' +
            '</div></div>';
        
        document.body.appendChild(screen);
        
        screen.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                self.selectedLanguage = btn.getAttribute('data-lang');
                self.showIntro(self.selectedLanguage);
            });
        });
    };

    IntroSystem.prototype.showIntro = function(lang) {
        var self = this;
        var texts = introTexts[lang];
        var langScreen = document.getElementById('language-screen');
        
        if (langScreen) {
            langScreen.parentNode.removeChild(langScreen);
        }
        
        var screen = document.createElement('div');
        screen.className = 'intro-screen';
        screen.id = 'intro-screen';
        
        // Build controls HTML
        var controlsHTML = '';
        texts.controls.items.forEach(function(item) {
            controlsHTML += '<div class="control-item">' +
                '<div class="key">' + item.key + '</div>' +
                '<div class="desc">' + item.desc + '</div></div>';
        });
        
        // Build indicators HTML
        var indicatorsHTML = '';
        texts.indicators.items.forEach(function(item) {
            indicatorsHTML += '<div class="control-item">' +
                '<div class="key">' + item.key + '</div>' +
                '<div class="desc">' + item.desc + '</div></div>';
        });
        
        screen.innerHTML = '<div class="intro-content">' +
            '<div class="intro-header">' +
            '<div class="soviet-emblem">★</div>' +
            '<h1>' + texts.title + '</h1>' +
            '<p class="subtitle">' + texts.subtitle + '</p>' +
            '<p style="color: #cc0000; margin-top: 10px;">' + texts.classified + '</p></div>' +
            
            '<div class="intro-section">' +
            '<h2>' + texts.story.title + '</h2>' +
            '<div class="typewriter">' + texts.story.text + '</div></div>' +
            
            '<div class="intro-section">' +
            '<h2>' + texts.objective.title + '</h2>' +
            '<div class="typewriter">' + texts.objective.text + '</div></div>' +
            
            '<div class="intro-section">' +
            '<h2>' + texts.controls.title + '</h2>' +
            '<div class="typewriter">' + texts.controls.text + '</div>' +
            '<div class="controls-grid">' + controlsHTML + '</div></div>' +
            
            '<div class="intro-section">' +
            '<h2>' + texts.indicators.title + '</h2>' +
            '<div class="typewriter">' + texts.indicators.text + '</div>' +
            '<div class="controls-grid">' + indicatorsHTML + '</div></div>' +
            
            '<div class="intro-section">' +
            '<h2>' + texts.manual.title + '</h2>' +
            '<div class="typewriter">' + texts.manual.text + '</div></div>' +
            
            '<div class="intro-section">' +
            '<h2>' + texts.tips.title + '</h2>' +
            '<div class="typewriter">' + texts.tips.text + '</div></div>' +
            
            '<div class="intro-footer">' +
            '<button class="start-btn" id="start-game-btn">' + texts.start + '</button>' +
            '<p class="secret-note">' + texts.goodLuck + '</p></div></div>';
        
        document.body.appendChild(screen);
        screen.scrollTop = 0;
        
        document.getElementById('start-game-btn').addEventListener('click', function() {
            self.startGame();
        });
    };

    IntroSystem.prototype.startGame = function() {
        var introScreen = document.getElementById('intro-screen');
        if (introScreen) {
            introScreen.parentNode.removeChild(introScreen);
        }
        
        // Store selected language globally
        window.selectedLanguage = this.selectedLanguage;
        
        if (this.gameApp) {
            this.gameApp.continueInit();
        }
    };

    return IntroSystem;
})();
