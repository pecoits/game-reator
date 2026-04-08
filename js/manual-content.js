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
    '<li>Procedimentos de Operação Normal</li>' +
    '<li>Guia de Solução de Problemas</li>' +
    '</ol>' +
    '<h2>1. DESCRIÇÃO GERAL</h2>' +
    '<p>O RBMK-1000 (Reaktor Bolshoy Moshchnosti Kanalnyy) é um reator nuclear de projeto soviético. Este manual cobre os procedimentos operacionais padrão para a Estação Nº 4, localizada na República Popular Democrática de Krasnostan.</p>' +
    '<p><strong>Especificações Principais:</strong></p>' +
    '<table><tr><th>Parâmetro</th><th>Valor</th></tr>' +
    '<tr><td>Potência Térmica</td><td>3200 MW</td></tr>' +
    '<tr><td>Produção Elétrica</td><td>1000 MW</td></tr>' +
    '<tr><td>Tipo de Refrigerante</td><td>Água Leve</td></tr>' +
    '<tr><td>Moderador</td><td>Grafite</td></tr>' +
    '<tr><td>Combustível</td><td>UO₂ (2.0% de enriquecimento)</td></tr>' +
    '<tr><td>Pressão de Operação</td><td>6.9 MPa</td></tr>' +
    '<tr><td>Temperatura do Núcleo</td><td>280-320°C</td></tr></table>' +
    '<h2>2. SISTEMAS DO NÚCLEO DO REATOR</h2>' +
    '<h3>2.1 Barras de Controle</h3>' +
    '<p>O reator utiliza 211 barras de controle para regulação de potência e desligamento de emergência. As barras de controle absorvem nêutrons e regulam a taxa de fissão.</p>' +
    '<p><strong>Posições de Operação:</strong></p>' +
    '<ul>' +
    '<li><strong>0-30%:</strong> Operação de alta potência (use com cautela)</li>' +
    '<li><strong>30-70%:</strong> Faixa de operação normal</li>' +
    '<li><strong>70-100%:</strong> Baixa potência / condição de desligamento</li>' +
    '</ul>' +
    '<div class="warning-box"><h3>⚠ AVISO</h3>' +
    '<p>A inserção rápida das barras de controle pode causar oscilações de potência. Ajuste sempre gradualmente (máximo 5% de incremento).</p></div>' +
    '<h3>2.2 Monitoramento da Temperatura do Núcleo</h3>' +
    '<p>Temperatura normal de operação: <strong>250-300°C</strong></p>' +
    '<ul>' +
    '<li><strong>Atenção:</strong> > 300°C - Monitore de perto</li>' +
    '<li><strong>Perigo:</strong> > 350°C - Tome ação corretiva</li>' +
    '<li><strong>Crítico:</strong> > 400°C - Desligamento imediato necessário</li>' +
    '</ul>' +
    '<h2>3. OPERAÇÕES DO SISTEMA DE RESFRIAMENTO</h2>' +
    '<h3>3.1 Bombas Principais de Refrigerante</h3>' +
    '<p>O circuito primário de resfriamento usa 8 bombas de circulação principais (BCPs). Velocidade normal de operação: <strong>60-80%</strong></p>' +
    '<h3>3.2 Sistema de Resfriamento de Emergência do Núcleo (ECCS)</h3>' +
    '<p>O ECCS pode ser ativado manualmente ou automaticamente quando:</p>' +
    '<ul>' +
    '<li>A temperatura do núcleo excede 350°C</li>' +
    '<li>A pressão cai abaixo de 5.0 MPa</li>' +
    '<li>Ativação manual do AZ-5</li>' +
    '</ul>' +
    '<h3>3.3 Circuito Secundário de Resfriamento</h3>' +
    '<p>Parâmetros do circuito secundário:</p>' +
    '<table><tr><th>Parâmetro</th><th>Faixa Normal</th></tr>' +
    '<tr><td>Temperatura de Entrada</td><td>170-190°C</td></tr>' +
    '<tr><td>Temperatura de Saída</td><td>270-290°C</td></tr>' +
    '<tr><td>Taxa de Fluxo</td><td>8000-9000 m³/h</td></tr>' +
    '<tr><td>Nível do Pressurizador</td><td>50-70%</td></tr></table>' +
    '<h2>4. GERAÇÃO DE ENERGIA</h2>' +
    '<p>A produção elétrica é gerada por dois turbo-geradores com capacidade de 500 MW cada.</p>' +
    '<h3>4.1 Conexão à Rede</h3>' +
    '<p>Parâmetros padrão da rede:</p>' +
    '<ul>' +
    '<li><strong>Tensão:</strong> 15.75 kV (saída do gerador)</li>' +
    '<li><strong>Frequência:</strong> 50.0 Hz ± 0.2 Hz</li>' +
    '<li><strong>Transmissão:</strong> Linhas de 330 kV / 750 kV</li>' +
    '</ul>' +
    '<h2>5. SISTEMAS DE SEGURANÇA</h2>' +
    '<h3>5.1 Proteção de Emergência AZ-5</h3>' +
    '<p>O botão AZ-5 (Аварийная Защита 5) aciona o desligamento completo do reator:</p>' +
    '<ul>' +
    '<li>Todas as barras de controle totalmente inseridas (100%)</li>' +
    '<li>Resfriamento de emergência ativado</li>' +
    '<li>Turbo-geradores desconectados da rede</li>' +
    '</ul>' +
    '<div class="warning-box"><h3>⚠ AVISO CRÍTICO</h3>' +
    '<p>A ativação do AZ-5 é IRREVERSÍVEL. O reator não pode ser reiniciado sem um procedimento completo de reset por pessoal autorizado.</p>' +
    '<p>Use APENAS em situações de emergência genuínas.</p></div>' +
    '<h3>5.2 Monitoramento de Radiação</h3>' +
    '<table><tr><th>Nível</th><th>Leitura</th><th>Ação</th></tr>' +
    '<tr><td>Normal</td><td>&lt; 0.5 mSv/h</td><td>Continue operações</td></tr>' +
    '<tr><td>Elevado</td><td>0.5 - 1.0 mSv/h</td><td>Investigue a fonte</td></tr>' +
    '<tr><td>Atenção</td><td>1.0 - 5.0 mSv/h</td><td>Limite o acesso</td></tr>' +
    '<tr><td>Perigo</td><td>&gt; 5.0 mSv/h</td><td>Evacue pessoal não essencial</td></tr></table>' +
    '<h2>6. PROCEDIMENTOS DE EMERGÊNCIA</h2>' +
    '<h3>6.1 Acidente de Perda de Refrigerante (LOCA)</h3>' +
    '<ol>' +
    '<li>Ative o ECCS imediatamente</li>' +
    '<li>Insira as barras de controle em 80%+</li>' +
    '<li>Ative bombas adicionais de refrigerante</li>' +
    '<li>Monitore a temperatura do núcleo continuamente</li>' +
    '<li>Se a temperatura exceder 400°C, inicie o AZ-5</li>' +
    '<li>Notifique o Ministério da Energia</li>' +
    '</ol>' +
    '<h3>6.2 Excursão de Potência</h3>' +
    '<ol>' +
    '<li>Insira as barras de controle imediatamente</li>' +
    '<li>Reduza a velocidade da bomba principal se a temperatura estiver subindo</li>' +
    '<li>Monitore a pressão no circuito primário</li>' +
    '<li>Prepare-se para possível ativação do AZ-5</li>' +
    '</ol>' +
    '<h3>6.3 Apagão da Estação</h3>' +
    '<ol>' +
    '<li>Geradores a diesel devem ligar automaticamente em 15 segundos</li>' +
    '<li>Verifique a ativação do resfriamento de emergência</li>' +
    '<li>As barras de controle se inserem automaticamente na perda de energia</li>' +
    '<li>Monitore os sistemas de backup de bateria</li>' +
    '</ol>' +
    '<h2>7. PROCEDIMENTOS DE OPERAÇÃO NORMAL</h2>' +
    '<h3>7.1 Inicialização do Reator</h3>' +
    '<ol>' +
    '<li>Verifique todos os sistemas como nominais</li>' +
    '<li>Retire as barras de controle gradualmente (5% por minuto)</li>' +
    '<li>Monitore o aumento do fluxo de nêutrons</li>' +
    '<li>Leve o reator ao estado crítico</li>' +
    '<li>Estabilize em baixa potência (10%)</li>' +
    '<li>Aumente gradualmente até a potência alvo</li>' +
    '<li>Conecte à rede quando os parâmetros estiverem estáveis</li>' +
    '</ol>' +
    '<h3>7.2 Monitoramento de Rotina</h3>' +
    '<p>Verifique a cada 30 minutos:</p>' +
    '<ul>' +
    '<li>Temperatura e pressão do núcleo</li>' +
    '<li>Taxas de fluxo de refrigerante</li>' +
    '<li>Níveis de radiação</li>' +
    '<li>Produção do gerador e frequência</li>' +
    '<li>Status da conexão à rede</li>' +
    '</ul>' +
    '<h3>7.3 Desligamento Planejado</h3>' +
    '<ol>' +
    '<li>Desconecte da rede</li>' +
    '<li>Reduza a potência gradualmente (10% a cada 5 minutos)</li>' +
    '<li>Insira as barras de controle em 100%</li>' +
    '<li>Mantenha o resfriamento por no mínimo 24 horas</li>' +
    '<li>Monitore o calor de decaimento</li>' +
    '</ol>' +
    '<h2>8. GUIA DE SOLUÇÃO DE PROBLEMAS</h2>' +
    '<table><tr><th>Sintoma</th><th>Causa Possível</th><th>Ação Corretiva</th></tr>' +
    '<tr><td>Alta temperatura</td><td>Resfriamento insuficiente</td><td>Aumente a velocidade da bomba, ative o ECCS</td></tr>' +
    '<tr><td>Alta pressão</td><td>Superaquecimento, bloqueio</td><td>Reduza a potência, verifique o fluxo</td></tr>' +
    '<tr><td>Oscilações de potência</td><td>Instabilidade das barras</td><td>Estabilize a posição das barras</td></tr>' +
    '<tr><td>Alta radiação</td><td>Dano no elemento combustível</td><td>Reduza a potência, investigue</td></tr>' +
    '<tr><td>Desvio de frequência</td><td>Instabilidade da rede</td><td>Ajuste a velocidade da turbina</td></tr>' +
    '<tr><td>Baixo nível do pressurizador</td><td>Vazamento de refrigerante</td><td>Verifique circuitos, ative bombas de backup</td></tr></table>' +
    '<div class="warning-box"><h3>⚠ LEMBRE-SE</h3>' +
    '<p>Na dúvida, priorize a segurança sobre a produção de energia. Um reator desligado pode ser reiniciado. Um reator destruído, não.</p>' +
    '<p><em>"O átomo é um bom servo, mas um mau mestre."</em></p></div>' +
    '<h2>APÊNDICE A: CONTATOS DE EMERGÊNCIA</h2>' +
    '<table><tr><th>Posição</th><th>Ramal</th></tr>' +
    '<tr><td>Diretor da Estação</td><td>1001</td></tr>' +
    '<tr><td>Engenheiro Chefe</td><td>1002</td></tr>' +
    '<tr><td>Oficial de Segurança</td><td>1003</td></tr>' +
    '<tr><td>Ministério da Energia</td><td>9000</td></tr>' +
    '<tr><td>Serviços de Emergência</td><td>9999</td></tr></table>' +
    '<p style="margin-top: 40px; text-align: center; color: #888;">' +
    '<em>FIM DO MANUAL</em><br>' +
    '<em>Documento UEN-1994-047 Rev. 3</em><br>' +
    '<em>Aprovado pelo Engenheiro Chefe, Estação Nº 4</em></p>';

// Manual content in English (already exists as manualContentHTML, will reuse)
// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pt: manualContentPT, en: manualContentHTML };
}
