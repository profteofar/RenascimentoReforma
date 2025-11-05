
import { Lessons } from './types';

export const LESSONS: Lessons = {
  1: {
    title: 'Berço do Renascimento e Ideias Humanistas',
    icon: '🏛️',
    desc: 'Berço e ideias humanistas',
    scoring: { q1: 20, q2: 20, q3: 20 }, // 60%
    questions: [
      { id: 'q1', type: 'single', text: 'Qual região italiana foi o principal berço do Renascimento?', options: ['Veneza e região do Véneto', 'Florença e Toscana', 'Roma e Lácio', 'Milão e Lombardia'], correct: 1 },
      { id: 'q2', type: 'single', text: 'O Humanismo renascentista valorizava principalmente:', options: ['A vida contemplativa medieval', 'O estudo dos clássicos greco-romanos', 'A autoridade exclusiva da Igreja', 'A vida feudal e cavaleiresca'], correct: 1 },
      { id: 'q3', type: 'multiple', text: 'Selecione as características do Humanismo (podem ser várias):', options: ['Antropocentrismo', 'Teocentrismo', 'Espírito crítico', 'Dogmatismo religioso'], correct: [0, 2] }
    ],
    fillInTheBlank: { // 40%
      text: 'O {0}, o centro das preocupações do Homem era ele próprio e não Deus; o {1}, que consistia na valorização do ser humano e das suas capacidades intelectuais, inspirando-se nos modelos greco-romanos; o {2}, isto é, a plena afirmação de cada indivíduo através da procura da valorização dos seus feitos pessoais; o {3}, uma atitude mais aberta e observadora da sociedade da época, utilizando para isso a Razão.',
      answers: ['Antropocentrismo', 'humanismo', 'individualismo', 'espírito crítico'],
      pointsPerBlank: 10
    }
  },
  2: {
    title: 'Arte Renascentista',
    icon: '🎨',
    desc: 'Arquitetura, pintura e escultura',
    scoring: { q1: 15, q2: 15, q3: 15, q4: 15 }, // 60%
    questions: [
      { id: 'q1', type: 'single', text: 'Qual artista pintou o teto da Capela Sistina?', options: ['Leonardo da Vinci', 'Rafael Sanzio', 'Michelangelo Buonarroti', 'Donatello'], correct: 2 },
      { id: 'q2', type: 'single', text: 'A técnica da perspetiva linear foi desenvolvida principalmente por:', options: ['Giotto di Bondone', 'Filippo Brunelleschi', 'Sandro Botticelli', 'Tiziano'], correct: 1 },
      { id: 'q3', type: 'multiple', text: 'Características da pintura renascentista (selecione as corretas):', options: ['Uso da perspetiva', 'Figuras planas bidimensionais', 'Realismo anatómico', 'Fundo dourado medieval'], correct: [0, 2] },
      { id: 'q4', type: 'single', text: 'A escultura "David" é obra de:', options: ['Donatello', 'Michelangelo', 'Lorenzo Ghiberti', 'Andrea del Verrocchio'], correct: 1 }
    ],
    fillInTheBlank: { // 40%
      text: 'A arte renascentista rompe com o {0} inspirando-se nos modelos artísticos da {1}, onde o equilíbrio {2} e a rigorosa {3} das formas na distribuição dos volumes estavam sempre presentes. Podemos ver na arquitetura renascentista o recurso às ordens arquitetónicas clássicas, aos arcos de volta {4} e aos frontões triangulares, e a adoção da horizontalidade, que é conseguida pela introdução de {5} e cornijas.',
      answers: ['Gótico', 'Antiguidade Clássica', 'geométrico', 'simetria', 'perfeita', 'balaustradas'],
      pointsPerBlank: 40 / 6 // approx 6.67, adjusted from prompt to divide evenly
    }
  },
  3: {
    title: 'A Reforma Protestante',
    icon: '⛪',
    desc: 'Lutero, Calvino e Henrique VIII',
    scoring: { q1: 15, q2: 15, q3: 15, q4: 15 }, // 60%
    questions: [
      { id: 'q1', type: 'single', text: 'Em que ano Martinho Lutero publicou as 95 Teses?', options: ['1492', '1517', '1534', '1545'], correct: 1 },
      { id: 'q2', type: 'single', text: 'O principal motivo da revolta de Lutero foi:', options: ['A venda de indulgências', 'O celibato clerical', 'A liturgia em latim', 'A adoração de santos'], correct: 0 },
      { id: 'q3', type: 'multiple', text: 'Princípios do Luteranismo (selecione os corretos):', options: ['Salvação pela fé', 'Autoridade papal', 'Livre interpretação da Bíblia', 'Culto aos santos'], correct: [0, 2] },
      { id: 'q4', type: 'single', text: 'Henrique VIII criou a Igreja Anglicana principalmente porque:', options: ['Discordava da teologia católica', 'O Papa recusou anular seu casamento', 'Apoiava as ideias de Calvino', 'Queria democratizar a Igreja'], correct: 1 }
    ],
    fillInTheBlank: { // 40%
      text: 'A crise foi provocada pela vida de {0} de vários membros da Igreja, pois as suas preocupações centravam-se mais na posse de {1} do que no cumprimento da {2} da Igreja, não vivendo de acordo com os princípios do Cristianismo; a maioria dos membros do clero tinha uma {3} e o acesso aos altos cargos eclesiásticos era muitas vezes comprado por pessoas sem qualquer {4}. Todos estes fatores levaram à crítica dos Humanistas, entre eles {5}, que contestou a venda de {6} e afixou, em 1517, na igreja de Wittenberg, as {7} Contra as Indulgências. Lutero condenou a {8} em troca de dinheiro e lançou os princípios que marcariam a sua doutrina religiosa.',
      answers: ['luxo e ostentação', 'bens materiais', 'missão espiritual', 'vida imoral', 'vocação religiosa', 'Martinho Lutero', 'Bulas de Indulgências', '95 Teses', 'venda de indulgências'],
      pointsPerBlank: 40 / 9 // approx 4.44
    }
  },
  4: {
    title: 'A Contrarreforma Católica',
    icon: '✝️',
    desc: 'Concílio de Trento e reação católica',
    scoring: { q1: 20, q2: 20, q3: 20 }, // 60%
    questions: [
      { id: 'q1', type: 'single', text: 'O Concílio de Trento (1545-1563) teve como principal objetivo:', options: ['Unir-se aos protestantes', 'Reformar a Igreja Católica internamente', 'Abolir o papado', 'Criar novas ordens religiosas'], correct: 1 },
      { id: 'q2', type: 'multiple', text: 'Medidas da Contrarreforma (selecione as corretas):', options: ['Criação do Index Librorum Prohibitorum', 'Fortalecimento da Inquisição', 'Aceitação do livre exame da Bíblia', 'Fundação da Companhia de Jesus'], correct: [0, 1, 3] },
      { id: 'q3', type: 'single', text: 'A Companhia de Jesus foi fundada por:', options: ['São Francisco de Assis', 'Santo Inácio de Loyola', 'São Tomás de Aquino', 'São Bernardo de Claraval'], correct: 1 }
    ],
    fillInTheBlank: { // 40%
      text: 'Perante o avanço do movimento {0} na Europa, a Igreja Católica viu-se obrigada a reagir e fê-lo de duas formas: por um lado, iniciou a {1}, cujo objetivo era travar a expansão da Reforma Protestante através da instituição da {2} e da {3}; por outro lado, lançou a {4}, através de medidas de reorganização interna e de reafirmação da sua doutrina, com medidas tomadas no Concílio de {5} e pela atuação da {6}.',
      answers: ['Protestante', 'Contrarreforma', 'Inquisição', 'Congregação do Índex', 'Reforma Católica', 'Trento', 'Companhia de Jesus'],
      pointsPerBlank: 40 / 7 // approx 5.71
    }
  },
  5: {
    title: 'Reforma e Contrarreforma na Península Ibérica',
    icon: '🇵🇹',
    desc: 'Inquisição e isolamento cultural',
    scoring: { q1: 15, q2: 15, q3: 15, q4: 15 }, // 60%
    questions: [
      { id: 'q1', type: 'single', text: 'Em Portugal, a Inquisição foi estabelecida em:', options: ['1478', '1536', '1545', '1580'], correct: 1 },
      { id: 'q2', type: 'single', text: 'O principal alvo da Inquisição portuguesa eram:', options: ['Os protestantes luteranos', 'Os muçulmanos', 'Os cristãos-novos (judeus convertidos)', 'Os humanistas italianos'], correct: 2 },
      { id: 'q3', type: 'multiple', text: 'Consequências da Contrarreforma em Portugal (selecione as corretas):', options: ['Censura de livros', 'Isolamento cultural', 'Florescimento do humanismo', 'Controle do ensino pelos jesuítas'], correct: [0, 1, 3] },
      { id: 'q4', type: 'single', text: 'A Península Ibérica ficou relativamente isolada do movimento protestante porque:', options: ['Não havia problemas na Igreja', 'A Inquisição e os reis eram muito fortes', 'A população era analfabeta', 'Estava geograficamente isolada'], correct: 1 }
    ],
    fillInTheBlank: { // 40%
      text: 'A ação repressiva da {0} e do Índex levou ao isolamento da Península Ibérica, uma vez que os autores renascentistas viam os seus livros inscritos no {1} e os de nacionalidade ibérica eram mesmo perseguidos, o que representou um {2} cultural e científico. Os {3}, que quiseram permanecer na Península Ibérica, foram obrigados a converter-se ao {4}, sendo denominados {5}. Muitos deles foram mesmo condenados à morte na Península Ibérica {6} pela Inquisição, em {7}.',
      answers: ['Inquisição', 'Índex', 'atraso', 'Judeus', 'Catolicismo', 'Cristãos-Novos', 'na fogueira', 'autos-da-fé'],
      pointsPerBlank: 5
    }
  }
};
