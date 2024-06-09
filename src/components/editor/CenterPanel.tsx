'use client'

import { useState } from 'react'

const characters = ['A', 'B', 'C', 'D', 'E']

export default function CenterPanel() {
  const [letters, setLetters] = useState(
    characters.map((character) => ({
      id: character,
    }))
  )

  return <div className="grow p-16"></div>
}
