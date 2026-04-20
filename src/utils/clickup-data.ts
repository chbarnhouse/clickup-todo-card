import { TodoItem, ClickUpTask, ClickUpEntityAttributes, ExtendedHassEntity } from '../types';

/**
 * Parse ClickUp tasks from entity attributes
 * Uses clickup_tasks directly from the ClickUp integration
 */
export function parseClickUpTasks(entity: ExtendedHassEntity): ClickUpTask[] {
  const attributes = entity.attributes as ClickUpEntityAttributes;
  const clickupTasks = attributes.clickup_tasks || [];

  // Map ClickUp tasks directly to ClickUpTask format
  return clickupTasks.map((task: any) => {
    // Determine status based on ClickUp status type
    const status = task.status?.type === 'closed' ? 'completed' : 'needs_action';

    // Parse due date if present
    let due: Date | undefined;
    if (task.due_date) {
      const timestamp = parseInt(task.due_date);
      if (!isNaN(timestamp)) {
        due = new Date(timestamp);
      }
    }

    // Parse start date if present
    let startDate: number | undefined;
    if (task.start_date) {
      const timestamp = parseInt(task.start_date);
      if (!isNaN(timestamp)) {
        startDate = timestamp;
      }
    }

    const clickupTask: ClickUpTask = {
      uid: task.id,
      summary: task.name,
      status: status,
      description: task.description || undefined,
      due: due,
      clickup_id: task.id,
      start_date: startDate,
      clickup_status: task.status,
      priority: task.priority,
      tags: task.tags || [],
      assignees: task.assignees || [],
      custom_fields: task.custom_fields || [],
      time_estimate: task.time_estimate,
      points: task.points,
      list: task.list,
      space: task.space,
      // Pass through enriched fields from integration
      list_info: task.list_info,
      space_info: task.space_info,
      folder_info: task.folder_info,
    };

    return clickupTask;
  });
}

/**
 * Get unique statuses from tasks
 */
export function getUniqueStatuses(tasks: ClickUpTask[]): Array<{value: string, label: string}> {
  const statusMap = new Map<string, string>();

  tasks.forEach(task => {
    if (task.clickup_status?.status) {
      statusMap.set(task.clickup_status.status, task.clickup_status.status);
    }
  });

  return Array.from(statusMap.entries()).map(([value, label]) => ({
    value,
    label
  })).sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Get unique statuses with colors from tasks
 */
export function getUniqueStatusesWithColors(tasks: ClickUpTask[]): Array<{
  name: string;
  color: string;
  type: string;
}> {
  const statusMap = new Map<string, {name: string, color: string, type: string}>();

  tasks.forEach(task => {
    if (task.clickup_status?.status) {
      statusMap.set(task.clickup_status.status, {
        name: task.clickup_status.status,
        color: task.clickup_status.color || '#d3d3d3',
        type: task.clickup_status.type || 'custom',
      });
    }
  });

  return Array.from(statusMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get unique tags from tasks
 */
export function getUniqueTags(tasks: ClickUpTask[]): Array<{value: string, label: string}> {
  const tagSet = new Set<string>();

  tasks.forEach(task => {
    task.tags?.forEach(tag => {
      if (tag.name) {
        tagSet.add(tag.name);
      }
    });
  });

  return Array.from(tagSet).map(tag => ({
    value: tag,
    label: tag
  })).sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Get unique assignees from tasks
 */
export function getUniqueAssignees(tasks: ClickUpTask[]): Array<{value: string, label: string}> {
  const assigneeMap = new Map<string, string>();

  tasks.forEach(task => {
    task.assignees?.forEach(assignee => {
      if (assignee.id && assignee.username) {
        assigneeMap.set(assignee.id.toString(), assignee.username);
      }
    });
  });

  return Array.from(assigneeMap.entries()).map(([value, label]) => ({
    value,
    label
  })).sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Get available custom fields from tasks
 */
export function getAvailableCustomFields(tasks: ClickUpTask[]): Array<{value: string, label: string}> {
  const fieldMap = new Map<string, string>();

  tasks.forEach(task => {
    task.custom_fields?.forEach(field => {
      if (field.id && field.name) {
        fieldMap.set(field.id, field.name);
      }
    });
  });

  return Array.from(fieldMap.entries()).map(([value, label]) => ({
    value,
    label
  })).sort((a, b) => a.label.localeCompare(b.label));
}
