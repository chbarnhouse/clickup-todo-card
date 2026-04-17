import { TodoItem, ClickUpTask, ClickUpEntityAttributes, ExtendedHassEntity } from '../types';

/**
 * Parse ClickUp tasks from entity attributes
 * Merges standard TodoItem data with full ClickUp task data
 */
export function parseClickUpTasks(entity: ExtendedHassEntity): ClickUpTask[] {
  const attributes = entity.attributes as ClickUpEntityAttributes;
  const todoItems = attributes.todo_items || [];
  const clickupTasks = attributes.clickup_tasks || [];

  // Merge TodoItem with ClickUp data
  return todoItems.map((item: TodoItem) => {
    const clickupData = clickupTasks.find((t: any) => t.id === item.uid) || {};

    const task: ClickUpTask = {
      ...item,
      clickup_id: item.uid,
      start_date: clickupData.start_date,
      clickup_status: clickupData.status,
      priority: clickupData.priority,
      tags: clickupData.tags || [],
      assignees: clickupData.assignees || [],
      custom_fields: clickupData.custom_fields || [],
      time_estimate: clickupData.time_estimate,
      points: clickupData.points,
      list: clickupData.list,
      space: clickupData.space,
    };

    return task;
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
