import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.3.0:0',
  releaseNotes: {
    en_US:
      'Upstream 1.3.0: fee estimates fall back to recommended fees on older Mempool versions; the update cycle is now fail-safe — failed fetches, invalid screenshots or a hung Firefox keep the previous display, overlapping updates are serialized, and a stuck browser is killed after a timeout.',
    es_ES:
      'Upstream 1.3.0: en versiones antiguas de Mempool las estimaciones de comisiones recurren a las comisiones recomendadas; el ciclo de actualización ahora es tolerante a fallos — intentos fallidos, capturas no válidas o un Firefox colgado conservan la imagen anterior, las actualizaciones que se solapan se serializan y un navegador atascado se mata tras un tiempo de espera.',
    de_DE:
      'Upstream 1.3.0: Gebührenschätzungen greifen bei älteren Mempool-Versionen auf die empfohlenen Gebühren zurück; der Aktualisierungszyklus ist jetzt fehlertolerant — fehlgeschlagene Abrufe, ungültige Screenshots oder ein hängender Firefox bewahren das bisherige Display, sich überlappende Aktualisierungen werden serialisiert und ein festhängender Browser nach Ablauf des Timeouts beendet.',
    pl_PL:
      'Upstream 1.3.0: na starszych wersjach Mempool szacunki opłat korzystają z opłat zalecanych; cykl aktualizacji jest teraz odporny na błędy — nieudane pobrania, nieprawidłowe zrzuty ekranu lub zawieszony Firefox zachowują poprzedni obraz, nakładające się aktualizacje są szeregowane, a zablokowana przeglądarka jest zamykana po upływie limitu czasu.',
    fr_FR:
      'Upstream 1.3.0 : sur les anciennes versions de Mempool, les estimations de frais utilisent en secours les frais recommandés ; le cycle de mise à jour est désormais tolérant aux pannes — échecs de récupération, captures invalides ou Firefox bloqué conservent l’image précédente, les mises à jour qui se chevauchent sont sérialisées et un navigateur bloqué est arrêté après un délai.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
