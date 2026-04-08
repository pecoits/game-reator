// ===== MANUAL CONTENT (PORTUGUESE AND ENGLISH) =====

var manualContentPT = '<h1>ESTAÇÃO DE ENERGIA NUCLEAR RBMK-1000</h1>' +
    '<h2>MANUAL DE OPERAÇÕES TÉCNICAS</h2>' +
    '<p><strong>Classificação:</strong> RESTRITO</p>' +
    '<p><strong>Documento Nº:</strong> UEN-1994-047</p>' +
    '<p><strong>Data:</strong> Janeiro de 1994</p>' +
    '<h2>ÍNDICE</h2>' +
    '<ol>' +
    '<li>Descrição Geral</li>' +
    '<li>Sistemas do Núcleo do Reator</li>' +
    '<li>Operações do Sistema de Resfriamento</li>' +
    '<li>Geração de Energia</li>' +
    '<li>Sistemas de Segurança</li>' +
    '<li>Procedimentos de Emergência</li>' +
    '<li>Guia de Solução de Problemas</li>' +
    '</ol>' +
    '<h2>1. DESCRIÇÃO GERAL</h2>' +
    '<p>O RBMK-1000 (Reaktor Bolshoy Moshchnosti Kanalnyy) é um reator nuclear de projeto soviético. Este manual cobre os procedimentos operacionais padrão para a Estação Nº 4, localizada na República Popular Democrática de Krasnostan.</p>' +
    '<p><strong>Especificações Principais:</strong></p>' +
    '<table><tr><th>Parâmetro</th><th>Valor</th></tr>' +
    '<tr><td>Potência Térmica (Тепловая мощность)</td><td>3200 MW</td></tr>' +
    '<tr><td>Produção Elétrica (Электрическая мощность)</td><td>1000 MW</td></tr>' +
    '<tr><td>Tipo de Refrigerante (Тип теплоносителя)</td><td>Água Leve</td></tr>' +
    '<tr><td>Moderador (Замедлитель)</td><td>Grafite</td></tr>' +
    '<tr><td>Combustível (Топливо)</td><td>UO₂ (2.0% de enriquecimento)</td></tr>' +
    '<tr><td>Pressão de Operação (Рабочее давление)</td><td>6.9 MPa</td></tr>' +
    '<tr><td>Temperatura do Núcleo (Температура активной зоны)</td><td>280-320°C</td></tr></table>' +
    '<h2>2. SISTEMAS DO NÚCLEO DO REATOR</h2>' +
    '<h3>2.1 Barras de Controle - Стержни регулирования</h3>' +
    '<p>O reator utiliza 211 barras de controle para regulação de potência e desligamento de emergência. As barras de controle absorvem nêutrons e regulam a taxa de fissão.</p>' +
    '<p><strong>Posições de Operação:</strong></p>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> Operação de alta potência (use com cautela)</li>' +
    '<li><strong>30-70%:</strong> Faixa de operação normal</li>' +
    '<li><strong>70-100%:</strong> Baixa potência / condição de desligamento</li>' +
    '</ul>' +
    '<div class="warning-box"><h3>⚠ AVISO</h3>' +
    '<p>A inserção rápida das barras pode causar oscilações de potência. Ajuste gradualmente (máximo 5% por vez).</p></div>' +
    '<h3>2.2 Monitoramento da Temperatura - Температура</h3>' +
    '<p>Temperatura normal de operação: <strong>250-300°C</strong></p>' +
    '<ul>' +
    '<li><strong>Atenção (ВНИМАНИЕ):</strong> > 300°C - Monitore de perto</li>' +
    '<li><strong>Perigo (ОПАСНОСТЬ):</strong> > 350°C - Tome ação corretiva</li>' +
    '<li><strong>Crítico (КРИТИЧЕСКИЙ):</strong> > 400°C - Desligamento imediato necessário</li>' +
    '</ul>' +
    '<h2>3. OPERAÇÕES DO SISTEMA DE RESFRIAMENTO - Охлаждение</h2>' +
    '<h3>3.1 Bomba Principal - Главный насос (ГЦН)</h3>' +
    '<p>O circuito primário de resfriamento usa 8 bombas de circulação principais (ГЦН). Velocidade normal de operação: <strong>60-80%</strong></p>' +
    '<h3>3.2 Sistema de Resfriamento de Emergência - Аварийное охлаждение</h3>' +
    '<p>Pode ser ativado manualmente pelo botão <strong>"Аварийное охлаждение"</strong> ou automaticamente quando:</p>' +
    '<ul>' +
    '<li>Temperatura do núcleo excede 350°C</li>' +
    '<li>Pressão cai abaixo de 5.0 MPa</li>' +
    '<li>Ativação manual do АЗ-5</li>' +
    '</ul>' +
    '<h3>3.3 Bomba Extra - Дополнительный насос</h3>' +
    '<p>Bomba adicional de refrigeração. Ative com o botão <strong>"Дополнительный насос"</strong> em situações de emergência.</p>' +
    '<h3>3.4 Parâmetros do Circuito Secundário</h3>' +
    '<table><tr><th>Parâmetro</th><th>Faixa Normal</th></tr>' +
    '<tr><td>Temperatura de Entrada (Температура на входе)</td><td>170-190°C</td></tr>' +
    '<tr><td>Temperatura de Saída (Температура на выходе)</td><td>270-290°C</td></tr>' +
    '<tr><td>Fluxo do Refrigerante (Расход теплоносителя)</td><td>8000-9000 m³/h</td></tr>' +
    '<tr><td>Nível do Pressurizador (Уровень в компенсаторе)</td><td>50-70%</td></tr></table>' +
    '<h2>4. GERAÇÃO DE ENERGIA - Энергия</h2>' +
    '<p>A produção elétrica é gerada por dois turbo-geradores com capacidade de 500 MW cada.</p>' +
    '<h3>4.1 Conexão à Rede - Подключено</h3>' +
    '<p>Parâmetros da rede elétrica:</p>' +
    '<ul>' +
    '<li><strong>Tensão (Напряжение):</strong> 15.75 кВ</li>' +
    '<li><strong>Frequência (Частота):</strong> 50.0 Гц ± 0.2</li>' +
    '<li><strong>Carga da Rede (Нагрузка сети):</strong> 70-90%</li>' +
    '</ul>' +
    '<p>Conecte/desconecte com o botão <strong>"Подключено"</strong>.</p>' +
    '<h2>5. SISTEMAS DE SEGURANÇA - Системы безопасности</h2>' +
    '<h3>5.1 Proteção de Emergência АЗ-5 (Аварийная Защита)</h3>' +
    '<p>O botão <strong>АЗ-5</strong> (em vermelho no painel) aciona o desligamento completo do reator:</p>' +
    '<ul>' +
    '<li>Todas as barras de controle inseridas automaticamente (100%)</li>' +
    '<li>Resfriamento de emergência ativado</li>' +
    '<li>Geradores desconectados da rede</li>' +
    '</ul>' +
    '<div class="warning-box"><h3>⚠ AVISO CRÍTICO</h3>' +
    '<p>АЗ-5 é IRREVERSÍVEL. O reator não pode ser reiniciado sem reset completo por pessoal autorizado.</p>' +
    '<p>Use APENAS em emergências genuínas.</p></div>' +
    '<h3>5.2 Monitoramento de Radiação - Радиация</h3>' +
    '<table><tr><th>Nível</th><th>Leitura</th><th>Ação</th></tr>' +
    '<tr><td>Normal</td><td>&lt; 0.5 мЗв/ч</td><td>Continue operações</td></tr>' +
    '<tr><td>Elevado</td><td>0.5 - 1.0 мЗв/ч</td><td>Investigue a fonte</td></tr>' +
    '<tr><td>Atenção (ВНИМАНИЕ)</td><td>1.0 - 5.0 мЗв/ч</td><td>Limite o acesso</td></tr>' +
    '<tr><td>Perigo (ОПАСНОСТЬ)</td><td>&gt; 5.0 мЗв/ч</td><td>Evacue pessoal</td></tr></table>' +
    '<h2>6. PROCEDIMENTOS DE EMERGÊNCIA - Аварийные процедуры</h2>' +
    '<h3>6.1 Perda de Refrigerante (LOCA)</h3>' +
    '<ol>' +
    '<li>Ative <strong>"Аварийное охлаждение"</strong> (Resfriamento de Emergência)</li>' +
    '<li>Aumente <strong>"Стержни"</strong> para 80%+ (barras de controle)</li>' +
    '<li>Ative <strong>"Дополнительный насос"</strong> (Bomba Extra)</li>' +
    '<li>Monitore <strong>"Температура"</strong> continuamente</li>' +
    '<li>Se temperatura &gt; 400°C, pressione <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h3>6.2 Aumento Súbito de Potência</h3>' +
    '<ol>' +
    '<li>Aumente <strong>"Стержни"</strong> imediatamente</li>' +
    '<li>Reduza <strong>"Главный насос"</strong> se temperatura subir</li>' +
    '<li>Monitore <strong>"Давление"</strong> (pressão)</li>' +
    '<li>Prepare-se para pressionar <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h2>7. GUIA DE SOLUÇÃO DE PROBLEMAS</h2>' +
    '<table><tr><th>Sintoma</th><th>Termo Russo</th><th>Ação Corretiva</th></tr>' +
    '<tr><td>Alta temperatura</td><td>Высокая температура</td><td>Aumente <strong>"Главный насос"</strong>, ative <strong>"Аварийное охлаждение"</strong></td></tr>' +
    '<tr><td>Alta pressão</td><td>Высокое давление</td><td>Reduza potência, aumente <strong>"Стержни"</strong></td></tr>' +
    '<tr><td>Oscilações de potência</td><td>Колебания мощности</td><td>Estabilize <strong>"Стержни"</strong></td></tr>' +
    '<tr><td>Alta radiação</td><td>Высокая радиация</td><td>Reduza potência com <strong>"Стержни"</strong></td></tr>' +
    '<tr><td>Desvio de frequência</td><td>Отклонение частоты</td><td>Ajuste carga da rede</td></tr>' +
    '<tr><td>Baixo nível</td><td>Низкий уровень</td><td>Ative <strong>"Дополнительный насос"</strong></td></tr></table>' +
    '<div class="warning-box"><h3>⚠ LEMBRE-SE</h3>' +
    '<p>Na dúvida, priorize a SEGURANÇA sobre a produção de energia.</p>' +
    '<p>Um reator desligado pode ser reiniciado. Um reator destruído, não.</p>' +
    '<p><em>"O átomo é um bom servo, mas um mau mestre."</em></p></div>' +
    '<h2>APÊNDICE: CONTATOS DE EMERGÊNCIA</h2>' +
    '<table><tr><th>Posição</th><th>Ramal</th></tr>' +
    '<tr><td>Diretor da Estação (Директор станции)</td><td>1001</td></tr>' +
    '<tr><td>Engenheiro Chefe (Главный инженер)</td><td>1002</td></tr>' +
    '<tr><td>Oficial de Segurança (Офицер безопасности)</td><td>1003</td></tr>' +
    '<tr><td>Ministério da Energia (Министерство)</td><td>9000</td></tr>' +
    '<tr><td>Emergências (Экстренные службы)</td><td>9999</td></tr></table>' +
    '<p style="margin-top: 40px; text-align: center; color: #888;">' +
    '<em>FIM DO MANUAL</em><br>' +
    '<em>Documento UEN-1994-047 Rev. 3</em><br>' +
    '<em>Aprovado pelo Engenheiro Chefe, Estação Nº 4</em></p>';

// Manual content in English
var manualContentHTML = '<h1>RBMK-1000 NUCLEAR POWER STATION</h1>' +
    '<h2>TECHNICAL OPERATIONS MANUAL</h2>' +
    '<p><strong>Classification:</strong> RESTRICTED</p>' +
    '<p><strong>Document No:</strong> NPS-1994-047</p>' +
    '<p><strong>Date:</strong> January 1994</p>' +
    '<h2>TABLE OF CONTENTS</h2>' +
    '<ol>' +
    '<li>General Description</li>' +
    '<li>Reactor Core Systems</li>' +
    '<li>Cooling System Operations</li>' +
    '<li>Power Generation</li>' +
    '<li>Safety Systems</li>' +
    '<li>Emergency Procedures</li>' +
    '<li>Troubleshooting Guide</li>' +
    '</ol>' +
    '<h2>1. GENERAL DESCRIPTION</h2>' +
    '<p>The RBMK-1000 (Reaktor Bolshoy Moshchnosti Kanalnyy) is a Soviet-designed nuclear power reactor. This manual covers standard operating procedures for Station No. 4.</p>' +
    '<p><strong>Key Specifications:</strong></p>' +
    '<table><tr><th>Parameter</th><th>Value</th></tr>' +
    '<tr><td>Thermal Power (Тепловая мощность)</td><td>3200 MW</td></tr>' +
    '<tr><td>Electrical Output (Электрическая мощность)</td><td>1000 MW</td></tr>' +
    '<tr><td>Coolant Type (Тип теплоносителя)</td><td>Light Water</td></tr>' +
    '<tr><td>Moderator (Замедлитель)</td><td>Graphite</td></tr>' +
    '<tr><td>Fuel (Топливо)</td><td>UO₂ (2.0% enrichment)</td></tr>' +
    '<tr><td>Operating Pressure (Рабочее давление)</td><td>6.9 MPa</td></tr>' +
    '<tr><td>Core Temperature (Температура)</td><td>280-320°C</td></tr></table>' +
    '<h2>2. REACTOR CORE SYSTEMS</h2>' +
    '<h3>2.1 Control Rods - Стержни регулирования</h3>' +
    '<p>The reactor uses 211 control rods for power regulation and emergency shutdown.</p>' +
    '<p><strong>Operating Positions:</strong></p>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> High power (use with caution)</li>' +
    '<li><strong>30-70%:</strong> Normal operating range</li>' +
    '<li><strong>70-100%:</strong> Low power / shutdown</li>' +
    '</ul>' +
    '<div class="warning-box"><h3>⚠ WARNING</h3>' +
    '<p>Rapid insertion causes power oscillations. Adjust gradually (max 5% per step).</p></div>' +
    '<h3>2.2 Core Temperature - Температура активной зоны</h3>' +
    '<p>Normal operating temperature: <strong>250-300°C</strong></p>' +
    '<ul>' +
    '<li><strong>Warning (ВНИМАНИЕ):</strong> > 300°C - Monitor closely</li>' +
    '<li><strong>Danger (ОПАСНОСТЬ):</strong> > 350°C - Take corrective action</li>' +
    '<li><strong>Critical (КРИТИЧЕСКИЙ):</strong> > 400°C - Immediate shutdown required</li>' +
    '</ul>' +
    '<h2>3. COOLING SYSTEM OPERATIONS - Охлаждение</h2>' +
    '<h3>3.1 Main Pump - Главный насос (ГЦН)</h3>' +
    '<p>Primary cooling circuit uses 8 main circulation pumps. Normal speed: <strong>60-80%</strong></p>' +
    '<h3>3.2 Emergency Cooling - Аварийное охлаждение</h3>' +
    '<p>Can be activated manually via <strong>"Аварийное охлаждение"</strong> button or automatically when:</p>' +
    '<ul>' +
    '<li>Core temperature exceeds 350°C</li>' +
    '<li>Pressure drops below 5.0 MPa</li>' +
    '<li>Manual АЗ-5 activation</li>' +
    '</ul>' +
    '<h3>3.3 Extra Pump - Дополнительный насос</h3>' +
    '<p>Additional cooling pump. Activate with <strong>"Дополнительный насос"</strong> in emergencies.</p>' +
    '<h3>3.4 Secondary Circuit Parameters</h3>' +
    '<table><tr><th>Parameter</th><th>Normal Range</th></tr>' +
    '<tr><td>Inlet Temp (Температура на входе)</td><td>170-190°C</td></tr>' +
    '<tr><td>Outlet Temp (Температура на выходе)</td><td>270-290°C</td></tr>' +
    '<tr><td>Coolant Flow (Расход теплоносителя)</td><td>8000-9000 m³/h</td></tr>' +
    '<tr><td>Pressurizer Level (Уровень в компенсаторе)</td><td>50-70%</td></tr></table>' +
    '<h2>4. POWER GENERATION - Энергия</h2>' +
    '<p>Electrical output from two turbo-generators rated at 500 MW each.</p>' +
    '<h3>4.1 Grid Connection - Подключено</h3>' +
    '<p>Grid parameters:</p>' +
    '<ul>' +
    '<li><strong>Voltage (Напряжение):</strong> 15.75 кВ</li>' +
    '<li><strong>Frequency (Частота):</strong> 50.0 Гц ± 0.2</li>' +
    '<li><strong>Grid Load (Нагрузка сети):</strong> 70-90%</li>' +
    '</ul>' +
    '<p>Connect/disconnect with <strong>"Подключено"</strong> button.</p>' +
    '<h2>5. SAFETY SYSTEMS - Системы безопасности</h2>' +
    '<h3>5.1 Emergency Protection АЗ-5 (Аварийная Защита)</h3>' +
    '<p>The <strong>АЗ-5</strong> button (red on panel) triggers complete reactor shutdown:</p>' +
    '<ul>' +
    '<li>All control rods fully inserted (100%)</li>' +
    '<li>Emergency cooling activated</li>' +
    '<li>Generators disconnected from grid</li>' +
    '</ul>' +
    '<div class="warning-box"><h3>⚠ CRITICAL WARNING</h3>' +
    '<p>АЗ-5 is IRREVERSIBLE. Reactor cannot be restarted without full reset by authorized personnel.</p>' +
    '<p>Use ONLY in genuine emergencies.</p></div>' +
    '<h3>5.2 Radiation Monitoring - Радиация</h3>' +
    '<table><tr><th>Level</th><th>Reading</th><th>Action</th></tr>' +
    '<tr><td>Normal</td><td>&lt; 0.5 мЗв/ч</td><td>Continue operations</td></tr>' +
    '<tr><td>Elevated</td><td>0.5 - 1.0 мЗв/ч</td><td>Investigate</td></tr>' +
    '<tr><td>Warning (ВНИМАНИЕ)</td><td>1.0 - 5.0 мЗв/ч</td><td>Limit access</td></tr>' +
    '<tr><td>Danger (ОПАСНОСТЬ)</td><td>&gt; 5.0 мЗв/ч</td><td>Evacuate</td></tr></table>' +
    '<h2>6. EMERGENCY PROCEDURES - Аварийные процедуры</h2>' +
    '<h3>6.1 Loss of Coolant (LOCA)</h3>' +
    '<ol>' +
    '<li>Activate <strong>"Аварийное охлаждение"</strong> (Emergency Cooling)</li>' +
    '<li>Increase <strong>"Стержни"</strong> to 80%+ (control rods)</li>' +
    '<li>Activate <strong>"Дополнительный насос"</strong> (Extra Pump)</li>' +
    '<li>Monitor <strong>"Температура"</strong> continuously</li>' +
    '<li>If temp &gt; 400°C, press <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h3>6.2 Power Excursion</h3>' +
    '<ol>' +
    '<li>Increase <strong>"Стержни"</strong> immediately</li>' +
    '<li>Reduce <strong>"Главный насос"</strong> if temp rising</li>' +
    '<li>Monitor <strong>"Давление"</strong> (pressure)</li>' +
    '<li>Prepare to press <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h2>7. TROUBLESHOOTING GUIDE</h2>' +
    '<table><tr><th>Symptom</th><th>Russian Term</th><th>Corrective Action</th></tr>' +
    '<tr><td>High temperature</td><td>Высокая температура</td><td>Increase <strong>"Главный насос"</strong>, activate <strong>"Аварийное охлаждение"</strong></td></tr>' +
    '<tr><td>High pressure</td><td>Высокое давление</td><td>Reduce power, increase <strong>"Стержни"</strong></td></tr>' +
    '<tr><td>Power oscillations</td><td>Колебания мощности</td><td>Stabilize <strong>"Стержни"</strong></td></tr>' +
    '<tr><td>High radiation</td><td>Высокая радиация</td><td>Reduce power with <strong>"Стержни"</strong></td></tr>' +
    '<tr><td>Frequency deviation</td><td>Отклонение частоты</td><td>Adjust grid load</td></tr>' +
    '<tr><td>Low level</td><td>Низкий уровень</td><td>Activate <strong>"Дополнительный насос"</strong></td></tr></table>' +
    '<div class="warning-box"><h3>⚠ REMEMBER</h3>' +
    '<p>When in doubt, prioritize SAFETY over power output.</p>' +
    '<p>A shutdown reactor can be restarted. A destroyed reactor cannot.</p>' +
    '<p><em>"The atom is a good servant but a bad master."</em></p></div>' +
    '<h2>APPENDIX: EMERGENCY CONTACTS</h2>' +
    '<table><tr><th>Position</th><th>Extension</th></tr>' +
    '<tr><td>Station Director (Директор станции)</td><td>1001</td></tr>' +
    '<tr><td>Chief Engineer (Главный инженер)</td><td>1002</td></tr>' +
    '<tr><td>Safety Officer (Офицер безопасности)</td><td>1003</td></tr>' +
    '<tr><td>Ministry of Energy (Министерство)</td><td>9000</td></tr>' +
    '<tr><td>Emergency Services (Экстренные службы)</td><td>9999</td></tr></table>' +
    '<p style="margin-top: 40px; text-align: center; color: #888;">' +
    '<em>END OF MANUAL</em><br>' +
    '<em>Document NPS-1994-047 Rev. 3</em><br>' +
    '<em>Approved by Chief Engineer, Station No. 4</em></p>';

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pt: manualContentPT, en: manualContentHTML };
}
