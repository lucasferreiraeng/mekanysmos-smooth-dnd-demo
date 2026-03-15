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

const Horizontal: React.FC = () => {
  const [items1, setItems1] = useState<Item[]>(generateItems(5, (i) => ({ id: '1' + i, data: `Draggable 1 - ${i}` })));
  const [items2, setItems2] = useState<Item[]>(generateItems(15, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
  const [items3, setItems3] = useState<Item[]>(generateItems(15, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })));

  return (
    <div>
      <Container groupName="1" orientation="horizontal" style={groupStyle} getChildPayload={i => items1[i]} onDrop={(e: DropResult) => setItems1(applyDrag(items1, e))}>
        {
          items1.map(p => {
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
      <div style={groupStyle}>
        <Container groupName="1" orientation="horizontal" getChildPayload={i => items2[i]} onDrop={(e: DropResult) => setItems2(applyDrag(items2, e))}>
          {
            items2.map(p => {
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
      <div style={groupStyle}>
        <Container groupName="1" orientation="horizontal" getChildPayload={i => items3[i]} onDrop={(e: DropResult) => setItems3(applyDrag(items3, e))}>
          {
            items3.map(p => {
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

export default Horizontal;
