import React, { useState } from "react";
import { Container, Draggable } from "@mekanysmos/react-smooth-dnd";
import { applyDrag, generateItems, DropResult } from "./utils";

interface DraggableItem {
  id: string;
  type: string;
  data: string;
  items?: DraggableItem[];
}

const createInitialItems = (): DraggableItem[] => {
  const items: DraggableItem[] = generateItems(30, i => ({
    id: 'item1 ' + i,
    type: "draggable",
    data: `Container 1 Draggable - ${i}`
  }));

  const items2: DraggableItem[] = generateItems(10, i => ({
    id: 'item2 ' + i,
    type: "draggable",
    data: `Container 2 Draggable - ${i}`
  }));

  items2[3] = {
    ...items2[3],
    type: "container",
    items: generateItems(4, i => ({
      id: 'item2 sub' + i,
      type: "draggable",
      data: `Container 4 Draggable - ${i}`
    }))
  };

  const items3: DraggableItem[] = generateItems(4, i => ({
    id: 'item3 ' + i,
    type: "draggable",
    data: `Container 3 Draggable - ${i}`
  }));

  items[5] = {
    ...items[5],
    type: "container",
    items: items2
  };

  items[9] = {
    ...items[9],
    type: "container",
    items: items3
  };

  return items;
};

const NestedGroup: React.FC = () => {
  const [items, setItems] = useState<DraggableItem[]>(createInitialItems);

  const containerOnDrop = (e: DropResult) => {
    console.log('level 1: Drop');
    setItems(applyDrag(items, e));
  };

  const containerOnDrop2 = (id: number, e: DropResult) => {
    console.log('level 2: Drop');
    const newItems = [...items];
    newItems[id] = { ...newItems[id], items: applyDrag(newItems[id].items!, e) };
    setItems(newItems);
  };

  const containerOnDrop3 = (id1: number, id2: number, e: DropResult) => {
    console.log('level 3: Drop');
    const newItems = [...items];
    const parentItems = [...newItems[id1].items!];
    parentItems[id2] = { ...parentItems[id2], items: applyDrag(parentItems[id2].items!, e) };
    newItems[id1] = { ...newItems[id1], items: parentItems };
    setItems(newItems);
  };

  return (
    <div>
      <div className="simple-page">
        <Container groupName="1" onDrop={containerOnDrop} getChildPayload={(i) => items[i]}>
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
                      <Container groupName="1" getChildPayload={(index) => items[i].items![index]} onDrop={e => containerOnDrop2(i, e)}>
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
                                      getChildPayload={(index) => items[i].items![j].items![index]}
                                      groupName="1"
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

export default NestedGroup;
