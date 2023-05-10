import { useState } from "react";

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    const onSubmit = (e)=>{
        e.preventDefault() // Prevents the submission to the page

        if(!text){
            alert('Please enter the task')
            return
        }

        onAdd({text, date, reminder})

        setText('')
        setDate('')
        setReminder(false)
    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control" >
            <label htmlFor="">Task</label>
            <input 
                type="text" 
                value={text} 
                onChange={(e)=>setText(e.target.value)} 
                placeholder="Add Task" />
        </div>
        <div className="form-control" >
            <label htmlFor="">Date</label>
            <input 
                type="text" 
                value={date} 
                onChange={(e)=>setDate(e.target.value)} 
                placeholder="Add the Date" />
        </div>
        <div className="form-control form-control-check" >
            <label htmlFor="">Reminder</label>
            <input 
                type="checkbox" 
                checked={reminder} 
                value={reminder} 
                onChange={(e)=>setReminder(e.currentTarget.checked)}/>
        </div>
        <input 
            type="submit" 
            className="btn btn-block" 
            value="Save Task" />
    </form>
  )
}

export default AddTask