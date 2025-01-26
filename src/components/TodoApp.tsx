import {
  PlusIcon,
  SmileIcon,
  Sun,
  TimerIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TodoType = {
  id: number;
  title: string;
  timer: number;
};

type FormType = {
  title: string;
  timer: number;
};

const TodoApp = () => {
  const { handleSubmit, register, reset } = useForm<FormType>();

  const [todos, setTodos] = useState<TodoType[]>([]);

  const [toggleForm, setToggleForm] = useState(false);

  const toggleAddForm = () => {
    setToggleForm((prev) => !prev);
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const handleAddTodo = (newTodo: TodoType) => {
    if (newTodo.title && newTodo.timer)
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
  };

  const onSubmit: SubmitHandler<FormType> = ({ timer, title }) => {
    const newTodo = {
      id: Math.random(),
      timer,
      title,
    };

    handleAddTodo(newTodo);

    reset();
  };

  return (
    <main className="text-white pt-8 pb-4 w-screen h-screen">
      <div className="container max-w-3xl px-8 md:px-0 mx-auto flex flex-col h-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl flex items-center gap-2">
              Good morning!
              <Sun className="text-amber-400" />
            </h1>
            <p className="opacity-60">Let's see what we've got to do today.</p>
          </div>

          <div className="grid place-content-center gap-4 grid-cols-1">
            <AnimatePresence>
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    layout
                    className="bg-zinc-900 p-4 rounded-lg flex items-center justify-between border-zinc-800 border-4"
                  >
                    <div className="flex items-center gap-2">
                      <motion.input
                        type="checkbox"
                        className="accent-indigo-600 size-5"
                        whileTap={{
                          width: "24px",
                          height: "24px",
                        }}
                      />
                      <p className="text-xl font-medium">{todo.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="p-2 bg-gray-400 rounded items-center justify-center flex gap-1 text-gray-900">
                        <span>
                          <TimerIcon />
                        </span>
                        {todo.timer} mins
                      </p>
                      <span
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="cursor-pointer text-red-800 bg-red-400 rounded p-2"
                      >
                        <Trash2Icon />
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  layout
                  className="flex items-center gap-2 place-self-center"
                >
                  Fill your day with some todos <SmileIcon /> ...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col gap-4">
          <AnimatePresence>
            {toggleForm && (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                className="p-4 rounded-lg bg-zinc-900 border-4 border-zinc-700 shadow-2xl"
              >
                <input
                  {...register("title")}
                  type="text"
                  className="outline-none p-4 w-full mb-4 bg-zinc-800 rounded-lg"
                  placeholder="what's your goal for today?"
                />

                <div className="flex items justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      {...register("timer")}
                      type="number"
                      className="outline-none bg-zinc-700 rounded-lg w-16 p-2 text-center"
                    />
                    <p>minutes</p>
                  </div>
                  <div className="right">
                    <button className="bg-indigo-800 p-2 rounded-lg hover:opacity-80 transition cursor-pointer">
                      Submit
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
          <button
            onClick={toggleAddForm}
            className="bg-zinc-900 hover:bg-zinc-950 transition cursor-pointer border-4 border-zinc-700 flex items-center justify-center p-4 rounded-full w-full"
          >
            <PlusIcon
              className={`transition ${toggleForm ? "rotate-45" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export default TodoApp;
