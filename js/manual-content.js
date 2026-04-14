// ===== MANUAL CONTENT =====
// Structured page data rendered by UIController.renderManualPage()

export var MANUAL_PAGES = {
    pt: [
        // Page 1: Cover
        {
            title: 'ESTAÇÃO NUCLEAR RBMK-1000',
            sections: [
                { type: 'cover', content:
                    '<div class="manual-cover-emblem">★</div>' +
                    '<div class="manual-cover-title">ESTAÇÃO NUCLEAR<br>RBMK-1000</div>' +
                    '<div class="manual-cover-subtitle">Manual de Operações Técnicas</div>' +
                    '<div class="manual-cover-classified">ДОКУМЕНТ ОГРАНИЧЕННОГО ДОСТУПА</div>' +
                    '<div class="manual-cover-version">República de Krasnostan · Ministério da Energia<br>Janeiro 1994 · UEN-1994-047 · {{version}}</div>'
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
                { type: 'text', content: 'O botão giratório <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> controla 211 barras que absorvem nêutrons e regulam a potência.' },
                { type: 'heading', content: 'Posições do botão СТЕРЖНИ РЕГУЛИРОВАНИЯ:' },
                { type: 'list', items: [
                    '<strong>0–30%:</strong> Высокая мощность — Alta potência ⚠',
                    '<strong>30–70%:</strong> Нормальная работа — Operação normal ✓',
                    '<strong>70–100%:</strong> Низкая мощность — Baixa potência'
                ]},
                { type: 'warning', content: 'Ajuste no máximo 5% por vez! Mudanças bruscas causam instabilidade.' },
                { type: 'heading', content: 'Indicador ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ:' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Atenção): 300–350°C',
                    'Опасность (Perigo): &gt; 350°C',
                    'Критический (Crítico): &gt; 400°C → pressione АЗ-5'
                ]}
            ]
        },

        // Page 5: Cooling
        {
            title: 'ОХЛАЖДЕНИЕ (Resfriamento)',
            sections: [
                { type: 'table', rows: [
                    ['Controle', 'Função'],
                    ['<strong>ГЛАВНЫЙ НАСОС</strong> (Bomba Principal)', 'Bomba principal. Normal: 60–80%'],
                    ['<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Resfr. Emergencial)', 'Ativar se temp &gt; 320°C'],
                    ['<strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Bomba Extra)', 'Reforço de refrigeração']
                ]},
                { type: 'heading', content: 'Indicadores de resfriamento:' },
                { type: 'table', rows: [
                    ['Indicador', 'Valor normal'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВХОД) (Temp. entrada)', '170–190°C'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВЫХОД) (Temp. saída)', '270–290°C'],
                    ['РАСХОД ТЕПЛОНОСИТЕЛЯ (Vazão)', '8000–9000 м³/ч'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Nível compensador)', '50–70%']
                ]}
            ]
        },

        // Page 6: Power
        {
            title: 'ЭНЕРГИЯ (Geração de Energia)',
            sections: [
                { type: 'text', content: 'Dois turbogeradores de 500 МВт cada. Botão <strong>ИЗОЛИРОВАТЬ СЕТЬ</strong> conecta ou desconecta da rede elétrica.' },
                { type: 'table', rows: [
                    ['Indicador', 'Valor normal'],
                    ['ВЫРАБОТКА ЭНЕРГИИ (Geração)', '700–900 МВт'],
                    ['НАПРЯЖЕНИЕ ГЕНЕРАТОРА (Tensão)', '15.75 кВ'],
                    ['ЧАСТОТА ТОКА (Frequência)', '50.0 Гц ± 0.2'],
                    ['НАГРУЗКА СЕТИ (Carga da rede)', '70–90%']
                ]},
                { type: 'warning', content: 'Mantenha НАГРУЗКА СЕТИ (Carga) entre 70–90% para estabilidade da rede.' }
            ]
        },

        // Page 7: Safety
        {
            title: 'БЕЗОПАСНОСТЬ (Segurança)',
            sections: [
                { type: 'heading', content: 'АЗ-5 — Аварийная Защита (Proteção de Emergência)' },
                { type: 'text', content: 'Botão vermelho <strong>АЗ-5 / ЗАЩИТА</strong> no painel. Ao pressionar:' },
                { type: 'list', items: [
                    '<strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> inserido a 100% automaticamente',
                    '<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> ativado automaticamente',
                    'Geradores desconectados da rede'
                ]},
                { type: 'warning', content: 'АЗ-5 não pode ser cancelada durante o processo. Use SOMENTE em emergências reais.' },
                { type: 'heading', content: 'Indicador УРОВЕНЬ РАДИАЦИИ (Radiação):' },
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
                { type: 'heading', content: 'Temperatura alta (ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ &gt; 320°C):' },
                { type: 'list', ordered: true, items: [
                    'Ative o toggle <strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Resfriamento Emergencial)',
                    'Gire <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras) para 80%+',
                    'Ative o toggle <strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Bomba Extra)',
                    'Se temp &gt; 400°C → pressione <strong>АЗ-5</strong> (Proteção Emergencial)'
                ]},
                { type: 'heading', content: 'Pressão alta (ДАВЛЕНИЕ В КОНТУРЕ &gt; 17 МПа):' },
                { type: 'list', ordered: true, items: [
                    'Aumente <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras) — reduz potência',
                    'Aumente <strong>ГЛАВНЫЙ НАСОС</strong> (Bomba Principal)'
                ]},
                { type: 'heading', content: 'Radiação alta (УРОВЕНЬ РАДИАЦИИ &gt; 1.0 мЗв/ч):' },
                { type: 'list', ordered: true, items: [
                    'Aumente <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras) para reduzir potência',
                    'Monitore <strong>УРОВЕНЬ РАДИАЦИИ</strong> (Radiação)',
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
                    ['ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (Temp. núcleo) alta', '↑ ГЛАВНЫЙ НАСОС (Bomba); ativar АВАРИЙНОЕ ОХЛАЖДЕНИЕ'],
                    ['ДАВЛЕНИЕ В КОНТУРЕ (Pressão) alto', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ (Barras); ↑ ГЛАВНЫЙ НАСОС'],
                    ['МОЩНОСТЬ РЕАКТОРА (Potência) instável', 'Estabilize СТЕРЖНИ РЕГУЛИРОВАНИЯ (30–70%)'],
                    ['УРОВЕНЬ РАДИАЦИИ (Radiação) alto', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ para reduzir potência'],
                    ['ЧАСТОТА ТОКА (Frequência) instável', 'Verifique carga da rede — botão ИЗОЛИРОВАТЬ СЕТЬ'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Nível) baixo', 'Ative ДОПОЛНИТЕЛЬНЫЙ НАСОС (Bomba Extra)']
                ]},
                { type: 'warning', content: 'Na dúvida, segurança primeiro. Reduza potência antes de investigar.' }
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
                    '★<br><em>"Атом — хороший слуга, но плохой хозяин."</em><br>' +
                    '("O átomo é um bom servo, mas um mau senhor.")<br>КОНЕЦ РУКОВОДСТВА'
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
                    '<div class="manual-cover-emblem">★</div>' +
                    '<div class="manual-cover-title">RBMK-1000<br>NUCLEAR STATION</div>' +
                    '<div class="manual-cover-subtitle">Technical Operations Manual</div>' +
                    '<div class="manual-cover-classified">ДОКУМЕНТ ОГРАНИЧЕННОГО ДОСТУПА</div>' +
                    '<div class="manual-cover-version">Krasnostan Republic · Ministry of Energy<br>January 1994 · NPS-1994-047 · {{version}}</div>'
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
                { type: 'text', content: 'The <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> dial controls 211 rods that absorb neutrons and regulate reactor power.' },
                { type: 'heading', content: 'СТЕРЖНИ РЕГУЛИРОВАНИЯ positions:' },
                { type: 'list', items: [
                    '<strong>0–30%:</strong> Высокая мощность — High power ⚠',
                    '<strong>30–70%:</strong> Нормальная работа — Normal operation ✓',
                    '<strong>70–100%:</strong> Низкая мощность — Low power'
                ]},
                { type: 'warning', content: 'Adjust max 5% per step! Sudden changes cause instability.' },
                { type: 'heading', content: 'Indicator ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ:' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Warning): 300–350°C',
                    'Опасность (Danger): &gt; 350°C',
                    'Критический (Critical): &gt; 400°C → press АЗ-5'
                ]}
            ]
        },

        // Page 5: Cooling
        {
            title: 'ОХЛАЖДЕНИЕ (Cooling)',
            sections: [
                { type: 'table', rows: [
                    ['Control', 'Function'],
                    ['<strong>ГЛАВНЫЙ НАСОС</strong> (Main Pump)', 'Main pump. Normal: 60–80%'],
                    ['<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Emergency Cooling)', 'Activate if temp &gt; 320°C'],
                    ['<strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Extra Pump)', 'Extra cooling boost']
                ]},
                { type: 'heading', content: 'Cooling indicators:' },
                { type: 'table', rows: [
                    ['Indicator', 'Normal value'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВХОД) (Inlet temp.)', '170–190°C'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВЫХОД) (Outlet temp.)', '270–290°C'],
                    ['РАСХОД ТЕПЛОНОСИТЕЛЯ (Flow rate)', '8000–9000 м³/ч'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Tank level)', '50–70%']
                ]}
            ]
        },

        // Page 6: Power
        {
            title: 'ЭНЕРГИЯ (Power)',
            sections: [
                { type: 'text', content: 'Two turbogenerators with 500 МВт each one. Button <strong>ИЗОЛИРОВАТЬ СЕТЬ</strong> is connecting or disconnecting from the power grid.' },
                { type: 'table', rows: [
                    ['Indicator', 'Normal value'],
                    ['ВЫРАБОТКА ЭНЕРГИИ (Output)', '700–900 МВт'],
                    ['НАПРЯЖЕНИЕ ГЕНЕРАТОРА (Voltage)', '15.75 кВ'],
                    ['ЧАСТОТА ТОКА (Frequency)', '50.0 Гц ± 0.2'],
                    ['НАГРУЗКА СЕТИ (Grid load)', '70–90%']
                ]},
                { type: 'warning', content: 'Is keep НАГРУЗКА СЕТИ (Grid load) between 70–90% for stability of grid.' }
            ]
        },

        // Page 7: Safety
        {
            title: 'БЕЗОПАСНОСТЬ (Safety)',
            sections: [
                { type: 'heading', content: 'АЗ-5 — Аварийная Защита (Emergency Protection)' },
                { type: 'text', content: 'The red button АЗ-5 / ЗАЩИТА is located on panel. When is pressed:' },
                { type: 'list', items: [
                    '<strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Control Rods) is inserted to 100% automatically',
                    '<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Emergency Cooling) is activated automatically',
                    'Generators are disconnected from the grid'
                ]},
                { type: 'warning', content: 'АЗ-5 cannot be make undone in mid-process. Use it ONLY in real the emergencies.' },
                { type: 'heading', content: 'Indicator УРОВЕНЬ РАДИАЦИИ (Radiation level):' },
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
                    'Toggle <strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Emergency Cooling) to on position',
                    'Turn <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Control Rods) to 80%+',
                    'Toggle <strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Extra Pump) to on position',
                    'If temp &gt; 400°C → is press <strong>АЗ-5</strong> (Emergency Scram)'
                ]},
                { type: 'heading', content: 'High pressure (ДАВЛЕНИЕ В КОНТУРЕ &gt; 17 МПа):' },
                { type: 'list', ordered: true, items: [
                    'Raise <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Control Rods) — is reduces power',
                    'Increase <strong>ГЛАВНЫЙ НАСОС</strong> (Main Pump)'
                ]},
                { type: 'heading', content: 'High radiation (УРОВЕНЬ РАДИАЦИИ &gt; 1.0 мЗв/ч):' },
                { type: 'list', ordered: true, items: [
                    'Raise <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Control Rods) for reduce power',
                    'Monitor <strong>УРОВЕНЬ РАДИАЦИИ</strong> (Radiation level)',
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
                    ['ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (Core temp) high', '↑ ГЛАВНЫЙ НАСОС (Main Pump); toggle АВАРИЙНОЕ ОХЛАЖДЕНИЕ'],
                    ['ДАВЛЕНИЕ В КОНТУРЕ (Pressure) high', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ (Rods); ↑ ГЛАВНЫЙ НАСОС'],
                    ['МОЩНОСТЬ РЕАКТОРА (Power) unstable', 'Stabilize СТЕРЖНИ РЕГУЛИРОВАНИЯ (30–70%)'],
                    ['УРОВЕНЬ РАДИАЦИИ (Radiation) high', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ for reduce power'],
                    ['ЧАСТОТА ТОКА (Frequency) unstable', 'Check grid load — button ИЗОЛИРОВАТЬ СЕТЬ'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Tank level) low', 'Toggle ДОПОЛНИТЕЛЬНЫЙ НАСОС (Extra Pump) on']
                ]},
                { type: 'warning', content: 'When in case of doubt, the SAFETY is must comes first. Reduce power before to investigate.' }
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
                    '★<br><em>"The atom is a good servant, but a bad master."</em><br>КОНЕЦ РУКОВОДСТВА (End of Manual)'
                }
            ]
        }
    ],

    es: [
        // Página 1: Portada
        {
            title: 'ESTACIÓN NUCLEAR RBMK-1000',
            sections: [
                { type: 'cover', content:
                    '<div class="manual-cover-emblem">★</div>' +
                    '<div class="manual-cover-title">ESTACIÓN NUCLEAR<br>RBMK-1000</div>' +
                    '<div class="manual-cover-subtitle">Manual de Operaciones Técnicas</div>' +
                    '<div class="manual-cover-classified">ДОКУМЕНТ ОГРАНИЧЕННОГО ДОСТУПА</div>' +
                    '<div class="manual-cover-version">República de Krasnostan · Ministerio de Energía<br>Enero 1994 · UEN-1994-047 · {{version}}</div>'
                }
            ]
        },

        // Página 2: Índice
        {
            title: 'СОДЕРЖАНИЕ (Índice)',
            sections: [
                { type: 'list', ordered: true, items: [
                    'Especificaciones del reactor',
                    'Barras de control',
                    'Sistema de enfriamiento',
                    'Generación de energía',
                    'Sistemas de seguridad',
                    'Emergencias',
                    'Solución rápida de problemas'
                ]},
                { type: 'warning', content: 'Este manual contiene información vital. Consúltelo siempre que tenga dudas.' }
            ]
        },

        // Página 3: Especificaciones
        {
            title: 'ХАРАКТЕРИСТИКИ (Especificaciones)',
            sections: [
                { type: 'heading', content: 'Реактор РБМК-1000' },
                { type: 'table', rows: [
                    ['Parámetro', 'Valor'],
                    ['Тепловая мощность (Potencia térmica)', '3200 МВт'],
                    ['Электрическая мощность (Potencia eléctrica)', '1000 МВт'],
                    ['Тип теплоносителя (Refrigerante)', 'Лёгкая вода (Agua ligera)'],
                    ['Замедлитель (Moderador)', 'Графит (Grafito)'],
                    ['Топливо (Combustible)', 'UO₂ (2.0%)'],
                    ['Рабочее давление (Presión)', '6.9 МПа'],
                    ['Температура (Temperatura)', '280–320°C']
                ]}
            ]
        },

        // Página 4: Barras de control
        {
            title: 'СТЕРЖНИ (Barras de Control)',
            sections: [
                { type: 'text', content: 'El dial <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> controla 211 barras que absorben neutrones y regulan la potencia.' },
                { type: 'heading', content: 'Posiciones del dial СТЕРЖНИ РЕГУЛИРОВАНИЯ:' },
                { type: 'list', items: [
                    '<strong>0–30%:</strong> Высокая мощность — Alta potencia ⚠',
                    '<strong>30–70%:</strong> Нормальная работа — Operación normal ✓',
                    '<strong>70–100%:</strong> Низкая мощность — Baja potencia'
                ]},
                { type: 'warning', content: '¡Ajuste máximo 5% a la misma vez! Los cambios bruscos son causando inestabilidade.' },
                { type: 'heading', content: 'Indicador ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (Temp. núcleo):' },
                { type: 'list', items: [
                    'Норма (Normal): &lt; 300°C',
                    'Внимание (Advertencia): 300–350°C',
                    'Опасность (Peligro): &gt; 350°C',
                    'Критический (Crítico): &gt; 400°C → presione АЗ-5'
                ]}
            ]
        },

        // Página 5: Enfriamiento
        {
            title: 'ОХЛАЖДЕНИЕ (Enfriamiento)',
            sections: [
                { type: 'table', rows: [
                    ['Control', 'Función'],
                    ['<strong>ГЛАВНЫЙ НАСОС</strong> (Bomba Principal)', 'Bomba principal. Normal: 60–80%'],
                    ['<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Enfriamiento Emergencia)', 'Activar si temp &gt; 320°C'],
                    ['<strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Bomba Adicional)', 'Refuerzo de enfriamiento']
                ]},
                { type: 'heading', content: 'Indicadores de enfriamiento:' },
                { type: 'table', rows: [
                    ['Indicador', 'Valor normal'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВХОД) (Temp. entrada)', '170–190°C'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВЫХОД) (Temp. salida)', '270–290°C'],
                    ['РАСХОД ТЕПЛОНОСИТЕЛЯ (Caudal)', '8000–9000 м³/ч'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Nivel compensador)', '50–70%']
                ]}
            ]
        },

        // Página 6: Energía
        {
            title: 'ЭНЕРГИЯ (Generación de Energía)',
            sections: [
                { type: 'text', content: 'Dos turbogeneradores de 500 МВт cada uno. El botón <strong>ИЗОЛИРОВАТЬ СЕТЬ</strong> conectan o desconectan de la red eléctrico.' },
                { type: 'table', rows: [
                    ['Indicador', 'Valor normal'],
                    ['ВЫРАБОТКА ЭНЕРГИИ (Generación)', '700–900 МВт'],
                    ['НАПРЯЖЕНИЕ ГЕНЕРАТОРА (Tensión)', '15.75 кВ'],
                    ['ЧАСТОТА ТОКА (Frecuencia)', '50.0 Гц ± 0.2'],
                    ['НАГРУЗКА СЕТИ (Carga de red)', '70–90%']
                ]},
                { type: 'warning', content: 'Mantener НАГРУЗКА СЕТИ (Carga) entre 70–90% para la estabilidade de la red.' }
            ]
        },

        // Página 7: Seguridad
        {
            title: 'БЕЗОПАСНОСТЬ (Seguridad)',
            sections: [
                { type: 'heading', content: 'АЗ-5 — Аварийная Защита (Protección de Emergencia)' },
                { type: 'text', content: 'Botón rojo <strong>АЗ-5 / ЗАЩИТА</strong> en el panel. Al presionar:' },
                { type: 'list', items: [
                    '<strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras de Control) insertadas al 100% automáticamente',
                    '<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Enfriamiento de Emergencia) activado automáticamente',
                    'Generadores desconectados de la red'
                ]},
                { type: 'warning', content: 'АЗ-5 no puede ser cancelar durante el proceso. Use SOLAMENTE en emergencias reales.' },
                { type: 'heading', content: 'Indicador УРОВЕНЬ РАДИАЦИИ (Nivel de radiación):' },
                { type: 'table', rows: [
                    ['Nivel', 'Lectura'],
                    ['Норма (Normal)', '&lt; 0.5 мЗв/ч'],
                    ['Внимание (Advertencia)', '1.0–5.0 мЗв/ч'],
                    ['Опасность (Peligro)', '&gt; 5.0 мЗв/ч → reduzca potencia']
                ]}
            ]
        },

        // Página 8: Emergencias
        {
            title: 'АВАРИИ (Emergencias)',
            sections: [
                { type: 'heading', content: 'Temperatura alta (ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ &gt; 320°C):' },
                { type: 'list', ordered: true, items: [
                    'Active el toggle <strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Enfriamiento de Emergencia)',
                    'Gire <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras) al 80%+',
                    'Active el toggle <strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Bomba Adicional)',
                    'Si temp &gt; 400°C → presione <strong>АЗ-5</strong>'
                ]},
                { type: 'heading', content: 'Presión alta (ДАВЛЕНИЕ В КОНТУРЕ &gt; 17 МПа):' },
                { type: 'list', ordered: true, items: [
                    'Aumente <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras) — reduce potencia',
                    'Aumente <strong>ГЛАВНЫЙ НАСОС</strong> (Bomba Principal)'
                ]},
                { type: 'heading', content: 'Radiación alta (УРОВЕНЬ РАДИАЦИИ &gt; 1.0 мЗв/ч):' },
                { type: 'list', ordered: true, items: [
                    'Aumente <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barras) para reducir potencia',
                    'Monitoree <strong>УРОВЕНЬ РАДИАЦИИ</strong> (Nivel de radiación)',
                    'Si &gt; 5.0 мЗв/ч → presione <strong>АЗ-5</strong> inmediatamente'
                ]}
            ]
        },

        // Página 9: Soluciones
        {
            title: 'РЕШЕНИЯ (Soluciones Rápidas)',
            sections: [
                { type: 'table', rows: [
                    ['Síntoma', 'Acción'],
                    ['ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (Temp. núcleo) alta', '↑ ГЛАВНЫЙ НАСОС (Bomba); activar АВАРИЙНОЕ ОХЛАЖДЕНИЕ'],
                    ['ДАВЛЕНИЕ В КОНТУРЕ (Presión) alto', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ (Barras); ↑ ГЛАВНЫЙ НАСОС'],
                    ['МОЩНОСТЬ РЕАКТОРА (Potencia) inestable', 'Estabilice СТЕРЖНИ РЕГУЛИРОВАНИЯ (30–70%)'],
                    ['УРОВЕНЬ РАДИАЦИИ (Radiación) alto', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ para reducir potencia'],
                    ['ЧАСТОТА ТОКА (Frecuencia) inestable', 'Verifique carga — botón ИЗОЛИРОВАТЬ СЕТЬ'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Nivel) bajo', 'Active toggle ДОПОЛНИТЕЛЬНЫЙ НАСОС (Bomba Adicional)']
                ]},
                { type: 'warning', content: 'En caso de duda, la seguridade primero. Reducir la potencia antes de investigar.' }
            ]
        },

        // Página 10: Contactos
        {
            title: 'КОНТАКТЫ (Contactos)',
            sections: [
                { type: 'table', rows: [
                    ['Должность (Cargo)', 'Номер (Ext.)'],
                    ['Директор станции (Director)', '1001'],
                    ['Главный инженер (Ing. Jefe)', '1002'],
                    ['Офицер безопасности (Seguridad)', '1003'],
                    ['Министерство (Ministerio)', '9000'],
                    ['Экстренные службы (Emergencias)', '9999']
                ]},
                { type: 'footer', content:
                    '★<br><em>"El átomo es un buen sirviente, pero un mal amo."</em><br>КОНЕЦ РУКОВОДСТВА (Fin del Manual)'
                }
            ]
        }
    ],

    fr: [
        // Page 1: Couverture
        {
            title: 'CENTRALE NUCLÉAIRE RBMK-1000',
            sections: [
                { type: 'cover', content:
                    '<div class="manual-cover-emblem">★</div>' +
                    '<div class="manual-cover-title">CENTRALE NUCLÉAIRE<br>RBMK-1000</div>' +
                    '<div class="manual-cover-subtitle">Manuel des Opérations Techniques</div>' +
                    '<div class="manual-cover-classified">ДОКУМЕНТ ОГРАНИЧЕННОГО ДОСТУПА</div>' +
                    '<div class="manual-cover-version">République de Krasnostan · Ministère de l\'Énergie<br>Janvier 1994 · UEN-1994-047 · {{version}}</div>'
                }
            ]
        },

        // Page 2: Sommaire
        {
            title: 'СОДЕРЖАНИЕ (Sommaire)',
            sections: [
                { type: 'list', ordered: true, items: [
                    'Spécifications du réacteur',
                    'Barres de contrôle',
                    'Système de refroidissement',
                    'Production d\'énergie',
                    'Systèmes de sécurité',
                    'Urgences',
                    'Dépannage rapide'
                ]},
                { type: 'warning', content: 'Ce manuel contient des informations vitales. Consultez-le en cas de doute.' }
            ]
        },

        // Page 3: Spécifications
        {
            title: 'ХАРАКТЕРИСТИКИ (Spécifications)',
            sections: [
                { type: 'heading', content: 'Реактор РБМК-1000' },
                { type: 'table', rows: [
                    ['Paramètre', 'Valeur'],
                    ['Тепловая мощность (Puissance thermique)', '3200 МВт'],
                    ['Электрическая мощность (Puissance électrique)', '1000 МВт'],
                    ['Тип теплоносителя (Caloporteur)', 'Лёгкая вода (Eau légère)'],
                    ['Замедлитель (Modérateur)', 'Графит (Graphite)'],
                    ['Топливо (Combustible)', 'UO₂ (2.0%)'],
                    ['Рабочее давление (Pression)', '6.9 МПа'],
                    ['Температура (Température)', '280–320°C']
                ]}
            ]
        },

        // Page 4: Barres de contrôle
        {
            title: 'СТЕРЖНИ (Barres de Contrôle)',
            sections: [
                { type: 'text', content: 'Le dial <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> contrôle 211 barres qui absorbent les neutrons et régulent la puissance.' },
                { type: 'heading', content: 'Positions du dial СТЕРЖНИ РЕГУЛИРОВАНИЯ :' },
                { type: 'list', items: [
                    '<strong>0–30 % :</strong> Высокая мощность — Haute puissance ⚠',
                    '<strong>30–70 % :</strong> Нормальная работа — Fonctionnement normal ✓',
                    '<strong>70–100 % :</strong> Низкая мощность — Faible puissance'
                ]},
                { type: 'warning', content: 'Ajustez le maximum 5 % à chaque fois ! Les changements brusques causeront de l\'instabilitées.' },
                { type: 'heading', content: 'Indicateur ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (Temp. cœur) :' },
                { type: 'list', items: [
                    'Норма (Normal) : &lt; 300°C',
                    'Внимание (Attention) : 300–350°C',
                    'Опасность (Danger) : &gt; 350°C',
                    'Критический (Critique) : &gt; 400°C → appuyez sur АЗ-5'
                ]}
            ]
        },

        // Page 5: Refroidissement
        {
            title: 'ОХЛАЖДЕНИЕ (Refroidissement)',
            sections: [
                { type: 'table', rows: [
                    ['Commande', 'Fonction'],
                    ['<strong>ГЛАВНЫЙ НАСОС</strong> (Pompe principale)', 'Pompe principale. Normal : 60–80 %'],
                    ['<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Refroid. d\'urgence)', 'Activer si temp &gt; 320°C'],
                    ['<strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Pompe supplémentaire)', 'Renfort de refroidissement']
                ]},
                { type: 'heading', content: 'Indicateurs de refroidissement :' },
                { type: 'table', rows: [
                    ['Indicateur', 'Valeur normale'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВХОД) (Temp. entrée)', '170–190°C'],
                    ['ТЕМПЕРАТУРА ВОДЫ (ВЫХОД) (Temp. sortie)', '270–290°C'],
                    ['РАСХОД ТЕПЛОНОСИТЕЛЯ (Débit)', '8000–9000 м³/ч'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Niveau compensateur)', '50–70 %']
                ]}
            ]
        },

        // Page 6: Énergie
        {
            title: 'ЭНЕРГИЯ (Production d\'Énergie)',
            sections: [
                { type: 'text', content: 'Deux turbogénérateurs de 500 МВт chacuns. Bouton <strong>ИЗОЛИРОВАТЬ СЕТЬ</strong> connecte ou déconnecte de le réseau électrique.' },
                { type: 'table', rows: [
                    ['Indicateur', 'Valeur normale'],
                    ['ВЫРАБОТКА ЭНЕРГИИ (Production)', '700–900 МВт'],
                    ['НАПРЯЖЕНИЕ ГЕНЕРАТОРА (Tension)', '15.75 кВ'],
                    ['ЧАСТОТА ТОКА (Fréquence)', '50.0 Гц ± 0.2'],
                    ['НАГРУЗКА СЕТИ (Charge réseau)', '70–90 %']
                ]},
                { type: 'warning', content: 'Maintenez НАГРУЗКА СЕТИ (Charge) entre 70–90 % pour la stabilitée de le réseau.' }
            ]
        },

        // Page 7: Sécurité
        {
            title: 'БЕЗОПАСНОСТЬ (Sécurité)',
            sections: [
                { type: 'heading', content: 'АЗ-5 — Аварийная Защита (Protection d\'Urgence)' },
                { type: 'text', content: 'Bouton rouge <strong>АЗ-5 / ЗАЩИТА</strong> sur le panneau. Lorsqu\'il est pressé :' },
                { type: 'list', items: [
                    '<strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barres de contrôle) insérées à 100 % automatiquement',
                    '<strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Refroidissement d\'urgence) activé automatiquement',
                    'Générateurs déconnectés du réseau'
                ]},
                { type: 'warning', content: 'АЗ-5 ne peut pas être annulé en cours de processus. Utilisez-le UNIQUEMENT en vraie les urgences.' },
                { type: 'heading', content: 'Indicateur УРОВЕНЬ РАДИАЦИИ (Niveau de radiation) :' },
                { type: 'table', rows: [
                    ['Niveau', 'Lecture'],
                    ['Норма (Normal)', '&lt; 0.5 мЗв/ч'],
                    ['Внимание (Attention)', '1.0–5.0 мЗв/ч'],
                    ['Опасность (Danger)', '&gt; 5.0 мЗв/ч → réduisez la puissance']
                ]}
            ]
        },

        // Page 8: Urgences
        {
            title: 'АВАРИИ (Urgences)',
            sections: [
                { type: 'heading', content: 'Température élevée (ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ &gt; 320°C) :' },
                { type: 'list', ordered: true, items: [
                    'Activez le toggle <strong>АВАРИЙНОЕ ОХЛАЖДЕНИЕ</strong> (Refroidissement d\'urgence)',
                    'Tournez <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barres) à 80 %+',
                    'Activez le toggle <strong>ДОПОЛНИТЕЛЬНЫЙ НАСОС</strong> (Pompe supplémentaire)',
                    'Si temp &gt; 400°C → appuyez sur <strong>АЗ-5</strong>'
                ]},
                { type: 'heading', content: 'Pression élevée (ДАВЛЕНИЕ В КОНТУРЕ &gt; 17 МПа) :' },
                { type: 'list', ordered: true, items: [
                    'Augmentez <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barres) — réduit la puissance',
                    'Augmentez <strong>ГЛАВНЫЙ НАСОС</strong> (Pompe principale)'
                ]},
                { type: 'heading', content: 'Radiation élevée (УРОВЕНЬ РАДИАЦИИ &gt; 1.0 мЗв/ч) :' },
                { type: 'list', ordered: true, items: [
                    'Augmentez <strong>СТЕРЖНИ РЕГУЛИРОВАНИЯ</strong> (Barres) pour réduire la puissance',
                    'Surveillez <strong>УРОВЕНЬ РАДИАЦИИ</strong> (Niveau de radiation)',
                    'Si &gt; 5.0 мЗв/ч → appuyez sur <strong>АЗ-5</strong> immédiatement'
                ]}
            ]
        },

        // Page 9: Dépannage
        {
            title: 'РЕШЕНИЯ (Dépannage Rapide)',
            sections: [
                { type: 'table', rows: [
                    ['Symptôme', 'Action'],
                    ['ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ (Temp. cœur) élevée', '↑ ГЛАВНЫЙ НАСОС (Pompe) ; activer АВАРИЙНОЕ ОХЛАЖДЕНИЕ'],
                    ['ДАВЛЕНИЕ В КОНТУРЕ (Pression) élevée', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ (Barres) ; ↑ ГЛАВНЫЙ НАСОС'],
                    ['МОЩНОСТЬ РЕАКТОРА (Puissance) instable', 'Stabilisez СТЕРЖНИ РЕГУЛИРОВАНИЯ (30–70 %)'],
                    ['УРОВЕНЬ РАДИАЦИИ (Radiation) élevé', '↑ СТЕРЖНИ РЕГУЛИРОВАНИЯ pour réduire la puissance'],
                    ['ЧАСТОТА ТОКА (Fréquence) instable', 'Vérifiez charge réseau — bouton ИЗОЛИРОВАТЬ СЕТЬ'],
                    ['УРОВЕНЬ В КОМПЕНСАТОРЕ (Niveau) bas', 'Activez toggle ДОПОЛНИТЕЛЬНЫЙ НАСОС (Pompe suppl.)']
                ]},
                { type: 'warning', content: 'En cas de doute, le sécurité est d\'abord. Réduire la puissance avant d\'investiguer.' }
            ]
        },

        // Page 10: Contacts
        {
            title: 'КОНТАКТЫ (Contacts)',
            sections: [
                { type: 'table', rows: [
                    ['Должность (Poste)', 'Номер (Ext.)'],
                    ['Директор станции (Directeur)', '1001'],
                    ['Главный инженер (Ing. en chef)', '1002'],
                    ['Офицер безопасности (Sécurité)', '1003'],
                    ['Министерство (Ministère)', '9000'],
                    ['Экстренные службы (Urgences)', '9999']
                ]},
                { type: 'footer', content:
                    '★<br><em>"L\'atome est un bon serviteur, mais un mauvais maître."</em><br>КОНЕЦ РУКОВОДСТВА (Fin du Manuel)'
                }
            ]
        }
    ]
};

// ===== MANUAL PAGE RENDERER =====
// Converts structured MANUAL_PAGES into HTML strings consumed by UIControllerNew.openManual()
(function() {
    var revMajor = Math.floor(Math.random() * 5) + 2;
    var revMinor = Math.floor(Math.random() * 10);
    var revPatch = Math.floor(Math.random() * 9) + 1;
    var randomVersion = 'Rev.' + revMajor + '.' + revMinor + '.' + revPatch;

    function renderSection(s) {
        switch (s.type) {
            case 'cover':
                return (s.content || '').replace('{{version}}', randomVersion);
            case 'footer':
                return '<div class="manual-footer">' + (s.content || '') + '</div>';
            case 'heading':
                return '<h3 class="manual-heading">' + (s.content || '') + '</h3>';
            case 'text':
                return '<p class="manual-text">' + (s.content || '') + '</p>';
            case 'warning':
                return '<div class="manual-warning">' + (s.content || '') + '</div>';
            case 'list': {
                var tag = s.ordered ? 'ol' : 'ul';
                var items = (s.items || []).map(function(i) { return '<li>' + i + '</li>'; }).join('');
                return '<' + tag + ' class="manual-list">' + items + '</' + tag + '>';
            }
            case 'table': {
                var rows = (s.rows || []).map(function(row, ri) {
                    var ct = ri === 0 ? 'th' : 'td';
                    return '<tr>' + row.map(function(cell) { return '<' + ct + '>' + cell + '</' + ct + '>'; }).join('') + '</tr>';
                }).join('');
                return '<table class="manual-table">' + rows + '</table>';
            }
            default:
                return '';
        }
    }

    function renderPage(page, index) {
        var isCover = index === 0;
        var titleHtml = isCover ? '' : '<h2 class="manual-page-title">' + (page.title || '') + '</h2>';
        return '<div class="manual-page" data-page="' + (index + 1) + '">' +
            titleHtml +
            (page.sections || []).map(renderSection).join('') +
            '</div>';
    }

    if (typeof window !== 'undefined') {
        window.manualPagesPT = (MANUAL_PAGES.pt || []).map(renderPage);
        window.manualPagesEN = (MANUAL_PAGES.en || []).map(renderPage);
        window.manualPagesES = (MANUAL_PAGES.es || []).map(renderPage);
        window.manualPagesFR = (MANUAL_PAGES.fr || []).map(renderPage);
    }
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MANUAL_PAGES;
}
