import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.3.0:1',
  releaseNotes: {
    en_US:
      'Updates to 1.3.0: failed refreshes preserve the previous display image, stuck renders no longer block subsequent refreshes, and fee estimates work with older Mempool versions. Also fixes service hangs and health-check memory growth, and prevents environment values appearing in process command lines. Full upstream changes: https://github.com/dennisreimann/kindle-display/compare/v1.1.1...v1.3.0',
    es_ES:
      'Actualiza a 1.3.0: las actualizaciones fallidas conservan la imagen anterior, un renderizado bloqueado ya no impide las siguientes actualizaciones y las estimaciones de comisiones funcionan con versiones anteriores de Mempool. También corrige bloqueos del servicio y el crecimiento de memoria de las comprobaciones de estado, y evita que los valores de entorno aparezcan en las líneas de comandos de los procesos. Todos los cambios del proyecto original: https://github.com/dennisreimann/kindle-display/compare/v1.1.1...v1.3.0',
    de_DE:
      'Aktualisiert auf 1.3.0: Fehlgeschlagene Aktualisierungen behalten das vorherige Anzeigebild bei, eine hängende Bilderzeugung blockiert keine weiteren Aktualisierungen und Gebührenschätzungen funktionieren mit älteren Mempool-Versionen. Behebt außerdem hängende Dienste und wachsenden Speicherverbrauch der Zustandsprüfungen und verhindert, dass Umgebungswerte in Prozess-Kommandozeilen erscheinen. Alle Änderungen des Originalprojekts: https://github.com/dennisreimann/kindle-display/compare/v1.1.1...v1.3.0',
    pl_PL:
      'Aktualizacja do 1.3.0: nieudane odświeżenia zachowują poprzedni obraz, zawieszone renderowanie nie blokuje kolejnych odświeżeń, a szacowanie opłat działa ze starszymi wersjami Mempool. Naprawia też zawieszanie usługi i wzrost zużycia pamięci przez kontrole stanu oraz zapobiega ujawnianiu wartości środowiskowych w wierszach poleceń procesów. Pełna lista zmian projektu źródłowego: https://github.com/dennisreimann/kindle-display/compare/v1.1.1...v1.3.0',
    fr_FR:
      'Mise à jour vers 1.3.0 : les rafraîchissements échoués conservent l’image précédente, un rendu bloqué n’empêche plus les rafraîchissements suivants et les estimations de frais fonctionnent avec les anciennes versions de Mempool. Corrige aussi les blocages du service et la croissance mémoire des vérifications d’état, et empêche les valeurs d’environnement d’apparaître dans les lignes de commande des processus. Tous les changements du projet original : https://github.com/dennisreimann/kindle-display/compare/v1.1.1...v1.3.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
