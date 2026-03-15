export interface DropResult {
  removedIndex: number | null;
  addedIndex: number | null;
  payload?: any;
}

export const applyDrag = <T>(arr: T[], dragResult: DropResult): T[] => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const generateItems = <T>(count: number, creator: (index: number) => T): T[] => {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};
