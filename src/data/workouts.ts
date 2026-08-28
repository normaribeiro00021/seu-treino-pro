export type Difficulty = "Iniciante" | "Intermediário" | "Avançado";

export interface WorkoutExercise {
  id: string;
  /** Slug do exercício na tabela public.exercises do Supabase. */
  exerciseSlug: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  restSeconds: number;
  previousWeight: number;
  notes?: string;
  technique?: string;
}

export interface Workout {
  id: string;
  name: string;
  focus: string;
  description: string;
  level: Difficulty;
  estimatedMinutes: number;
  exercises: WorkoutExercise[];
}

const we = (
  id: string,
  exerciseSlug: string,
  sets: number,
  repsMin: number,
  repsMax: number,
  restSeconds: number,
  previousWeight: number,
  notes?: string,
): WorkoutExercise => ({
  id,
  exerciseSlug,
  sets,
  repsMin,
  repsMax,
  restSeconds,
  previousWeight,
  ...(notes ? { notes } : {}),
});

export const workouts: Workout[] = [
  {
    id: "w-a",
    name: "Treino A",
    focus: "Peito + Tríceps",
    description: "Força e volume para peitoral com finalização de tríceps.",
    level: "Intermediário",
    estimatedMinutes: 52,
    exercises: [
      we("wa-1", "supino-reto-com-barra", 4, 8, 10, 120, 60, "Progrida 2,5 kg quando fechar 10 reps."),
      we("wa-2", "supino-inclinado-com-halteres", 3, 10, 12, 90, 22),
      we("wa-3", "crucifixo-na-maquina", 3, 12, 15, 60, 35),
      we("wa-4", "flexao-de-braco", 3, 12, 20, 60, 0),
      we("wa-5", "triceps-na-polia-com-corda", 3, 12, 15, 60, 30),
      we("wa-6", "triceps-testa-com-barra-w", 3, 10, 12, 75, 25),
      we("wa-7", "prancha-abdominal", 3, 30, 45, 45, 0, "Tempo em segundos."),
    ],
  },
  {
    id: "w-b",
    name: "Treino B",
    focus: "Costas + Bíceps",
    description: "Puxadas e remadas com foco em amplitude e controle.",
    level: "Intermediário",
    estimatedMinutes: 55,
    exercises: [
      we("wb-1", "puxada-frontal-na-polia", 3, 10, 12, 90, 55, "Segure 1s na contração."),
      we("wb-2", "remada-curvada-com-barra", 4, 8, 10, 120, 50),
      we("wb-3", "remada-baixa-no-cabo", 3, 10, 12, 90, 45),
      we("wb-4", "face-pull-com-elastico", 3, 15, 20, 45, 0),
      we("wb-5", "rosca-direta-com-barra", 3, 10, 12, 75, 25),
      we("wb-6", "rosca-martelo-com-halteres", 3, 10, 12, 60, 14),
      we("wb-7", "abdominal-no-cabo", 3, 12, 15, 45, 25),
      we("wb-8", "prancha-abdominal", 3, 30, 45, 45, 0, "Tempo em segundos."),
    ],
  },
  {
    id: "w-c",
    name: "Treino C",
    focus: "Pernas",
    description: "Membros inferiores completos, quadríceps e posterior.",
    level: "Intermediário",
    estimatedMinutes: 58,
    exercises: [
      we("wc-1", "agachamento-livre", 4, 6, 8, 150, 70),
      we("wc-2", "leg-press-45", 4, 10, 12, 120, 180),
      we("wc-3", "stiff-com-barra", 3, 10, 12, 90, 40),
      we("wc-4", "cadeira-extensora", 3, 12, 15, 60, 45),
      we("wc-5", "afundo-com-halteres", 3, 10, 12, 75, 16),
      we("wc-6", "elevacao-de-quadril-com-barra", 3, 10, 12, 90, 50),
    ],
  },
  {
    id: "w-d",
    name: "Treino D",
    focus: "Ombros + Braços",
    description: "Ombros com trabalho direto de bíceps e tríceps.",
    level: "Intermediário",
    estimatedMinutes: 48,
    exercises: [
      we("wd-1", "desenvolvimento-com-halteres", 4, 8, 10, 105, 20),
      we("wd-2", "elevacao-lateral", 4, 12, 15, 60, 10),
      we("wd-3", "face-pull-com-elastico", 3, 15, 20, 45, 0),
      we("wd-4", "rosca-direta-com-barra", 3, 10, 12, 75, 25),
      we("wd-5", "triceps-na-polia-com-corda", 3, 12, 15, 60, 30),
      we("wd-6", "rosca-martelo-com-halteres", 3, 10, 12, 60, 14),
    ],
  },
];

export const getWorkout = (id: string) => workouts.find((w) => w.id === id);

export type DayStatus = "concluido" | "hoje" | "futuro" | "descanso";

export interface WeekDay {
  day: string;
  shortDay: string;
  workoutId: string | null;
  status: DayStatus;
}

export const weekPlan: WeekDay[] = [
  { day: "Segunda", shortDay: "SEG", workoutId: "w-a", status: "concluido" },
  { day: "Terça", shortDay: "TER", workoutId: "w-b", status: "hoje" },
  { day: "Quarta", shortDay: "QUA", workoutId: null, status: "descanso" },
  { day: "Quinta", shortDay: "QUI", workoutId: "w-c", status: "futuro" },
  { day: "Sexta", shortDay: "SEX", workoutId: "w-d", status: "futuro" },
  { day: "Sábado", shortDay: "SÁB", workoutId: null, status: "descanso" },
  { day: "Domingo", shortDay: "DOM", workoutId: null, status: "descanso" },
];

export interface Program {
  id: string;
  name: string;
  description: string;
  goal: string;
  level: Difficulty;
  durationWeeks: number;
  workoutsCount: number;
  accent: "lime" | "flame" | "cool";
}

export const programs: Program[] = [
  {
    id: "p-1",
    name: "Bumbum na Nuca",
    description: "Foco em glúteos e pernas.",
    goal: "Glúteos",
    level: "Intermediário",
    durationWeeks: 8,
    workoutsCount: 24,
    accent: "lime",
  },
  {
    id: "p-2",
    name: "Pernas Turbinadas",
    description: "Foco completo em membros inferiores.",
    goal: "Pernas",
    level: "Avançado",
    durationWeeks: 6,
    workoutsCount: 18,
    accent: "flame",
  },
  {
    id: "p-3",
    name: "Superiores",
    description: "Peito, costas, braços e ombros.",
    goal: "Superiores",
    level: "Intermediário",
    durationWeeks: 8,
    workoutsCount: 32,
    accent: "cool",
  },
  {
    id: "p-4",
    name: "Mobilidade Total",
    description: "Mobilidade e amplitude de movimento.",
    goal: "Mobilidade",
    level: "Iniciante",
    durationWeeks: 4,
    workoutsCount: 12,
    accent: "lime",
  },
  {
    id: "p-5",
    name: "Alongamento",
    description: "Rotinas guiadas.",
    goal: "Recuperação",
    level: "Iniciante",
    durationWeeks: 4,
    workoutsCount: 16,
    accent: "cool",
  },
  {
    id: "p-6",
    name: "Treino em Casa",
    description: "Treinos sem academia.",
    goal: "Condicionamento",
    level: "Iniciante",
    durationWeeks: 6,
    workoutsCount: 18,
    accent: "flame",
  },
];

export const weekSummary = {
  workoutsDone: 3,
  workoutsTarget: 5,
  minutes: 158,
  volumeKg: 21480,
  streakDays: 6,
};

export const lastSession = {
  workoutId: "w-a",
  date: "24/08",
};

export const frequencyData = [
  { week: "S1", treinos: 3 },
  { week: "S2", treinos: 4 },
  { week: "S3", treinos: 4 },
  { week: "S4", treinos: 5 },
  { week: "S5", treinos: 3 },
  { week: "S6", treinos: 5 },
];

export const volumeData = [
  { week: "S1", volume: 14200 },
  { week: "S2", volume: 16800 },
  { week: "S3", volume: 18400 },
  { week: "S4", volume: 21480 },
  { week: "S5", volume: 19600 },
  { week: "S6", volume: 23100 },
];

export const loadProgression = [
  { week: "Semana 1", carga: 40 },
  { week: "Semana 2", carga: 42.5 },
  { week: "Semana 3", carga: 45 },
  { week: "Semana 4", carga: 47.5 },
];

export const personalRecords = [
  { exercise: "Supino reto", weight: 60, date: "22/08" },
  { exercise: "Agachamento", weight: 90, date: "19/08" },
  { exercise: "Leg press", weight: 180, date: "19/08" },
  { exercise: "Remada curvada", weight: 62.5, date: "13/08" },
];

export const measurementHistory = [
  { date: "01/07", peso: 82.4, cintura: 88, abdomen: 92, braco: 35, coxa: 58, quadril: 100 },
  { date: "15/07", peso: 81.6, cintura: 87, abdomen: 91, braco: 35.5, coxa: 58.5, quadril: 100 },
  { date: "01/08", peso: 80.9, cintura: 86, abdomen: 89.5, braco: 36, coxa: 59, quadril: 99 },
  { date: "20/08", peso: 80.1, cintura: 84.5, abdomen: 88, braco: 36.5, coxa: 59.5, quadril: 99 },
];
