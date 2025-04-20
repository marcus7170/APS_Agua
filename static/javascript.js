// Cálculos de consumo mensal avançado
function calcular() {
    const minutos = Number(document.getElementById('banho').value) || 0;
    const ciclosRoupa = Number(document.getElementById('roupa').value) || 0;
    const ciclosLouca = Number(document.getElementById('louca').value) || 0;
    const kgArroz = Number(document.getElementById('arroz').value) || 0;
    const xicCafes = Number(document.getElementById('cafe').value) || 0;
  
    const litrosBanho = minutos * 10 * 30;
    const litrosRoupa = ciclosRoupa * 50;
    const litrosLouca = ciclosLouca * 15;
    const litrosArroz = kgArroz * 2500;
    const litrosCafe = xicCafes * 140 * 30;
  
    const total = litrosBanho + litrosRoupa + litrosLouca + litrosArroz + litrosCafe;
    const piscinas = (total / 5000).toFixed(1);
  
    document.getElementById('resultado').innerHTML = `
      <h3>Seu consumo mensal estimado:</h3>
      <p class="destaque">${total.toLocaleString()} L</p>
      <p>≈ ${piscinas} piscinas infantis (5.000 L)</p>
    `;
  }
  
  // Quiz Interativo//
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
  
  let currentQuestion = 0;
  let score = 0;
  
  function initializeQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // Limpa o quiz
    
    quizData.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = `question ${index === 0 ? '' : 'hidden'}`;
      questionDiv.dataset.index = index;
      
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
  
    updateProgress();
    addQuizEventListeners();
  }
  
  function addQuizEventListeners() {
    document.querySelectorAll('.quiz-btn').forEach(btn => {
      btn.addEventListener('click', handleAnswer);
    });
    
    document.getElementById('restart-quiz').addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      initializeQuiz();
      document.getElementById('restart-quiz').hidden = true;
    });
  }
  
  function handleAnswer(e) {
    const btn = e.target;
    const questionIndex = parseInt(btn.dataset.index);
    const answerIndex = parseInt(btn.dataset.answer);
    const question = quizData[questionIndex];
  
    // Destacar respostas
    btn.parentElement.querySelectorAll('.quiz-btn').forEach(b => {
      b.disabled = true;
      if (parseInt(b.dataset.answer) === question.correct) {
        b.classList.add('correct');
      } else {
        b.classList.add('wrong');
      }
    });
  
    if (answerIndex === question.correct) {
      score++;
      showFeedback('✅ Correto!', 'green');
    } else {
      showFeedback(`❌ Errado! A resposta correta é: ${question.answers[question.correct]}`, 'red');
    }
  
    setTimeout(() => {
      nextQuestion();
      updateProgress();
    }, 1500);
  }
  
  function nextQuestion() {
    const currentDiv = document.querySelector(`.question[data-index="${currentQuestion}"]`);
    currentDiv.classList.add('hidden');
  
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
      const nextDiv = document.querySelector(`.question[data-index="${currentQuestion}"]`);
      nextDiv.classList.remove('hidden');
      nextDiv.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = false);
    } else {
      showFinalResults();
    }
  }
  
  function updateProgress() {
    const currentEl = document.getElementById('current-question');
    const totalEl = document.getElementById('total-questions');
    const progressEl = document.querySelector('.progress-fill');
  
    if(currentEl && totalEl && progressEl) {
      currentEl.textContent = currentQuestion + 1;
      totalEl.textContent = quizData.length;
      progressEl.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
    }
  }
  
  function showFinalResults() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="question">
        <h3>Quiz Concluído! 🎉</h3>
        <p>Sua pontuação: ${score}/${quizData.length}</p>
        <p>${score === quizData.length ? 'Parabéns! Você é um expert em conservação hídrica!' : 'Continue aprendendo para melhorar seus resultados!'}</p>
      </div>
    `;
    document.getElementById('restart-quiz').hidden = false;
  }
  
  function showFeedback(msg, color) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.textContent = msg;
    feedback.style.color = color;
    feedback.style.marginTop = '1rem';
    feedback.style.animation = 'fadeIn 0.5s';
  
    const container = document.getElementById('quiz-container');
    container.appendChild(feedback);
  
    setTimeout(() => feedback.remove(), 1500);
  }
  
  // Inicializar quiz quando o DOM carregar
  document.addEventListener('DOMContentLoaded', initializeQuiz);
  
    // Toggle Dark Mode
    const toggle = document.getElementById('dark-toggle');
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  
    // Smooth scroll para navegação
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Alerta de contato
    document.querySelectorAll('.contact a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        alert('Obrigado por ler nosso conteúdo! 🚀\n\nEsta página foi desenvolvida para a APS da UNIP.\nContato único do grupo: (13) 99190-6461');
      });
    });

    console.log(
        document.getElementById('current-question'),
        document.getElementById('total-questions'),
        document.querySelector('.progress-fill')
      )