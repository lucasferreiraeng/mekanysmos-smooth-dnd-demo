import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

const groupStyle: React.CSSProperties = {
  margin: '50px',
  overflowX: 'auto',
};

interface Item {
  id: string;
  data: string;
}

const SimpleHorizontal: React.FC = () => {
  const [items, setItems] = useState<Item[]>(
    generateItems(15, (i) => ({ id: '2' + i, data: `Draggable - ${i}` }))
  );

  return (
    <div>
      <div style={groupStyle}>
        <Container orientation="horizontal" onDrop={(e: DropResult) => setItems(applyDrag(items, e))}>
          {
            items.map(p => {
              return (
                <Draggable key={p.id}>
                  <div className="draggable-item-horizontal">
                    {p.data}
                  </div>
                </Draggable>
              );
            })
          }
        </Container>
      </div>
    </div>
  );
};

export default SimpleHorizontal;
