// ===== RANKING SYSTEM =====
// Persiste histórico das últimas partidas no localStorage.
const RANKING_KEY = 'game_reator_ranking';
const RANKING_MAX = 10;

class RankingSystem {
    load() {
        try {
            const raw = localStorage.getItem(RANKING_KEY);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch (_e) {
            return [];
        }
    }

    // entry: { date, outcome, timeMs, timeFormatted, energyMWh, totalAlerts, cause?, blackouts?, quota? }
    record(entry) {
        try {
            const entries = this.load();
            entries.unshift(entry);
            if (entries.length > RANKING_MAX) entries.length = RANKING_MAX;
            localStorage.setItem(RANKING_KEY, JSON.stringify(entries));
        } catch (_e) {
            console.warn('RankingSystem: could not save:', _e);
        }
    }
}
