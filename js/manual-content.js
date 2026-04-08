// ===== MANUAL CONTENT =====
// Structured page data rendered by UIController.renderManualPage()

var MANUAL_PAGES = {
    pt: [
        // Page 1: Cover
        {
            title: 'ESTAÇÃO NUCLEAR RBMK-1000',
            sections: [
                { type: 'cover', content:
                    '<div style="text-align: center; padding: 40px 20px;">' +
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
                    '</div></div>'
                }
            ]
        },

        // Page 2: Index
        {
            title: 'СОДЕРЖАНИЕ (Índice)',
            sections: [
                { type: 'list', ordered: true, items: [
                    'Характеристики реактора (Especificações)',
                    'Стержни управления (Barras de Controle)',
                    'Система охлаждения (Sistema de Resfriamento)',
                    'Энергия (Geração de Energia)',
                    'Системы безопасности (Sistemas de Segurança)',
                    'Аварийные ситуации (Emergências)',
                    'Быстрое решение проблем (Solução Rápida)'
                ]},
                { type: 'warning', content: '<h3>⚠ ВНИМАНИЕ (Atenção)</h3><p>Este manual contém informações vitais. Consulte sempre que tiver dúvidas.</p>' }
            ]
        },

        // Page 3: Specifications
        {
            title: 'ХАРАКТЕРИСТИКИ (Especificações)',
            sections: [
                { type: 'heading', content: 'Реактор РБМК-1000' },
                { type: 'table', rows: [
                    ['Параметр (Parâmetro)', 'Значение (Valor)'],
                    ['Тепловая мощность (Potência Térmica)', '3200 МВт'],
                    ['Электрическая мощность (Potência Elétrica)', '1000 МВт'],
                    ['Тип теплоносителя (Refrigerante)', 'Лёгкая вода'],
                    ['Замедлитель (Moderador)', 'Графит'],
                    ['Топливо (Combustível)', 'UO₂ (2.0%)'],
                    ['Рабочее давление (Pressão)', '6.9 МПа'],
                    ['Температура (Temperatura)', '280-320°C']
                ]}
            ]
        },

        // Page 4: Control Rods
        {
            title: 'СТЕРЖНИ (Barras de Controle)',
            sections: [
                { type: 'heading', content: 'Стержни регулирования' },
                { type: 'text', content: '211 стержней поглощают нейтроны e regulam a fissão.' },
                { type: 'heading', content: 'Положение стержней (Posições):' },
                { type: 'list', items: [
                    '<strong>0-30%:</strong> Высокая мощность (Alta potência)',
                    '<strong>30-70%:</strong> Нормальная работа ✓',
                    '<strong>70-100%:</strong> Низкая мощность (Baixa potência)'
                ]},
                { type: 'warning', content: '<h3>⚠ ВАЖНО (Importante)</h3><p>Ajuste máximo 5% por vez!</p>' },
                { type: 'heading', content: 'Температура активной зоны:' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Atenção): 300-350°C',
                    'Опасность (Perigo): &gt; 350°C',
                    'Критический (Crítico): &gt; 400°C'
                ]}
            ]
        },

        // Page 5: Cooling
        {
            title: 'ОХЛАЖДЕНИЕ (Resfriamento)',
            sections: [
                { type: 'table', rows: [
                    ['Кнопка (Botão)', 'Функция (Função)'],
                    ['<strong>Главный насос</strong><br>(Bomba Principal)', '8 насосов. Норма: 60-80%'],
                    ['<strong>Аварийное охлаждение</strong><br>(Resfriamento Emergência)', 'Ative se temp &gt; 320°C'],
                    ['<strong>Дополнительный насос</strong><br>(Bomba Extra)', 'Reforço em emergências']
                ]},
                { type: 'heading', content: 'Параметры (Parâmetros):' },
                { type: 'table', rows: [
                    ['Вход (Entrada)', 'Выход (Saída)'],
                    ['170-190°C', '270-290°C'],
                    ['Расход (Fluxo)', 'Уровень (Nível)'],
                    ['8000-9000 м³/ч', '50-70%']
                ]}
            ]
        },

        // Page 6: Power
        {
            title: 'ЭНЕРГИЯ (Energia)',
            sections: [
                { type: 'text', content: 'Два турбогенератора по 500 МВт cada.' },
                { type: 'heading', content: 'Подключено (Conexão à Rede)' },
                { type: 'table', rows: [
                    ['Напряжение (Tensão)', '15.75 кВ'],
                    ['Частота (Frequência)', '50.0 Гц ± 0.2'],
                    ['Нагрузка (Carga)', '70-90%']
                ]},
                { type: 'text', content: '<strong>Кнопка Подключено:</strong> Conecta/desconecta da rede.' },
                { type: 'warning', content: '<h3>💡 СОВЕТ (Dica)</h3><p>Mantenha carga 70-90% para estabilidade.</p>' }
            ]
        },

        // Page 7: Safety
        {
            title: 'БЕЗОПАСНОСТЬ (Segurança)',
            sections: [
                { type: 'heading', content: 'АЗ-5 (Аварийная Защита)' },
                { type: 'text', content: 'Красная кнопка на панели. Causa:' },
                { type: 'list', items: [
                    'Стержни 100% автоматически',
                    'Аварийное охлаждение включено',
                    'Генераторы отключены'
                ]},
                { type: 'warning', content: '<h3>⚠ НЕОБРАТИМО!</h3><p>АЗ-5 não pode ser cancelada. Use SOMENTE em emergências reais.</p>' },
                { type: 'heading', content: 'Радиация (Radiação):' },
                { type: 'table', rows: [
                    ['Уровень', 'Показание'],
                    ['Норма (Normal)', '&lt; 0.5 мЗв/ч'],
                    ['Внимание (Atenção)', '1.0 - 5.0 мЗв/ч'],
                    ['Опасность (Perigo)', '&gt; 5.0 мЗв/ч']
                ]}
            ]
        },

        // Page 8: Emergencies
        {
            title: 'АВАРИИ (Emergências)',
            sections: [
                { type: 'heading', content: 'Высокая температура:' },
                { type: 'list', ordered: true, items: [
                    'Нажмите <strong>"Аварийное охлаждение"</strong> (Resfriamento Emergência)',
                    'Увеличьте <strong>"Стержни"</strong> до 80%+ (Barras)',
                    'Включите <strong>"Дополнительный насос"</strong> (Bomba Extra)',
                    'Se &gt; 400°C → нажмите <strong>АЗ-5</strong>'
                ]},
                { type: 'heading', content: 'Высокое давление:' },
                { type: 'list', ordered: true, items: [
                    'Уменьшите мощность <strong>"Стержни"</strong>',
                    'Увеличьте <strong>"Главный насос"</strong> (Bomba Principal)'
                ]},
                { type: 'heading', content: 'Высокая радиация:' },
                { type: 'list', ordered: true, items: [
                    'Уменьшите мощность',
                    'Исследуйте источник',
                    'Se &gt; 5.0 → эвакуация'
                ]}
            ]
        },

        // Page 9: Troubleshooting
        {
            title: 'КОЛЮЦИИ (Soluções Rápidas)',
            sections: [
                { type: 'table', rows: [
                    ['Симптом', 'Действие (Ação)'],
                    ['Температура высокая', '↑ Главный насос, Аварийное'],
                    ['Давление высокое', '↓ Мощность, ↑ Стержни'],
                    ['Колебания мощности', 'Стабилизируйте Стержни'],
                    ['Радиация высокая', '↓ Мощность'],
                    ['Частота нестабильна', 'Регулируйте нагрузку'],
                    ['Уровень низкий', '↑ Дополнительный насос']
                ]},
                { type: 'warning', content: '<h3>⚠ ЗОЛОТОЕ ПРАВИЛО</h3><p>Na dúvida, SEGURANÇA primeiro.</p>' }
            ]
        },

        // Page 10: Contacts
        {
            title: 'КОНТАКТЫ (Contatos)',
            sections: [
                { type: 'table', rows: [
                    ['Должность (Cargo)', 'Номер'],
                    ['Директор станции', '1001'],
                    ['Главный инженер', '1002'],
                    ['Офицер безопасности', '1003'],
                    ['Министерство', '9000'],
                    ['Экстренные службы', '9999']
                ]},
                { type: 'footer', content:
                    '<div style="margin-top: 25px; text-align: center; color: #888;">' +
                    '<p style="font-size: 24px;">★</p>' +
                    '<p><em>"Атом - хороший слуга,<br>но плохой хозяин."</em></p>' +
                    '<p style="margin-top: 10px; font-size: 11px;">КОНЕЦ РУКОВОДСТВА</p>' +
                    '<p style="font-size: 10px;">(Fim do Manual)</p>' +
                    '</div>'
                }
            ]
        }
    ],

    en: [
        // Page 1: Cover
        {
            title: 'RBMK-1000 NUCLEAR STATION',
            sections: [
                { type: 'cover', content:
                    '<div style="text-align: center; padding: 40px 20px;">' +
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
                    '</div></div>'
                }
            ]
        },

        // Page 2: Index
        {
            title: 'СОДЕРЖАНИЕ (Contents)',
            sections: [
                { type: 'list', ordered: true, items: [
                    'Характеристики реактора (Reactor Specs)',
                    'Стержни управления (Control Rods)',
                    'Система охлаждения (Cooling System)',
                    'Энергия (Power Generation)',
                    'Системы безопасности (Safety Systems)',
                    'Аварийные ситуации (Emergencies)',
                    'Быстрое решение проблем (Troubleshooting)'
                ]},
                { type: 'warning', content: '<h3>⚠ ВНИМАНИЕ (Warning)</h3><p>This manual contains vital info. Consult whenever in doubt.</p>' }
            ]
        },

        // Page 3: Specifications
        {
            title: 'ХАРАКТЕРИСТИКИ (Specifications)',
            sections: [
                { type: 'heading', content: 'Реактор РБМК-1000' },
                { type: 'table', rows: [
                    ['Параметр (Parameter)', 'Значение (Value)'],
                    ['Тепловая мощность (Thermal Power)', '3200 МВт'],
                    ['Электрическая мощность (Electrical)', '1000 МВт'],
                    ['Тип теплоносителя (Coolant)', 'Лёгкая вода'],
                    ['Замедлитель (Moderator)', 'Графит'],
                    ['Топливо (Fuel)', 'UO₂ (2.0%)'],
                    ['Рабочее давление (Pressure)', '6.9 МПа'],
                    ['Температура (Temperature)', '280-320°C']
                ]}
            ]
        },

        // Page 4: Control Rods
        {
            title: 'СТЕРЖНИ (Control Rods)',
            sections: [
                { type: 'heading', content: 'Стержни регулирования' },
                { type: 'text', content: '211 rods absorb neutrons and regulate fission.' },
                { type: 'heading', content: 'Положение стержней (Positions):' },
                { type: 'list', items: [
                    '<strong>0-30%:</strong> Высокая мощность (High power)',
                    '<strong>30-70%:</strong> Нормальная работа ✓',
                    '<strong>70-100%:</strong> Низкая мощность (Low power)'
                ]},
                { type: 'warning', content: '<h3>⚠ ВАЖНО (Important)</h3><p>Adjust max 5% per step!</p>' },
                { type: 'heading', content: 'Температура активной зоны:' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Warning): 300-350°C',
                    'Опасность (Danger): &gt; 350°C',
                    'Критический (Critical): &gt; 400°C'
                ]}
            ]
        },

        // Page 5: Cooling
        {
            title: 'ОХЛАЖДЕНИЕ (Cooling)',
            sections: [
                { type: 'table', rows: [
                    ['Кнопка (Button)', 'Функция (Function)'],
                    ['<strong>Главный насос</strong><br>(Main Pump)', '8 pumps. Normal: 60-80%'],
                    ['<strong>Аварийное охлаждение</strong><br>(Emergency Cooling)', 'Activate if temp &gt; 320°C'],
                    ['<strong>Дополнительный насос</strong><br>(Extra Pump)', 'Reinforce in emergencies']
                ]},
                { type: 'heading', content: 'Параметры (Parameters):' },
                { type: 'table', rows: [
                    ['Вход (Inlet)', 'Выход (Outlet)'],
                    ['170-190°C', '270-290°C'],
                    ['Расход (Flow)', 'Уровень (Level)'],
                    ['8000-9000 м³/ч', '50-70%']
                ]}
            ]
        },

        // Page 6: Power
        {
            title: 'ЭНЕРГИЯ (Power)',
            sections: [
                { type: 'text', content: 'Два турбогенератора по 500 МВт each.' },
                { type: 'heading', content: 'Подключено (Grid Connection)' },
                { type: 'table', rows: [
                    ['Напряжение (Voltage)', '15.75 кВ'],
                    ['Частота (Frequency)', '50.0 Гц ± 0.2'],
                    ['Нагрузка (Load)', '70-90%']
                ]},
                { type: 'text', content: '<strong>Кнопка Подключено:</strong> Connects/disconnects from grid.' },
                { type: 'warning', content: '<h3>💡 СОВЕТ (Tip)</h3><p>Keep load 70-90% for stability.</p>' }
            ]
        },

        // Page 7: Safety
        {
            title: 'БЕЗОПАСНОСТЬ (Safety)',
            sections: [
                { type: 'heading', content: 'АЗ-5 (Аварийная Защита)' },
                { type: 'text', content: 'Red button on panel. Causes:' },
                { type: 'list', items: [
                    'Стержни 100% automatically',
                    'Аварийное охлаждение activated',
                    'Генераторы disconnected'
                ]},
                { type: 'warning', content: '<h3>⚠ НЕОБРАТИМО!</h3><p>АЗ-5 cannot be undone. Use ONLY in real emergencies.</p>' },
                { type: 'heading', content: 'Радиация (Radiation):' },
                { type: 'table', rows: [
                    ['Уровень', 'Показание'],
                    ['Норма (Normal)', '&lt; 0.5 мЗв/ч'],
                    ['Внимание (Warning)', '1.0 - 5.0 мЗв/ч'],
                    ['Опасность (Danger)', '&gt; 5.0 мЗв/ч']
                ]}
            ]
        },

        // Page 8: Emergencies
        {
            title: 'АВАРИИ (Emergencies)',
            sections: [
                { type: 'heading', content: 'Высокая температура (High Temp):' },
                { type: 'list', ordered: true, items: [
                    'Press <strong>"Аварийное охлаждение"</strong> (Emergency Cooling)',
                    'Increase <strong>"Стержни"</strong> to 80%+ (Rods)',
                    'Turn on <strong>"Дополнительный насос"</strong> (Extra Pump)',
                    'If &gt; 400°C → press <strong>АЗ-5</strong>'
                ]},
                { type: 'heading', content: 'Высокое давление (High Pressure):' },
                { type: 'list', ordered: true, items: [
                    'Reduce power with <strong>"Стержни"</strong>',
                    'Increase <strong>"Главный насос"</strong> (Main Pump)'
                ]},
                { type: 'heading', content: 'Высокая радиация (High Radiation):' },
                { type: 'list', ordered: true, items: [
                    'Reduce power',
                    'Investigate source',
                    'If &gt; 5.0 → evacuate'
                ]}
            ]
        },

        // Page 9: Troubleshooting
        {
            title: 'КОЛЮЦИИ (Solutions)',
            sections: [
                { type: 'table', rows: [
                    ['Симптом', 'Действие (Action)'],
                    ['Температура высокая', '↑ Главный насос, Аварийное'],
                    ['Давление высокое', '↓ Power, ↑ Стержни'],
                    ['Колебания мощности', 'Stabilize Стержни'],
                    ['Радиация высокая', '↓ Power'],
                    ['Частота нестабильна', 'Adjust load'],
                    ['Уровень низкий', '↑ Дополнительный насос']
                ]},
                { type: 'warning', content: '<h3>⚠ ЗОЛОТОЕ ПРАВИЛО</h3><p>When in doubt, SAFETY first.</p>' }
            ]
        },

        // Page 10: Contacts
        {
            title: 'КОНТАКТЫ (Contacts)',
            sections: [
                { type: 'table', rows: [
                    ['Должность (Position)', 'Номер'],
                    ['Директор станции', '1001'],
                    ['Главный инженер', '1002'],
                    ['Офицер безопасности', '1003'],
                    ['Министерство', '9000'],
                    ['Экстренные службы', '9999']
                ]},
                { type: 'footer', content:
                    '<div style="margin-top: 25px; text-align: center; color: #888;">' +
                    '<p style="font-size: 24px;">★</p>' +
                    '<p><em>"The atom is a good servant,<br>but a bad master."</em></p>' +
                    '<p style="margin-top: 10px; font-size: 11px;">КОНЕЦ РУКОВОДСТВА</p>' +
                    '<p style="font-size: 10px;">(End of Manual)</p>' +
                    '</div>'
                }
            ]
        }
    ]
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MANUAL_PAGES;
}
