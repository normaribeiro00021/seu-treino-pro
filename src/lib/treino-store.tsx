import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface OnboardingAnswers {
  goal?: string;
  location?: string;
  daysPerWeek?: string;
  duration?: string;
  level?: string;
}

export interface SetLog {
  weight: number;
  reps: number;
}

export interface SessionState {
  workoutId: string;
  startedAt: number;
  /** exerciseId -> array of logged sets */
  logs: Record<string, SetLog[]>;
}

export interface FinishedSession {
  workoutId: string;
  exercises: number;
  sets: number;
  minutes: number;
  volume: number;
  record: { exercise: string; weight: number } | null;
}

interface TreinoState {
  profile: { name: string; onboarded: boolean } & OnboardingAnswers;
  favorites: string[];
  session: SessionState | null;
  lastFinished: FinishedSession | null;
}

const STORAGE_KEY = "treino-state-v1";

const initialState: TreinoState = {
  profile: {
    name: "Tarso",
    onboarded: false,
    goal: "Ganhar massa muscular",
    location: "Academia",
    daysPerWeek: "5",
    duration: "45–60 minutos",
    level: "Intermediário",
  },
  favorites: ["ex-6", "ex-1"],
  session: null,
  lastFinished: null,
};

interface Ctx extends TreinoState {
  setProfile: (patch: Partial<TreinoState["profile"]>) => void;
  toggleFavorite: (exerciseId: string) => void;
  isFavorite: (exerciseId: string) => boolean;
  startSession: (workoutId: string) => void;
  logSet: (exerciseId: string, set: SetLog) => void;
  undoSet: (exerciseId: string) => void;
  finishSession: (summary: FinishedSession) => void;
  clearSession: () => void;
}

const TreinoContext = createContext<Ctx | null>(null);

export function TreinoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TreinoState>(initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as TreinoState) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const setProfile = useCallback((patch: Partial<TreinoState["profile"]>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const toggleFavorite = useCallback((exerciseId: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(exerciseId)
        ? s.favorites.filter((f) => f !== exerciseId)
        : [...s.favorites, exerciseId],
    }));
  }, []);

  const startSession = useCallback((workoutId: string) => {
    setState((s) =>
      s.session?.workoutId === workoutId
        ? s
        : { ...s, session: { workoutId, startedAt: Date.now(), logs: {} } },
    );
  }, []);

  const logSet = useCallback((exerciseId: string, set: SetLog) => {
    setState((s) => {
      if (!s.session) return s;
      const current = s.session.logs[exerciseId] ?? [];
      return {
        ...s,
        session: {
          ...s.session,
          logs: { ...s.session.logs, [exerciseId]: [...current, set] },
        },
      };
    });
  }, []);

  const undoSet = useCallback((exerciseId: string) => {
    setState((s) => {
      if (!s.session) return s;
      const current = s.session.logs[exerciseId] ?? [];
      return {
        ...s,
        session: {
          ...s.session,
          logs: { ...s.session.logs, [exerciseId]: current.slice(0, -1) },
        },
      };
    });
  }, []);

  const finishSession = useCallback((summary: FinishedSession) => {
    setState((s) => ({ ...s, session: null, lastFinished: summary }));
  }, []);

  const clearSession = useCallback(() => setState((s) => ({ ...s, session: null })), []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      setProfile,
      toggleFavorite,
      isFavorite: (id: string) => state.favorites.includes(id),
      startSession,
      logSet,
      undoSet,
      finishSession,
      clearSession,
    }),
    [state, setProfile, toggleFavorite, startSession, logSet, undoSet, finishSession, clearSession],
  );

  return <TreinoContext.Provider value={value}>{children}</TreinoContext.Provider>;
}

export function useTreino() {
  const ctx = useContext(TreinoContext);
  if (!ctx) throw new Error("useTreino deve ser usado dentro de TreinoProvider");
  return ctx;
}
