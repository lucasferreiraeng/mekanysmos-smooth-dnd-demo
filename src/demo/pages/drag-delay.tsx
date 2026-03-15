import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

interface Item {
  id: number;
  data: string;
}

const DragDelay: React.FC = () => {
  const [items, setItems] = useState<Item[]>(
    generateItems(50, (index) => ({
      id: index,
      data: 'Draggable' + index
    }))
  );

  return (
    <div>
      <div className="simple-page">
        <Container dragBeginDelay={500} dragClass="form-ghost" dropClass="form-ghost-drop" onDrop={(e: DropResult) => setItems(applyDrag(items, e))}>
          {items.map(p => {
            return (
              <Draggable key={p.id}>
                <div className="draggable-item">
                  {p.data}
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    </div>
  );
};

export default DragDelay;
