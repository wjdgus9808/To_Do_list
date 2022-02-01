import { stringify } from "querystring";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, customCategory, IToDo, toDoState } from "./atoms";

const Btn = styled.button`
  border: none;
  border-radius: 10px;
  margin: 10px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const custom = useRecoilValue(customCategory);
  const Delete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newAry = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];

      const oldToDo = oldToDos[targetIndex];
      return newAry;
    });
  };
  const onClick = (newCategory: IToDo["category"]) => {
    console.log("i wanna to ", newCategory);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newCat = { text, id, category: newCategory };
      console.log(newCat);
      const oldToDo = oldToDos[targetIndex];
      console.log(oldToDo);
      const newAry = [
        ...oldToDos.slice(0, targetIndex),
        newCat,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("ToDos", JSON.stringify(newAry));
      return newAry;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {/* 인자가 있는 함수를 넘겨 줄 때는 onClick={()=>{function()}}  이런식으로 넘겨줌 */}

      {/* {category !== Categories.DOING && (
        <Btn onClick={() => onClick("DOING")}>Doing</Btn>
      )}
      {category !== Categories.TO_DO && (
        <Btn onClick={() => onClick(Categories.TO_DO)}>TO_DO</Btn>
      )}
      {category !== Categories.DONE && (
        <Btn onClick={() => onClick(Categories.DONE)}>DONE</Btn>
      )} */}
      {custom.map((data) => {
        return (
          category !== data && (
            <Btn key={data} onClick={() => onClick(data)}>
              {data}
            </Btn>
          )
        );
      })}
      <Btn onClick={() => Delete()}>Delete</Btn>
    </li>
  );
}
export default ToDo;
