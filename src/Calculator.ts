import {
    LocalDate,
    LocalDateTime,
    LocalTime,
    Period,
    ChronoUnit,
    
} from "@js-joda/core";

export function daysBetween(
    start: LocalDate,
    end: LocalDate,
): number{
    var days = 0;
    days = start.until(end,ChronoUnit.DAYS);
    return days;
    }; 


export function afterIntervalTimes(
    start: LocalDate,
    interval: Period,
    multiplier: number,
): LocalDate {
    var newPeriod = interval.multipliedBy(multiplier);
    var returnDate = start.plus(newPeriod); 
    return returnDate;
    
}

export function recurringEvent(
    start: LocalDateTime,
    end: LocalDateTime,
    interval: Period,
    timeOfDay: LocalTime,
): LocalDateTime[] {

   //initialize array
    var recurrEvents=[];

   //stay in loop until we've traversed all days
   while (end.compareTo(start)>=0){
       //If the `start` time is **earlier in the day** than `timeOfDay`, the first event should take place on the `start` date; otherwise, the first event should take place **exactly** one `interval` after the `start` date
       if (start.compareTo(start.with(timeOfDay)) > 0){
       start = start.with(timeOfDay);
       start = start.plus(interval);
   }
      else{
       start = start.with(timeOfDay);
       recurrEvents.push(start);
       start = start.plus(interval);
   }

   }//end While Loop
    return recurrEvents;
}