// ==================== CÁLCULO DE CONSUMO DE ÁGUA ====================
function calcular() {
  // Coletar valores dos inputs
  const minutos = Number(document.getElementById('banho').value) || 0;       // Minutos diários de banho
  const ciclosRoupa = Number(document.getElementById('roupa').value) || 0;   // Ciclos de lavagem de roupa
  const ciclosLouca = Number(document.getElementById('louca').value) || 0;   // Ciclos de lava-louças
  const kgArroz = Number(document.getElementById('arroz').value) || 0;       // Consumo mensal de arroz
  const xicCafes = Number(document.getElementById('cafe').value) || 0;       // Xícaras de café por dia

  // Cálculos de consumo
  const litrosBanho = minutos * 10 * 30;       // 10L/min * 30 dias
  const litrosRoupa = ciclosRoupa * 50;        // 50L por ciclo
  const litrosLouca = ciclosLouca * 15;        // 15L por ciclo
  const litrosArroz = kgArroz * 2500;          // 2500L por kg de arroz
  const litrosCafe = xicCafes * 140 * 30;      // 140L/xícara * 30 dias

  // Total e comparação com piscinas
  const total = litrosBanho + litrosRoupa + litrosLouca + litrosArroz + litrosCafe;
  const piscinas = (total / 5000).toFixed(1);  // Piscinas infantis de 5.000L

  // Exibir resultados
  document.getElementById('resultado').innerHTML = `
      <h3>Seu consumo mensal estimado:</h3>
      <p class="destaque">${total.toLocaleString()} L</p>
      <p>≈ ${piscinas} piscinas infantis (5.000 L)</p>
  `;
}
  
// ==================== QUIZ INTERATIVO ====================
  const quizData = [
    {
      question: "1. Qual porcentagem da população mundial sofre com escassez de água?",
      answers: ["40%", "30%", "50%"],
      correct: 0
    },
    {
      question: "2. Quanto litros gasta lavar uma calçada com mangueira em 15 minutos?",
      answers: ["135 L", "280 L", "100 L"],
      correct: 1
    },
    {
      question: "3. Quantos litros de água são necessários para produzir 1 kg de arroz?",
      answers: ["1.300 L", "3.000 L", "2.500 L"],
      correct: 2
    },
    {
      question: "4. Qual é o principal uso da água no mundo?",
      answers: ["Uso doméstico", "Agricultura", "Indústria"],
      correct: 1
    },
    {
      question: "5. Qual destes é um método de irrigação eficiente?",
      answers: ["Aspersão", "Gotejamento", "Inundação"],
      correct: 1
    },
    {
      question: "6. Quantos litros um vaso sanitário comum gasta por descarga?",
      answers: ["6-10 L", "12-15 L", "18-20 L"],
      correct: 1
    },
    {
      question: "7. Qual destes alimentos tem maior pegada hídrica?",
      answers: ["Carne bovina", "Frango", "Soja"],
      correct: 0
    },
    {
      question: "8. O que significa a sigla ANA?",
      answers: ["Agência Nacional de Águas", "Associação Natural Ambiental", "Autoridade Nacional Aquática"],
      correct: 0
    },
    {
      question: "9. Qual país tem maior estresse hídrico?",
      answers: ["Brasil", "Índia", "Canadá"],
      correct: 1
    },
    {
      question: "10. Qual é o tempo ideal para um banho econômico?",
      answers: ["5 minutos", "10 minutos", "15 minutos"],
      correct: 0
    }
  ];
  
  let currentQuestion = 0;  // Controla a pergunta atual
let score = 0;            // Pontuação do usuário

// Inicializar estrutura do quiz
function initializeQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // Resetar conteúdo

    // Criar elementos para cada pergunta
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `question ${index === 0 ? '' : 'hidden'}`; // Só mostra a primeira
        questionDiv.dataset.index = index;

        // Gerar HTML dos botões de resposta
        const questionHTML = `
            <h3>${q.question}</h3>
            ${q.answers.map((answer, i) => `
                <button class="quiz-btn" 
                        data-index="${index}" 
                        data-answer="${i}" 
                        ${index > 0 ? 'disabled' : ''}>
                    ${answer}
                </button>
            `).join('')}
        `;
        
        questionDiv.innerHTML = questionHTML;
        container.appendChild(questionDiv);
    });

    updateProgress();          // Atualizar barra de progresso
    addQuizEventListeners();    // Adicionar interatividade
}
  
// Gerenciar eventos do quiz
function addQuizEventListeners() {
  // Evento para cada botão de resposta
  document.querySelectorAll('.quiz-btn').forEach(btn => {
      btn.addEventListener('click', handleAnswer);
  });
  
  // Botão de reiniciar quiz
  document.getElementById('restart-quiz').addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      initializeQuiz();
      document.getElementById('restart-quiz').hidden = true;
  });
}

// Processar resposta selecionada
function handleAnswer(e) {
  const btn = e.target;
  const questionIndex = parseInt(btn.dataset.index);
  const answerIndex = parseInt(btn.dataset.answer);
  const question = quizData[questionIndex];

  // Destacar respostas corretas/incorretas
  btn.parentElement.querySelectorAll('.quiz-btn').forEach(b => {
      b.disabled = true;
      b.classList.add(parseInt(b.dataset.answer) === question.correct ? 'correct' : 'wrong');
  });

  // Atualizar pontuação e feedback
  if (answerIndex === question.correct) {
      score++;
      showFeedback('✅ Correto!', 'green');
  } else {
      showFeedback(`❌ Errado! A resposta correta é: ${question.answers[question.correct]}`, 'red');
  }

  // Próxima pergunta após 1.5s
  setTimeout(() => {
      nextQuestion();
      updateProgress();
  }, 1500);
}

// Navegação entre perguntas
function nextQuestion() {
  const currentDiv = document.querySelector(`.question[data-index="${currentQuestion}"]`);
  currentDiv.classList.add('hidden');
  currentQuestion++;

  if (currentQuestion < quizData.length) {
      const nextDiv = document.querySelector(`.question[data-index="${currentQuestion}"]`);
      nextDiv.classList.remove('hidden');
      nextDiv.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = false);
  } else {
      showFinalResults(); // Exibir resultados finais
  }
}

// Atualizar barra de progresso
function updateProgress() {
  const currentEl = document.getElementById('current-question');
  const totalEl = document.getElementById('total-questions');
  const progressEl = document.querySelector('.progress-fill');

  if(currentEl && totalEl && progressEl) {
      currentEl.textContent = currentQuestion + 1;
      totalEl.textContent = quizData.length;
      progressEl.style.width = `${(currentQuestion / quizData.length) * 100}%`;
  }
}

// Exibir tela de resultados finais
function showFinalResults() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
      <div class="question">
          <h3>Quiz Concluído! 🎉</h3>
          <p>Sua pontuação: ${score}/${quizData.length}</p>
          <p>${score === quizData.length ? 'Parabéns! Você é um expert!' : 'Continue aprendendo!'}</p>
      </div>
  `;
  document.getElementById('restart-quiz').hidden = false;
}

// Exibir feedback temporário
function showFeedback(msg, color) {
  const feedback = document.createElement('div');
  feedback.className = 'feedback';
  feedback.textContent = msg;
  feedback.style.color = color;
  document.getElementById('quiz-container').appendChild(feedback);
  setTimeout(() => feedback.remove(), 1500);
}

// ==================== FUNCIONALIDADES GERAIS ====================
// Modo Escuro
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dark-toggle');
  toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  
  // Carregar preferência salva
  if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
  }
});

// Scroll Suave
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Alerta de Contato
document.querySelectorAll('.contact a').forEach(link => {
  link.addEventListener('click', e => {
      e.preventDefault();
      alert('Obrigado por ler nosso conteúdo!\nContato: (13) 99190-6461');
  });
});

// ==================== CONTROLE DO MENU ====================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const pageWrapper = document.querySelector('.page-wrapper');
  const closeMenu = document.querySelector('.close-menu');
  const menuItems = document.querySelectorAll('.side-menu .item');

  // Abrir menu
  menuToggle.addEventListener('click', () => {
      sideMenu.classList.add('active');
      pageWrapper.classList.add('menu-active');
  });

  // Fechar menu
  const closeMenuFunction = () => {
      sideMenu.classList.remove('active');
      pageWrapper.classList.remove('menu-active');
  };

  // Eventos de fechamento
  closeMenu.addEventListener('click', closeMenuFunction);
  menuItems.forEach(item => item.addEventListener('click', closeMenuFunction));

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
      if (!sideMenu.contains(e.target) && 
          !menuToggle.contains(e.target) &&
          sideMenu.classList.contains('active')) {
          closeMenuFunction();
      }
  });
});

// ==================== BOTÃO VOLTAR AO TOPO ====================
const backToTopButton = document.getElementById('back-to-top');

// Mostrar/ocultar botão
window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('show', window.scrollY > 300);
});

// Scroll suave
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Inicializar quiz quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeQuiz);
