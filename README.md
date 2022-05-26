# Date & Time Calculator

This is a project template for a simple calculator with three date/time-related features:
  - calculating the number of days between two dates
  - calculating the date some multiplied interval after a start date
  - calculating all recurring event dates and times between two dates

The UI code is already set up; you will be implementing all of the algorithmic code for the calculator.

## Assignment goals

This assignment has two high-level goals:
  - You will practice working with a *linter* configured with settings that may not be your own preference.
  - You will practice working with a *third-party library* that you are not already familiar with.

If you work effectively on this project, you will spend much more of your time **reading documentation** than **writing code**.

## Library information

We will be working with the `js-joda` library.

[API Reference](https://js-joda.github.io/js-joda/identifiers.html#core-src)

[Manual](https://js-joda.github.io/js-joda/manual/usage.html)

We will also be using TypeScript arrays in one function, which you can find documentation for on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## Assignment requirements

You must edit only the `src/Calculator.ts` and `src/Calculator.test.ts` files. (Imagine the other files are owned by a different team in your organization.)

Your code must compile with no errors **or warnings** in the files that you've edited. This includes ESLint warnings. We will cover in lecture how to use ESLint.

All of your code must be your own individual work. If you want to help other students, don't share your code with them, help them read and understand the documentation so they can write their own code.

You are not required to write your own automated tests in `src/Calculator.test.ts`, but you still should! It will be very tedious to test your code by hand, and if you're not doing **any** testing, you will probably get some details of the algorithms wrong.

**Along with your code, you must submit a short (1-3 page) writeup.** Your writeup should identify which parts of the `js-joda` documentation were most important to your work and give a brief beginner-friendly summary of each of these parts of the documentation.

## Grading

You will be graded on whether your code correctly implements the specified algorithms and meets the above requirements. You will lose points for ESLint warnings, but other than that code style will not be graded.

## Setup

If you're working on Windows, run this Git command in a terminal before you start working on this project:

```
git config --global core.autocrlf false
```

Run through the assignment 1 setup instructions, but for this `datetime-calculator` repository instead of the assignment 1 `calculator` repository.

To submit your work, push your code to your `datetime-calculator` fork on GitLab and submit your writeup to the Canvas assignment dropbox.

## Calculator input formats

All inputs to the calculator are in ISO standard notation.

All of the dates and times we work with will be "timezone-less": this means we're ignoring details like Daylight Saving Time. To be precise, we're working with [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), which is uncommon for humans to use but very common for computers to use.

- Dates (e.g. `1991-12-31`): separated by `-`, four-digit year, two-digit month, two-digit day
- Times (e.g. `20:59`): separated by `:`, 24-hour clock with hours and minutes
- Date/times (e.g. `1991-12-31T20:59`): separated by `T`, a date followed by a time
- Periods (e.g. `P1Y2M30D`): **starts** with a `P`, number of years followed by `Y`, number of months followed by `M`, number of days followed by `D`; each part except the `P` is optional

You will only need to think about these formats when **testing** your calculator: the library we use to handle date calculations will automatically handle converting date/time/period values to and from strings.

You will not need to handle invalid input; the UI code is already set up to handle it for you. You can assume all of the arguments passed to your functions are valid.

## Calculator features

Here are the specifications for each calculator feature you need to implement.

### `daysBetween(start, end)`

The arguments `start` and `end` are both dates (not date/times). The return value should be the (integer) number of days between `start` and `end`. The range calculation should be **exclusive**: if `start` and `end` are the same day then the correct result is **0**, not 1.

If `start` is a date that comes after `end`, then the result should be negative.

Examples:
```
start = 2022-01-31
end = 2022-01-31
return value = 0

start = 2022-01-30
end = 2022-01-31
return value = 1

start = 2022-01-31
end = 2022-01-30
return value = -1

start = 2022-01-31
end = 2022-03-31
return value = 59
```

### `afterIntervalTimes(start, interval, multiplier)`

The `start` argument is a date (not a date/time), the `interval` argument is a period (an amount of days), and the `multiplier` argument is a non-negative integer (this is guaranteed by the UI, it won't ever be negative or fractional). The return value should be the date obtained by starting at `start` and adding the `interval` period `multiplier` times.

Adding months to a date is somewhat strange: for example, what should one month after January 31st 2022 be? The answer we'll go with is February 28th (since it's a non-leap year).

This is the default behavior of `js-joda` when adding a period value to a date value, so you won't have to do any special work to implement this behavior - but you should test for it! Specifically, adding `x` months should always increment the month counter by **exactly** `x`, and should round down the day counter if necessary to avoid incrementing the month counter by more than `x`.

When adding complex periods that involve multiple units (such as `P1Y1M` or "one year and one month"), we will handle the units in order of **largest to smallest**: so adding `P1Y1M` to a date is equivalent to adding `P1Y` and then adding `P1M`, not the other way around. Again, this is the default behavior of our library, so you won't have to implement this behavior yourself.

Examples:
```
start = 2022-01-31
interval = P1D
multiplier = 3
return value = 2022-02-03

start = 2022-01-31
interval = P1D
multiplier = 0
return value = 2022-01-31

start = 2022-01-31
interval = P1M
multiplier = 1
return value = 2022-02-28

start = 2019-01-31
interval = P1Y1M
multiplier = 1
return value = 2020-02-29
```

### `recurringEvent(start, end, interval, timeOfDay)`

The `start` and `end` arguments are date/times (not just dates), the `interval` argument is a period (an amount of days), and the `timeOfDay` argument is a time (not a date/time).

The return value should be an *array* of all date/times on which the recurring event should take place: the event will take place once per `interval` at `timeOfDay`. If the `start` time is **earlier in the day** than `timeOfDay`, the first event should take place on the `start` date; otherwise, the first event should take place **exactly** one `interval` after the `start` date. Similarly, if the `end` time is **later in the day** than `timeOfDay` and the last `interval` ends exactly on the `end` date, the last event should take place on the `end` date; otherwise, the last event should take place **at most** one `interval` before the `end` date. In all cases, the time component of every element in the output array should be equal to `timeOfDay`.

This is a complex specification, but if you read it carefully you'll find it describes a fairly intuitive way for a function like this to behave. Make sure to test your code thoroughly!

Examples:
```
start = 2022-01-01T00:00
end = 2022-01-04T23:59
interval = P1D
timeOfDay = 01:00
return value = [
  2022-01-01T01:00,
  2022-01-02T01:00,
  2022-01-03T01:00,
  2022-01-04T01:00,
]

start = 2022-01-01T02:00
end = 2022-01-04T23:59
interval = P1D
timeOfDay = 01:00
return value = [
  2022-01-02T01:00,
  2022-01-03T01:00,
  2022-01-04T01:00,
]

start = 2022-01-01T00:00
end = 2022-01-04T00:00
interval = P1D
timeOfDay = 01:00
return value = [
  2022-01-01T01:00,
  2022-01-02T01:00,
  2022-01-03T01:00,
]

start = 2022-01-31T00:00
end = 2022-05-15T00:00
interval = P1M
timeOfDay = 01:00
return value = [
  2022-01-31T01:00,
  2022-02-28T01:00,
  2022-03-28T01:00,
  2022-04-28T01:00,
]
```
