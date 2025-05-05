import { useState } from "react"
import { addTask, removeTask, toggleCompleted } from "./features/tasks/tasksSlice"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./app/store"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Checkbox } from "@mui/material";
import { MdDelete } from "react-icons/md";

function App() {
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTask(text))
      setText('')
    }
  }
  return (
    <div className="bg-gray-100 h-screen text-white flex flex-col gap-5 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <TextField id="outlined-basic" label="Add new task..." variant="standard" type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" variant="contained">Add</Button>
      </form>
      <ul className="grid grid-cols-1 gap-2">
        {tasks.map((task) => (
          <li className="list-none flex items-center justify-between  p-2 rounded-lg bg-gray-400" key={task.id}>
            <Checkbox checked={task.completed} onChange={() => dispatch(toggleCompleted(task.id))} />
            {task.title}
            <Button onClick={() => dispatch(removeTask(task.id))} color="error">
              <MdDelete size={20}/>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
