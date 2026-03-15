import React, { useState } from "react";
import { Container, Draggable } from "@mekanysmos/react-smooth-dnd";
import { applyDrag, generateItems, DropResult } from "./utils";

interface DraggableItem {
  id: number;
  type: string;
  data: string;
  items?: DraggableItem[];
}

const createInitialItems = (): DraggableItem[] => {
  const items: DraggableItem[] = generateItems(30, i => ({
    id: i,
    type: "draggable",
    data: `Container 1 Draggable - ${i}`
  }));

  const items2: DraggableItem[] = generateItems(10, i => ({
    id: i,
    type: "draggable",
    data: `Container 2 Draggable - ${i}`
  }));

  items2[3] = {
    id: 3,
    type: "container",
    data: items2[3].data,
    items: generateItems(4, i => ({
      id: i,
      type: "draggable",
      data: `Container 4 Draggable - ${i}`
    }))
  };

  const items3: DraggableItem[] = generateItems(4, i => ({
    id: i,
    type: "draggable",
    data: `Container 3 Draggable - ${i}`
  }));

  items[5] = {
    id: 5,
    type: "container",
    data: items[5].data,
    items: items2
  };

  items[9] = {
    id: 9,
    type: "container",
    data: items[9].data,
    items: items3
  };

  return items;
};

const Nested: React.FC = () => {
  const [items, setItems] = useState<DraggableItem[]>(createInitialItems);

  const containerOnDrop = (e: DropResult) => {
    setItems(applyDrag(items, e));
  };

  const containerOnDrop2 = (id: number, e: DropResult) => {
    const newItems = [...items];
    newItems[id] = { ...newItems[id], items: applyDrag(newItems[id].items!, e) };
    setItems(newItems);
  };

  const containerOnDrop3 = (id1: number, id2: number, e: DropResult) => {
    const newItems = [...items];
    const parentItems = [...newItems[id1].items!];
    parentItems[id2] = { ...parentItems[id2], items: applyDrag(parentItems[id2].items!, e) };
    newItems[id1] = { ...newItems[id1], items: parentItems };
    setItems(newItems);
  };

  return (
    <div>
      <div className="simple-page">
        <Container onDrop={containerOnDrop}>
          {items.map((p, i) => {
            if (p.type === "draggable") {
              return (
                <Draggable key={i}>
                  <div className="draggable-item">{p.data}</div>
                </Draggable>
              );
            } else {
              return (
                <Draggable key={i}>
                  <div
                    style={{
                      padding: "20px 20px",
                      marginTop: "2px",
                      marginBottom: "2px",
                      border: "1px solid rgba(0,0,0,.125)",
                      backgroundColor: "#fff",
                      cursor: "move"
                    }}
                  >
                    <h4 style={{ textAlign: "center" }}>
                      Nested Sortable List - {p.id}
                    </h4>
                    <div style={{ cursor: "default" }}>
                      <Container onDrop={e => containerOnDrop2(i, e)}>
                        {p.items!.map((q, j) => {
                          if (q.type === "draggable") {
                            return (
                              <Draggable key={j}>
                                <div
                                  className="draggable-item"
                                  style={{ backgroundColor: "cornsilk" }}
                                >
                                  {q.data}
                                </div>
                              </Draggable>
                            );
                          } else {
                            return (
                              <Draggable key={j}>
                                <div
                                  style={{
                                    padding: "20px 20px",
                                    marginTop: "2px",
                                    marginBottom: "2px",
                                    border: "1px solid rgba(0,0,0,.125)",
                                    backgroundColor: "cornsilk",
                                    cursor: "move"
                                  }}
                                >
                                  <h4
                                    style={{
                                      textAlign: "center"
                                    }}
                                  >
                                    Nested Sortable List - {q.id}
                                  </h4>
                                  <div style={{ cursor: "default" }}>
                                    <Container
                                      onDrop={e =>
                                        containerOnDrop3(i, j, e)
                                      }
                                    >
                                      {q.items!.map((t, y) => {
                                        return (
                                          <Draggable key={y}>
                                            <div
                                              className="draggable-item"
                                              style={{
                                                backgroundColor: "ghostwhite"
                                              }}
                                            >
                                              {t.data}
                                            </div>
                                          </Draggable>
                                        );
                                      })}
                                    </Container>
                                  </div>
                                </div>
                              </Draggable>
                            );
                          }
                        })}
                      </Container>
                    </div>
                  </div>
                </Draggable>
              );
            }
          })}
        </Container>
      </div>
    </div>
  );
};

export default Nested;
