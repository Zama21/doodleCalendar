import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    busyRanges: [],
    busyRangesInterval: [],
    selectedState: 'Единоразовые',
    isShowDayOfTheWeek: false,
    daysOfTheWeek: [
        { id: 0, label: 'Пн', isSelected: false },
        { id: 1, label: 'Вт', isSelected: false },
        { id: 2, label: 'Ср', isSelected: false },
        { id: 3, label: 'Чт', isSelected: false },
        { id: 4, label: 'Пт', isSelected: false },
        { id: 5, label: 'Сб', isSelected: false },
        { id: 6, label: 'Вс', isSelected: false },
    ],
};

function mergeOverlappingDates(dateArray) {
    dateArray.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    if (!dateArray[0]) return [];

    const mergedDates = [dateArray[0]];

    for (let i = 1; i < dateArray.length; i++) {
        const current = dateArray[i];
        const lastMerged = mergedDates[mergedDates.length - 1];

        if (new Date(current.startDate) <= new Date(lastMerged.endDate)) {
            lastMerged.endDate =
                current.endDate > lastMerged.endDate
                    ? current.endDate
                    : lastMerged.endDate;
        } else {
            mergedDates.push(current);
        }
    }

    return mergedDates;
}

function sortScheduleByStartTime(schedule) {
    return schedule.sort((a, b) => {
        if (a.startTime < b.startTime) {
            return -1;
        }
        if (a.startTime > b.startTime) {
            return 1;
        }
        return 0;
    });
}

export const profilePageSlice = createSlice({
    name: 'profilePage',
    initialState,
    reducers: {
        setBusyRanges(state, action) {
            state.busyRanges = action.payload;
        },
        addRangesToBusyRanges(state, action) {
            state.busyRanges = mergeOverlappingDates(
                state.busyRanges.concat(action.payload)
            );
        },

        setBusyRangesInterval(state, action) {
            state.busyRangesInterval = action.payload;
        },
        addRangesToBusyRangesInterval(state, action) {
            state.busyRangesInterval = sortScheduleByStartTime(
                state.busyRangesInterval.concat(action.payload)
            );
        },
        setSelectedState(state, action) {
            state.selectedState = action.payload;
        },
        setIsShowDayOfTheWeek(state, action) {
            state.isShowDayOfTheWeek = action.payload;
        },
        setDaysOfTheWeek(state, action) {
            state.daysOfTheWeek = action.payload;
        },
        removeRangeById(state, action) {
            state.busyRanges = state.busyRanges.filter(
                item => item.id !== action.payload
            );
        },
        removeRangeIntervalById(state, action) {
            state.busyRangesInterval = state.busyRangesInterval.filter(
                item => item.id !== action.payload
            );
        },
    },
});

export const { actions: profileActions } = profilePageSlice;
export const { reducer: profileReducer } = profilePageSlice;
