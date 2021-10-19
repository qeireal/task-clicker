import {CurrentWorkersRow} from './current-workers-row';
import {Upgrade} from './upgrade';
import {Worker} from './worker';

export interface InitialData {
	currentWorkers: ReadonlyArray<CurrentWorkersRow>,
	overallTasks: number,
	sessionStartTime: Date,
	wallet: number,
	workersInfo: ReadonlyArray<Worker>,
	upgradesInfo: ReadonlyArray<Upgrade>,
	currentUpgradeId: number,
}
