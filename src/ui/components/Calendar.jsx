import cx from "./Calendar.module.scss";
import { groupBy, mapValues, range } from "lodash";
import randomcolor from "randomcolor";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarEntry } from "./CalendarEntry";

export const Calendar = ({ entries, ...rest }) => {
  const groupColors = mapValues(groupBy(entries, "group"), () =>
    randomcolor({ luminosity: "light" })
  );

  const headerSpan = 2;
  const daysInAWeek = 7;
  const halfHoursInADay = 48;

  return (
    <div className={cx.calendar} {...rest}>
      <CalendarHeader />

      {range(0, halfHoursInADay * daysInAWeek).map((index) => (
        <div
          key={index}
          className={cx.cell}
          style={{
            gridColumn: headerSpan + Math.floor(index / halfHoursInADay),
            gridRowStart: headerSpan + (index % halfHoursInADay),
            gridRowEnd: headerSpan + (index % halfHoursInADay),
          }}></div>
      ))}

      {entries.map((entry) => (
        <CalendarEntry key={entry.id} entry={entry} groupColors={groupColors} />
      ))}
    </div>
  );
};
