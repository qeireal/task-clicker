import {CurrentWorkersRow} from './current-workers-row';
import {Worker} from './worker';

export interface InitialData {
	currentWorkers: ReadonlyArray<CurrentWorkersRow>,
	overallTasks: number,
	sessionStartTime: Date,
	wallet: number,
	workersInfo: ReadonlyArray<Worker>,
}
