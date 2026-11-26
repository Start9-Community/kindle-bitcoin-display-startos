import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.3.0:1',
  releaseNotes: {
    en_US:
      'Rebuilt with start-sdk 4.1.0: fixes a daemon hang when one of its output streams fills, health-check memory growth, and keeps environment values out of process command lines. No upstream changes — still 1.3.0.',
    es_ES:
      'Recompilado con start-sdk 4.1.0: corrige un bloqueo del demonio cuando uno de sus streams se llena, el crecimiento en memoria de los health checks, y mantiene los valores de entorno fuera de las líneas de comando de los procesos. Sin cambios upstream — sigue siendo 1.3.0.',
    de_DE:
      'Mit start-sdk 4.1.0 neu gebaut: behebt einen Daemon-Hänger, wenn einer seiner Ausgabe-Streams vollläuft, das Speicherwachstum der Health-Checks, und hält Umgebungswerte aus Prozess-Kommandozeilen heraus. Keine Upstream-Änderungen — weiterhin 1.3.0.',
    pl_PL:
      'Przebudowano z start-sdk 4.1.0: naprawia zawieszanie demona, gdy jeden z jego strumieni wyjściowych się zapełnia, przyrost pamięci health checków, i usuwa wartości środowiska z linii poleceń procesów. Bez zmian upstream — nadal 1.3.0.',
    fr_FR:
      'Reconstruit avec start-sdk 4.1.0 : corrige un blocage de démon quand l’un de ses flux de sortie se remplit, la croissance mémoire des health checks, et garde les valeurs d’environnement hors des lignes de commande des processus. Aucun changement upstream — toujours 1.3.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
