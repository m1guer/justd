"use client"

import React from "react"

import { IconX } from "justd-icons"
import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps as TagPrimitiveProps
} from "react-aria-components"
import {
  Button,
  composeRenderProps,
  Tag as TagPrimitive,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { badgeIntents, badgeShapes, badgeStyles } from "./badge"
import { Description, Label } from "./field"
import { cn, composeTailwindRenderProps, focusStyles } from "./primitive"

const intents = {
  primary: {
    base: [badgeIntents.primary, "[&_[slot=remove]:hover]:bg-primary [&_[slot=remove]:hover]:text-primary-fg"],
    selected: [
      "bg-primary dark:data-hovered:bg-primary dark:bg-primary data-hovered:bg-primary ring-primary ring-inset text-primary-fg dark:text-primary-fg data-hovered:text-primary-fg",
      "[&_[slot=remove]:hover]:bg-primary-fg/50 [&_[slot=remove]:hover]:text-primary"
    ]
  },
  secondary: {
    base: [badgeIntents.secondary, "[&_[slot=remove]:hover]:bg-fg [&_[slot=remove]:hover]:text-bg"],
    selected: [
      "bg-fg ring-fg/50 text-bg dark:bg-fg/90 dark:text-secondary ring-inset",
      "[&_[slot=remove]:hover]:bg-bg [&_[slot=remove]:hover]:text-secondary-fg"
    ]
  },
  success: {
    base: [badgeIntents.success, "[&_[slot=remove]:hover]:bg-success [&_[slot=remove]:hover]:text-success-fg"],
    selected: [
      "bg-success dark:bg-success ring-success ring-inset dark:text-success-fg dark:data-hovered:bg-success data-hovered:bg-success text-success-fg data-hovered:text-success-fg",
      "[&_[slot=remove]:hover]:bg-success-fg/80 [&_[slot=remove]:hover]:text-success"
    ]
  },
  warning: {
    base: [badgeIntents.warning, "[&_[slot=remove]:hover]:bg-warning [&_[slot=remove]:hover]:text-warning-fg"],
    selected: [
      "bg-warning dark:data-hovered:bg-warning dark:bg-warning dark:text-bg data-hovered:bg-warning text-warning-fg data-hovered:text-warning-fg",
      "[&_[slot=remove]:hover]:bg-warning-fg/80 [&_[slot=remove]:hover]:text-warning"
    ]
  },
  danger: {
    base: [badgeIntents.danger, "[&_[slot=remove]:hover]:bg-danger [&_[slot=remove]:hover]:text-danger-fg"],
    selected: [
      "bg-danger dark:bg-danger dark:data-hovered:bg-danger/90 data-hovered:bg-danger text-danger-fg ring-danger data-hovered:text-danger-fg",
      "[&_[slot=remove]:hover]:bg-danger-fg/80 [&_[slot=remove]:hover]:text-danger"
    ]
  }
}

type RestrictedIntent = "primary" | "secondary"

type Intent = "primary" | "secondary" | "warning" | "danger" | "success"

type Shape = keyof typeof badgeShapes

type TagGroupContextValue = {
  intent: Intent
  shape: Shape
}

const TagGroupContext = React.createContext<TagGroupContextValue>({
  intent: "primary",
  shape: "square"
})

export interface TagGroupProps extends TagGroupPrimitiveProps {
  intent?: Intent
  shape?: "square" | "circle"
  errorMessage?: string
  label?: string
  description?: string
}

const TagGroup = ({ children, ...props }: TagGroupProps) => {
  return (
    <TagGroupPrimitive {...props} className={cn("flex flex-wrap flex-col", props.className)}>
      <TagGroupContext.Provider
        value={{
          intent: props.intent || "primary",
          shape: props.shape || "square"
        }}
      >
        {props.label && <Label className="mb-1">{props.label}</Label>}
        {children}
        {props.description && <Description>{props.description}</Description>}
      </TagGroupContext.Provider>
    </TagGroupPrimitive>
  )
}

const TagList = <T extends object>({ className, ...props }: TagListProps<T>) => {
  return <TagListPrimitive {...props} className={composeTailwindRenderProps(className, "flex flex-wrap gap-2")} />
}

const tagStyles = tv({
  extend: focusStyles,
  base: [badgeStyles.base, "cursor-pointer jdt3lr2x"],
  variants: {
    isFocused: { true: "ring-1" },
    isDisabled: { true: "opacity-50 cursor-default" },
    allowsRemoving: { true: "pr-1" }
  }
})

interface TagProps extends TagPrimitiveProps {
  intent?: Intent
  shape?: Shape
}

const TagItem = ({ className, intent, shape, ...props }: TagProps) => {
  const textValue = typeof props.children === "string" ? props.children : undefined
  const groupContext = React.useContext(TagGroupContext)

  return (
    <TagPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (_, renderProps) => {
        const finalIntent = intent || groupContext.intent
        const finalShape = shape || groupContext.shape

        return tagStyles({
          ...renderProps,
          className: cn([
            intents[finalIntent]?.base,
            badgeShapes[finalShape],
            renderProps.isSelected ? intents[finalIntent].selected : undefined
          ])
        })
      })}
    >
      {({ allowsRemoving }) => {
        return (
          <>
            {props.children as React.ReactNode}
            {allowsRemoving && (
              <Button
                slot="remove"
                className="rounded [&>[data-slot=icon]]:size-3 [&>[data-slot=icon]]:shrink-0 focus:outline-none size-3.5 grid place-content-center -mr-0.5 focus-visible:ring-1 focus-visible:ring-primary"
              >
                <IconX />
              </Button>
            )}
          </>
        )
      }}
    </TagPrimitive>
  )
}

const Tag = {
  Group: TagGroup,
  Item: TagItem,
  List: TagList
}

export { Tag, type RestrictedIntent }
