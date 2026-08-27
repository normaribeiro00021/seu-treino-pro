export type MuscleGroup =
  | "Peito"
  | "Costas"
  | "Ombros"
  | "Bíceps"
  | "Tríceps"
  | "Pernas"
  | "Glúteos"
  | "Abdômen";

export type Equipment =
  | "Halteres"
  | "Barra"
  | "Máquina"
  | "Cabo"
  | "Smith"
  | "Peso corporal"
  | "Elástico"
  | "Kettlebell";

export type Difficulty = "Iniciante" | "Intermediário" | "Avançado";

export interface Exercise {
  id: string;
  slug: string;
  name: string;
  muscleGroup: MuscleGroup;
  targetMuscle: string;
  secondaryMuscles: string[];
  equipment: Equipment;
  difficulty: Difficulty;
  instructions: string[];
  commonMistakes: string[];
}

export const EQUIPMENT_OPTIONS: Equipment[] = [
  "Halteres",
  "Barra",
  "Máquina",
  "Cabo",
  "Smith",
  "Peso corporal",
  "Elástico",
  "Kettlebell",
];

export const MUSCLE_GROUPS: MuscleGroup[] = [
  "Peito",
  "Costas",
  "Ombros",
  "Bíceps",
  "Tríceps",
  "Pernas",
  "Glúteos",
  "Abdômen",
];

export const DIFFICULTIES: Difficulty[] = ["Iniciante", "Intermediário", "Avançado"];

export const exercises: Exercise[] = [
  {
    id: "ex-1",
    slug: "puxada-frontal-na-polia",
    name: "Puxada frontal na polia",
    muscleGroup: "Costas",
    targetMuscle: "Dorsal",
    secondaryMuscles: ["Bíceps", "Trapézio"],
    equipment: "Cabo",
    difficulty: "Iniciante",
    instructions: [
      "Ajuste o banco e segure a barra.",
      "Mantenha o peito aberto.",
      "Puxe a barra em direção à parte superior do peito.",
      "Controle a volta.",
      "Evite impulsionar o tronco.",
    ],
    commonMistakes: [
      "Jogar o corpo para trás",
      "Puxar apenas com os braços",
      "Perder o controle na fase excêntrica",
      "Utilizar carga excessiva",
    ],
  },
  {
    id: "ex-2",
    slug: "remada-curvada-com-barra",
    name: "Remada curvada com barra",
    muscleGroup: "Costas",
    targetMuscle: "Dorsal",
    secondaryMuscles: ["Trapézio", "Bíceps", "Lombar"],
    equipment: "Barra",
    difficulty: "Intermediário",
    instructions: [
      "Segure a barra com pegada pronada na largura dos ombros.",
      "Inclineo tronco cerca de 45° com a coluna neutra.",
      "Puxe a barra em direção ao abdômen.",
      "Aperte as escápulas no topo do movimento.",
      "Desça de forma controlada.",
    ],
    commonMistakes: [
      "Arredondar a lombar",
      "Usar impulso das pernas",
      "Amplitude curta",
      "Elevar os ombros",
    ],
  },
  {
    id: "ex-3",
    slug: "remada-baixa-no-cabo",
    name: "Remada baixa no cabo",
    muscleGroup: "Costas",
    targetMuscle: "Dorsal",
    secondaryMuscles: ["Bíceps", "Trapézio"],
    equipment: "Cabo",
    difficulty: "Iniciante",
    instructions: [
      "Sente-se com os pés apoiados e joelhos levemente flexionados.",
      "Mantenha o tronco ereto.",
      "Puxe o triângulo em direção ao abdômen.",
      "Controle o retorno sem deixar o peso bater.",
    ],
    commonMistakes: ["Balançar o tronco", "Encurtar a amplitude", "Puxar com os ombros elevados"],
  },
  {
    id: "ex-4",
    slug: "rosca-direta-com-barra",
    name: "Rosca direta com barra",
    muscleGroup: "Bíceps",
    targetMuscle: "Bíceps braquial",
    secondaryMuscles: ["Antebraço"],
    equipment: "Barra",
    difficulty: "Iniciante",
    instructions: [
      "Fique em pé com a barra em pegada supinada.",
      "Mantenha os cotovelos junto ao tronco.",
      "Flexione os cotovelos até a contração máxima.",
      "Desça controlando o movimento.",
    ],
    commonMistakes: ["Balançar o corpo", "Abrir os cotovelos", "Descer rápido demais"],
  },
  {
    id: "ex-5",
    slug: "rosca-martelo-com-halteres",
    name: "Rosca martelo com halteres",
    muscleGroup: "Bíceps",
    targetMuscle: "Braquial",
    secondaryMuscles: ["Bíceps", "Antebraço"],
    equipment: "Halteres",
    difficulty: "Iniciante",
    instructions: [
      "Segure os halteres com pegada neutra.",
      "Suba um lado por vez ou os dois juntos.",
      "Evite girar os punhos.",
      "Controle a descida.",
    ],
    commonMistakes: ["Usar impulso do tronco", "Amplitude parcial"],
  },
  {
    id: "ex-6",
    slug: "supino-reto-com-barra",
    name: "Supino reto com barra",
    muscleGroup: "Peito",
    targetMuscle: "Peitoral maior",
    secondaryMuscles: ["Tríceps", "Ombro anterior"],
    equipment: "Barra",
    difficulty: "Intermediário",
    instructions: [
      "Deite no banco com os pés firmes no chão.",
      "Segure a barra pouco mais aberto que os ombros.",
      "Desça a barra até a linha do meio do peito.",
      "Empurre mantendo as escápulas retraídas.",
    ],
    commonMistakes: ["Quicar a barra no peito", "Levantar o quadril", "Abrir demais os cotovelos"],
  },
  {
    id: "ex-7",
    slug: "supino-inclinado-com-halteres",
    name: "Supino inclinado com halteres",
    muscleGroup: "Peito",
    targetMuscle: "Peitoral superior",
    secondaryMuscles: ["Ombro anterior", "Tríceps"],
    equipment: "Halteres",
    difficulty: "Intermediário",
    instructions: [
      "Ajuste o banco entre 30° e 45°.",
      "Desça os halteres controlando a amplitude.",
      "Empurre até quase estender os cotovelos.",
    ],
    commonMistakes: ["Inclinação excessiva do banco", "Bater os halteres no topo"],
  },
  {
    id: "ex-8",
    slug: "crucifixo-na-maquina",
    name: "Crucifixo na máquina",
    muscleGroup: "Peito",
    targetMuscle: "Peitoral maior",
    secondaryMuscles: ["Ombro anterior"],
    equipment: "Máquina",
    difficulty: "Iniciante",
    instructions: [
      "Ajuste o assento na altura do peito.",
      "Junte os braços com leve flexão dos cotovelos.",
      "Segure a contração por um instante.",
    ],
    commonMistakes: ["Encolher os ombros", "Usar carga excessiva"],
  },
  {
    id: "ex-9",
    slug: "triceps-na-polia-com-corda",
    name: "Tríceps na polia com corda",
    muscleGroup: "Tríceps",
    targetMuscle: "Tríceps braquial",
    secondaryMuscles: ["Antebraço"],
    equipment: "Cabo",
    difficulty: "Iniciante",
    instructions: [
      "Mantenha os cotovelos fixos ao lado do corpo.",
      "Estenda até abrir a corda no final.",
      "Retorne controlando.",
    ],
    commonMistakes: ["Mover os cotovelos", "Inclinar o tronco em excesso"],
  },
  {
    id: "ex-10",
    slug: "triceps-testa-com-barra-w",
    name: "Tríceps testa com barra W",
    muscleGroup: "Tríceps",
    targetMuscle: "Tríceps braquial",
    secondaryMuscles: ["Antebraço"],
    equipment: "Barra",
    difficulty: "Intermediário",
    instructions: [
      "Deite no banco com a barra acima da testa.",
      "Flexione apenas os cotovelos.",
      "Estenda sem travar bruscamente.",
    ],
    commonMistakes: ["Abrir os cotovelos", "Descer rápido"],
  },
  {
    id: "ex-11",
    slug: "agachamento-livre",
    name: "Agachamento livre",
    muscleGroup: "Pernas",
    targetMuscle: "Quadríceps",
    secondaryMuscles: ["Glúteos", "Posterior", "Core"],
    equipment: "Barra",
    difficulty: "Avançado",
    instructions: [
      "Apoie a barra no trapézio.",
      "Pés na largura dos ombros, pontas levemente para fora.",
      "Desça controlando até a profundidade confortável.",
      "Suba empurrando o chão.",
    ],
    commonMistakes: [
      "Joelhos colapsando para dentro",
      "Perder a neutralidade da coluna",
      "Subir com o quadril primeiro",
    ],
  },
  {
    id: "ex-12",
    slug: "leg-press-45",
    name: "Leg press 45°",
    muscleGroup: "Pernas",
    targetMuscle: "Quadríceps",
    secondaryMuscles: ["Glúteos"],
    equipment: "Máquina",
    difficulty: "Iniciante",
    instructions: [
      "Apoie os pés na plataforma.",
      "Desça até 90° sem tirar o quadril do apoio.",
      "Empurre sem travar os joelhos.",
    ],
    commonMistakes: ["Descolar a lombar", "Amplitude excessiva sem controle"],
  },
  {
    id: "ex-13",
    slug: "cadeira-extensora",
    name: "Cadeira extensora",
    muscleGroup: "Pernas",
    targetMuscle: "Quadríceps",
    secondaryMuscles: [],
    equipment: "Máquina",
    difficulty: "Iniciante",
    instructions: ["Ajuste o encosto e o rolo.", "Estenda os joelhos.", "Volte controlando."],
    commonMistakes: ["Impulsionar o tronco", "Soltar o peso na volta"],
  },
  {
    id: "ex-14",
    slug: "stiff-com-barra",
    name: "Stiff com barra",
    muscleGroup: "Pernas",
    targetMuscle: "Posterior de coxa",
    secondaryMuscles: ["Glúteos", "Lombar"],
    equipment: "Barra",
    difficulty: "Intermediário",
    instructions: [
      "Segure a barra com os joelhos levemente flexionados.",
      "Empurre o quadril para trás descendo a barra.",
      "Suba contraindo glúteos e posterior.",
    ],
    commonMistakes: ["Arredondar a lombar", "Flexionar muito os joelhos"],
  },
  {
    id: "ex-15",
    slug: "elevacao-de-quadril-com-barra",
    name: "Elevação de quadril com barra",
    muscleGroup: "Glúteos",
    targetMuscle: "Glúteo máximo",
    secondaryMuscles: ["Posterior de coxa"],
    equipment: "Barra",
    difficulty: "Intermediário",
    instructions: [
      "Apoie as escápulas no banco.",
      "Suba o quadril até a linha do tronco.",
      "Contraia o glúteo no topo por 1 segundo.",
    ],
    commonMistakes: ["Hiperextender a lombar", "Amplitude curta"],
  },
  {
    id: "ex-16",
    slug: "coice-no-cabo",
    name: "Coice no cabo",
    muscleGroup: "Glúteos",
    targetMuscle: "Glúteo máximo",
    secondaryMuscles: ["Posterior de coxa"],
    equipment: "Cabo",
    difficulty: "Iniciante",
    instructions: [
      "Mantenha o tronco estável.",
      "Estenda o quadril para trás.",
      "Volte sem relaxar totalmente.",
    ],
    commonMistakes: ["Girar o quadril", "Usar impulso"],
  },
  {
    id: "ex-17",
    slug: "desenvolvimento-com-halteres",
    name: "Desenvolvimento com halteres",
    muscleGroup: "Ombros",
    targetMuscle: "Deltoide anterior",
    secondaryMuscles: ["Tríceps", "Deltoide lateral"],
    equipment: "Halteres",
    difficulty: "Intermediário",
    instructions: [
      "Sente com o tronco apoiado.",
      "Empurre os halteres acima da cabeça.",
      "Desça até a linha das orelhas.",
    ],
    commonMistakes: ["Arquear a lombar", "Travar os cotovelos com impacto"],
  },
  {
    id: "ex-18",
    slug: "elevacao-lateral",
    name: "Elevação lateral",
    muscleGroup: "Ombros",
    targetMuscle: "Deltoide lateral",
    secondaryMuscles: ["Trapézio"],
    equipment: "Halteres",
    difficulty: "Iniciante",
    instructions: [
      "Braços levemente flexionados.",
      "Eleve até a linha dos ombros.",
      "Desça devagar.",
    ],
    commonMistakes: ["Usar impulso", "Elevar acima da linha dos ombros com trapézio"],
  },
  {
    id: "ex-19",
    slug: "prancha-abdominal",
    name: "Prancha abdominal",
    muscleGroup: "Abdômen",
    targetMuscle: "Core",
    secondaryMuscles: ["Ombros", "Glúteos"],
    equipment: "Peso corporal",
    difficulty: "Iniciante",
    instructions: [
      "Apoie antebraços e pontas dos pés.",
      "Alinhe cabeça, tronco e quadril.",
      "Contraia abdômen e glúteos.",
    ],
    commonMistakes: ["Elevar o quadril", "Deixar a lombar cair"],
  },
  {
    id: "ex-20",
    slug: "abdominal-no-cabo",
    name: "Abdominal no cabo",
    muscleGroup: "Abdômen",
    targetMuscle: "Reto abdominal",
    secondaryMuscles: ["Oblíquos"],
    equipment: "Cabo",
    difficulty: "Intermediário",
    instructions: ["Ajoelhe de frente à polia.", "Flexione o tronco.", "Retorne controlando."],
    commonMistakes: ["Puxar com os braços", "Usar o quadril"],
  },
  {
    id: "ex-21",
    slug: "afundo-com-halteres",
    name: "Afundo com halteres",
    muscleGroup: "Pernas",
    targetMuscle: "Quadríceps",
    secondaryMuscles: ["Glúteos", "Core"],
    equipment: "Halteres",
    difficulty: "Intermediário",
    instructions: ["Dê um passo à frente.", "Desça o joelho de trás.", "Suba empurrando o chão."],
    commonMistakes: ["Passo curto", "Joelho instável"],
  },
  {
    id: "ex-22",
    slug: "flexao-de-braco",
    name: "Flexão de braço",
    muscleGroup: "Peito",
    targetMuscle: "Peitoral maior",
    secondaryMuscles: ["Tríceps", "Core"],
    equipment: "Peso corporal",
    difficulty: "Iniciante",
    instructions: ["Mãos na largura do peito.", "Corpo em linha reta.", "Desça até quase o chão."],
    commonMistakes: ["Quadril caído", "Amplitude curta"],
  },
  {
    id: "ex-23",
    slug: "swing-com-kettlebell",
    name: "Swing com kettlebell",
    muscleGroup: "Glúteos",
    targetMuscle: "Glúteos",
    secondaryMuscles: ["Posterior de coxa", "Core"],
    equipment: "Kettlebell",
    difficulty: "Intermediário",
    instructions: [
      "Empurre o quadril para trás.",
      "Projete o kettlebell com o quadril.",
      "Mantenha o core firme.",
    ],
    commonMistakes: ["Agachar em vez de dobrar o quadril", "Usar só os braços"],
  },
  {
    id: "ex-24",
    slug: "face-pull-com-elastico",
    name: "Face pull com elástico",
    muscleGroup: "Ombros",
    targetMuscle: "Deltoide posterior",
    secondaryMuscles: ["Trapézio", "Rotadores"],
    equipment: "Elástico",
    difficulty: "Iniciante",
    instructions: [
      "Puxe o elástico na altura do rosto.",
      "Abra os cotovelos.",
      "Contraia as escápulas.",
    ],
    commonMistakes: ["Puxar muito baixo", "Elevar os ombros"],
  },
  {
    id: "ex-25",
    slug: "agachamento-no-smith",
    name: "Agachamento no Smith",
    muscleGroup: "Pernas",
    targetMuscle: "Quadríceps",
    secondaryMuscles: ["Glúteos"],
    equipment: "Smith",
    difficulty: "Iniciante",
    instructions: [
      "Posicione os pés à frente da barra.",
      "Desça controlando até 90°.",
      "Suba sem travar os joelhos.",
    ],
    commonMistakes: ["Pés mal posicionados", "Descer rápido"],
  },
];

export const getExerciseBySlug = (slug: string) => exercises.find((e) => e.slug === slug);
export const getExerciseById = (id: string) => exercises.find((e) => e.id === id);
