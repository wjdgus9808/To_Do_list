import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}
export interface IToDo {
  text: string;
  category: string;
  id: number;
}
export const customCategory = atom<string[]>({
  key: "custom",
  default: ["TO_DO", "DOING", "DONE"],
});
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});
// atom을 가져다가 output을 변경 할 수 있음 state는 그대로 있고 output만 변경 state를 조작해서 원하는방식으로 체계화
export const toDoSelector = selector({
  key: "toDoSelector",
  //get함수로 atom을 가져옴
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
