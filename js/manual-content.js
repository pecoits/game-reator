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
                    ['Тип теплоносителя (Refrigerante)', 'Лёгкая вода (Água leve)'],
                    ['Замедлитель (Moderador)', 'Графит (Grafite)'],
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
                { type: 'text', content: 'Aba: <strong>ОСНОВНОЙ</strong> (Principal). O controle <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> é o slider superior. 211 barras absorvem nêutrons e regulam a potência.' },
                { type: 'heading', content: 'Posições do controle СТЕРЖНИ РЕГУЛИРОВАНИЯ:' },
                { type: 'list', items: [
                    '<strong>0–30%:</strong> Высокая мощность — Alta potência ⚠',
                    '<strong>30–70%:</strong> Нормальная работа — Operação normal ✓',
                    '<strong>70–100%:</strong> Низкая мощность — Baixa potência'
                ]},
                { type: 'warning', content: '<h3>⚠ ВАЖНО (Importante)</h3><p>Ajuste no máximo 5% por vez! Mudanças bruscas causam instabilidade.</p>' },
                { type: 'heading', content: 'Indicador ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ:' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Atenção): 300–350°C',
                    'Опасность (Perigo): &gt; 350°C',
                    'Критический (Crítico): &gt; 400°C → use АЗ-5'
                ]}
            ]
        },

        // Page 5: Cooling
        {
            title: 'ОХЛАЖДЕНИЕ (Resfriamento)',
            sections: [
                { type: 'text', content: 'Aba: <strong>ОХЛАЖДЕНИЕ</strong> (Resfriamento). Aba <strong>ОСНОВНОЙ</strong> para o slider da bomba.' },
                { type: 'table', rows: [
                    ['Controle', 'Localização', 'Função'],
                    ['<strong>СКОРОСТЬ ГЛАВНОГО НАСОСА</strong>', 'Aba ОСНОВНОЙ — slider', 'Bomba principal. Normal: 60–80%'],
                    ['<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong><br>→ botão <strong>АКТИВИРОВАТЬ</strong>', 'Aba ОХЛАЖДЕНИЕ', 'Ativar se temp &gt; 320°C'],
                    ['<strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong><br>→ botão <strong>ВКЛ/ВЫКЛ</strong>', 'Aba ОХЛАЖДЕНИЕ', 'Reforço de refrigeração']
                ]},
                { type: 'heading', content: 'Indicadores na aba ОХЛАЖДЕНИЕ:' },
                { type: 'table', rows: [
                    ['Indicador', 'Valor normal'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВХОД)', '170–190°C'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВЫХОД)', '270–290°C'],
                    ['РАСХОД ТЕПЛОНОСИТЕЛЯ', '8000–9000 м³/ч'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ', '50–70%']
                ]}
            ]
        },

        // Page 6: Power
        {
            title: 'ЭНЕРГИЯ (Geração de Energia)',
            sections: [
                { type: 'text', content: 'Aba: <strong>ЭНЕРГИЯ</strong>. Dois turbogeradores de 500 МВт cada.' },
                { type: 'heading', content: 'Indicadores na aba ЭНЕРГИЯ:' },
                { type: 'table', rows: [
                    ['Indicador', 'Valor normal'],
                    ['ВЫРАБОТКА ЭНЕРГИИ', '700–900 МВт'],
                    ['НАПРЯЖЕНИЕ ГЕНЕРАТОРА', '15.75 кВ'],
                    ['ЧАСТОТА ТОКА', '50.0 Гц ± 0.2'],
                    ['НАГРУЗКА СЕТИ', '70–90%']
                ]},
                { type: 'text', content: '<strong>ВЫВОД В СЕТЬ</strong> → botão <strong>ПОДКЛЮЧЕНО</strong> (aba ЭНЕРГИЯ): Conecta ou desconecta da rede elétrica.' },
                { type: 'warning', content: '<h3>💡 СОВЕТ (Dica)</h3><p>Mantenha НАГРУЗКА СЕТИ entre 70–90% para estabilidade da rede.</p>' }
            ]
        },

        // Page 7: Safety
        {
            title: 'БЕЗОПАСНОСТЬ (Segurança)',
            sections: [
                { type: 'heading', content: 'АЗ-5 — Аварийная Защита (Proteção de Emergência)' },
                { type: 'text', content: 'Aba: <strong>ЭНЕРГИЯ</strong> → seção <strong>АВАРИЙНАЯ ЗАЩИТА</strong> → botão <strong>АЗ-5</strong>. Ao pressionar:' },
                { type: 'list', items: [
                    '<strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> inserido 100% automaticamente',
                    '<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> ativado automaticamente',
                    'Geradores desconectados da rede'
                ]},
                { type: 'warning', content: '<h3>⚠ НЕОБРАТИМО! (Irreversível!)</h3><p>АЗ-5 não pode ser cancelada durante o processo. Use SOMENTE em emergências reais.</p>' },
                { type: 'heading', content: 'Indicador УРОВЕНЬ РАДИАЦИИ (aba ОСНОВНОЙ):' },
                { type: 'table', rows: [
                    ['Nível', 'Leitura'],
                    ['Норма (Normal)', '&lt; 0.5 мЗв/ч'],
                    ['Внимание (Atenção)', '1.0–5.0 мЗв/ч'],
                    ['Опасность (Perigo)', '&gt; 5.0 мЗв/ч → reduza potência']
                ]}
            ]
        },

        // Page 8: Emergencies
        {
            title: 'АВАРИИ (Emergências)',
            sections: [
                { type: 'heading', content: 'Температура alta (ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ &gt; 320°C):' },
                { type: 'list', ordered: true, items: [
                    'Aba <strong>ОХЛАЖДЕНИЕ</strong> → pressione <strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> → <strong>АКТИВИРОВАТЬ</strong>',
                    'Aba <strong>ОСНОВНОЙ</strong> → aumente <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> para 80%+',
                    'Aba <strong>ОХЛАЖДЕНИЕ</strong> → ative <strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> → <strong>ВКЛ/ВЫКЛ</strong>',
                    'Se temp &gt; 400°C → aba <strong>ЭНЕРГИЯ</strong> → pressione <strong>АЗ-5</strong>'
                ]},
                { type: 'heading', content: 'Pressão alta (ДАВЛЕНИЕ В КОНТУРЕ &gt; 17 МПа):' },
                { type: 'list', ordered: true, items: [
                    'Aba <strong>ОСНОВНОЙ</strong> → aumente <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (reduz potência)',
                    'Aba <strong>ОСНОВНОЙ</strong> → aumente <strong>СКОРОСТЬ ГЛАВНОГО НАСОСА</strong>'
                ]},
                { type: 'heading', content: 'Radiação alta (УРОВЕНЬ РАДИАЦИИ &gt; 1.0 мЗв/ч):' },
                { type: 'list', ordered: true, items: [
                    'Aba <strong>ОСНОВНОЙ</strong> → reduza <strong>МОЩНОСТЬ РЕАКТОРА</strong> via <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong>',
                    'Monitore o indicador <strong>УРОВЕНЬ РАДИАЦИИ</strong>',
                    'Se &gt; 5.0 мЗв/ч → pressione <strong>АЗ-5</strong> imediatamente'
                ]}
            ]
        },

        // Page 9: Troubleshooting
        {
            title: 'РЕШЕНИЯ (Soluções Rápidas)',
            sections: [
                { type: 'table', rows: [
                    ['Sintoma', 'Ação'],
                    ['ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ alta', '↑ СКОРОСТЬ ГЛАВНОГО НАСОСА; ativar АВАРИЙНОЕ ОХЛАЖДЕНИЕ'],
                    ['ДАВЛЕНИЕ В КОНТУРЕ alto', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ; ↑ СКОРОСТЬ ГЛАВНОГО НАСОСА'],
                    ['МОЩНОСТЬ РЕАКТОРА instável', 'Estabilize СТЕРЖНИ РЕГУЛИРОВАНИЯ (30–70%)'],
                    ['УРОВЕНЬ РАДИАЦИИ alto', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ para reduzir potência'],
                    ['ЧАСТОТА ТОКА instável', 'Ajuste НАГРУЗКА СЕТИ via ВЫВОД В СЕТЬ'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ baixo', 'Ative ДОПОЛНИТЕЛЬНЫЙ НАСОС → ВКЛ/ВЫКЛ']
                ]},
                { type: 'warning', content: '<h3>⚠ ЗОЛОТОЕ ПРАВИЛО (Regra de Ouro)</h3><p>Na dúvida, SEGURANÇA primeiro. Reduza potência antes de investigar.</p>' }
            ]
        },

        // Page 10: Contacts
        {
            title: 'КОНТАКТЫ (Contatos)',
            sections: [
                { type: 'table', rows: [
                    ['Должность (Cargo)', 'Номер (Ramal)'],
                    ['Директор станции (Diretor)', '1001'],
                    ['Главный инженер (Eng. Chefe)', '1002'],
                    ['Офицер безопасности (Segurança)', '1003'],
                    ['Министерство (Ministério)', '9000'],
                    ['Экстренные службы (Emergência)', '9999']
                ]},
                { type: 'footer', content:
                    '<div style="margin-top: 25px; text-align: center; color: #888;">' +
                    '<p style="font-size: 24px;">★</p>' +
                    '<p><em>"Атом — хороший слуга,<br>но плохой хозяин."</em></p>' +
                    '<p style="color: #aaa; font-size: 12px; margin-top: 5px;">("O átomo é um bom servo, mas um mau senhor.")</p>' +
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
                    'Характеристики реактора (Reactor Specifications)',
                    'Стержни управления (Control Rods)',
                    'Система охлаждения (Cooling System)',
                    'Энергия (Power Generation)',
                    'Системы безопасности (Safety Systems)',
                    'Аварийные ситуации (Emergencies)',
                    'Быстрое решение проблем (Troubleshooting)'
                ]},
                { type: 'warning', content: '<h3>⚠ ВНИМАНИЕ (Warning)</h3><p>This manual contains vital information. Consult whenever in doubt.</p>' }
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
                    ['Электрическая мощность (Electrical Power)', '1000 МВт'],
                    ['Тип теплоносителя (Coolant Type)', 'Лёгкая вода (Light water)'],
                    ['Замедлитель (Moderator)', 'Графит (Graphite)'],
                    ['Топливо (Fuel)', 'UO₂ (2.0%)'],
                    ['Рабочее давление (Operating Pressure)', '6.9 МПа'],
                    ['Температура (Temperature)', '280–320°C']
                ]}
            ]
        },

        // Page 4: Control Rods
        {
            title: 'СТЕРЖНИ (Control Rods)',
            sections: [
                { type: 'text', content: 'Tab: <strong>ОСНОВНОЙ</strong> (Main). The <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> slider is the top control. 211 rods absorb neutrons and regulate reactor power.' },
                { type: 'heading', content: 'СТЕРЖНИ РЕГУЛИРОВАНИЯ positions:' },
                { type: 'list', items: [
                    '<strong>0–30%:</strong> Высокая мощность — High power ⚠',
                    '<strong>30–70%:</strong> Нормальная работа — Normal operation ✓',
                    '<strong>70–100%:</strong> Низкая мощность — Low power'
                ]},
                { type: 'warning', content: '<h3>⚠ ВАЖНО (Important)</h3><p>Adjust max 5% per step! Sudden changes cause instability.</p>' },
                { type: 'heading', content: 'Indicator ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ:' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Warning): 300–350°C',
                    'Опасность (Danger): &gt; 350°C',
                    'Критический (Critical): &gt; 400°C → use АЗ-5'
                ]}
            ]
        },

        // Page 5: Cooling
        {
            title: 'ОХЛАЖДЕНИЕ (Cooling)',
            sections: [
                { type: 'text', content: 'Tab: <strong>ОХЛАЖДЕНИЕ</strong> (Cooling). Use tab <strong>ОСНОВНОЙ</strong> for the pump slider.' },
                { type: 'table', rows: [
                    ['Control', 'Location', 'Function'],
                    ['<strong>СКОРОСТЬ ГЛАВНОГО НАСОСА</strong>', 'Tab ОСНОВНОЙ — slider', 'Main pump. Normal: 60–80%'],
                    ['<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong><br>→ button <strong>АКТИВИРОВАТЬ</strong>', 'Tab ОХЛАЖДЕНИЕ', 'Activate if temp &gt; 320°C'],
                    ['<strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong><br>→ button <strong>ВКЛ/ВЫКЛ</strong>', 'Tab ОХЛАЖДЕНИЕ', 'Extra cooling boost']
                ]},
                { type: 'heading', content: 'Indicators in tab ОХЛАЖДЕНИЕ:' },
                { type: 'table', rows: [
                    ['Indicator', 'Normal value'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВХОД)', '170–190°C'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВЫХОД)', '270–290°C'],
                    ['РАСХОД ТЕПЛОНОСИТЕЛЯ', '8000–9000 м³/ч'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ', '50–70%']
                ]}
            ]
        },

        // Page 6: Power
        {
            title: 'ЭНЕРГИЯ (Power)',
            sections: [
                { type: 'text', content: 'Tab: <strong>ЭНЕРГИЯ</strong>. Two turbogenerators of 500 МВт each.' },
                { type: 'heading', content: 'Indicators in tab ЭНЕРГИЯ:' },
                { type: 'table', rows: [
                    ['Indicator', 'Normal value'],
                    ['ВЫРАБОТКА ЭНЕРГИИ', '700–900 МВт'],
                    ['НАПРЯЖЕНИЕ ГЕНЕРАТОРА', '15.75 кВ'],
                    ['ЧАСТОТА ТОКА', '50.0 Гц ± 0.2'],
                    ['НАГРУЗКА СЕТИ', '70–90%']
                ]},
                { type: 'text', content: '<strong>ВЫВОД В СЕТЬ</strong> → button <strong>ПОДКЛЮЧЕНО</strong> (tab ЭНЕРГИЯ): Connects or disconnects from the power grid.' },
                { type: 'warning', content: '<h3>💡 СОВЕТ (Tip)</h3><p>Keep НАГРУЗКА СЕТИ between 70–90% for grid stability.</p>' }
            ]
        },

        // Page 7: Safety
        {
            title: 'БЕЗОПАСНОСТЬ (Safety)',
            sections: [
                { type: 'heading', content: 'АЗ-5 — Аварийная Защита (Emergency Protection)' },
                { type: 'text', content: 'Tab: <strong>ЭНЕРГИЯ</strong> → section <strong>АВАРИЙНАЯ ЗАЩИТА</strong> → button <strong>АЗ-5</strong>. When pressed:' },
                { type: 'list', items: [
                    '<strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> inserted to 100% automatically',
                    '<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> activated automatically',
                    'Generators disconnected from grid'
                ]},
                { type: 'warning', content: '<h3>⚠ НЕОБРАТИМО! (Irreversible!)</h3><p>АЗ-5 cannot be undone mid-process. Use ONLY in real emergencies.</p>' },
                { type: 'heading', content: 'Indicator УРОВЕНЬ РАДИАЦИИ (tab ОСНОВНОЙ):' },
                { type: 'table', rows: [
                    ['Level', 'Reading'],
                    ['Норма (Normal)', '&lt; 0.5 мЗв/ч'],
                    ['Внимание (Warning)', '1.0–5.0 мЗв/ч'],
                    ['Опасность (Danger)', '&gt; 5.0 мЗв/ч → reduce power']
                ]}
            ]
        },

        // Page 8: Emergencies
        {
            title: 'АВАРИИ (Emergencies)',
            sections: [
                { type: 'heading', content: 'High temperature (ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ &gt; 320°C):' },
                { type: 'list', ordered: true, items: [
                    'Tab <strong>ОХЛАЖДЕНИЕ</strong> → press <strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> → <strong>АКТИВИРОВАТЬ</strong>',
                    'Tab <strong>ОСНОВНОЙ</strong> → raise <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> to 80%+',
                    'Tab <strong>ОХЛАЖДЕНИЕ</strong> → activate <strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> → <strong>ВКЛ/ВЫКЛ</strong>',
                    'If temp &gt; 400°C → tab <strong>ЭНЕРГИЯ</strong> → press <strong>АЗ-5</strong>'
                ]},
                { type: 'heading', content: 'High pressure (ДАВЛЕНИЕ В КОНТУРЕ &gt; 17 МПа):' },
                { type: 'list', ordered: true, items: [
                    'Tab <strong>ОСНОВНОЙ</strong> → raise <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (reduces power)',
                    'Tab <strong>ОСНОВНОЙ</strong> → increase <strong>СКОРОСТЬ ГЛАВНОГО НАСОСА</strong>'
                ]},
                { type: 'heading', content: 'High radiation (УРОВЕНЬ РАДИАЦИИ &gt; 1.0 мЗв/ч):' },
                { type: 'list', ordered: true, items: [
                    'Tab <strong>ОСНОВНОЙ</strong> → reduce <strong>МОЩНОСТЬ РЕАКТОРА</strong> via <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong>',
                    'Monitor indicator <strong>УРОВЕНЬ РАДИАЦИИ</strong>',
                    'If &gt; 5.0 мЗв/ч → press <strong>АЗ-5</strong> immediately'
                ]}
            ]
        },

        // Page 9: Troubleshooting
        {
            title: 'РЕШЕНИЯ (Quick Solutions)',
            sections: [
                { type: 'table', rows: [
                    ['Symptom', 'Action'],
                    ['ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ high', '↑ СКОРОСТЬ ГЛАВНОГО НАСОСА; activate АВАРИЙНОЕ ОХЛАЖДЕНИЕ'],
                    ['ДАВЛЕНИЕ В КОНТУРЕ high', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ; ↑ СКОРОСТЬ ГЛАВНОГО НАСОСА'],
                    ['МОЩНОСТЬ РЕАКТОРА unstable', 'Stabilize СТЕРЖНИ РЕГУЛИРОВАНИЯ (30–70%)'],
                    ['УРОВЕНЬ РАДИАЦИИ high', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ to reduce power'],
                    ['ЧАСТОТА ТОКА unstable', 'Adjust НАГРУЗКА СЕТИ via ВЫВОД В СЕТЬ'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ low', 'Activate ДОПОЛНИТЕЛЬНЫЙ НАСОС → ВКЛ/ВЫКЛ']
                ]},
                { type: 'warning', content: '<h3>⚠ ЗОЛОТОЕ ПРАВИЛО (Golden Rule)</h3><p>When in doubt, SAFETY first. Reduce power before investigating.</p>' }
            ]
        },

        // Page 10: Contacts
        {
            title: 'КОНТАКТЫ (Contacts)',
            sections: [
                { type: 'table', rows: [
                    ['Должность (Position)', 'Номер (Extension)'],
                    ['Директор станции (Director)', '1001'],
                    ['Главный инженер (Chief Engineer)', '1002'],
                    ['Офицер безопасности (Safety Officer)', '1003'],
                    ['Министерство (Ministry)', '9000'],
                    ['Экстренные службы (Emergency)', '9999']
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
