import useTodoList from "../hooks/useTodoList";
import Sidebar from "../components/sidebar/Sidebar";
import TodoInput from "../components/todo/TodoInput";
import TodoList from "../components/todo/TodoList";
import styles from "../styles/TodoApp.module.css";
import Clock from "../components/common/Clock";

const TodoApp: React.FC = () => {
  const {
    todos,
    done,
    inputValue,
    setInputValue,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
    editingTodoId,
    editingText,
    setEditingText,
    startEditing,
    saveEditing,
    cancelEditing,
  } = useTodoList();

  return (
    <div className={styles.todoApp}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TodoInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddTodo={handleAddTodo}
        />
        <TodoList
          todos={todos}
          done={done}
          handleToggleTodo={handleToggleTodo} 
          handleDeleteTodo={handleDeleteTodo}
          editingTodoId={editingTodoId}
          editingText={editingText}
          setEditingText={setEditingText}
          startEditing={startEditing}
          saveEditing={saveEditing}
          cancelEditing={cancelEditing}
        />
        <div className={styles.clockWrapper}>
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
