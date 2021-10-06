export interface DataResponse<T> {
	message: string,
	success: boolean,
	data: T,
}
