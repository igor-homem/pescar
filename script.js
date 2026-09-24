/* TURMA DE TI · Hub Pescar
   Conversão independente de React/Vite para HTML + CSS + JavaScript puro.
*/

const PHOTOS = [
  {
    src: "images/25ogmgj2_880bd4bb-295b-4c03-902b-8acba2997baa.jpg",
    alt: "Turma reunida no Hub Pescar",
    label: "FASE 01 · A TURMA"
  },
  {
    src: "images/9vdozm3x_723ea237-518a-4836-9566-c2b7f2784d94.jpg",
    alt: "Alunos reunidos entre livros no Hub Pescar",
    label: "FASE 02 · CONEXÕES"
  },
  {
    src: "images/oq6859n3_9253d466-5416-4cdc-8b70-53a17e35a884.jpg",
    alt: "Apresentação da turma no Hub Pescar",
    label: "FASE 03 · APRESENTAÇÃO"
  },
  {
    src: "images/turma.jpg",
    alt: "Turma participando de uma atividade",
    label: "FASE 04 · APRENDIZADO"
  }
];

const PROFILES = [
  {
    id:"klaiton-scherer", firstName:"Klaiton", lastName:"Scherer",
    role:"Educador · Tech Lead", accent:"#9dff00",
    theme:{accent:"#35664f",soft:"#e2ebe2",ink:"#315d49",symbol:"✦",label:"MENTORIA",chips:["guia","estratégia","equipe"]},
    photoUrl:"images/klaiton.jpeg",
    bio:"Meu nome é Klaiton, tenho 26 anos e sou Educador Social de Tecnologia da Informação. Sou formado em Análise e Desenvolvimento de Sistemas e pós-graduado em Ciência da Informação. Sou apaixonado por tecnologia, inovação e aprendizado, Como educador, busco compartilhar meus conhecimentos e contribuir para o desenvolvimento de jovens, mostrando como a tecnologia pode abrir novas oportunidades. Também sou gamer e mestre de RPG, hobbies que estimulam minha criatividade, imaginação e paixão por contar histórias. ",
    skillsSummary:"Mentoria, tecnologia, estratégia e trabalho em equipe para acompanhar a evolução da turma.",
    skills:[["Mentoria",99],["Tecnologia",94],["Estratégia",96],["Equipe",100]],
    height:"1,88 m", age:"26", nicknames:"Klatin, mestre",
    dream:"Ser pai e ser um profissional referência.", futureProfession:"cientista de dados", seed:"boss"
  },
  {
    id:"igor-homem", firstName:"Igor", lastName:"Homem",
    role:"Tecnologia e programação", accent:"#00f0ff",
    theme:{accent:"#3f7ea1",soft:"#dcebf0",ink:"#29526d",symbol:"⌘",label:"TECNOLOGIA",chips:["código","curiosidade","projetos"]},
    photoUrl: "images/igor.jpg",
    bio:"Olá, meu nome é Igor Homem, nasci em Porto Alegre no dia 30/03/2009 e tenho 17 anos. Sou uma pessoa altamente extrovertida, curiosa, criativa e inteligente. Gosto de situações que me desafiam e tenho facilidade para resolver problemas, mesmo sob pressão. Sou apaixonado por tecnologia e programação, principalmente na área de desenvolvimento de jogos, front-end e back-end.",
    skillsSummary:"Tenho conhecimentos em MySQL, Java, Python, Phaser 3, HTML, CSS e JavaScript. Também possuo facilidade em comunicação, trabalho em equipe, liderança e coordenação de projetos.",
    skills:[["Responsabilidade",86],["Criatividade",82],["Programação",94],["Liderança",90]],
    height:"1,87 m", age:"17 anos", nicknames:"Niggor, HOMEM, Homem Pink",
    dream:"Ter uma família grande, construir uma vida estável e ter meu próprio estúdio de games.",
    futureProfession:"Desenvolvedor de Jogos", seed:"igor"
  },
  {
    id:"joao-mesquita", firstName:"João", lastName:"Mesquita",
    role:"Comunicação e design", accent:"#ffb000",
    theme:{accent:"#b57d42",soft:"#f2e5d3",ink:"#79552f",symbol:"✎",label:"DESIGN",chips:["oratória","filosofia","criatividade"]},
    photoUrl: "images/joão mesquita.jpg",
    bio:"Sou alguém muito animado e extrovertido, amo ter boas conversas sobre qualquer coisa e gosto sempre de ver as pessoas bem à minha volta. Amo insetos, jogos retro e filosofia.",
    skillsSummary:"Tenho uma oratória muito boa e gosto de me expressar, ouvir ideias e conversar sobre assuntos diferentes.",
    skills:[["Oratória",96],["Comunicação",92],["Criatividade",88],["Conversas",94]],
    height:"1,67 m", age:"17 anos", nicknames:"Mesquita",
    dream:"Trabalhar com aquilo que amo e viver uma vida na qual eu não me arrependa de seguir os caminhos que escolho.",
    futureProfession:"Designer gráfico", seed:"joao-m"
  },
  {
    id:"gabriel-monteiro", firstName:"Gabriel", lastName:"Monteiro",
    role:"Cozinha e criatividade", accent:"#ff4fd8",
    theme:{accent:"#b86d55",soft:"#f3e0d5",ink:"#79453d",symbol:"♨",label:"CORAGEM",chips:["cozinha","futuro","montanha"]},
    photoUrl: "images/gabriel.jpg",
    bio:"Olá, me chamo Gabriel, tenho 17 anos, moro em Alvorada e escrevi isso apenas pensando em como sou grato ao Projeto Pescar. Foi esse lugar que me impediu de continuar mofando no quarto e apenas pensando naquilo que desejo ser, ao invés de realmente me esforçar e me dedicar ao futuro.",
    skillsSummary:"Possuo fácil aprendizado, me comunico bem, tenho fácil compreensão, trabalho bem em equipe e penso bastante sobre as possibilidades.",
    skills:[["Aprendizado",94],["Comunicação",88],["Compreensão",90],["Equipe",92]],
    height:"1,84 m", age:"17 anos", nicknames:"Gabi",
    dream:"Escalar uma montanha.", futureProfession:"Cozinheiro", seed:"gabriel"
  },
  {
    id:"vitoria-texeira", firstName:"Vitória", lastName:"Texeira",
    role:"Psicologia · escuta e cuidado", accent:"#b86f74",
    theme:{accent:"#b66e72",soft:"#ead7d3",ink:"#7c4c50",symbol:"♡",label:"PSICOLOGIA",chips:["escuta","cuidado","presença"]},
    photoUrl:"images/vitoria.jpg",
    bio:"Meu nome é Vitória. Sou introvertida e caseira, mas gosto de conhecer coisas novas e viver experiências diferentes. Com quem gosto, sou brincalhona, conversadeira e engraçada. Sou leal e companheira e valorizo as pessoas que fazem parte da minha vida. Gosto de música, filmes, séries, livros, animais e de mudar meu visual. No Pescar, saí da minha zona de conforto, desenvolvi minha comunicação e me tornei mais aberta e comunicativa, o que considero uma grande conquista.",
    skillsSummary:"Sou responsável, dedicada e organizada. Tenho facilidade para trabalhar em equipe, aprender coisas novas e ouvir as pessoas. Também sou bastante pensativa e estou sempre buscando desenvolver minha comunicação e melhorar minhas habilidades.",
    skills:[["Responsabilidade",96],["Organização",91],["Equipe",94],["Comunicação",82]],
    height:"1,60 m", age:"18 anos", nicknames:"Viih, Vica, Vitórinha, Tóia e Scarlet",
    dream:"Não tenho um grande sonho específico. Tenho objetivos que quero conquistar aos poucos, como minha independência, estabilidade, uma profissão que eu goste e uma vida tranquila ao lado das pessoas que amo.",
    futureProfession:"Psicóloga", seed:"vitoria"
  },
  {
    id:"maria-clara", firstName:"Maria", lastName:"Clara",
    role:"Narradora de histórias", accent:"#ffea00",
    theme:{accent:"#a89d45",soft:"#f0eed6",ink:"#6e672e",symbol:"✦",label:"HISTÓRIAS",chips:["narrativa","criatividade","imaginação"]},
    photoUrl:"images/maria clara.jpg",
    bio:"Meu nome é Maria Clara e eu dou de Porto Alegre, sou uma pessoa calma, alegre e extrovertida. Gosto de aprender coisas novas e, no meu tempo livre, adoro jogar vôlei e desenhar. Minha família e meus amigos são muito importantes para mim, e eu amo muito todos eles.",
    skillsSummary:"Sou objetiva, tenho fácil aprendizado, dedicada e organizada.",
    skills:[["Lógica",72],["Criatividade",84],["Equipe",90],["Desenhar",96]],
    height:"1,75 m", age:"16", nicknames:"mari",
    dream:"poder viajar quando eu crescer e estudar bastante.", 
    futureProfession:":Ainda não sei o que quero fazer no futuro, mas penso em Arquitetura ou Design.", 
    seed:"maria"
  },
  {
    id:"renata-nascimento", firstName:"Renata", lastName:"Nascimento",
    role:"Saúde e investigação", accent:"#8b5cff",
    theme:{accent:"#7b6caa",soft:"#e7e2f0",ink:"#584c7e",symbol:"＋",label:"SAÚDE",chips:["biologia","esporte","foco"]},
    photoUrl:"images/renata.jpg",
    bio:"Meu nome é Renata, tenho 16 anos e moro em Porto Alegre. Gosto de jogar vôlei e handebol, assistir a filmes, séries e documentários, e gosto muito de ler. Minha matéria preferida é biologia ou qualquer coisa relacionada à saúde. Também adoro aprender coisas novas.",
    skillsSummary:"Tenho boa comunicação, trabalho bem em equipe e sou esforçada.",
    skills:[["Comunicação",88],["Equipe",94],["Esforço",96],["Biologia",84]],
    height:"1,54 m", age:"16 anos", nicknames:"G2, Re, Nata, Loira, Cachinhos Dourados, Cuca e Loira do Tchan",
    dream:"Entrar na faculdade e conseguir meu cantinho.", futureProfession:"Perita criminal", seed:"renata"
  },
  {
    id:"roberta-nascimento", firstName:"Roberta", lastName:"Nascimento",
    role:"Escuta e cuidado", accent:"#ff744d",
    theme:{accent:"#c36e52",soft:"#f2ded5",ink:"#7d4a3d",symbol:"♥",label:"EMPATIA",chips:["vôlei","escuta","equipe"]},
    photoUrl:"images/roberta.jpg",
    bio:"Meu nome é Roberta, tenho 16 anos e moro em Porto Alegre. Desde criança gosto bastante de jogar vôlei e assistir séries. Na escola, minha matéria preferida é educação física. Também gosto de ler, ouvir música e assistir coisas novas.",
    skillsSummary:"Minhas principais habilidades são escuta ativa, empatia e trabalho em equipe.",
    skills:[["Escuta ativa",94],["Empatia",95],["Equipe",92],["Vôlei",86]],
    height:"1,57 m", age:"16 anos", nicknames:"G1, Ro ou Beta",
    dream:"Me formar na faculdade.", futureProfession:"Médica legista", seed:"roberta"
  },
  {
    id:"maria-eduarda", firstName:"Maria", lastName:"Eduarda",
    role:"Escrita e comunicação", accent:"#31a884",
    theme:{accent:"#3c9079",soft:"#dcece5",ink:"#2e6758",symbol:"✎",label:"ESCRITA",chips:["viagens","cultura","dedicação"]},
    photoUrl:"images/maria eduarda.jpg",
    bio:"Meu nome é Maria Eduarda, tenho 17 anos, sou de Porto Alegre - RS, dedicada, esforçada e estou sempre buscando evoluir e correr atrás dos meus objetivos.",
    skillsSummary:"Sou uma pessoa organizada, tenho uma boa comunicação e gosto muito de escrever.",
    skills:[["Organização",92],["Comunicação",88],["Escrita",94],["Dedicação",96]],
    height:"1,54 m", age:"17 anos", nicknames:"Duda, Crispin, Dudinha",
    dream:"Viajar para fora do Brasil e conhecer novas culturas.", futureProfession:"Policial ou advogada", seed:"maria-eduarda"
  },
  {
    id:"pedro-reyes", firstName:"Pedro", lastName:"Reyes",
    role:"Esporte e música", accent:"#a6ff4d",
    theme:{accent:"#71994d",soft:"#e5edd9",ink:"#4d6938",symbol:"•",label:"MOVIMENTO",chips:["vôlei","música","cozinha"]},
   photoUrl:"images/pedro.jpg",
    bio:"Meu nome é Pedro, tenho 17 anos e nasci no dia 18 de julho de 2009, em Porto Alegre, cidade onde moro atualmente. Estou cursando o 2º ano do Ensino Médio. No meu tempo livre, gosto de jogar vôlei, cozinhar e tocar instrumentos musicais. O vôlei é uma das minhas maiores paixões.",
    skillsSummary:"Sei cozinhar, pratico múltiplos esportes e toco vários instrumentos.",
    skills:[["Cozinha",84],["Esportes",96],["Instrumentos",88],["Persistência",93]],
    height:"1,76 m", age:"17 anos", nicknames:"Garcia, Pedroca, Pedrão",
    dream:"Ser jogador de vôlei profissional, ter uma família e viajar para vários lugares do mundo.", futureProfession:"Educador físico", seed:"pedro"
  },
  {
    id:"arthur-dimer", firstName:"Arthur", lastName:"Dimer",
    role:"Aviação e planejamento", accent:"#ff9c4a",
    theme:{accent:"#b87546",soft:"#f2e2d1",ink:"#754d32",symbol:"✈",label:"AVIAÇÃO",chips:["voo","família","planejamento"]},
    photoUrl:"images/arthur.jpg",
    bio:"Nasci no dia 14 de fevereiro de 2010. Adoro passar o tempo com minha família e amigos. Desde os meus 4 anos sou apaixonado pela aviação e pelo mundo automobilístico.",
    skillsSummary:"Tenho comunicação eficaz, sei ouvir, sou empático e pratico planejamento, autocontrole e autorregulação emocional.",
    skills:[["Comunicação",90],["Escuta",92],["Resiliência",89],["Planejamento",94]],
    height:"1,85 m", age:"16 anos", nicknames:"Art",
    dream:"Morar na Suíça.", futureProfession:"Piloto de avião comercial", seed:"arthur"
  },
  {
    id:"thanyse-soares", firstName:"Thanyse", lastName:"Soares",
    role:"Criatividade e cuidado", accent:"#f85dff",
    theme:{accent:"#a36a91",soft:"#efe0eb",ink:"#704a65",symbol:"⌁",label:"MEMÓRIAS",chips:["praia","livros","fotografia"]},
    photoUrl:"images/thanyse.jpg",
    bio:"Sou uma pessoa que gosta de aproveitar a vida e estar perto de quem amo. Gosto de sair, passar tempo com meus amigos e minha família, conhecer lugares, principalmente a praia, e viver momentos que se tornam boas lembranças. Amo livros, tirar fotos e registrar momentos especiais. Também gosto muito de vôlei e tenho interesse por inglês desde pequena.",
    skillsSummary:"Tenho facilidade para trabalhar em equipe, sou criativa, responsável e dedicada, com boa comunicação, organização e facilidade para aprender coisas novas.",
    skills:[["Equipe",94],["Criatividade",93],["Organização",91],["Aprendizado",90]],
    height:"1,60 m", age:"16 anos", nicknames:"Thata",
    dream:"Ter uma família, ter saúde, estar financeiramente bem e ser feliz.", futureProfession:"Biomédica", seed:"thanyse"
  },
  {
    id:"gabriela-abreu", firstName:"Gabriela", lastName:"Abreu",
    role:"Organização e agilidade", accent:"#31ffd0",
    theme:{accent:"#3c9b83",soft:"#dcece6",ink:"#2d6c5d",symbol:"✿",label:"CRIATIVIDADE",chips:["família","fantasia","leitura"]},
    photoUrl:"images/gabriela.jpg",
    bio:"Meu nome é Gabriela Abreu, tenho 17 anos. Gosto de passar o maior tempo possível com a minha família, amo fazer as unhas, principalmente quando não estou bem, gosto de assistir filmes de fantasia em dias chuvosos e amo ler livros.",
    skillsSummary:"Minhas principais habilidades são organização, comunicação e agilidade.",
    skills:[["Organização",94],["Comunicação",88],["Agilidade",92],["Criatividade",87]],
    height:"1,64 m", age:"17 anos", nicknames:"Gabi",
    dream:"Me formar, ter uma boa estabilidade financeira, casa própria e conhecer o mundo.", futureProfession:"Advogada criminalista", seed:"gabriela"
  },
  {
    id:"kimberlly-motta", firstName:"Kimberlly", lastName:"Motta",
    role:"Arquitetura e design", accent:"#ffe13b",
    theme:{accent:"#a38a38",soft:"#f0ead0",ink:"#716028",symbol:"⌂",label:"ARQUITETURA",chips:["design","animais","independência"]},
    photoUrl:"images/kimberlly.jpg",
    bio:"Sou uma pessoa criativa, determinada e observadora. Gosto de aprender coisas novas, arquitetura, design, música e animais. Estou estudando e buscando construir minha independência e meu futuro.",
    skillsSummary:"Tenho criatividade, organização, responsabilidade, comunicação, observação, facilidade para aprender, tecnologia, design e planejamento.",
    skills:[["Criatividade",95],["Organização",92],["Tecnologia",88],["Planejamento",90]],
    height:"1,67 m", age:"18 anos", nicknames:"Kim",
    dream:"Ter minha própria casa, conquistar minha independência financeira e construir uma vida confortável e do meu jeito.", futureProfession:"Arquiteta", seed:"kimberlly"
  },
  {
    id:"larissa-jesus", firstName:"Larissa", lastName:"Jesus",
    role:"Calma e criatividade", accent:"#70a7ff",
    theme:{accent:"#6688ad",soft:"#dfe9f2",ink:"#46637d",symbol:"❀",label:"POESIA",chips:["família","cuidado","calma"]},
    photoUrl:"images/larissa.jpg",
    bio:"Sou de Alvorada, morena, mediana, gentil, calma, um pouco ansiosa e amigável.",
    skillsSummary:"Tenho habilidade para cuidar de crianças, cozinhar e fazer poesias.",
    skills:[["Cuidar de crianças",92],["Cozinhar",88],["Poesia",90],["Gentileza",96]],
    height:"1,52 m", age:"18 anos", nicknames:"Lari, Issa e Pocarrontas",
    dream:"Viajar de avião com minha família.", futureProfession:"Arquiteta", seed:"larissa"
  },
  {
    id:"joao-rauper", firstName:"João", lastName:"Rauper",
    role:"Música e comunicação", accent:"#00c2ff",
    theme:{accent:"#4b7fa0",soft:"#dbe9ef",ink:"#315b73",symbol:"♫",label:"MÚSICA",chips:["carisma","marketing","composição"]},
    photoUrl:"images/joão rauper.jpg",
    bio:"Meu nome é João Rauper, sou cantor e compositor, tenho duas músicas publicadas em todas as plataformas digitais. Tenho certificados em cursos de marketing, networking, mídias sociais e outros. Gosto de passar tempo com a família e experimentar coisas novas, e não gosto de ver filme ruim.",
    skillsSummary:"Tenho adaptabilidade, escuta ativa, comunicação clara, fácil aprendizagem e sou carismático.",
    skills:[["Adaptabilidade",92],["Escuta ativa",88],["Comunicação",96],["Carisma",95]],
    height:"1,63 m", age:"17 anos", nicknames:"Rauper, Jojo",
    dream:"Construir uma carreira forte e que eu goste de exercer.", futureProfession:"Publicitário", seed:"joao-r"
  },
  {
id:"rafael-mattos", firstName:"Rafael", lastName:"Mattos",
    role:"futebol e Policial", accent:"#ff5c8a",
    theme:{
      accent:"#a84f6c",
      soft:"#f2dce4",
      ink:"#713b4d",
      symbol:"◆",
      label:"CRIATIVIDADE",
      chips:["interesse","futebol","entusiasmo"]
    },
    photoUrl:"images/rafael.jpg",
    bio:"meu nome é: Rafael Matos  Ferreira tenho 16 anos de idade nasci em Porto Alegre no hospital puc as 00:49 moro com minha mãe,meu pai,meu avô, e meus irmãos sou muito educado ajudo nas tarefas de casa e gosto de aprender novas coisas.",
    skillsSummary:"jogar bola.",
    skills:[
      ["Futebol",92],
      ["Curiosidade",88],
      ["Coragem",86],
      ["Ser gente boa",90]
    ],
    height:"1,80 m",
    age:"16",
    nicknames:"mattos",
    dream:"Ir pra frança",
    futureProfession:"Ser policial federal",
    seed:"rafael"
  }
  
];
  


const root = document.getElementById("root");
let carouselIndex = 0;
let carouselTimer;

function initials(p) {
  return (p.firstName[0] + p.lastName[0]).toUpperCase();
}

function avatarHTML(p, large = false, showPhoto = false) {
  if (showPhoto && p.photoUrl) {
    return `<div class="pixel-avatar ${large ? "pixel-avatar-large" : ""}" style="--avatar-accent:${p.theme?.accent ?? p.accent}" aria-label="Avatar pixelado de ${p.firstName} ${p.lastName}">
      <img class="pixel-avatar-photo" src="${p.photoUrl}" alt="Foto de ${p.firstName} ${p.lastName}" loading="eager" decoding="sync">
    </div>`;
  }
  const pattern = [[1,1,0,0,1,1],[1,0,1,1,0,1],[0,1,1,1,1,0],[0,1,0,0,1,0],[1,0,1,1,0,1],[1,1,0,0,1,1]];
  const cells = pattern.flatMap((row,r)=>row.map((active,c)=>`<span class="${active ? "is-active" : ""}" style="animation-delay:${(r+c)*70}ms"></span>`)).join("");
  return `<div class="pixel-avatar ${large ? "pixel-avatar-large" : ""}" style="--avatar-accent:${p.theme?.accent ?? p.accent}" aria-label="Avatar pixelado de ${p.firstName} ${p.lastName}">
    <div class="pixel-avatar-glow"></div>
    <div class="pixel-avatar-face" aria-hidden="true">
      <div class="pixel-avatar-hair"></div>
      <div class="pixel-avatar-eyes"><span></span><span></span></div>
      <div class="pixel-avatar-mouth"></div>
      <div class="pixel-avatar-shirt"></div>
    </div>
    <div class="pixel-avatar-pattern" aria-hidden="true">${cells}</div>
    <span class="pixel-avatar-initials" aria-hidden="true">${p.firstName.slice(0,1)}${p.lastName.slice(0,1)}</span>
  </div>`;
}

function header(back = false) {
  return `<header class="site-header">
    <a href="#top" class="brand-lockup" data-home>
      <span class="brand-mark">&gt;_</span>
      <span><strong>TURMA</strong><small>DE TI</small></span>
    </a>
    ${back
      ? `<span class="profile-header-path">HUB PESCAR · 2026</span>
         <a href="#perfis" class="back-link" data-home><span>←</span> CONHEÇA A TURMA</a>`
      : `<nav class="site-nav" aria-label="Navegação principal">
          <a href="#turma">A TURMA</a>
          <a href="#perfis">CONHEÇA</a>
        </nav>
        <div class="header-status"><span></span> ONLINE · HUB PESCAR</div>`
    }
  </header>`;
}

function homePage() {
  return `<div class="site-shell" data-testid="home-page">
    ${header(false)}
    <main>
      <section class="hero-section" id="top">
        <div class="hero-photo-stage" id="turma">
          ${PHOTOS.map((p,i)=>`<img src="${p.src}" alt="${p.alt}" class="hero-photo ${i===carouselIndex ? "is-active":""}" data-photo="${i}">`).join("")}
          <div class="hero-photo-overlay" aria-hidden="true"></div>
          <div class="crt-lines" aria-hidden="true"></div>
          <div class="hero-corner hero-corner-left" aria-hidden="true"></div>
          <div class="hero-corner hero-corner-right" aria-hidden="true"></div>
        </div>

        <div class="hero-copy">
          <h1 class="main-title">TURMA <span>DE TI</span></h1>
          <p>Somos a melhor turma de TI que o Hub já teve.<br></p>
          <div class="hero-actions"><a href="#perfis" class="pixel-button pixel-button-primary">CONHEÇA-NOS <span>→</span></a></div>
        </div>

        <div class="hero-controls" data-testid="carousel-controls">
          <button type="button" class="carousel-arrow" data-carousel="-1" aria-label="Foto anterior">←</button>
          <div class="carousel-dots" aria-label="Selecionar foto">
            ${PHOTOS.map((_,i)=>`<button type="button" class="carousel-dot ${i===carouselIndex ? "is-active":""}" data-carousel="${i}" aria-label="Ir para foto ${i+1}"></button>`).join("")}
          </div>
          <button type="button" class="carousel-arrow" data-carousel="1" aria-label="Próxima foto">→</button>
          <span class="carousel-counter">0${carouselIndex+1} / 0${PHOTOS.length}</span>
        </div>
      </section>

      <section class="profiles-section content-section" id="perfis">
        <div class="section-heading">
          <div><h2>CONHEÇA<br><em>A TURMA</em></h2></div>
          <p class="section-intro">Clique em cada círculo para conhecer uma pessoa da nossa turma.</p>
        </div>

        <div class="profiles-layout" data-testid="profiles-grid">
          <div class="boss-profile-slot">${profileCard(PROFILES[0])}</div>
          <div class="profiles-row">${PROFILES.slice(1,6).map(profileCard).join("")}</div>
          <div class="profiles-row">${PROFILES.slice(6,11).map(profileCard).join("")}</div>
          <div class="profiles-row">${PROFILES.slice(11,17).map(profileCard).join("")}</div>
        </div>

        <p class="profiles-footnote"><span></span> PERFIS 01–17 · DADOS EM ATUALIZAÇÃO · CLIQUE PARA SABER MAIS</p>
      </section>

     <section class="game-section">
  <div class="game-copy">
    <p class="section-kicker">JOGO DA TURMA</p>

    <h2>Montagem <em>do PC</em></h2>

    <div class="game-description-box">
      <p>
        Montagem de PC é um jogo educativo e interativo desenvolvido para ensinar, de forma simples e divertida, os principais componentes de um computador e a ordem correta de montagem. O jogador escolhe entre dois personagens e explora uma sala de tecnologia até encontrar o computador.

Ao iniciar a atividade, o jogador precisa identificar e instalar corretamente componentes como placa-mãe, processador, memória RAM, SSD, placa de vídeo e fonte. As opções aparecem em uma ordem diferente a cada partida, exigindo atenção e conhecimento. O jogador possui três chances de erro e recebe dicas para ajudá-lo durante o desafio.

O jogo combina exploração, aprendizado e interação, tornando o processo de conhecer o hardware de um computador mais dinâmico e acessível.
      </p>
    </div>

    <a
      href="http://localhost:8080/"
      class="pixel-button pixel-button-primary"
      target="_blank"
      rel="noopener"
    >
      JOGAR AGORA →
    </a>
  </div>
</section>

    </main>
    <footer class="site-footer">
      <span>© TURMA DE TI · HUB PESCAR · 2026</span>
      <span>FEITO COM IDEIAS &amp; CÓDIGO</span>
    </footer>
  </div>`;
}

function profileCard(p) {
  return `<a href="#/perfis/${p.id}" class="profile-card" aria-label="Abrir perfil de ${p.firstName} ${p.lastName}">
    ${avatarHTML(p, false, true)}
    <span class="profile-first-name">${p.firstName}</span>
    <span class="profile-last-name">${p.lastName}</span>
  </a>`;
}

function profilePage(p) {
  const theme = p.theme;
  return `<div class="site-shell profile-page" style="--profile-accent:${theme.accent};--profile-soft:${theme.soft};--profile-ink:${theme.ink}">
    ${header(true)}
    <main class="profile-main">
      <a href="#/perfis" class="back-link profile-back">← VOLTAR</a>

      <section class="profile-editorial-heading">
        <div>
          <h1>${p.firstName}<br><em>${p.lastName}</em></h1>
          <p class="profile-role">${p.role}</p>
          <div class="profile-theme-intro">
            <span class="profile-theme-symbol">${theme.symbol}</span>
            <span><strong>${theme.label}</strong><small>${theme.chips.join(" · ")}</small></span>
          </div>
        </div>
        <span class="profile-year">2026<br>TURMA DE TI</span>
      </section>

      <section class="profile-editorial-grid">
        <article class="profile-editorial-card profile-editorial-bio">
          <h2>Biografia</h2>
          <p>${p.bio}</p>
          <h3>Skills</h3>
          <p class="profile-skills-copy">${p.skillsSummary}</p>
        </article>

        <div class="profile-editorial-photo">
          ${avatarHTML(p, true, true)}
          <span>${p.photoUrl ? "Vitória · psicologia" : `${p.firstName} · turma de TI`}</span>
        </div>

        <article class="profile-editorial-card profile-editorial-facts">
          <h2>Sobre mim</h2>
          <dl>
            <div><dt>Altura</dt><dd>${p.height}</dd></div>
            <div><dt>Idade</dt><dd>${p.age}</dd></div>
            <div><dt>Apelidos</dt><dd>${p.nicknames}</dd></div>
            <div><dt>Futura profissão</dt><dd>${p.futureProfession}</dd></div>
          </dl>
        </article>

        <article class="profile-editorial-card profile-editorial-skills">
          <h2>Habilidades</h2>
          ${p.skills.map(([label,value])=>`
            <div class="editorial-skill">
              <div><span>${label}</span><strong>${value}%</strong></div>
              <span class="editorial-skill-track"><i style="width:${value}%"></i></span>
            </div>`).join("")}
        </article>

        

      <div class="profile-bottom-nav">
        <a href="#/perfis" class="pixel-button pixel-button-secondary">← VER A TURMA</a>
        <span>HUB PESCAR · PERFIL INDIVIDUAL</span>
      </div>
    </main>
  </div>`;
}

function notFound() {
  return `<main class="not-found-page">
    <h1>PERFIL NÃO ENCONTRADO</h1>
    <a href="#" class="pixel-button pixel-button-primary">VOLTAR PARA A TURMA</a>
  </main>`;
}

function render() {
  const hash = location.hash || "#";
  const match = hash.match(/^#\/perfis\/(.+)$/);
  if (match) {
    const p = PROFILES.find(x => x.id === decodeURIComponent(match[1]));
    root.innerHTML = p ? profilePage(p) : notFound();
    window.scrollTo(0,0);
    return;
  }
  root.innerHTML = homePage();
  bindHome();
}

function setCarousel(next) {
  carouselIndex = (next + PHOTOS.length) % PHOTOS.length;
  document.querySelectorAll(".hero-photo").forEach((img,i)=>img.classList.toggle("is-active",i===carouselIndex));
  document.querySelectorAll(".carousel-dot").forEach((dot,i)=>dot.classList.toggle("is-active",i===carouselIndex));
  const counter = document.querySelector(".carousel-counter");
  if (counter) counter.textContent = `0${carouselIndex+1} / 0${PHOTOS.length}`;
}

function bindHome() {
  document.querySelectorAll("[data-carousel]").forEach(btn => {
    btn.addEventListener("click", () => {
      const value = Number(btn.dataset.carousel);
      setCarousel(btn.classList.contains("carousel-dot") ? value : carouselIndex + value);
      restartCarousel();
    });
  });
  document.querySelectorAll("[data-home]").forEach(a => a.addEventListener("click", e => {
    if (location.hash !== "#") { e.preventDefault(); location.hash = "#"; }
  }));
  restartCarousel();
}

function restartCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => setCarousel(carouselIndex + 1), 5200);
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);
