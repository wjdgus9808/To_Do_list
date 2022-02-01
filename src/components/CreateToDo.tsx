import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, customCategory, toDoState } from "./atoms";

export interface IForm {
  toDo: string;
  custom: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const userCategory = useRecoilValue(customCategory);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onValid = ({ toDo, custom }: IForm) => {
    console.log("add to Do", toDo);
    setValue("toDo", "");

    setToDos((toDos) => [{ text: toDo, category, id: Date.now() }, ...toDos]);
  };

  console.log(userCategory);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write to do"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
