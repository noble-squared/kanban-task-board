export type Task = {
  id: number
  created_at: Date
  title: string
  description: string
  label: string
  status: string
  priority: number
  user_id: number
  due_date: Date
  comments: string[]
}


