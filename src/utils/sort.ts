import { ClickUpTask, ClickUpTodoCardConfig } from '../types';

/**
 * Sort tasks based on configuration
 */
export function sortTasks(tasks: ClickUpTask[], config: ClickUpTodoCardConfig): ClickUpTask[] {
  const sorted = [...tasks];
  const sortBy = config.sort_by || 'due_date';
  const sortOrder = config.sort_order || 'asc';

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'due_date':
        comparison = compareDates(a.due, b.due);
        break;

      case 'start_date':
        comparison = compareDates(a.start_date, b.start_date);
        break;

      case 'priority':
        comparison = comparePriority(a.priority, b.priority);
        break;

      case 'name':
        comparison = (a.summary || '').localeCompare(b.summary || '');
        break;

      case 'status':
        comparison = compareStatus(a, b);
        break;

      default:
        comparison = 0;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

/**
 * Compare two dates (undefined dates go to the end)
 */
function compareDates(
  a: Date | number | string | undefined,
  b: Date | number | string | undefined
): number {
  // Undefined dates go to the end
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();

  return dateA - dateB;
}

/**
 * Compare priorities (1=Urgent is highest, null goes to end)
 */
function comparePriority(
  a: number | null | undefined,
  b: number | null | undefined
): number {
  // Null/undefined priorities go to the end
  if ((a === null || a === undefined) && (b === null || b === undefined)) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;

  // Lower number = higher priority (1 is highest)
  return a - b;
}

/**
 * Compare by status (open first, then closed)
 */
function compareStatus(a: ClickUpTask, b: ClickUpTask): number {
  const aStatus = a.clickup_status?.status || '';
  const bStatus = b.clickup_status?.status || '';

  const aType = a.clickup_status?.type || '';
  const bType = b.clickup_status?.type || '';

  // First sort by type (open before closed)
  if (aType !== bType) {
    if (aType === 'open') return -1;
    if (bType === 'open') return 1;
    if (aType === 'closed') return 1;
    if (bType === 'closed') return -1;
  }

  // Then sort by status name
  return aStatus.localeCompare(bStatus);
}

/**
 * Group tasks by a field
 */
export function groupTasks(
  tasks: ClickUpTask[],
  groupBy: string,
  groupFieldId?: string
): Map<string, ClickUpTask[]> {
  const groups = new Map<string, ClickUpTask[]>();

  if (groupBy === 'none') {
    groups.set('all', tasks);
    return groups;
  }

  tasks.forEach(task => {
    let groupKey: string;

    switch (groupBy) {
      case 'status':
        groupKey = task.clickup_status?.status || 'No Status';
        break;

      case 'priority':
        groupKey = getPriorityLabel(task.priority);
        break;

      case 'assignee':
        if (task.assignees && task.assignees.length > 0) {
          // Create separate group for each assignee
          task.assignees.forEach(assignee => {
            const key = assignee.username || 'Unknown';
            if (!groups.has(key)) {
              groups.set(key, []);
            }
            groups.get(key)!.push(task);
          });
          return; // Skip the standard grouping below
        } else {
          groupKey = 'Unassigned';
        }
        break;

      case 'custom_field':
        if (groupFieldId && task.custom_fields) {
          const field = task.custom_fields.find(f => f.id === groupFieldId);
          groupKey = field?.value?.toString() || 'No Value';
        } else {
          groupKey = 'Uncategorized';
        }
        break;

      default:
        groupKey = 'All Tasks';
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(task);
  });

  return groups;
}

/**
 * Get priority label
 */
function getPriorityLabel(priority: number | null | undefined): string {
  if (priority === null || priority === undefined) return 'No Priority';

  switch (priority) {
    case 1:
      return 'Urgent';
    case 2:
      return 'High';
    case 3:
      return 'Normal';
    case 4:
      return 'Low';
    default:
      return 'Unknown';
  }
}
