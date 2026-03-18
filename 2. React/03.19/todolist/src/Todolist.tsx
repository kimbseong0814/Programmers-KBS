import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const Todolist: React.FC = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "공부하기", isChecked: false },
    { id: 2, text: "잠자기", isChecked: false },
    { id: 3, text: "미팅하기", isChecked: false }
  ]);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      isChecked: false
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const checkTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1 className="test">오늘 할일</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="할일 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <div className="board">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => checkTodo(todo.id)}
              />
              <span className={todo.isChecked ? "done" : ""}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;