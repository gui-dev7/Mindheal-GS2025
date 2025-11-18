
#🌿 MindWell - Plataforma de Bem-Estar Corporativo Gamificado

MindWell é uma aplicação web focada em saúde mental e bem-estar para colaboradores, utilizando gamificação para incentivar hábitos saudáveis, pausas conscientes e autoconhecimento no ambiente de trabalho.

📋 Sobre o Projeto

O MindWell foi desenvolvido para transformar a rotina corporativa, muitas vezes estressante, em uma jornada de autocuidado. Através de uma interface moderna (Glassmorphism), responsiva e acolhedora, os usuários completam missões diárias, monitoram seu humor e ganham recompensas virtuais, criando um ciclo positivo de engajamento.

A aplicação é construída inteiramente com Vanilla JavaScript (JS Puro), HTML5 e CSS3, garantindo leveza, performance e facilidade de manutenção sem dependência de frameworks pesados.

✨ Funcionalidades Principais

🎮 Gamificação & Progresso

Sistema de Níveis e XP: Ganhe experiência ao completar tarefas e suba de nível.

Missões Diárias: Um conjunto de 5 tarefas aleatórias focadas em saúde física, mental e social.

Conquistas (Medalhas): Desbloqueie troféus ao atingir marcos importantes.

🎉 Confetti: Celebração visual ao subir de nível.

🧠 Ferramentas de Bem-Estar

📅 Mood Pixel: Um calendário visual para registrar o humor diário e visualizar o padrão mensal.

💌 Cápsula do Tempo: Escreva mensagens para o seu "eu do futuro" que ficam trancadas por 24h.

🌬️ Respiração Guiada: Exercício visual (4-7-8) para redução imediata de ansiedade.

⏱️ Modo Foco: Timer Pomodoro simplificado para momentos de concentração.

🧘 Modo Zen: Uma interface imersiva de tela cheia para desconexão total e relaxamento.

🛍️ Loja de Avatar

Utilize o XP acumulado para "comprar" acessórios para o seu avatar (óculos, coroas, flores).

Sistema de inventário e equipamento de itens.

💬 Assistente Virtual

MindBot: Um chatbot simulado sempre ativo que oferece suporte emocional e sugestões baseadas em palavras-chave (ex: "estresse", "cansado").

🎨 Interface Premium

Design Glassmorphism: Estética moderna com transparências e desfoque.

Dark Mode: Tema escuro completo para conforto visual noturno.

Responsividade: Funciona perfeitamente em desktop e mobile.

Toast Notifications: Alertas não intrusivos e animados para feedback de ações.

🚀 Tecnologias Utilizadas

HTML5: Estrutura semântica.

CSS3: Variáveis CSS (Custom Properties), Flexbox, Grid, Animações (@keyframes) e Media Queries.

JavaScript (ES6+): Lógica de estado, manipulação do DOM e persistência de dados.

LocalStorage: Utilizado para simular um banco de dados, persistindo:

Dados do usuário (XP, Nível, Nome).

Histórico de missões e humor.

Inventário da loja e mensagens da cápsula.

Preferência de tema (Dark/Light).

📂 Estrutura de Arquivos

/
├── index.html      # Dashboard Principal (Aplicação)
├── home.css        # Estilos do Dashboard (Glassmorphism, Temas)
├── home.js         # Lógica Principal (Gamificação, Loja, Chat, etc.)
│
├── login.html      # Página de Login
├── login.css       # Estilos específicos de Login
├── login.js        # Autenticação e Redirecionamento
│
├── cadastro.html   # Página de Registro
├── cadastro.css    # Estilos específicos de Cadastro
├── cadastro.js     # Criação de conta e validação
│
└── README.md       # Documentação


⚙️ Como Executar

Clone ou Baixe os arquivos do projeto para uma pasta local.

Certifique-se de que todos os arquivos (.html, .css, .js) estão na mesma pasta raiz.

Abra o arquivo login.html (ou cadastro.html se for o primeiro acesso) no seu navegador preferido (Chrome, Firefox, Edge).

Nota: Não é necessário instalar Node.js ou servidores locais, pois o projeto usa localStorage.

Crie uma conta na tela de cadastro.

Faça Login com as credenciais criadas.

Aproveite a experiência MindWell!

🎨 Identidade Visual

Cores Primárias: Amarelo (#FFD600) e Preto (#121212).

Tipografia: 'Plus Jakarta Sans', sans-serif.

Conceito: Energia, Modernidade e Acolhimento.

🛠️ Personalização

Para adicionar sua própria Logo:

Abra o arquivo index.html.

Localize a tag <img class="logo-img">.

Altere o atributo src para o caminho da sua imagem (ex: assets/minha-logo.png).

<div class="logo-container">
    <img src="caminho/para/sua-logo.png" alt="Logo Mind
