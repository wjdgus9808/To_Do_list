import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  Categories,
  categoryState,
  customCategory,
  toDoSelector,
  toDoState,
} from "./atoms";
import CreateToDo, { IForm } from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const custom = useRecoilValue(customCategory);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const setCategory = useSetRecoilState(categoryState);
  const setCustomCategory = useSetRecoilState(customCategory);
  const onCustomValid = ({ custom }: IForm) => {
    setCustomCategory((category) => [...category, custom]);
    setValue("custom", "");
  };
  console.log(custom);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    return console.log(event.currentTarget.value);
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      {/* <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select> */}
      <select value={category} onInput={onInput}>
        {custom.map((data) => {
          return (
            <option key={data} value={data}>
              {data}
            </option>
          );
        })}
      </select>
      <CreateToDo></CreateToDo>
      <form onSubmit={handleSubmit(onCustomValid)}>
        <input
          {...register("custom", { required: "Please write a category" })}
          placeholder="Write category"
        />
        <button>Add</button>
      </form>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
