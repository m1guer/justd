"use client"

import { IconChevronLgLeft, IconChevronLgRight } from "justd-icons"
import {
  Calendar as CalendarPrimitive,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  type CalendarProps as CalendarPrimitiveProps,
  composeRenderProps,
  type DateValue,
  Heading,
  Text,
  useLocale
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button } from "./button"
import { composeTailwindRenderProps, focusRing } from "./primitive"

const cellStyles = tv({
  extend: focusRing,
  base: "flex size-10 sm:size-9 cursor-default tabular-nums items-center justify-center rounded-full lg:text-sm forced-colors:outline-0",
  variants: {
    isSelected: {
      false: "text-fg forced-colors:text-[ButtonText] data-hovered:bg-secondary-fg/15 data-pressed:bg-secondary-fg/20",
      true: "bg-primary text-primary-fg data-invalid:bg-danger data-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:data-invalid:bg-[Mark]"
    },
    isDisabled: {
      true: "text-muted-fg/70 forced-colors:text-[GrayText]"
    }
  }
})

interface CalendarProps<T extends DateValue> extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
  className?: string
}

const Calendar = <T extends DateValue>({ errorMessage, className, ...props }: CalendarProps<T>) => {
  return (
    <CalendarPrimitive
      className={composeTailwindRenderProps(className, "max-w-[17.5rem] sm:max-w-[15.8rem]")}
      {...props}
    >
      <CalendarHeader />
      <CalendarGrid className="[&_td]:border-collapse [&_td]:px-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={composeRenderProps(className, (className, renderProps) =>
                cellStyles({
                  ...renderProps,
                  className
                })
              )}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  )
}

const calendarHeaderStyles = tv({
  slots: {
    header: "flex w-full justify-center gap-1 px-1 pb-5 sm:pb-4",
    heading: "mr-2 text-muted-fg tracking-tight flex-1 text-left font-medium",
    calendarGridHeaderCell: "text-sm lg:text-xs font-semibold text-muted-fg"
  }
})

const { header, heading, calendarGridHeaderCell } = calendarHeaderStyles()

const CalendarHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { direction } = useLocale()

  return (
    <header className={header({ className })} {...props}>
      <Heading className={heading()} />
      <div className="flex items-center gap-1">
        <Button
          size="square-petite"
          className="**:data-[slot=icon]:text-fg size-8 sm:size-7"
          shape="circle"
          appearance="plain"
          slot="previous"
        >
          {direction === "rtl" ? <IconChevronLgRight /> : <IconChevronLgLeft aria-hidden />}
        </Button>
        <Button
          size="square-petite"
          className="**:data-[slot=icon]:text-fg size-8 sm:size-7"
          shape="circle"
          appearance="plain"
          slot="next"
        >
          {direction === "rtl" ? <IconChevronLgLeft /> : <IconChevronLgRight />}
        </Button>
      </div>
    </header>
  )
}

const CalendarGridHeader = () => {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => <CalendarHeaderCell className={calendarGridHeaderCell()}>{day}</CalendarHeaderCell>}
    </CalendarGridHeaderPrimitive>
  )
}

Calendar.Header = CalendarHeader
Calendar.GridHeader = CalendarGridHeader
export { Calendar }
