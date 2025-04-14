"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useEffect, useState } from "react";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const [monthsToShow, setMonthsToShow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth < 768 ? 1 : 2);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from || 0);
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col gap-6">
      {/* Date Picker */}
      <div className="place-self-center pt-6 sm:pt-10">
        <DayPicker
          mode="range"
          onSelect={setRange}
          selected={displayRange}
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={monthsToShow}
          disabled={(curDate) =>
            isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          }
        />
      </div>

      {/* Pricing Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 px-4 sm:px-8 py-4 bg-accent-500 text-primary-800">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <p className="flex gap-2 items-baseline text-xl sm:text-2xl">
            {discount > 0 ? (
              <>
                <span>${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700 text-base">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span>${regularPrice}</span>
            )}
            <span className="text-base">/night</span>
          </p>

          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-1 sm:py-2 text-xl sm:text-2xl">
                × {numNights}
              </p>
              <p className="text-lg sm:text-xl font-bold uppercase">
                Total <span className="text-primary-950">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            className="self-start sm:self-auto border border-primary-800 py-2 px-4 text-sm font-semibold hover:bg-primary-800 hover:text-white transition"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
