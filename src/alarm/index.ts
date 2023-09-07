import {createAlarm, getAlarms, editAlarm} from "react-native-simple-alarm";

export const registerNewAlarm = async (message: string, date: string) => {
    try {
        const newAlarm = await createAlarm({
            active: true,
            date,
            message,
            snooze: 1
        });
    } catch (err) {
        console.error(err);
    }
};

export const getAllAlarms = async () => {
    try {
        const allAlarms = await getAlarms();
        console.log(allAlarms);
    } catch (err) {
        console.error(err);
    }
}

export const getAlarmById = async (id: string) => {
    try {
        const alarm = await getAlarmById(id);
        console.log(alarm);
    } catch (err) {
        console.error(err);
    }
}

export const editAlarmById = async (id: string) => {
    try {
        await editAlarm({
            id,
            active: true,
            date: new Date().toISOString(),
            message: "Wake up!",
            snooze: 1
        });
    } catch (err) {
        console.error(err);
    }
}
