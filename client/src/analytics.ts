export enum AnalyticsCategory {
	GAME_PHASE = 'game-phase',
}
export enum AnalyticsAction {
	GAME_PHASE_GAME_STARTED = 'game-phase--game-started',
	GAME_PHASE_GAME_SUCCESS = 'game-phase--game-success',
	GAME_PHASE_GAME_FAILURE = 'game-phase--game-failure',
}

export class Analytics {
	static sendEvent(event_category: AnalyticsCategory, event_action: AnalyticsAction, event_label = '') {
		window['gtag']('event', event_action as string, {
			event_category: event_category as string,
			event_label: event_label ? event_label.trim() : (event_action as string),
		});
	}
}
