const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day."

const storyTextAlternativo = "Em um dia comum, os alunos :insertx: estavam se preparando para a prova de :inserty: do(a) tão temido(a) e maldoso(a) professor(a) :insertz:. A prova estava incrivelmente :insertp: e aconteceu de os alunos tirarem todos notas :insertq:. O(a) malvado(a) professor(a) ficou tão :insertg: que decidiu :insertj:. Mas, no final, todos os alunos :insertb:."

const insertX = [
    "de graduação",
    "de mestrado",
    "de doutorado",
    "do webacademy",
    "do(a) professor(a) :insertz:"
];

const insertY = [
    "Introdução à Computação",
    "Matemática Discreta",
    "Seminários em Computação",
    "Textos Técnicos",
    "Linguagens Formais e Autômatos",
    "Sistemas Operacionais",
    "Computação Numérica",
    "Técnicas Avançadas de Programação",
    "Redes de Computadores",
    "Arquitetura de Computadores",
    "Paradigma de Linguagens de Programação",
    "Organização de Computadores",
    "Metodologia de Científica",
    "Algoritmo de Estrutura de Dados",
    "Programação para Web",
    "Projeto e Análise de Algoritmos",
    "Sistemas Lógicos",
    "Experiência Criativa",
    "Banco de Dados",
    "Introdução à Engenharia de Software",
    "Laboratório de Programação Avançada",
    "Compiladores",
    "Análise e Projeto de Sistemas",
    "Introdução à Computação Gráfica",
    "Introdução à Teoria dos Grafos",
    "Inteligência Artificial",
    "Interação Humano-computador",
    "Sistemas Distribuídos",
    "Informática, Ética e Sociedade"
];

const insertZ = [
    "Alberto Nogueira",
    "Alexandre Passito a Passito",
    "Altigran",
    "Ana Carolina",
    "André Luiz",
    "Bruno Freitas",
    "César",
    "David",
    "Edjair",
    "Edjard",
    "Eulanda",
    "Edleno",
    "Edson",
    "Eduardo Nakamura",
    "Souto",
    "Eduardo Feitosa",
    "Elaine",
    "Fabíola Nakamura",
    "Horácio",
    "João Bastos",
    "José Netto",
    "Pio",
    "Reginaldo",
    "Juan Colonna",
    "Leandro",
    "Moisés",
    "Barreto",
    "Rosiane",
    "Ruiter",
    "Tanara",
    "Tayana",
];

const insertP = [
    "fácil",
    "difícil",
    "impossível",
    "chata",
    "legal",
    "interessante",
    "desinteressante",
    "incrível",
];

const insertQ = [
    "boas",
    "ruins",
    "péssimas",
    "excelentes",
    "maravilhosas",
    "incríveis",
    "fantásticas",
    "horríveis"
]

const insertG = [
    "feliz",
    "triste",
    "irritado",
    "desesperado",
    "animado",
    "desanimado",
    "incrédulo",
    "surpreso",
    "incrivelmente feliz",
    "incrivelmente triste",
    "incrivelmente irritado",
    "incrivelmente desesperado",
    "incrivelmente animado",
    "incrivelmente desanimado"
];

const insertJ = [
    "dar um mortal no ar e gritar 'Eu sou o melhor professor do mundo!'",
    "dar uma prova de recuperação valendo :number:",
    "dar uma aula inteira imitando uma galinha com depressão",
    "fazer uma serenata romântica pro próprio reflexo no projetor",
    "gravar um TikTok dançando 'Macarena' em latim",
    "fazer um bolo feito com lágrimas de alunos",
    "entregar um certificado de burrice em papel vegetal perfumado",
    "mostrar um vídeo de 10 horas de 'Despacito' tocando em loop",
]

const insertB = [
    "foram parar no grupo de terapia da faculdade",
    "foram embora correndo, gritando 'nunca mais!'",
    "aceitaram seu destino e começaram a cursar Arquitetura",
    "largaram tudo e abriram uma barraca de açaí",
    "viraram youtubers de culinária",
    "começaram a fazer :number: agachamentos na frente do professor",
    "comemoraram com um bolo de chocolate",
    "fizeram uma festa de formatura antecipada",
    "perguntaram se o professor era um alienígena disfarçado",
    "decidiram fazer uma greve de fome até o professor se demitir",
]

randomize.addEventListener('click', result);

function result() {
    let newStory = storyTextAlternativo;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const pItem = randomValueFromArray(insertP);
    const qItem = randomValueFromArray(insertQ);
    const gItem = randomValueFromArray(insertG);
    const jItem = randomValueFromArray(insertJ);
    const bItem = randomValueFromArray(insertB);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replaceAll(":inserty:", yItem);
    while (newStory.includes(":insertz:")) {
        const zItem = randomValueFromArray(insertZ);
        newStory = newStory.replace(":insertz:", zItem);
    }
    newStory = newStory.replaceAll(":insertp:", pItem);
    newStory = newStory.replaceAll(":insertq:", qItem);
    newStory = newStory.replaceAll(":insertg:", gItem);
    newStory = newStory.replaceAll(":insertj:", jItem);
    newStory = newStory.replaceAll(":insertb:", bItem);
    while (newStory.includes(":number:")) {
        newStory = newStory.replace(":number:", Math.floor(Math.random() * 100));
    }

    // if(customName.value !== '') {
    //     const name = customName.value;
    //     newStory = newStory.replace("Bob", name);
    // }
  
    // if(document.getElementById("uk").checked) {
    //     const weight = Math.round(300 * 0.0714286);
    //     const temperature =  Math.round((94 - 32) * 5/9);

    //     newStory = newStory.replace("300 pounds", weight + " stone");
    //     newStory = newStory.replace("94 fahrenheit", temperature + " centigrade");
    // }
  
    story.textContent = newStory;
    story.style.visibility = 'visible';
}