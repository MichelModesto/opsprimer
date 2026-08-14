// Agrupamento tematico. Funciona com 7 artigos e com 15 — grupo vazio nao renderiza.
export const GROUPS = [
  { id: 'choosing', title: 'Choosing',
    note: 'Which tool fits the shape you are in, and the question that comes before that.' },
  { id: 'limits', title: 'Limits & plans',
    note: 'What each tier actually gives you, counted from official sources.' },
  { id: 'making-it-work', title: 'Making it work',
    note: 'After you have picked: setup, pipelines, and what breaks quietly.' },
] as const;
