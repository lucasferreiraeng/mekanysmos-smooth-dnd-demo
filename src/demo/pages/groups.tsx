import React, { useState } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems, DropResult } from './utils';

const groupStyle: React.CSSProperties = {
  marginLeft: '50px',
  flex: 1
};

interface Item {
  id: string;
  data: string;
}

const Groups: React.FC = () => {
  const [items1, setItems1] = useState<Item[]>(generateItems(15, (i) => ({ id: '1' + i, data: `Draggable 1 - ${i}` })));
  const [items2, setItems2] = useState<Item[]>(generateItems(15, (i) => ({ id: '2' + i, data: `Draggable 2 - ${i}` })));
  const [items3, setItems3] = useState<Item[]>(generateItems(15, (i) => ({ id: '3' + i, data: `Draggable 3 - ${i}` })));
  const [items4, setItems4] = useState<Item[]>(generateItems(15, (i) => ({ id: '4' + i, data: `Draggable 4 - ${i}` })));

  return (
    <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px' }}>
      <div style={groupStyle}>
        <Container groupName="1" getChildPayload={i => items1[i]} onDrop={(e: DropResult) => setItems1(applyDrag(items1, e))}>
          {
            items1.map(p => {
              return (
                <Draggable key={p.id}>
                  <div className="draggable-item">
                    {p.data}
                  </div>
                </Draggable>
              );
            })
          }
        </Container>
      </div>
      <div style={groupStyle}>
        <Container groupName="1" getChildPayload={i => items2[i]} onDrop={(e: DropResult) => setItems2(applyDrag(items2, e))}>
          {
            items2.map(p => {
              return (
                <Draggable key={p.id}>
                  <div className="draggable-item">
                    {p.data}
                  </div>
                </Draggable>
              );
            })
          }
        </Container>
      </div>
      <div style={groupStyle}>
        <Container groupName="1" getChildPayload={i => items3[i]} onDrop={(e: DropResult) => setItems3(applyDrag(items3, e))}>
          {
            items3.map(p => {
              return (
                <Draggable key={p.id}>
                  <div className="draggable-item">
                    {p.data}
                  </div>
                </Draggable>
              );
            })
          }
        </Container>
      </div>
      <div style={groupStyle}>
        <Container groupName="1" getChildPayload={i => items4[i]} onDrop={(e: DropResult) => setItems4(applyDrag(items4, e))}>
          {
            items4.map(p => {
              return (
                <Draggable key={p.id}>
                  <div className="draggable-item">
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

export default Groups;
