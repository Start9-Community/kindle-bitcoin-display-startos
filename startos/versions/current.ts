import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.1.1:1',
  releaseNotes: {
    en_US: `Initial release for StartOS

- Configure's Display Theme field lists what each theme shows.
- Configure's exchange rate fields list each currency by name.
- Configure's Update Interval field explains how it relates to the Kindle's own refresh schedule.`,
    es_ES: `Lanzamiento inicial para StartOS

- El campo Tema de visualización de Configurar indica qué muestra cada tema.
- Los campos de tasa de cambio de Configurar indican el nombre de cada moneda.
- El campo Intervalo de actualización de Configurar explica cómo se relaciona con el horario de actualización del propio Kindle.`,
    de_DE: `Erstveröffentlichung für StartOS

- Das Feld Anzeige-Theme in Konfigurieren beschreibt, was jedes Theme zeigt.
- Die Wechselkursfelder in Konfigurieren nennen jede Währung beim Namen.
- Das Feld Aktualisierungsintervall in Konfigurieren erklärt, wie es mit dem eigenen Aktualisierungsplan des Kindle zusammenhängt.`,
    pl_PL: `Pierwsze wydanie dla StartOS

- Pole Motyw wyświetlania w Konfiguruj opisuje, co pokazuje każdy motyw.
- Pola kursów wymiany w Konfiguruj podają pełną nazwę każdej waluty.
- Pole Interwał aktualizacji w Konfiguruj wyjaśnia, jak ma się do własnego harmonogramu odświeżania Kindle.`,
    fr_FR: `Version initiale pour StartOS

- Le champ Thème d'affichage de Configurer indique ce que montre chaque thème.
- Les champs de taux de change de Configurer donnent le nom de chaque devise.
- Le champ Intervalle de mise à jour de Configurer explique son lien avec le propre calendrier de rafraîchissement du Kindle.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
