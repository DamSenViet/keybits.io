import DnDContainer from './DnDContainer'
import Draggable from './Draggable'
import Droppable from './Droppable'

export default function Test() {
  return (
    <DnDContainer className="grid grid-cols-2 gap-4">
      <Draggable id={'draggable'}></Draggable>
      <Droppable id={'droppable'}></Droppable>
    </DnDContainer>
  )
}
