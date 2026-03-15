import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

interface Item {
  id: number;
  data: string;
  height: string;
}

const Height: React.FC = () => {
  const [items, setItems] = useState<Item[]>(
    generateItems(50, (index) => ({
      id: index,
      data: 'Draggable' + index,
      height: `${(40 + Math.random() * 200).toFixed()}px`
    }))
  );

  return (
    <div>
      <div className="simple-page">
        <Container onDrop={(e: DropResult) => setItems(applyDrag(items, e))}>
          {items.map(p => {
            return (
              <Draggable key={p.id}>
                <div className="draggable-item" style={{ height: p.height }}>
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

export default Height;
