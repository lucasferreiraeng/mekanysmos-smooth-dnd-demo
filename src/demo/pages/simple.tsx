import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

interface Item {
  id: number;
  data: string;
}

const Simple: React.FC = () => {
  const [items, setItems] = useState<Item[]>(
    generateItems(50, (index) => ({
      id: index,
      data: 'Draggable' + index
    }))
  );

  return (
    <div>
      <div className="simple-page">
        <Container onDrop={(e: DropResult) => setItems(applyDrag(items, e))}>
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

const SimpleScroller: React.FC = () => {
  const [items, setItems] = useState<Item[]>(
    generateItems(50, (index) => ({
      id: index,
      data: 'Draggable' + index
    }))
  );

  return (
    <div>
      <div className="simple-page-scroller">
        <Container onDrop={(e: DropResult) => setItems(applyDrag(items, e))}>
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

export {
  Simple,
  SimpleScroller
};
