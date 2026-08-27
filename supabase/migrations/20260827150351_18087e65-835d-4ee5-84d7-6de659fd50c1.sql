CREATE TABLE public.exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  muscle_group text NOT NULL,
  target_muscle text NOT NULL,
  secondary_muscles text[] NOT NULL DEFAULT '{}',
  equipment text NOT NULL,
  difficulty text NOT NULL,
  instructions text[] NOT NULL DEFAULT '{}',
  common_mistakes text[] NOT NULL DEFAULT '{}',
  gif_url text,
  video_url text,
  thumbnail_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.exercises TO anon;
GRANT SELECT ON public.exercises TO authenticated;
GRANT ALL ON public.exercises TO service_role;

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercises are publicly readable" ON public.exercises FOR SELECT USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON public.exercises FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.exercises (name, slug, muscle_group, target_muscle, secondary_muscles, equipment, difficulty, instructions, common_mistakes) VALUES
('Puxada frontal na polia','puxada-frontal-na-polia','Costas','Dorsal',ARRAY['Bíceps','Trapézio']::text[],'Cabo','Iniciante',ARRAY['Ajuste o banco e segure a barra.','Mantenha o peito aberto.','Puxe a barra em direção à parte superior do peito.','Controle a volta.','Evite impulsionar o tronco.']::text[],ARRAY['Jogar o corpo para trás','Puxar apenas com os braços','Perder o controle na fase excêntrica','Utilizar carga excessiva']::text[]),
('Remada curvada com barra','remada-curvada-com-barra','Costas','Dorsal',ARRAY['Trapézio','Bíceps','Lombar']::text[],'Barra','Intermediário',ARRAY['Segure a barra com pegada pronada na largura dos ombros.','Incline o tronco cerca de 45° com a coluna neutra.','Puxe a barra em direção ao abdômen.','Aperte as escápulas no topo do movimento.','Desça de forma controlada.']::text[],ARRAY['Arredondar a lombar','Usar impulso das pernas','Amplitude curta','Elevar os ombros']::text[]),
('Remada baixa no cabo','remada-baixa-no-cabo','Costas','Dorsal',ARRAY['Bíceps','Trapézio']::text[],'Cabo','Iniciante',ARRAY['Sente-se com os pés apoiados e joelhos levemente flexionados.','Mantenha o tronco ereto.','Puxe o triângulo em direção ao abdômen.','Controle o retorno sem deixar o peso bater.']::text[],ARRAY['Balançar o tronco','Encurtar a amplitude','Puxar com os ombros elevados']::text[]),
('Rosca direta com barra','rosca-direta-com-barra','Bíceps','Bíceps braquial',ARRAY['Antebraço']::text[],'Barra','Iniciante',ARRAY['Fique em pé com a barra em pegada supinada.','Mantenha os cotovelos junto ao tronco.','Flexione os cotovelos até a contração máxima.','Desça controlando o movimento.']::text[],ARRAY['Balançar o corpo','Abrir os cotovelos','Descer rápido demais']::text[]),
('Rosca martelo com halteres','rosca-martelo-com-halteres','Bíceps','Braquial',ARRAY['Bíceps','Antebraço']::text[],'Halteres','Iniciante',ARRAY['Segure os halteres com pegada neutra.','Suba um lado por vez ou os dois juntos.','Evite girar os punhos.','Controle a descida.']::text[],ARRAY['Usar impulso do tronco','Amplitude parcial']::text[]),
('Supino reto com barra','supino-reto-com-barra','Peito','Peitoral maior',ARRAY['Tríceps','Ombro anterior']::text[],'Barra','Intermediário',ARRAY['Deite no banco com os pés firmes no chão.','Segure a barra pouco mais aberto que os ombros.','Desça a barra até a linha do meio do peito.','Empurre mantendo as escápulas retraídas.']::text[],ARRAY['Quicar a barra no peito','Levantar o quadril','Abrir demais os cotovelos']::text[]),
('Supino inclinado com halteres','supino-inclinado-com-halteres','Peito','Peitoral superior',ARRAY['Ombro anterior','Tríceps']::text[],'Halteres','Intermediário',ARRAY['Ajuste o banco entre 30° e 45°.','Desça os halteres controlando a amplitude.','Empurre até quase estender os cotovelos.']::text[],ARRAY['Inclinação excessiva do banco','Bater os halteres no topo']::text[]),
('Crucifixo na máquina','crucifixo-na-maquina','Peito','Peitoral maior',ARRAY['Ombro anterior']::text[],'Máquina','Iniciante',ARRAY['Ajuste o assento na altura do peito.','Junte os braços com leve flexão dos cotovelos.','Segure a contração por um instante.']::text[],ARRAY['Encolher os ombros','Usar carga excessiva']::text[]),
('Tríceps na polia com corda','triceps-na-polia-com-corda','Tríceps','Tríceps braquial',ARRAY['Antebraço']::text[],'Cabo','Iniciante',ARRAY['Mantenha os cotovelos fixos ao lado do corpo.','Estenda até abrir a corda no final.','Retorne controlando.']::text[],ARRAY['Mover os cotovelos','Inclinar o tronco em excesso']::text[]),
('Tríceps testa com barra W','triceps-testa-com-barra-w','Tríceps','Tríceps braquial',ARRAY['Antebraço']::text[],'Barra','Intermediário',ARRAY['Deite no banco com a barra acima da testa.','Flexione apenas os cotovelos.','Estenda sem travar bruscamente.']::text[],ARRAY['Abrir os cotovelos','Descer rápido']::text[]),
('Agachamento livre','agachamento-livre','Pernas','Quadríceps',ARRAY['Glúteos','Posterior','Core']::text[],'Barra','Avançado',ARRAY['Apoie a barra no trapézio.','Pés na largura dos ombros, pontas levemente para fora.','Desça controlando até a profundidade confortável.','Suba empurrando o chão.']::text[],ARRAY['Joelhos colapsando para dentro','Perder a neutralidade da coluna','Subir com o quadril primeiro']::text[]),
('Leg press 45°','leg-press-45','Pernas','Quadríceps',ARRAY['Glúteos']::text[],'Máquina','Iniciante',ARRAY['Apoie os pés na plataforma.','Desça até 90° sem tirar o quadril do apoio.','Empurre sem travar os joelhos.']::text[],ARRAY['Descolar a lombar','Amplitude excessiva sem controle']::text[]),
('Cadeira extensora','cadeira-extensora','Pernas','Quadríceps',ARRAY[]::text[],'Máquina','Iniciante',ARRAY['Ajuste o encosto e o rolo.','Estenda os joelhos.','Volte controlando.']::text[],ARRAY['Impulsionar o tronco','Soltar o peso na volta']::text[]),
('Stiff com barra','stiff-com-barra','Pernas','Posterior de coxa',ARRAY['Glúteos','Lombar']::text[],'Barra','Intermediário',ARRAY['Segure a barra com os joelhos levemente flexionados.','Empurre o quadril para trás descendo a barra.','Suba contraindo glúteos e posterior.']::text[],ARRAY['Arredondar a lombar','Flexionar muito os joelhos']::text[]),
('Elevação de quadril com barra','elevacao-de-quadril-com-barra','Glúteos','Glúteo máximo',ARRAY['Posterior de coxa']::text[],'Barra','Intermediário',ARRAY['Apoie as escápulas no banco.','Suba o quadril até a linha do tronco.','Contraia o glúteo no topo por 1 segundo.']::text[],ARRAY['Hiperextender a lombar','Amplitude curta']::text[]),
('Coice no cabo','coice-no-cabo','Glúteos','Glúteo máximo',ARRAY['Posterior de coxa']::text[],'Cabo','Iniciante',ARRAY['Mantenha o tronco estável.','Estenda o quadril para trás.','Volte sem relaxar totalmente.']::text[],ARRAY['Girar o quadril','Usar impulso']::text[]),
('Desenvolvimento com halteres','desenvolvimento-com-halteres','Ombros','Deltoide anterior',ARRAY['Tríceps','Deltoide lateral']::text[],'Halteres','Intermediário',ARRAY['Sente com o tronco apoiado.','Empurre os halteres acima da cabeça.','Desça até a linha das orelhas.']::text[],ARRAY['Arquear a lombar','Travar os cotovelos com impacto']::text[]),
('Elevação lateral','elevacao-lateral','Ombros','Deltoide lateral',ARRAY['Trapézio']::text[],'Halteres','Iniciante',ARRAY['Braços levemente flexionados.','Eleve até a linha dos ombros.','Desça devagar.']::text[],ARRAY['Usar impulso','Elevar acima da linha dos ombros com trapézio']::text[]),
('Prancha abdominal','prancha-abdominal','Abdômen','Core',ARRAY['Ombros','Glúteos']::text[],'Peso corporal','Iniciante',ARRAY['Apoie antebraços e pontas dos pés.','Alinhe cabeça, tronco e quadril.','Contraia abdômen e glúteos.']::text[],ARRAY['Elevar o quadril','Deixar a lombar cair']::text[]),
('Abdominal no cabo','abdominal-no-cabo','Abdômen','Reto abdominal',ARRAY['Oblíquos']::text[],'Cabo','Intermediário',ARRAY['Ajoelhe de frente à polia.','Flexione o tronco.','Retorne controlando.']::text[],ARRAY['Puxar com os braços','Usar o quadril']::text[]),
('Afundo com halteres','afundo-com-halteres','Pernas','Quadríceps',ARRAY['Glúteos','Core']::text[],'Halteres','Intermediário',ARRAY['Dê um passo à frente.','Desça o joelho de trás.','Suba empurrando o chão.']::text[],ARRAY['Passo curto','Joelho instável']::text[]),
('Flexão de braço','flexao-de-braco','Peito','Peitoral maior',ARRAY['Tríceps','Core']::text[],'Peso corporal','Iniciante',ARRAY['Mãos na largura do peito.','Corpo em linha reta.','Desça até quase o chão.']::text[],ARRAY['Quadril caído','Amplitude curta']::text[]),
('Swing com kettlebell','swing-com-kettlebell','Glúteos','Glúteos',ARRAY['Posterior de coxa','Core']::text[],'Kettlebell','Intermediário',ARRAY['Empurre o quadril para trás.','Projete o kettlebell com o quadril.','Mantenha o core firme.']::text[],ARRAY['Agachar em vez de dobrar o quadril','Usar só os braços']::text[]),
('Face pull com elástico','face-pull-com-elastico','Ombros','Deltoide posterior',ARRAY['Trapézio','Rotadores']::text[],'Elástico','Iniciante',ARRAY['Puxe o elástico na altura do rosto.','Abra os cotovelos.','Contraia as escápulas.']::text[],ARRAY['Puxar muito baixo','Elevar os ombros']::text[]),
('Agachamento no Smith','agachamento-no-smith','Pernas','Quadríceps',ARRAY['Glúteos']::text[],'Smith','Iniciante',ARRAY['Posicione os pés à frente da barra.','Desça controlando até 90°.','Suba sem travar os joelhos.']::text[],ARRAY['Pés mal posicionados','Descer rápido']::text[]);