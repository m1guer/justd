"use client"

import React from "react"

import { Choicebox } from "ui"

const packages = [
  {
    id: 1,
    title: "Small",
    description: "Perfect for beginners. Basic resources for light projects."
  },
  {
    id: 2,
    title: "Medium",
    description: "Great for growing sites. More power and storage."
  },
  {
    id: 3,
    title: "Large",
    description: "Ideal for busy sites. Lots of resources and support."
  },
  {
    id: 4,
    title: "Extra Large",
    description: "Max power for demanding applications. Top-tier performance."
  }
]

export default function ChoiceboxDemo() {
  return (
    <Choicebox aria-label="Select items" selectionMode="multiple">
      <Choicebox.Item title="Basic" description="Just the essentials to get started." />
      <Choicebox.Item title="Standard" description="A step up with more features and support." />
      <Choicebox.Item title="Premium" description="Advanced options for growing needs." />
      <Choicebox.Item title="Deluxe" description="Top-tier features for maximum performance." />
      <Choicebox.Item
        title="Ultimate"
        description="All-inclusive plan with every feature available."
      />
      <Choicebox.Item
        title="Enterprise"
        description="Custom solutions for large-scale operations."
      />
    </Choicebox>
  )
}
