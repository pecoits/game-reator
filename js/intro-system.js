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
                { key: "Стержни (Barras de Controle)", desc: "Controlam a potência do reator. MENOS barras inseridas = MAIS potência. Mantenha entre 40-70% para operação normal." },
                { key: "Главный насос (Bomba Principal)", desc: "Controla o sistema de refrigeração. Aumente se a temperatura subir. Mantenha acima de 50%." },
                { key: "Аварийное охлаждение (Resfriamento de Emergência)", desc: "ATIVA em caso de superaquecimento! Use quando a temperatura passar de 320°C." },
                { key: "Дополнительный насос (Bomba Extra)", desc: "Liga/desliga uma bomba adicional de refrigeração. Útil em emergências." },
                { key: "Подключено (Conexão à Rede)", desc: "Conecta/desconecta a usina da rede elétrica. Desconecte antes de fazer ajustes grandes." },
                { key: "АЗ-5 (Botão de Emergência)", desc: "PARADA TOTAL DO REATOR! Irreversível. Use APENAS em emergências reais. Você foi avisado!" }
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
                '<strong>"MANUAL"</strong> no topo da tela.</p>' +
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
                { key: "Стержни (Control Rods)", desc: "Control reactor power. FEWER rods inserted = MORE power. Keep between 40-70% for normal operation." },
                { key: "Главный насос (Main Pump)", desc: "Controls the cooling system. Increase if temperature rises. Keep above 50%." },
                { key: "Аварийное охлаждение (Emergency Cooling)", desc: "ACTIVATES in case of overheating! Use when temperature exceeds 320°C." },
                { key: "Дополнительный насос (Extra Pump)", desc: "Turns on/off an additional cooling pump. Useful in emergencies." },
                { key: "Подключено (Grid Connection)", desc: "Connects/disconnects the plant from the power grid. Disconnect before making large adjustments." },
                { key: "АЗ-5 (Emergency Button)", desc: "TOTAL REACTOR SHUTDOWN! Irreversible. Use ONLY in real emergencies. You've been warned!" }
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
                '<strong>"MANUAL"</strong> button at the top of the screen.</p>' +
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
    },
    es: {
        title: "REPÚBLICA DEMOCRÁTICA POPULAR DE KRASNOSTAN",
        subtitle: "Ministerio de Energía Nuclear | Departamento de Personal",
        classified: "DOCUMENTO CLASIFICADO - NIVEL SECRETO",
        story: {
            title: "TU MISIÓN",
            text: '<p>Camarada, ¡bienvenido a la <span class="highlight">República Democrática Popular de Krasnostan</span>!</p>' +
                '<p>Tras el reciente colapso de la Unión Soviética en 1991, nuestro glorioso país enfrentó una situación <span class="warning">CRÍTICA</span>: ' +
                'todos nuestros ingenieros nucleares calificados huyeron al Occidente en busca de mejores salarios (¡los traidores!).</p>' +
                '<p>La <span class="highlight">Central Nuclear de Krasnostan-4</span>, nuestra mayor fuente de energía, lleva ' +
                '3 meses funcionando en modo automático. El último operador dejó una nota diciendo ' +
                '<em>"Buena suerte, la van a necesitar"</em> y tomó el primer vuelo a Frankfurt.</p>' +
                '<p>El Presidente Volkov, en su infinita sabiduría (y desesperación), autorizó contratar a ' +
                '<span class="warning">cualquier persona con conocimientos básicos de física nuclear</span>. ' +
                '¡Aquí es donde USTED entra!</p>' +
                '<p>Su misión: <span class="highlight">operar el reactor nuclear RBMK-1000</span> y evitar ' +
                'que Krasnostan se quede sin energía (o algo peor... mucho peor).</p>'
        },
        objective: {
            title: "OBJETIVO DEL JUEGO",
            text: '<p>Usted es el nuevo <span class="highlight">Operador Jefe</span> de la Central Nuclear de Krasnostan-4. ' +
                'Su trabajo es mantener el reactor funcionando de manera segura y eficiente.</p>' +
                '<p>El juego simula la operación de un reactor nuclear real con:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Control de temperatura y presión</li>' +
                '<li>Sistema de refrigeración</li>' +
                '<li>Generación de energía eléctrica</li>' +
                '<li>Eventos aleatorios (accidentes, inspecciones, directivas del gobierno)</li>' +
                '<li>Misiones desafiantes</li></ul>' +
                '<p class="warning">⚠ RECUERDE: Un reactor apagado puede reiniciarse. Un reactor fundido... no.</p>'
        },
        controls: {
            title: "CONTROLES PRINCIPALES",
            text: '<p>La interfaz del reactor está <span class="highlight">completamente en ruso</span> (¡como en la vida real!). Aquí está su guía de supervivencia:</p>',
            items: [
                { key: "Стержни (Barras de Control)", desc: "Controlan la potencia del reactor. MENOS barras insertadas = MÁS potencia. Mantenga entre 40-70% para operación normal." },
                { key: "Главный насос (Bomba Principal)", desc: "Controla el sistema de refrigeración. Aumente si la temperatura sube. Mantenga por encima del 50%." },
                { key: "Аварийное охлаждение (Refrigeración de Emergencia)", desc: "¡ACTIVAR en caso de sobrecalentamiento! Use cuando la temperatura supere los 320°C." },
                { key: "Дополнительный насос (Bomba Extra)", desc: "Enciende/apaga una bomba adicional de refrigeración. Útil en emergencias." },
                { key: "Подключено (Conexión a la Red)", desc: "Conecta/desconecta la planta de la red eléctrica. Desconecte antes de hacer ajustes grandes." },
                { key: "АЗ-5 (Botón de Emergencia)", desc: "¡PARADA TOTAL DEL REACTOR! Irreversible. Use SOLO en emergencias reales. ¡Está advertido!" }
            ]
        },
        indicators: {
            title: "INDICADORES IMPORTANTES",
            text: "<p>Monitoree constantemente estos valores:</p>",
            items: [
                { key: "Температура (Temperatura)", desc: "Normal: &lt; 300°C | Peligro: &gt; 350°C | Crítico: &gt; 400°C" },
                { key: "Давление (Presión)", desc: "Normal: &lt; 17 MPa | Peligro: &gt; 19 MPa | Crítico: &gt; 22 MPa" },
                { key: "Радиация (Radiación)", desc: "Normal: &lt; 1.0 mSv/h | Peligro: &gt; 5.0 mSv/h | Crítico: &gt; 20 mSv/h" },
                { key: "Мощность (Potencia)", desc: "Normal: 70-90% | Peligro: &gt; 100%" }
            ]
        },
        manual: {
            title: "MANUAL TÉCNICO",
            text: '<p>Durante el juego, puede acceder al <span class="highlight">Manual Técnico</span> haciendo clic en el botón ' +
                '<strong>"MANUAL"</strong> en la parte superior de la pantalla.</p>' +
                '<p>El manual contiene:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Especificaciones técnicas del reactor RBMK-1000</li>' +
                '<li>Procedimientos de operación normal</li>' +
                '<li>Procedimientos de emergencia</li>' +
                '<li>Guía de solución de problemas</li>' +
                '<li>Tablas de referencia rápida</li></ul>' +
                '<p class="highlight">💡 CONSEJO: ¡Consulte el manual siempre que tenga dudas!</p>'
        },
        tips: {
            title: "CONSEJOS DE SU PREDECESOR",
            text: '<p><em>(Encontrado garabateado en una servilleta en el panel de control)</em></p>' +
                '<p>"¡Oye, nuevo operador! Aquí van unos consejos de alguien que sobrevivió 6 meses en este trabajo:</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li><span class="highlight">NUNCA</span> deje que la temperatura supere los 350°C</li>' +
                '<li>Si suena la alarma, no entre en pánico (pero preocúpese)</li>' +
                '<li>El botón АЗ-5 es como el botón rojo de las películas - solo presiónelo si quiere explotar todo (broma... o no)</li>' +
                '<li>El Ministerio llamará pidiendo MÁS energía. Diga no. O mejor, mienta y diga que no puede.</li>' +
                '<li>Si todo sale mal, finja que es una "prueba de seguridad programada"</li>' +
                '<li>Buena suerte, camarada. La va a necesitar. ☭"</li></ul>'
        },
        start: "INICIAR OPERACIÓN",
        goodLuck: "☭ ¡Buena suerte, Camarada Operador! ¡Krasnostan cuenta contigo! ☭"
    },
    fr: {
        title: "RÉPUBLIQUE POPULAIRE DÉMOCRATIQUE DE KRASNOSTAN",
        subtitle: "Ministère de l'Énergie Nucléaire | Département du Personnel",
        classified: "DOCUMENT CLASSIFIÉ - NIVEAU SECRET",
        story: {
            title: "VOTRE MISSION",
            text: '<p>Camarade, bienvenue dans la <span class="highlight">République Populaire Démocratique de Krasnostan</span> !</p>' +
                '<p>Suite à l\'effondrement récent de l\'Union soviétique en 1991, notre glorieux pays a fait face à une situation <span class="warning">CRITIQUE</span> : ' +
                'tous nos ingénieurs nucléaires qualifiés ont fui vers l\'Occident en quête de meilleurs salaires (les traîtres !).</p>' +
                '<p>La <span class="highlight">Centrale Nucléaire de Krasnostan-4</span>, notre principale source d\'énergie, ' +
                'fonctionne en pilote automatique depuis 3 mois. Le dernier opérateur a laissé un message : ' +
                '<em>"Bonne chance, vous en aurez besoin"</em> et a pris le premier vol pour Francfort.</p>' +
                '<p>Le Président Volkov, dans son infinie sagesse (et désespoir), a autorisé le recrutement de ' +
                '<span class="warning">toute personne ayant des connaissances de base en physique nucléaire</span>. ' +
                'C\'est là que VOUS entrez en scène !</p>' +
                '<p>Votre mission : <span class="highlight">exploiter le réacteur nucléaire RBMK-1000</span> et empêcher ' +
                'Krasnostan de manquer d\'énergie (ou pire... bien pire).</p>'
        },
        objective: {
            title: "OBJECTIF DU JEU",
            text: '<p>Vous êtes le nouvel <span class="highlight">Opérateur en Chef</span> de la Centrale Nucléaire de Krasnostan-4. ' +
                'Votre travail est de maintenir le réacteur en fonctionnement sûr et efficace.</p>' +
                '<p>Le jeu simule l\'exploitation d\'un vrai réacteur nucléaire avec :</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Contrôle de la température et de la pression</li>' +
                '<li>Gestion du système de refroidissement</li>' +
                '<li>Production d\'énergie électrique</li>' +
                '<li>Événements aléatoires (accidents, inspections, directives gouvernementales)</li>' +
                '<li>Missions difficiles</li></ul>' +
                '<p class="warning">⚠ RAPPEL : Un réacteur arrêté peut redémarrer. Un réacteur fondu... non.</p>'
        },
        controls: {
            title: "COMMANDES PRINCIPALES",
            text: '<p>L\'interface du réacteur est <span class="highlight">entièrement en russe</span> (comme dans la vraie vie !). Voici votre guide de survie :</p>',
            items: [
                { key: "Стержни (Barres de Contrôle)", desc: "Contrôlent la puissance du réacteur. MOINS de barres insérées = PLUS de puissance. Maintenez entre 40-70% pour un fonctionnement normal." },
                { key: "Главный насос (Pompe Principale)", desc: "Contrôle le système de refroidissement. Augmentez si la température monte. Maintenez au-dessus de 50%." },
                { key: "Аварийное охлаждение (Refroidissement d'Urgence)", desc: "ACTIVEZ en cas de surchauffe ! Utilisez quand la température dépasse 320°C." },
                { key: "Дополнительный насос (Pompe Supplémentaire)", desc: "Active/désactive une pompe de refroidissement supplémentaire. Utile en cas d'urgence." },
                { key: "Подключено (Connexion au Réseau)", desc: "Connecte/déconnecte la centrale du réseau électrique. Déconnectez avant tout grand ajustement." },
                { key: "АЗ-5 (Bouton d'Urgence)", desc: "ARRÊT TOTAL DU RÉACTEUR ! Irréversible. Utilisez UNIQUEMENT en cas de vraie urgence. Vous êtes prévenu !" }
            ]
        },
        indicators: {
            title: "INDICATEURS IMPORTANTS",
            text: "<p>Surveillez constamment ces valeurs :</p>",
            items: [
                { key: "Температура (Température)", desc: "Normal : &lt; 300°C | Danger : &gt; 350°C | Critique : &gt; 400°C" },
                { key: "Давление (Pression)", desc: "Normal : &lt; 17 MPa | Danger : &gt; 19 MPa | Critique : &gt; 22 MPa" },
                { key: "Радиация (Radiation)", desc: "Normal : &lt; 1,0 mSv/h | Danger : &gt; 5,0 mSv/h | Critique : &gt; 20 mSv/h" },
                { key: "Мощность (Puissance)", desc: "Normal : 70-90% | Danger : &gt; 100%" }
            ]
        },
        manual: {
            title: "MANUEL TECHNIQUE",
            text: '<p>Pendant le jeu, vous pouvez accéder au <span class="highlight">Manuel Technique</span> en cliquant sur le bouton ' +
                '<strong>"MANUAL"</strong> en haut de l\'écran.</p>' +
                '<p>Le manuel contient :</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li>Spécifications techniques du réacteur RBMK-1000</li>' +
                '<li>Procédures d\'exploitation normale</li>' +
                '<li>Procédures d\'urgence</li>' +
                '<li>Guide de dépannage</li>' +
                '<li>Tableaux de référence rapide</li></ul>' +
                '<p class="highlight">💡 CONSEIL : Consultez le manuel en cas de doute !</p>'
        },
        tips: {
            title: "CONSEILS DE VOTRE PRÉDÉCESSEUR",
            text: '<p><em>(Trouvé griffonné sur une serviette au panneau de contrôle)</em></p>' +
                '<p>"Hé, nouvel opérateur ! Voici quelques conseils de quelqu\'un qui a survécu 6 mois dans ce travail :</p>' +
                '<ul style="color: #b0b0b0; margin-left: 20px;">' +
                '<li><span class="highlight">NE JAMAIS</span> laisser la température dépasser 350°C</li>' +
                '<li>Si l\'alarme sonne, ne paniquez pas (mais inquiétez-vous quand même)</li>' +
                '<li>Le bouton АЗ-5 est comme le bouton rouge des films - appuyez dessus seulement si vous voulez tout faire exploser (blague... ou pas)</li>' +
                '<li>Le Ministère appellera pour demander PLUS d\'énergie. Dites non. Ou mieux, mentez et dites que vous ne pouvez pas.</li>' +
                '<li>Si tout va mal, faites semblant que c\'est un "test de sécurité programmé"</li>' +
                '<li>Bonne chance, camarade. Vous en aurez besoin. ☭"</li></ul>'
        },
        start: "COMMENCER L'OPÉRATION",
        goodLuck: "☭ Bonne chance, Camarade Opérateur ! Krasnostan compte sur vous ! ☭"
    }
};

var IntroSystem = (function() {
    function IntroSystem(gameApp) {
        this.gameApp = gameApp;
        this.selectedLanguage = null;
        this.init();
    }

    IntroSystem.prototype.init = function() {
        console.log('IntroSystem: Initializing...');
        try {
            this.showLanguageSelection();
        } catch (error) {
            console.error('IntroSystem: Init error:', error);
            this.selectedLanguage = 'pt';
            window.selectedLanguage = 'pt';
            if (this.gameApp) {
                this.gameApp.continueInit();
            }
        }
    };

    IntroSystem.prototype.showLanguageSelection = function() {
        var self = this;
        console.log('IntroSystem: Creating language selection screen');
        
        try {
            var screen = document.createElement('div');
            screen.className = 'language-screen';
            screen.id = 'language-screen';
            screen.style.display = 'flex';
            screen.style.zIndex = '9999';

            screen.innerHTML = '<div class="language-content">' +
                '<div class="soviet-star">★</div>' +
                '<h1>АТОМНАЯ ЭЛЕКТРОСТАНЦИЯ</h1>' +
                '<p>Select your language / Selecione seu idioma</p>' +
                '<div class="language-buttons">' +
                '<button class="lang-btn" data-lang="pt">Português</button>' +
                '<button class="lang-btn" data-lang="en">English</button>' +
                '<button class="lang-btn" data-lang="es">Español</button>' +
                '<button class="lang-btn" data-lang="fr">Français</button>' +
                '</div></div>';

            document.body.appendChild(screen);
            console.log('IntroSystem: Language screen appended to body');

            var buttons = screen.querySelectorAll('.lang-btn');
            buttons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    console.log('IntroSystem: Language selected - ' + btn.getAttribute('data-lang'));
                    self.selectedLanguage = btn.getAttribute('data-lang');
                    self.showIntro(self.selectedLanguage);
                });
            });
        } catch (error) {
            console.error('IntroSystem: Error showing language selection:', error);
            this.selectedLanguage = 'pt';
            window.selectedLanguage = 'pt';
            if (this.gameApp) {
                this.gameApp.continueInit();
            }
        }
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
        screen.style.display = 'block';
        screen.style.zIndex = '9999';

        var controlsHTML = '';
        texts.controls.items.forEach(function(item) {
            controlsHTML += '<div class="control-item">' +
                '<div class="key">' + item.key + '</div>' +
                '<div class="desc">' + item.desc + '</div></div>';
        });

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
        console.log('IntroSystem: Intro screen displayed');

        var startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                console.log('IntroSystem: Start button clicked');
                self.startGame();
            });
        }
    };

    IntroSystem.prototype.startGame = function() {
        console.log('IntroSystem: Starting game...');
        var introScreen = document.getElementById('intro-screen');
        if (introScreen) {
            introScreen.parentNode.removeChild(introScreen);
        }
        window.selectedLanguage = this.selectedLanguage;
        if (this.gameApp) {
            this.gameApp.continueInit();
        }
    };

    return IntroSystem;
})();
