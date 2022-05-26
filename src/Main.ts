/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import {
    DateTimeParseException,
    LocalDate,
    LocalDateTime,
    LocalTime,
    Period,
} from "@js-joda/core";

import {
    afterIntervalTimes,
    daysBetween,
    recurringEvent,
} from "./Calculator";

const handleOnSubmit = (outputID: string, run: () => string) => () => {
    const output = document.getElementById(outputID)!;
    try {
        output.innerHTML = run();
    } catch (e: unknown) {
        if (e instanceof DateTimeParseException)
            output.innerText = "parse error";
        else if (e instanceof Error)
            console.error(`${e.constructor.name}: ${e.message}`);
        else
            console.error((e as object).toString());
    }
    return false;
};

const getInputElementById = (id: string): HTMLInputElement | null =>
    document.getElementById(id) as HTMLInputElement;

const parseNonNegativeInt = (str: string): number => {
    const val = parseInt(str);
    if (isNaN(val))
        throw new DateTimeParseException("invalid integer: " + str);
    else if (val < 0)
        throw new DateTimeParseException("expected a positive integer: " + str);
    else
        return val;
};

window.onload = () => {
    document.getElementById("daysBetween")!.onsubmit =
    handleOnSubmit("daysBetweenOutput", () => {
        const start = getInputElementById("daysBetweenStart")!;
        const end = getInputElementById("daysBetweenEnd")!;
        return daysBetween(
            LocalDate.parse(start.value),
            LocalDate.parse(end.value),
        ).toString();
    });

    document.getElementById("afterIntervalTimes")!.onsubmit =
    handleOnSubmit("afterIntervalTimesOutput", () => {
        const start = getInputElementById("afterIntervalTimesStart")!;
        const interval = getInputElementById("afterIntervalTimesInterval")!;
        const multiplier = getInputElementById("afterIntervalTimesMultiplier")!;
        return afterIntervalTimes(
            LocalDate.parse(start.value),
            Period.parse(interval.value),
            parseNonNegativeInt(multiplier.value),
        ).toString();
    });

    document.getElementById("recurringEvent")!.onsubmit =
    handleOnSubmit("recurringEventOutput", () => {
        const start = getInputElementById("recurringEventStart")!;
        const end = getInputElementById("recurringEventEnd")!;
        const interval = getInputElementById("recurringEventInterval")!;
        const timeOfDay = getInputElementById("recurringEventTimeOfDay")!;
        return recurringEvent(
            LocalDateTime.parse(start.value),
            LocalDateTime.parse(end.value),
            Period.parse(interval.value),
            LocalTime.parse(timeOfDay.value),
        ).reduce((output, event) => output + "<br>" + event.toString(), "");
    });
};