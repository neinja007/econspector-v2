export const isValidTimePeriod = (timePeriod: [number, number] | null) => {
	return timePeriod && timePeriod[0] <= timePeriod[1];
};
