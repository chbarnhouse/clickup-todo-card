import { ClickUpTask, ClickUpTodoCardConfig } from '../types';

/**
 * Apply all configured filters to tasks
 */
export function filterTasks(tasks: ClickUpTask[], config: ClickUpTodoCardConfig): ClickUpTask[] {
  let filtered = [...tasks];

  if (!config.filters) return filtered;

  // Filter by status
  if (config.filters.status?.length) {
    filtered = filtered.filter(task => {
      const status = task.clickup_status?.status;
      return status && config.filters!.status!.includes(status);
    });
  }

  // Filter by priority
  if (config.filters.priority?.length) {
    filtered = filtered.filter(task => {
      // Handle null priority explicitly
      const priority = task.priority === null ? null : task.priority;
      return config.filters!.priority!.includes(priority as number);
    });
  }

  // Filter by tags
  if (config.filters.tags?.length) {
    filtered = filtered.filter(task => {
      if (!task.tags?.length) return false;
      return task.tags.some(tag =>
        config.filters!.tags!.includes(tag.name)
      );
    });
  }

  // Filter by assignees
  if (config.filters.assignees?.length) {
    filtered = filtered.filter(task => {
      if (!task.assignees?.length) return false;
      return task.assignees.some(assignee =>
        config.filters!.assignees!.includes(assignee.id.toString())
      );
    });
  }

  // Filter by due date range
  if (config.filters.due_date_range) {
    const { start, end } = config.filters.due_date_range;

    filtered = filtered.filter(task => {
      if (!task.due) return false;

      const dueDate = new Date(task.due);
      const dueTime = dueDate.getTime();

      if (start) {
        const startTime = new Date(start).getTime();
        if (dueTime < startTime) return false;
      }

      if (end) {
        const endTime = new Date(end).getTime();
        if (dueTime > endTime) return false;
      }

      return true;
    });
  }

  return filtered;
}

/**
 * Filter tasks by search query (summary, description)
 */
export function searchTasks(tasks: ClickUpTask[], query: string): ClickUpTask[] {
  if (!query || query.trim() === '') return tasks;

  const lowerQuery = query.toLowerCase().trim();

  return tasks.filter(task => {
    const summary = task.summary?.toLowerCase() || '';
    const description = task.description?.toLowerCase() || '';

    return summary.includes(lowerQuery) || description.includes(lowerQuery);
  });
}

/**
 * Check if a task matches a quick filter
 */
export function matchesQuickFilter(task: ClickUpTask, filter: string): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter) {
    case 'overdue':
      if (!task.due || task.status === 'completed') return false;
      return new Date(task.due) < now;

    case 'today':
      if (!task.due) return false;
      const dueDate = new Date(task.due);
      const dueDay = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      return dueDay.getTime() === today.getTime();

    case 'this_week':
      if (!task.due) return false;
      const weekFromToday = new Date(today);
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      const taskDue = new Date(task.due);
      return taskDue >= today && taskDue <= weekFromToday;

    case 'no_due_date':
      return !task.due;

    case 'high_priority':
      return task.priority === 1 || task.priority === 2;

    case 'assigned_to_me':
      // This would require user ID from Home Assistant
      // For now, just check if task has assignees
      return task.assignees && task.assignees.length > 0;

    case 'unassigned':
      return !task.assignees || task.assignees.length === 0;

    default:
      return true;
  }
}
