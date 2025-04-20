# https://marcus7170.github.io/aps_consumo_agua/
# 💧 Portal de Conscientização Hídrica

![Preview do Site](static/images/banner.jpeg)

Um site interativo para educação sobre o uso responsável da água, desenvolvido para a APS da UNIP. Combina dados científicos com orientações práticas para mudança de hábitos.

## ✨ Funcionalidades Principais
- **Calculadora de Consumo Avançada**: Calcule seu consumo mensal de água em diferentes categorias
- **Quiz Interativo**: Teste seus conhecimentos com 10 questões sobre conservação hídrica
- **Dicas Animadas**: Cards interativos com soluções práticas e ícones ilustrativos
- **Sistema de Progresso**: Barra visual e contador de perguntas no quiz
- **Dark Mode**: Alternância entre temas claro e escuro
- **Mapa Interativo**: Visualização do estresse hídrico no Brasil por região

## 🛠 Stack Tecnológica
| Componente | Tecnologia | Recursos |
|------------|------------|----------|
| **Frontend** | HTML5 | Semântica ARIA, Tags Estruturais |
| **Estilos** | CSS3 | Variáveis CSS, Grid/Flexbox, Animações |
| **Interatividade** | JavaScript ES6 | LocalStorage, DOM Manipulation |
| **Recursos** | Icons8 | +20 ícones temáticos |

## 🎨 Design System
### Esquema de Cores
| Cor | Uso Principal | Hex |
|-----|---------------|-----|
| Azul | Elementos interativos, títulos | `#1e90ff` |
| Verde | Feedback positivo, progresso | `#2ed573` |
| Vermelho | Feedback negativo | `#ff4757` |

### Princípios de UX
- Transições suaves entre perguntas
- Feedback visual imediato nas respostas
- Design responsivo para mobile-first
- Navegação por scroll suave

## ⚙ Funcionalidades JavaScript
### Sistema de Quiz
```javascript
const quizData = [
  {
    question: "Qual país tem maior estresse hídrico?",
    answers: ["Brasil", "Índia", "Canadá"],
    correct: 1
  }
  // ... 9 outras questões
];

// Features:
// - Barra de progresso animada
// - Highlight de respostas corretas/erradas
// - Sistema de pontuação
// - Reinicialização do quiz
```

### Calculadora Multivariada
```javascript
function calcular() {
  // Calcula consumo considerando:
  // - Banho diário
  // - Ciclos de máquina de lavar
  // - Produção de alimentos
  // - Equivalência em piscinas infantis
}
```

## 📂 Estrutura do Projeto
```
├── static/
│   ├── style.css         # Estilos principais
│   ├── javascript.js     # Lógica de interatividade
│   └── images/               # Assets visuais
├── index.html                # Página principal
└── README.md                 # Documentação
```

## 🌐 Recursos Externos
- **Dados Científicos**: 
  - [ONU Água](https://www.unwater.org/)
  - [Agência Nacional de Águas](https://www.ana.gov.br)
- **Ícones**: 
  - [Icons8](https://icons8.com) (100+ ícones utilizados)
- **Fontes**:
  - Open Sans (Google Fonts)

## 🚀 Como Executar
1. Clone o repositório
2. Abra `index.html` em qualquer navegador moderno
3. Explore as funcionalidades:
   - Complete o quiz
   - Calcule seu consumo
   - Ative o dark mode

## 📌 Melhorias Recentes (v2.1)
- [+] 10 questões no quiz com dados atualizados
- [+] Sistema de progresso visual
- [+] Feedback contextualizado nas respostas
- [+] Ícones explicativos na calculadora
- [+] Otimização de performance CSS

## 🤝 Como Contribuir
1. Faça um Fork do projeto
2. Crie uma branch descritiva:
   ```bash
   git checkout -b feat/nova-question
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "Adiciona questão sobre pegada hídrica"
   ```
4. Envie para o repositório:
   ```bash
   git push origin feat/nova-question
   ```
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob licença educacional da UNIP. Para uso comercial ou redistribuição, entre em contato.

---

**Equipe de Desenvolvimento**  
Marcus - Matheus - Ruan - Natan  

**Contato Principal**  
(13) 99190-6461  

UNIP - Ciência da Computação  
2025 🌍 Preservar hoje para garantir o amanhã
