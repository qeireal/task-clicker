import {CurrentWorkersState} from './current-workers-state';
import {Upgrade} from './upgrade';
import {Worker} from './worker';

export interface InitialData {
	currentWorkers: ReadonlyArray<CurrentWorkersState>,
	overallTasks: number,
	sessionStartTime: Date,
	wallet: number,
	workersInfo: ReadonlyArray<Worker>,
	upgradesInfo: ReadonlyArray<Upgrade>,
	currentUpgradeId: number,
}
