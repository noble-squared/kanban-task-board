import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import type { Session, User } from '@supabase/supabase-js'
import type { Task } from './types';

const tableName = "tasks";

const todoColumnName = "To do"
const inProgressColumnName = "In progress"
const inReviewColumnName = "In review"
const doneColumnName = "Done"

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [error, setError] = useState<string>('');
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
		async function init() {
			//log in
			const { data, error } = await supabase.auth.signInAnonymously();

			if (error) {
				setError(error.message);
				console.error(error);
				return;
			}

			const session = data.session ?? null;
			const user = data.session?.user ?? null;

			setUser(user);
			setSession(session);

			if (!user) {
				console.error("Not authenticated");
				setError("Not authenticated");
				return;
			}

			//get tasks
			const { data: tasks } = await supabase.from(tableName).select()

      if (tasks) {
        setTasks(tasks)
      }

			//initiate board for new user
			if(!tasks || tasks.length === 0) {
				const { data, error } = await supabase.from(tableName).insert([
					{ 
						title: "Get started with your Kanban board", 
						description: "Increase your team's efficiency with our task management boards.",
						label: "get started",
						status: todoColumnName,
						priority: 4,
						user_id: user?.id 
					},
					{
						title: "Click on a task to expand it", 
						description: "To delete a task, click the trash can at the bottom. To mark progress on a task, drag it to a different column.",
						label: "get started",
						status: todoColumnName,
						priority: 4,
						user_id: user?.id 
					}
				]).select();

				if (error) {
					console.error(error);
					setError(error.message);
				} else setTasks(data);
			}
		}

    init();
		setLoading(false);
  }, []);

  return (
		<>
			<main>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<ul>
						{tasks.map((task) => (
							<li key={task.id}> {task.title} + {task.description} + {task.status} + {task.user_id} </li>
						))}
					</ul>
				)}
			</main>
		</>
  )
}

export default App
