import React, { useState, useRef, useEffect } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { applyDrag, generateItems } from './utils';
import container from 'smooth-dnd';

const groupStyle: React.CSSProperties = {
  margin: '50px',
  overflowX: 'auto',
};

interface DraggableItem {
  id: number;
  type: string;
  data: string;
  items?: DraggableItem[];
}

const createInitialItems = (): DraggableItem[] => {
  const items: DraggableItem[] = generateItems(30, (i) => ({
    id: i, type: 'draggable', data: `Container 1 Draggable - ${i}`
  }));

  const items2: DraggableItem[] = generateItems(5, (i) => ({
    id: i, type: 'draggable', data: `Container 2 Draggable - ${i}`
  }));

  const items3: DraggableItem[] = generateItems(4, (i) => ({
    id: i, type: 'draggable', data: `Container 3 Draggable - ${i}`
  }));

  items[5] = {
    id: 5, type: 'container', data: items[5].data, items: items2
  };

  items[9] = {
    id: 9, type: 'container', data: items[9].data, items: items3
  };

  return items;
};

const VanillaNested: React.FC = () => {
  const [items] = useState<DraggableItem[]>(createInitialItems);
  const parentContainerRef = useRef<HTMLDivElement | null>(null);
  const childContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (parentContainerRef.current) {
      container(parentContainerRef.current);
    }
    childContainersRef.current.forEach(el => {
      if (el) container(el);
    });
  }, []);

  return (
    <div>
      <div className="simple-page" style={{ border: '1px solid #ddd' }}>
        <div ref={parentContainerRef}>
          {items.map((p, i) => {
            if (p.type === 'draggable') {
              return (
                <div key={i}>
                  <div className="draggable-item">
                    {p.data}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i}>
                  <div style={{ padding: '20px 20px', backgroundColor: '#888' }}>
                    <div ref={e => { childContainersRef.current[i] = e; }}>
                      {p.items!.map((q, j) => {
                        return (
                          <div key={j}>
                            <div className="draggable-item">
                              {q.data}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default VanillaNested;
