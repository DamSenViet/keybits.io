'use client'

import { useState } from 'react'
import Test from './DnDTest/Test'
import { SortableList } from './SortableList'

const characters = ['A', 'B', 'C', 'D', 'E']

export default function CenterPanel() {
  const [letters, setLetters] = useState(
    characters.map((character) => ({
      id: character,
    }))
  )

  return (
    <div className="grow p-16">
      <SortableList
        items={letters}
        onChange={setLetters}
        getId={(item) => item.id}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            {item.id}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
      <Test />
    </div>
  )
}
