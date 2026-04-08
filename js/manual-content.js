// ===== MANUAL CONTENT - POCKET MANUAL STYLE =====

// Portuguese Manual - Split into pages
// FORMATO CONSISTENTE: RUSSO (Tradução em português)
var manualPagesPT = [
    // Page 1: Cover
    '<div class="manual-page active" data-page="1">' +
    '<div style="text-align: center; padding: 60px 20px;">' +
    '<div style="font-size: 60px; color: #cc0000; margin-bottom: 20px;">★</div>' +
    '<h1 style="font-size: 28px; margin-bottom: 10px;">ESTAÇÃO NUCLEAR RBMK-1000</h1>' +
    '<h2 style="color: #888; font-weight: normal; font-size: 18px;">Manual de Operações Técnicas</h2>' +
    '<div style="margin-top: 40px; padding: 20px; border: 2px solid #cc0000; display: inline-block;">' +
    '<p style="color: #cc0000; font-weight: bold; margin: 0; font-size: 14px;">ДОКУМЕНТ ОГРАНИЧЕННОГО ДОСТУПА</p>' +
    '<p style="color: #888; font-size: 12px; margin: 5px 0 0;">(Documento Restrito)</p>' +
    '<p style="color: #888; font-size: 11px; margin: 3px 0 0;">UEN-1994-047</p>' +
    '</div>' +
    '<div style="margin-top: 40px; color: #888; font-size: 13px;">' +
    '<p>Республика Красностан (República de Krasnostan)</p>' +
    '<p>Министерство Энергетики (Ministério da Energia)</p>' +
    '<p>Январь 1994 (Janeiro 1994)</p>' +
    '</div>' +
    '</div></div>',
    
    // Page 2: Index
    '<div class="manual-page" data-page="2">' +
    '<h1>СОДЕРЖАНИЕ (Índice)</h1>' +
    '<ol style="font-size: 14px; line-height: 2.2;">' +
    '<li>Характеристики реактора (Especificações)</li>' +
    '<li>Стержни управления (Barras de Controle)</li>' +
    '<li>Система охлаждения (Sistema de Resfriamento)</li>' +
    '<li>Энергия (Geração de Energia)</li>' +
    '<li>Системы безопасности (Sistemas de Segurança)</li>' +
    '<li>Аварийные ситуации (Emergências)</li>' +
    '<li>Быстрое решение проблем (Solução Rápida)</li>' +
    '</ol>' +
    '<div class="warning-box" style="margin-top: 15px;">' +
    '<h3>⚠ ВНИМАНИЕ (Atenção)</h3>' +
    '<p>Este manual contém informações vitais. Consulte sempre que tiver dúvidas.</p>' +
    '</div></div>',
    
    // Page 3: Specifications
    '<div class="manual-page" data-page="3">' +
    '<h1>ХАРАКТЕРИСТИКИ (Especificações)</h1>' +
    '<h2>Реактор РБМК-1000</h2>' +
    '<table>' +
    '<tr><th>Параметр (Parâmetro)</th><th>Значение (Valor)</th></tr>' +
    '<tr><td>Тепловая мощность (Potência Térmica)</td><td>3200 МВт</td></tr>' +
    '<tr><td>Электрическая мощность (Potência Elétrica)</td><td>1000 МВт</td></tr>' +
    '<tr><td>Тип теплоносителя (Refrigerante)</td><td>Лёгкая вода</td></tr>' +
    '<tr><td>Замедлитель (Moderador)</td><td>Графит</td></tr>' +
    '<tr><td>Топливо (Combustível)</td><td>UO₂ (2.0%)</td></tr>' +
    '<tr><td>Рабочее давление (Pressão)</td><td>6.9 МПа</td></tr>' +
    '<tr><td>Температура (Temperatura)</td><td>280-320°C</td></tr>' +
    '</table></div>',
    
    // Page 4: Control Rods
    '<div class="manual-page" data-page="4">' +
    '<h1>СТЕРЖНИ (Barras de Controle)</h1>' +
    '<h2>Стержни регулирования</h2>' +
    '<p>211 стержней поглощают нейтроны e regulam a fissão.</p>' +
    '<h3>Положение стержней (Posições):</h3>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> Высокая мощность (Alta potência)</li>' +
    '<li><strong>30-70%:</strong> Нормальная работа ✓</li>' +
    '<li><strong>70-100%:</strong> Низкая мощность (Baixa potência)</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ ВАЖНО (Importante)</h3>' +
    '<p>Ajuste máximo 5% por vez!</p>' +
    '</div>' +
    '<h3>Температура активной зоны:</h3>' +
    '<ul>' +
    '<li>Норма (Normal): &lt; 300°C</li>' +
    '<li>Внимание (Atenção): 300-350°C</li>' +
    '<li>Опасность (Perigo): &gt; 350°C</li>' +
    '<li>Критический (Crítico): &gt; 400°C</li>' +
    '</ul></div>',
    
    // Page 5: Cooling (compact version)
    '<div class="manual-page" data-page="5">' +
    '<h1>ОХЛАЖДЕНИЕ (Resfriamento)</h1>' +
    '<table>' +
    '<tr><th>Кнопка (Botão)</th><th>Функция (Função)</th></tr>' +
    '<tr><td><strong>Главный насос</strong><br>(Bomba Principal)</td><td>8 насосов. Норма: 60-80%</td></tr>' +
    '<tr><td><strong>Аварийное охлаждение</strong><br>(Resfriamento Emergência)</td><td>Ative se temp &gt; 320°C</td></tr>' +
    '<tr><td><strong>Дополнительный насос</strong><br>(Bomba Extra)</td><td>Reforço em emergências</td></tr>' +
    '</table>' +
    '<h3>Параметры (Parâmetros):</h3>' +
    '<table>' +
    '<tr><th>Вход (Entrada)</th><th>Выход (Saída)</th></tr>' +
    '<tr><td>170-190°C</td><td>270-290°C</td></tr>' +
    '<tr><th>Расход (Fluxo)</th><th>Уровень (Nível)</th></tr>' +
    '<tr><td>8000-9000 м³/ч</td><td>50-70%</td></tr>' +
    '</table></div>',
    
    // Page 6: Power
    '<div class="manual-page" data-page="6">' +
    '<h1>ЭНЕРГИЯ (Energia)</h1>' +
    '<p>Два турбогенератора по 500 МВт cada.</p>' +
    '<h3>Подключено (Conexão à Rede)</h3>' +
    '<table>' +
    '<tr><th>Напряжение (Tensão)</th><td>15.75 кВ</td></tr>' +
    '<tr><th>Частота (Frequência)</th><td>50.0 Гц ± 0.2</td></tr>' +
    '<tr><th>Нагрузка (Carga)</th><td>70-90%</td></tr>' +
    '</table>' +
    '<p><strong>Кнопка Подключено:</strong> Conecta/desconecta da rede.</p>' +
    '<div class="warning-box">' +
    '<h3>💡 СОВЕТ (Dica)</h3>' +
    '<p> Mantenha carga 70-90% para estabilidade.</p>' +
    '</div></div>',
    
    // Page 7: Safety
    '<div class="manual-page" data-page="7">' +
    '<h1>БЕЗОПАСНОСТЬ (Segurança)</h1>' +
    '<h2>АЗ-5 (Аварийная Защита)</h2>' +
    '<p>Красная кнопка на панели. Causa:</p>' +
    '<ul>' +
    '<li>Стержни 100% автоматически</li>' +
    '<li>Аварийное охлаждение включено</li>' +
    '<li>Генераторы отключены</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ НЕОБРАТИМО!</h3>' +
    '<p>АЗ-5 не может быть отменена. Используйте ТОЛЬКО в чрезвычайных ситуациях.</p>' +
    '</div>' +
    '<h3>Радиация (Radiação):</h3>' +
    '<table>' +
    '<tr><th>Уровень</th><th>Показание</th></tr>' +
    '<tr><td>Норма (Normal)</td><td>&lt; 0.5 мЗв/ч</td></tr>' +
    '<tr><td>Внимание (Atenção)</td><td>1.0 - 5.0 мЗв/ч</td></tr>' +
    '<tr><td>Опасность (Perigo)</td><td>&gt; 5.0 мЗв/ч</td></tr>' +
    '</table></div>',
    
    // Page 8: Emergencies
    '<div class="manual-page" data-page="8">' +
    '<h1>АВАРИИ (Emergências)</h1>' +
    '<h3>Высокая температура:</h3>' +
    '<ol>' +
    '<li>Нажмите <strong>"Аварийное охлаждение"</strong> (Resfriamento Emergência)</li>' +
    '<li>Увеличьте <strong>"Стержни"</strong> до 80%+ (Barras)</li>' +
    '<li>Включите <strong>"Дополнительный насос"</strong> (Bomba Extra)</li>' +
    '<li>Se &gt; 400°C → нажмите <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h3>Высокое давление:</h3>' +
    '<ol>' +
    '<li>Уменьшите мощность <strong>"Стержни"</strong></li>' +
    '<li>Увеличьте <strong>"Главный насос"</strong> (Bomba Principal)</li>' +
    '</ol>' +
    '<h3>Высокая радиация:</h3>' +
    '<ol>' +
    '<li>Уменьшите мощность</li>' +
    '<li>Исследуйте источник</li>' +
    '<li>Se &gt; 5.0 → эвакуация</li>' +
    '</ol></div>',
    
    // Page 9: Troubleshooting
    '<div class="manual-page" data-page="9">' +
    '<h1>КОЛЮЦИИ (Soluções Rápidas)</h1>' +
    '<table>' +
    '<tr><th>Симптом</th><th>Действие (Ação)</th></tr>' +
    '<tr><td>Температура высокая</td><td>↑ Главный насос, Аварийное</td></tr>' +
    '<tr><td>Давление высокое</td><td>↓ Мощность, ↑ Стержни</td></tr>' +
    '<tr><td>Колебания мощности</td><td>Стабилизируйте Стержни</td></tr>' +
    '<tr><td>Радиация высокая</td><td>↓ Мощность</td></tr>' +
    '<tr><td>Частота нестабильна</td><td>Регулируйте нагрузку</td></tr>' +
    '<tr><td>Уровень низкий</td><td>↑ Дополнительный насос</td></tr>' +
    '</table>' +
    '<div class="warning-box">' +
    '<h3>⚠ ЗОЛОТОЕ ПРАВИЛО</h3>' +
    '<p>Na dúvida, SEGURANÇA primeiro.</p>' +
    '</div></div>',
    
    // Page 10: Contacts
    '<div class="manual-page" data-page="10">' +
    '<h1>КОНТАКТЫ (Contatos)</h1>' +
    '<table>' +
    '<tr><th>Должность (Cargo)</th><th>Номер</th></tr>' +
    '<tr><td>Директор станции</td><td>1001</td></tr>' +
    '<tr><td>Главный инженер</td><td>1002</td></tr>' +
    '<tr><td>Офицер безопасности</td><td>1003</td></tr>' +
    '<tr><td>Министерство</td><td>9000</td></tr>' +
    '<tr><td>Экстренные службы</td><td>9999</td></tr>' +
    '</table>' +
    '<div style="margin-top: 25px; text-align: center; color: #888;">' +
    '<p style="font-size: 24px;">★</p>' +
    '<p><em>"Атом - хороший слуга,<br>но плохой хозяин."</em></p>' +
    '<p style="margin-top: 10px; font-size: 11px;">КОНЕЦ РУКОВОДСТВА</p>' +
    '<p style="font-size: 10px;">(Fim do Manual)</p>' +
    '</div></div>'
];

// English Manual - Split into pages
// FORMATO CONSISTENTE: RUSSO (English translation)
var manualPagesEN = [
    // Page 1: Cover
    '<div class="manual-page active" data-page="1">' +
    '<div style="text-align: center; padding: 60px 20px;">' +
    '<div style="font-size: 60px; color: #cc0000; margin-bottom: 20px;">★</div>' +
    '<h1 style="font-size: 28px; margin-bottom: 10px;">RBMK-1000 NUCLEAR STATION</h1>' +
    '<h2 style="color: #888; font-weight: normal; font-size: 18px;">Technical Operations Manual</h2>' +
    '<div style="margin-top: 40px; padding: 20px; border: 2px solid #cc0000; display: inline-block;">' +
    '<p style="color: #cc0000; font-weight: bold; margin: 0; font-size: 14px;">ДОКУМЕНТ ОГРАНИЧЕННОГО ДОСТУПА</p>' +
    '<p style="color: #888; font-size: 12px; margin: 5px 0 0;">(Restricted Document)</p>' +
    '<p style="color: #888; font-size: 11px; margin: 3px 0 0;">NPS-1994-047</p>' +
    '</div>' +
    '<div style="margin-top: 40px; color: #888; font-size: 13px;">' +
    '<p>Республика Красностан (Krasnostan Republic)</p>' +
    '<p>Министерство Энергетики (Ministry of Energy)</p>' +
    '<p>Январь 1994 (January 1994)</p>' +
    '</div>' +
    '</div></div>',
    
    // Page 2: Index
    '<div class="manual-page" data-page="2">' +
    '<h1>СОДЕРЖАНИЕ (Contents)</h1>' +
    '<ol style="font-size: 14px; line-height: 2.2;">' +
    '<li>Характеристики реактора (Reactor Specs)</li>' +
    '<li>Стержни управления (Control Rods)</li>' +
    '<li>Система охлаждения (Cooling System)</li>' +
    '<li>Энергия (Power Generation)</li>' +
    '<li>Системы безопасности (Safety Systems)</li>' +
    '<li>Аварийные ситуации (Emergencies)</li>' +
    '<li>Быстрое решение проблем (Troubleshooting)</li>' +
    '</ol>' +
    '<div class="warning-box" style="margin-top: 15px;">' +
    '<h3>⚠ ВНИМАНИЕ (Warning)</h3>' +
    '<p>This manual contains vital info. Consult whenever in doubt.</p>' +
    '</div></div>',
    
    // Page 3: Specifications
    '<div class="manual-page" data-page="3">' +
    '<h1>ХАРАКТЕРИСТИКИ (Specifications)</h1>' +
    '<h2>Реактор РБМК-1000</h2>' +
    '<table>' +
    '<tr><th>Параметр (Parameter)</th><th>Значение (Value)</th></tr>' +
    '<tr><td>Тепловая мощность (Thermal Power)</td><td>3200 МВт</td></tr>' +
    '<tr><td>Электрическая мощность (Electrical)</td><td>1000 МВт</td></tr>' +
    '<tr><td>Тип теплоносителя (Coolant)</td><td>Лёгкая вода</td></tr>' +
    '<tr><td>Замедлитель (Moderator)</td><td>Графит</td></tr>' +
    '<tr><td>Топливо (Fuel)</td><td>UO₂ (2.0%)</td></tr>' +
    '<tr><td>Рабочее давление (Pressure)</td><td>6.9 МПа</td></tr>' +
    '<tr><td>Температура (Temperature)</td><td>280-320°C</td></tr>' +
    '</table></div>',
    
    // Page 4: Control Rods
    '<div class="manual-page" data-page="4">' +
    '<h1>СТЕРЖНИ (Control Rods)</h1>' +
    '<h2>Стержни регулирования</h2>' +
    '<p>211 rods absorb neutrons and regulate fission.</p>' +
    '<h3>Положение стержней (Positions):</h3>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> Высокая мощность (High power)</li>' +
    '<li><strong>30-70%:</strong> Нормальная работа ✓</li>' +
    '<li><strong>70-100%:</strong> Низкая мощность (Low power)</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ ВАЖНО (Important)</h3>' +
    '<p>Adjust max 5% per step!</p>' +
    '</div>' +
    '<h3>Температура активной зоны:</h3>' +
    '<ul>' +
    '<li>Норма (Normal): &lt; 300°C</li>' +
    '<li>Внимание (Warning): 300-350°C</li>' +
    '<li>Опасность (Danger): &gt; 350°C</li>' +
    '<li>Критический (Critical): &gt; 400°C</li>' +
    '</ul></div>',
    
    // Page 5: Cooling (compact version)
    '<div class="manual-page" data-page="5">' +
    '<h1>ОХЛАЖДЕНИЕ (Cooling)</h1>' +
    '<table>' +
    '<tr><th>Кнопка (Button)</th><th>Функция (Function)</th></tr>' +
    '<tr><td><strong>Главный насос</strong><br>(Main Pump)</td><td>8 pumps. Normal: 60-80%</td></tr>' +
    '<tr><td><strong>Аварийное охлаждение</strong><br>(Emergency Cooling)</td><td>Activate if temp &gt; 320°C</td></tr>' +
    '<tr><td><strong>Дополнительный насос</strong><br>(Extra Pump)</td><td>Reinforce in emergencies</td></tr>' +
    '</table>' +
    '<h3>Параметры (Parameters):</h3>' +
    '<table>' +
    '<tr><th>Вход (Inlet)</th><th>Выход (Outlet)</th></tr>' +
    '<tr><td>170-190°C</td><td>270-290°C</td></tr>' +
    '<tr><th>Расход (Flow)</th><th>Уровень (Level)</th></tr>' +
    '<tr><td>8000-9000 м³/ч</td><td>50-70%</td></tr>' +
    '</table></div>',
    
    // Page 6: Power
    '<div class="manual-page" data-page="6">' +
    '<h1>ЭНЕРГИЯ (Power)</h1>' +
    '<p>Два турбогенератора по 500 МВт each.</p>' +
    '<h3>Подключено (Grid Connection)</h3>' +
    '<table>' +
    '<tr><th>Напряжение (Voltage)</th><td>15.75 кВ</td></tr>' +
    '<tr><th>Частота (Frequency)</th><td>50.0 Гц ± 0.2</td></tr>' +
    '<tr><th>Нагрузка (Load)</th><td>70-90%</td></tr>' +
    '</table>' +
    '<p><strong>Кнопка Подключено:</strong> Connects/disconnects from grid.</p>' +
    '<div class="warning-box">' +
    '<h3>💡 СОВЕТ (Tip)</h3>' +
    '<p>Keep load 70-90% for stability.</p>' +
    '</div></div>',
    
    // Page 7: Safety
    '<div class="manual-page" data-page="7">' +
    '<h1>БЕЗОПАСНОСТЬ (Safety)</h1>' +
    '<h2>АЗ-5 (Аварийная Защита)</h2>' +
    '<p>Red button on panel. Causes:</p>' +
    '<ul>' +
    '<li>Стержни 100% automatically</li>' +
    '<li>Аварийное охлаждение activated</li>' +
    '<li>Генераторы disconnected</li>' +
    '</ul>' +
    '<div class="warning-box">' +
    '<h3>⚠ НЕОБРАТИМО!</h3>' +
    '<p>АЗ-5 cannot be undone. Use ONLY in real emergencies.</p>' +
    '</div>' +
    '<h3>Радиация (Radiation):</h3>' +
    '<table>' +
    '<tr><th>Уровень</th><th>Показание</th></tr>' +
    '<tr><td>Норма (Normal)</td><td>&lt; 0.5 мЗв/ч</td></tr>' +
    '<tr><td>Внимание (Warning)</td><td>1.0 - 5.0 мЗв/ч</td></tr>' +
    '<tr><td>Опасность (Danger)</td><td>&gt; 5.0 мЗв/ч</td></tr>' +
    '</table></div>',
    
    // Page 8: Emergencies
    '<div class="manual-page" data-page="8">' +
    '<h1>АВАРИИ (Emergencies)</h1>' +
    '<h3>Высокая температура (High Temp):</h3>' +
    '<ol>' +
    '<li>Press <strong>"Аварийное охлаждение"</strong> (Emergency Cooling)</li>' +
    '<li>Increase <strong>"Стержни"</strong> to 80%+ (Rods)</li>' +
    '<li>Turn on <strong>"Дополнительный насос"</strong> (Extra Pump)</li>' +
    '<li>If &gt; 400°C → press <strong>АЗ-5</strong></li>' +
    '</ol>' +
    '<h3>Высокое давление (High Pressure):</h3>' +
    '<ol>' +
    '<li>Reduce power with <strong>"Стержни"</strong></li>' +
    '<li>Increase <strong>"Главный насос"</strong> (Main Pump)</li>' +
    '</ol>' +
    '<h3>Высокая радиация (High Radiation):</h3>' +
    '<ol>' +
    '<li>Reduce power</li>' +
    '<li>Investigate source</li>' +
    '<li>If &gt; 5.0 → evacuate</li>' +
    '</ol></div>',
    
    // Page 9: Troubleshooting
    '<div class="manual-page" data-page="9">' +
    '<h1>КОЛЮЦИИ (Solutions)</h1>' +
    '<table>' +
    '<tr><th>Симптом</th><th>Действие (Action)</th></tr>' +
    '<tr><td>Температура высокая</td><td>↑ Главный насос, Аварийное</td></tr>' +
    '<tr><td>Давление высокое</td><td>↓ Power, ↑ Стержни</td></tr>' +
    '<tr><td>Колебания мощности</td><td>Stabilize Стержни</td></tr>' +
    '<tr><td>Радиация высокая</td><td>↓ Power</td></tr>' +
    '<tr><td>Частота нестабильна</td><td>Adjust load</td></tr>' +
    '<tr><td>Уровень низкий</td><td>↑ Дополнительный насос</td></tr>' +
    '</table>' +
    '<div class="warning-box">' +
    '<h3>⚠ ЗОЛОТОЕ ПРАВИЛО</h3>' +
    '<p>When in doubt, SAFETY first.</p>' +
    '</div></div>',
    
    // Page 10: Contacts
    '<div class="manual-page" data-page="10">' +
    '<h1>КОНТАКТЫ (Contacts)</h1>' +
    '<table>' +
    '<tr><th>Должность (Position)</th><th>Номер</th></tr>' +
    '<tr><td>Директор станции</td><td>1001</td></tr>' +
    '<tr><td>Главный инженер</td><td>1002</td></tr>' +
    '<tr><td>Офицер безопасности</td><td>1003</td></tr>' +
    '<tr><td>Министерство</td><td>9000</td></tr>' +
    '<tr><td>Экстренные службы</td><td>9999</td></tr>' +
    '</table>' +
    '<div style="margin-top: 25px; text-align: center; color: #888;">' +
    '<p style="font-size: 24px;">★</p>' +
    '<p><em>"The atom is a good servant,<br>but a bad master."</em></p>' +
    '<p style="margin-top: 10px; font-size: 11px;">КОНЕЦ РУКОВОДСТВА</p>' +
    '<p style="font-size: 10px;">(End of Manual)</p>' +
    '</div></div>'
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        pt: { pages: manualPagesPT },
        en: { pages: manualPagesEN }
    };
}
