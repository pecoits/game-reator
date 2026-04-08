// ===== MANUAL CONTENT - POCKET MANUAL STYLE =====

// Portuguese Manual - Split into pages
var manualPagesPT = [
    // Page 1: Cover
    '<div class="manual-page active" data-page="1">' +
    '<div style="text-align: center; padding: 40px 20px;">' +
    '<div style="font-size: 60px; color: #cc0000; margin-bottom: 20px;">★</div>' +
    '<h1 style="font-size: 28px; margin-bottom: 10px;">ESTAÇÃO NUCLEAR RBMK-1000</h1>' +
    '<h2 style="color: #888; font-weight: normal;">Manual de Operações Técnicas</h2>' +
    '<div style="margin-top: 40px; padding: 20px; border: 2px solid #cc0000; display: inline-block;">' +
    '<p style="color: #cc0000; font-weight: bold; margin: 0;">DOCUMENTO RESTRITO</p>' +
    '<p style="color: #888; font-size: 12px; margin: 5px 0 0;">UEN-1994-047</p>' +
    '</div>' +
    '<div style="margin-top: 40px; color: #888; font-size: 13px;">' +
    '<p>República Popular Democrática de Krasnostan</p>' +
    '<p>Ministério da Energia Nuclear</p>' +
    '<p>Janeiro de 1994</p>' +
    '</div>' +
    '</div></div>',
    
    // Page 2: Index
    '<div class="manual-page" data-page="2">' +
    '<h1>ÍNDICE</h1>' +
    '<ol style="font-size: 14px; line-height: 2;">' +
    '<li>Especificações do Reator</li>' +
    '<li>Barras de Controle (Стержни)</li>' +
    '<li>Sistema de Resfriamento</li>' +
    '<li>Geração de Energia</li>' +
    '<li>Sistemas de Segurança</li>' +
    '<li>Emergências</li>' +
    '<li>Solução de Problemas</li>' +
    '</ol>' +
    '<div class="warning-box" style="margin-top: 30px;">' +
    '<h3>⚠ LEIA COM ATENÇÃO</h3>' +
    '<p>Este manual contém informações vitais para operação segura. Consulte sempre que tiver dúvidas.</p>' +
    '</div></div>',
    
    // Page 3: Specifications
    '<div class="manual-page" data-page="3">' +
    '<h1>ESPECIFICAÇÕES</h1>' +
    '<h2>Reator RBMK-1000</h2>' +
    '<table>' +
    '<tr><th>Parâmetro</th><th>Russo</th><th>Valor</th></tr>' +
    '<tr><td>Potência Térmica</td><td>Тепловая мощность</td><td>3200 MW</td></tr>' +
    '<tr><td>Produção Elétrica</td><td>Электрическая мощность</td><td>1000 MW</td></tr>' +
    '<tr><td>Refrigerante</td><td>Тип теплоносителя</td><td>Água Leve</td></tr>' +
    '<tr><td>Moderador</td><td>Замедлитель</td><td>Grafite</td></tr>' +
    '<tr><td>Combustível</td><td>Топливо</td><td>UO₂ (2.0%)</td></tr>' +
    '<tr><td>Pressão Operação</td><td>Рабочее давление</td><td>6.9 MPa</td></tr>' +
    '<tr><td>Temperatura</td><td>Температура</td><td>280-320°C</td></tr>' +
    '</table></div>',
    
    // Page 4: Control Rods
    '<div class="manual-page" data-page="4">' +
    '<h1>BARRAS DE CONTROLE</h1>' +
    '<h2>Стержни регулирования</h2>' +
    '<p>211 barras absorvem nêutrons e regulam a fissão.</p>' +
    '<h3>Posições de Operação:</h3>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> Alta potência (cuidado!)</li>' +
    '<li><strong>30-70%:</strong> Operação normal ✓</li>' +
    '<li><strong>70-100%:</strong> Baixa potência / desligamento</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ IMPORTANTE</h3>' +
    '<p>Ajuste gradualmente! Máximo 5% por vez para evitar oscilações.</p>' +
    '</div>' +
    '<p><strong>Temperatura do Núcleo (Температура):</strong></p>' +
    '<ul>' +
    '<li>Normal: &lt; 300°C</li>' +
    '<li>ВНИМАНИЕ: 300-350°C</li>' +
    '<li>ОПАСНОСТЬ: &gt; 350°C</li>' +
    '<li>КРИТИЧЕСКИЙ: &gt; 400°C</li>' +
    '</ul></div>',
    
    // Page 5: Cooling
    '<div class="manual-page" data-page="5">' +
    '<h1>RESFRIAMENTO</h1>' +
    '<h2>Охлаждение</h2>' +
    '<h3>Bomba Principal - Главный насос (ГЦН)</h3>' +
    '<p>8 bombas de circulação. Velocidade normal: <strong>60-80%</strong></p>' +
    '<h3>Resfriamento Emergência - Аварийное охлаждение</h3>' +
    '<p>Ative quando:</p>' +
    '<ul>' +
    '<li>Temperatura &gt; 320°C</li>' +
    '<li>Pressão cai abaixo de 5.0 MPa</li>' +
    '<li>Antes de usar АЗ-5</li>' +
    '</ul>' +
    '<h3>Bomba Extra - Дополнительный насос</h3>' +
    '<p>Use em emergências para reforçar resfriamento.</p>' +
    '<h3>Parâmetros do Circuito:</h3>' +
    '<table>' +
    '<tr><th>Parâmetro</th><th>Normal</th></tr>' +
    '<tr><td>Entrada (на входе)</td><td>170-190°C</td></tr>' +
    '<tr><td>Saída (на выходе)</td><td>270-290°C</td></tr>' +
    '<tr><td>Fluxo (Расход)</td><td>8000-9000 m³/h</td></tr>' +
    '<tr><td>Pressurizador (Уровень)</td><td>50-70%</td></tr>' +
    '</table></div>',
    
    // Page 6: Power
    '<div class="manual-page" data-page="6">' +
    '<h1>ENERGIA</h1>' +
    '<h2>Энергия</h2>' +
    '<p>Dois turbo-geradores de 500 MW cada.</p>' +
    '<h3>Conexão à Rede - Подключено</h3>' +
    '<table>' +
    '<tr><th>Parâmetro</th><th>Valor</th></tr>' +
    '<tr><td>Tensão (Напряжение)</td><td>15.75 кВ</td></tr>' +
    '<tr><td>Frequência (Частота)</td><td>50.0 Гц ± 0.2</td></tr>' +
    '<tr><td>Carga (Нагрузка)</td><td>70-90%</td></tr>' +
    '</table>' +
    '<p><strong>Botão Подключено:</strong> Conecta/desconecta da rede. Desconecte antes de ajustes grandes.</p>' +
    '<div class="warning-box">' +
    '<h3>💡 DICA</h3>' +
    '<p>Mantenha carga entre 70-90% para operação estável.</p>' +
    '</div></div>',
    
    // Page 7: Safety
    '<div class="manual-page" data-page="7">' +
    '<h1>SEGURANÇA</h1>' +
    '<h2>Системы безопасности</h2>' +
    '<h3>АЗ-5 (Аварийная Защита)</h3>' +
    '<p>Botão vermelho no painel. Causa:</p>' +
    '<ul>' +
    '<li>Barras inseridas 100% automaticamente</li>' +
    '<li>Resfriamento emergência ativado</li>' +
    '<li>Geradores desconectados</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ IRREVERSÍVEL!</h3>' +
    '<p>АЗ-5 não pode ser desfeito. Use APENAS em emergências reais.</p>' +
    '</div>' +
    '<h3>Radiação - Радиация</h3>' +
    '<table>' +
    '<tr><th>Nível</th><th>Leitura</th></tr>' +
    '<tr><td>Normal</td><td>&lt; 0.5 мЗв/ч</td></tr>' +
    '<tr><td>ВНИМАНИЕ</td><td>1.0 - 5.0 мЗв/ч</td></tr>' +
    '<tr><td>ОПАСНОСТЬ</td><td>&gt; 5.0 мЗв/ч</td></tr>' +
    '</table></div>',
    
    // Page 8: Emergencies
    '<div class="manual-page" data-page="8">' +
    '<h1>EMERGÊNCIAS</h1>' +
    '<h2>Аварийные процедуры</h2>' +
    '<h3>Alta Temperatura (Высокая температура)</h3>' +
    '<ol>' +
    '<li>Ative <strong>"Аварийное охлаждение"</strong></li>' +
    '<li>Aumente <strong>"Стержни"</strong> para 80%+</li>' +
    '<li>Ative <strong>"Дополнительный насос"</strong></li>' +
    '<li>Se &gt; 400°C → pressione <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h3>Alta Pressão (Высокое давление)</h3>' +
    '<ol>' +
    '<li>Reduza potência com <strong>"Стержни"</strong></li>' +
    '<li>Aumente <strong>"Главный насос"</strong></li>' +
    '<li>Monitore pressão</li>' +
    '</ol>' +
    '<h3>Alta Radiação (Высокая радиация)</h3>' +
    '<ol>' +
    '<li>Reduza potência</li>' +
    '<li>Investigue fonte</li>' +
    '<li>Se &gt; 5.0 → evacue</li>' +
    '</ol></div>',
    
    // Page 9: Troubleshooting
    '<div class="manual-page" data-page="9">' +
    '<h1>PROBLEMAS</h1>' +
    '<h2>Сolução rápida</h2>' +
    '<table>' +
    '<tr><th>Sintoma</th><th>Ação</th></tr>' +
    '<tr><td>Высокая температура</td><td>↑ Главный насос, Аварийное</td></tr>' +
    '<tr><td>Высокое давление</td><td>↓ Potência, ↑ Стержни</td></tr>' +
    '<tr><td>Колебания мощности</td><td>Estabilize Стержни</td></tr>' +
    '<tr><td>Высокая радиация</td><td>↓ Potência, investigue</td></tr>' +
    '<tr><td>Отклонение частоты</td><td>Ajuste carga</td></tr>' +
    '<tr><td>Низкий уровень</td><td>↑ Дополнительный насос</td></tr>' +
    '</table>' +
    '<div class="warning-box">' +
    '<h3>⚠ REGRA DE OURO</h3>' +
    '<p>Na dúvida, priorize SEGURANÇA sobre produção.</p>' +
    '<p>Um reator desligado pode ser reiniciado.</p>' +
    '</div></div>',
    
    // Page 10: Contacts
    '<div class="manual-page" data-page="10">' +
    '<h1>CONTATOS</h1>' +
    '<h2>Emergência</h2>' +
    '<table>' +
    '<tr><th>Posição</th><th>Ramal</th></tr>' +
    '<tr><td>Директор станции</td><td>1001</td></tr>' +
    '<tr><td>Главный инженер</td><td>1002</td></tr>' +
    '<tr><td>Офицер безопасности</td><td>1003</td></tr>' +
    '<tr><td>Министерство</td><td>9000</td></tr>' +
    '<tr><td>Экстренные службы</td><td>9999</td></tr>' +
    '</table>' +
    '<div style="margin-top: 40px; text-align: center; color: #888; padding: 20px;">' +
    '<p style="font-size: 24px;">★</p>' +
    '<p><em>"O átomo é um bom servo,<br>mas um mau mestre."</em></p>' +
    '<p style="margin-top: 20px; font-size: 11px;">FIM DO MANUAL</p>' +
    '<p style="font-size: 10px;">UEN-1994-047 Rev. 3</p>' +
    '</div></div>'
];

// English Manual - Split into pages
var manualPagesEN = [
    // Page 1: Cover
    '<div class="manual-page active" data-page="1">' +
    '<div style="text-align: center; padding: 40px 20px;">' +
    '<div style="font-size: 60px; color: #cc0000; margin-bottom: 20px;">★</div>' +
    '<h1 style="font-size: 28px; margin-bottom: 10px;">RBMK-1000 NUCLEAR STATION</h1>' +
    '<h2 style="color: #888; font-weight: normal;">Technical Operations Manual</h2>' +
    '<div style="margin-top: 40px; padding: 20px; border: 2px solid #cc0000; display: inline-block;">' +
    '<p style="color: #cc0000; font-weight: bold; margin: 0;">RESTRICTED DOCUMENT</p>' +
    '<p style="color: #888; font-size: 12px; margin: 5px 0 0;">NPS-1994-047</p>' +
    '</div>' +
    '<div style="margin-top: 40px; color: #888; font-size: 13px;">' +
    '<p>People\'s Democratic Republic of Krasnostan</p>' +
    '<p>Ministry of Nuclear Energy</p>' +
    '<p>January 1994</p>' +
    '</div>' +
    '</div></div>',
    
    // Page 2: Index
    '<div class="manual-page" data-page="2">' +
    '<h1>TABLE OF CONTENTS</h1>' +
    '<ol style="font-size: 14px; line-height: 2;">' +
    '<li>Reactor Specifications</li>' +
    '<li>Control Rods (Стержни)</li>' +
    '<li>Cooling System</li>' +
    '<li>Power Generation</li>' +
    '<li>Safety Systems</li>' +
    '<li>Emergencies</li>' +
    '<li>Troubleshooting</li>' +
    '</ol>' +
    '<div class="warning-box" style="margin-top: 30px;">' +
    '<h3>⚠ READ CAREFULLY</h3>' +
    '<p>This manual contains vital information for safe operation. Consult whenever in doubt.</p>' +
    '</div></div>',
    
    // Page 3: Specifications
    '<div class="manual-page" data-page="3">' +
    '<h1>SPECIFICATIONS</h1>' +
    '<h2>RBMK-1000 Reactor</h2>' +
    '<table>' +
    '<tr><th>Parameter</th><th>Russian</th><th>Value</th></tr>' +
    '<tr><td>Thermal Power</td><td>Тепловая мощность</td><td>3200 MW</td></tr>' +
    '<tr><td>Electrical Output</td><td>Электрическая мощность</td><td>1000 MW</td></tr>' +
    '<tr><td>Coolant Type</td><td>Тип теплоносителя</td><td>Light Water</td></tr>' +
    '<tr><td>Moderator</td><td>Замедлитель</td><td>Graphite</td></tr>' +
    '<tr><td>Fuel</td><td>Топливо</td><td>UO₂ (2.0%)</td></tr>' +
    '<tr><td>Op. Pressure</td><td>Рабочее давление</td><td>6.9 MPa</td></tr>' +
    '<tr><td>Temperature</td><td>Температура</td><td>280-320°C</td></tr>' +
    '</table></div>',
    
    // Page 4: Control Rods
    '<div class="manual-page" data-page="4">' +
    '<h1>CONTROL RODS</h1>' +
    '<h2>Стержни регулирования</h2>' +
    '<p>211 rods absorb neutrons and regulate fission.</p>' +
    '<h3>Operating Positions:</h3>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> High power (caution!)</li>' +
    '<li><strong>30-70%:</strong> Normal operation ✓</li>' +
    '<li><strong>70-100%:</strong> Low power / shutdown</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ IMPORTANT</h3>' +
    '<p>Adjust gradually! Max 5% per step to avoid oscillations.</p>' +
    '</div>' +
    '<p><strong>Core Temperature (Температура):</strong></p>' +
    '<ul>' +
    '<li>Normal: &lt; 300°C</li>' +
    '<li>ВНИМАНИЕ: 300-350°C</li>' +
    '<li>ОПАСНОСТЬ: &gt; 350°C</li>' +
    '<li>КРИТИЧЕСКИЙ: &gt; 400°C</li>' +
    '</ul></div>',
    
    // Page 5: Cooling
    '<div class="manual-page" data-page="5">' +
    '<h1>COOLING SYSTEM</h1>' +
    '<h2>Охлаждение</h2>' +
    '<h3>Main Pump - Главный насос (ГЦН)</h3>' +
    '<p>8 circulation pumps. Normal speed: <strong>60-80%</strong></p>' +
    '<h3>Emergency Cooling - Аварийное охлаждение</h3>' +
    '<p>Activate when:</p>' +
    '<ul>' +
    '<li>Temperature &gt; 320°C</li>' +
    '<li>Pressure drops below 5.0 MPa</li>' +
    '<li>Before using АЗ-5</li>' +
    '</ul>' +
    '<h3>Extra Pump - Дополнительный насос</h3>' +
    '<p>Use in emergencies for additional cooling.</p>' +
    '<h3>Circuit Parameters:</h3>' +
    '<table>' +
    '<tr><th>Parameter</th><th>Normal</th></tr>' +
    '<tr><td>Inlet (на входе)</td><td>170-190°C</td></tr>' +
    '<tr><td>Outlet (на выходе)</td><td>270-290°C</td></tr>' +
    '<tr><td>Flow (Расход)</td><td>8000-9000 m³/h</td></tr>' +
    '<tr><td>Pressurizer (Уровень)</td><td>50-70%</td></tr>' +
    '</table></div>',
    
    // Page 6: Power
    '<div class="manual-page" data-page="6">' +
    '<h1>POWER GENERATION</h1>' +
    '<h2>Энергия</h2>' +
    '<p>Two turbo-generators rated at 500 MW each.</p>' +
    '<h3>Grid Connection - Подключено</h3>' +
    '<table>' +
    '<tr><th>Parameter</th><th>Value</th></tr>' +
    '<tr><td>Voltage (Напряжение)</td><td>15.75 кВ</td></tr>' +
    '<tr><td>Frequency (Частота)</td><td>50.0 Гц ± 0.2</td></tr>' +
    '<tr><td>Grid Load (Нагрузка)</td><td>70-90%</td></tr>' +
    '</table>' +
    '<p><strong>Подключено button:</strong> Connects/disconnects from grid. Disconnect before large adjustments.</p>' +
    '<div class="warning-box">' +
    '<h3>💡 TIP</h3>' +
    '<p>Keep load between 70-90% for stable operation.</p>' +
    '</div></div>',
    
    // Page 7: Safety
    '<div class="manual-page" data-page="7">' +
    '<h1>SAFETY SYSTEMS</h1>' +
    '<h2>Системы безопасности</h2>' +
    '<h3>АЗ-5 (Аварийная Защита)</h3>' +
    '<p>Red button on panel. Causes:</p>' +
    '<ul>' +
    '<li>All rods inserted 100% automatically</li>' +
    '<li>Emergency cooling activated</li>' +
    '<li>Generators disconnected</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ IRREVERSIBLE!</h3>' +
    '<p>АЗ-5 cannot be undone. Use ONLY in real emergencies.</p>' +
    '</div>' +
    '<h3>Radiation - Радиация</h3>' +
    '<table>' +
    '<tr><th>Level</th><th>Reading</th></tr>' +
    '<tr><td>Normal</td><td>&lt; 0.5 мЗв/ч</td></tr>' +
    '<tr><td>ВНИМАНИЕ</td><td>1.0 - 5.0 мЗв/ч</td></tr>' +
    '<tr><td>ОПАСНОСТЬ</td><td>&gt; 5.0 мЗв/ч</td></tr>' +
    '</table></div>',
    
    // Page 8: Emergencies
    '<div class="manual-page" data-page="8">' +
    '<h1>EMERGENCIES</h1>' +
    '<h2>Аварийные процедуры</h2>' +
    '<h3>High Temperature (Высокая температура)</h3>' +
    '<ol>' +
    '<li>Activate <strong>"Аварийное охлаждение"</strong></li>' +
    '<li>Increase <strong>"Стержни"</strong> to 80%+</li>' +
    '<li>Activate <strong>"Дополнительный насос"</strong></li>' +
    '<li>If &gt; 400°C → press <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h3>High Pressure (Высокое давление)</h3>' +
    '<ol>' +
    '<li>Reduce power with <strong>"Стержни"</strong></li>' +
    '<li>Increase <strong>"Главный насос"</strong></li>' +
    '<li>Monitor pressure</li>' +
    '</ol>' +
    '<h3>High Radiation (Высокая радиация)</h3>' +
    '<ol>' +
    '<li>Reduce power</li>' +
    '<li>Investigate source</li>' +
    '<li>If &gt; 5.0 → evacuate</li>' +
    '</ol></div>',
    
    // Page 9: Troubleshooting
    '<div class="manual-page" data-page="9">' +
    '<h1>TROUBLESHOOTING</h1>' +
    '<h2>Quick reference</h2>' +
    '<table>' +
    '<tr><th>Symptom</th><th>Action</th></tr>' +
    '<tr><td>Высокая температура</td><td>↑ Главный насос, Аварийное</td></tr>' +
    '<tr><td>Высокое давление</td><td>↓ Power, ↑ Стержни</td></tr>' +
    '<tr><td>Колебания мощности</td><td>Stabilize Стержни</td></tr>' +
    '<tr><td>Высокая радиация</td><td>↓ Power, investigate</td></tr>' +
    '<tr><td>Отклонение частоты</td><td>Adjust load</td></tr>' +
    '<tr><td>Низкий уровень</td><td>↑ Дополнительный насос</td></tr>' +
    '</table>' +
    '<div class="warning-box">' +
    '<h3>⚠ GOLDEN RULE</h3>' +
    '<p>When in doubt, prioritize SAFETY over production.</p>' +
    '<p>A shutdown reactor can be restarted.</p>' +
    '</div></div>',
    
    // Page 10: Contacts
    '<div class="manual-page" data-page="10">' +
    '<h1>CONTACTS</h1>' +
    '<h2>Emergency Numbers</h2>' +
    '<table>' +
    '<tr><th>Position</th><th>Extension</th></tr>' +
    '<tr><td>Директор станции</td><td>1001</td></tr>' +
    '<tr><td>Главный инженер</td><td>1002</td></tr>' +
    '<tr><td>Офицер безопасности</td><td>1003</td></tr>' +
    '<tr><td>Министерство</td><td>9000</td></tr>' +
    '<tr><td>Экстренные службы</td><td>9999</td></tr>' +
    '</table>' +
    '<div style="margin-top: 40px; text-align: center; color: #888; padding: 20px;">' +
    '<p style="font-size: 24px;">★</p>' +
    '<p><em>"The atom is a good servant,<br>but a bad master."</em></p>' +
    '<p style="margin-top: 20px; font-size: 11px;">END OF MANUAL</p>' +
    '<p style="font-size: 10px;">NPS-1994-047 Rev. 3</p>' +
    '</div></div>'
];

// Legacy variables for compatibility
var manualContentPT = manualPagesPT.join('');
var manualContentHTML = manualPagesEN.join('');

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        pt: { pages: manualPagesPT, full: manualContentPT },
        en: { pages: manualPagesEN, full: manualContentHTML }
    };
}
