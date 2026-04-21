import { HomeAssistant } from 'custom-card-helpers';
import { ClickUpTask } from '../types';

/**
 * Service for performing CRUD operations on ClickUp tasks
 *
 * This service handles all task updates by calling the appropriate Home Assistant services.
 * It uses both the standard todo service and ClickUp-specific services to update tasks.
 */

/**
 * Result type for service calls
 */
export interface ServiceResult {
  success: boolean;
  error?: string;
}

/**
 * Update a task's name (summary)
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity ID of the todo list
 * @param task - Task to update
 * @param newName - New task name
 * @returns Promise that resolves to a service result
 */
export async function updateTaskName(
  hass: HomeAssistant,
  entityId: string,
  task: ClickUpTask,
  newName: string
): Promise<ServiceResult> {
  try {
    if (!newName || newName.trim() === '') {
      return {
        success: false,
        error: 'Task name cannot be empty',
      };
    }

    await hass.callService('todo', 'update_item', {
      entity_id: entityId,
      item: task.uid,
      rename: newName.trim(),
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task name:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's description
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity ID of the todo list
 * @param task - Task to update
 * @param newDescription - New description (null to clear)
 * @returns Promise that resolves to a service result
 */
export async function updateTaskDescription(
  hass: HomeAssistant,
  entityId: string,
  task: ClickUpTask,
  newDescription: string | null
): Promise<ServiceResult> {
  try {
    await hass.callService('todo', 'update_item', {
      entity_id: entityId,
      item: task.uid,
      description: newDescription || null,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task description:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's status (ClickUp-specific status)
 *
 * @param hass - Home Assistant instance
 * @param task - Task to update
 * @param newStatus - New status name
 * @returns Promise that resolves to a service result
 */
export async function updateTaskStatus(
  hass: HomeAssistant,
  task: ClickUpTask,
  newStatus: string
): Promise<ServiceResult> {
  try {
    if (!task.clickup_id) {
      return {
        success: false,
        error: 'Task does not have a ClickUp ID',
      };
    }

    await hass.callService('clickup', 'update_task_status', {
      task_id: task.clickup_id,
      status: newStatus,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task status:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's priority
 *
 * @param hass - Home Assistant instance
 * @param task - Task to update
 * @param newPriority - New priority (1=Urgent, 2=High, 3=Normal, 4=Low, null=No priority)
 * @returns Promise that resolves to a service result
 */
export async function updateTaskPriority(
  hass: HomeAssistant,
  task: ClickUpTask,
  newPriority: number | null
): Promise<ServiceResult> {
  try {
    if (!task.clickup_id) {
      return {
        success: false,
        error: 'Task does not have a ClickUp ID',
      };
    }

    if (newPriority !== null && (newPriority < 1 || newPriority > 4)) {
      return {
        success: false,
        error: 'Priority must be between 1 and 4, or null',
      };
    }

    await hass.callService('clickup', 'update_task_priority', {
      task_id: task.clickup_id,
      priority: newPriority,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task priority:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's due date
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity ID of the todo list
 * @param task - Task to update
 * @param newDueDate - New due date (Date object, ISO string, or null to clear)
 * @returns Promise that resolves to a service result
 */
export async function updateTaskDueDate(
  hass: HomeAssistant,
  entityId: string,
  task: ClickUpTask,
  newDueDate: Date | string | null
): Promise<ServiceResult> {
  try {
    let dueDateValue: string | null = null;

    if (newDueDate) {
      if (newDueDate instanceof Date) {
        dueDateValue = newDueDate.toISOString().split('T')[0];
      } else {
        dueDateValue = newDueDate;
      }
    }

    await hass.callService('todo', 'update_item', {
      entity_id: entityId,
      item: task.uid,
      due: dueDateValue,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task due date:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's start date
 *
 * @param hass - Home Assistant instance
 * @param task - Task to update
 * @param newStartDate - New start date (Date object, ISO string, timestamp, or null to clear)
 * @returns Promise that resolves to a service result
 */
export async function updateTaskStartDate(
  hass: HomeAssistant,
  task: ClickUpTask,
  newStartDate: Date | string | number | null
): Promise<ServiceResult> {
  try {
    if (!task.clickup_id) {
      return {
        success: false,
        error: 'Task does not have a ClickUp ID',
      };
    }

    let startDateValue: number | null = null;

    if (newStartDate) {
      if (newStartDate instanceof Date) {
        startDateValue = newStartDate.getTime();
      } else if (typeof newStartDate === 'string') {
        startDateValue = new Date(newStartDate).getTime();
      } else {
        startDateValue = newStartDate;
      }
    }

    await hass.callService('clickup', 'update_task_start_date', {
      task_id: task.clickup_id,
      start_date: startDateValue,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task start date:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's assignees
 *
 * @param hass - Home Assistant instance
 * @param task - Task to update
 * @param assigneeIds - Array of assignee user IDs
 * @returns Promise that resolves to a service result
 */
export async function updateTaskAssignees(
  hass: HomeAssistant,
  task: ClickUpTask,
  assigneeIds: number[]
): Promise<ServiceResult> {
  try {
    if (!task.clickup_id) {
      return {
        success: false,
        error: 'Task does not have a ClickUp ID',
      };
    }

    // Note: This assumes the ClickUp integration has an update_task_assignees service
    // If not available, this may need to be handled differently
    await hass.callService('clickup', 'update_task_assignees', {
      task_id: task.clickup_id,
      assignees: assigneeIds,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task assignees:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a task's tags
 *
 * @param hass - Home Assistant instance
 * @param task - Task to update
 * @param tags - Array of tag names
 * @returns Promise that resolves to a service result
 */
export async function updateTaskTags(
  hass: HomeAssistant,
  task: ClickUpTask,
  tags: string[]
): Promise<ServiceResult> {
  try {
    if (!task.clickup_id) {
      return {
        success: false,
        error: 'Task does not have a ClickUp ID',
      };
    }

    // Note: This assumes the ClickUp integration has an update_task_tags service
    // If not available, this may need to be handled differently
    await hass.callService('clickup', 'update_task_tags', {
      task_id: task.clickup_id,
      tags: tags,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating task tags:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Update a custom field value
 *
 * @param hass - Home Assistant instance
 * @param task - Task to update
 * @param fieldId - Custom field ID
 * @param value - New field value
 * @returns Promise that resolves to a service result
 */
export async function updateCustomField(
  hass: HomeAssistant,
  task: ClickUpTask,
  fieldId: string,
  value: any
): Promise<ServiceResult> {
  try {
    if (!task.clickup_id) {
      return {
        success: false,
        error: 'Task does not have a ClickUp ID',
      };
    }

    // Note: This assumes the ClickUp integration has an update_custom_field service
    // The actual service name and parameters may vary
    await hass.callService('clickup', 'update_custom_field', {
      task_id: task.clickup_id,
      field_id: fieldId,
      value: value,
    });

    return { success: true };
  } catch (err) {
    console.error('Error updating custom field:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Delete a task
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity ID of the todo list
 * @param task - Task to delete
 * @returns Promise that resolves to a service result
 */
export async function deleteTask(
  hass: HomeAssistant,
  entityId: string,
  task: ClickUpTask
): Promise<ServiceResult> {
  try {
    await hass.callService('todo', 'remove_item', {
      entity_id: entityId,
      item: task.uid,
    });

    return { success: true };
  } catch (err) {
    console.error('Error deleting task:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Toggle a task's completion status
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity ID of the todo list
 * @param task - Task to toggle
 * @returns Promise that resolves to a service result
 */
export async function toggleTaskCompletion(
  hass: HomeAssistant,
  entityId: string,
  task: ClickUpTask
): Promise<ServiceResult> {
  try {
    const newStatus = task.status === 'completed' ? 'needs_action' : 'completed';

    await hass.callService('todo', 'update_item', {
      entity_id: entityId,
      item: task.uid,
      status: newStatus,
    });

    return { success: true };
  } catch (err) {
    console.error('Error toggling task completion:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
