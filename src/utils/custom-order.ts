/**
 * Utility for managing custom task order in localStorage
 */

const STORAGE_KEY_PREFIX = 'clickup-card-order-';

/**
 * Get the storage key for a specific entity
 */
function getStorageKey(entityId: string): string {
  return `${STORAGE_KEY_PREFIX}${entityId}`;
}

/**
 * Save custom task order to localStorage
 */
export function saveCustomOrder(entityId: string, taskIds: string[]): void {
  try {
    const key = getStorageKey(entityId);
    localStorage.setItem(key, JSON.stringify(taskIds));
  } catch (err) {
    console.error('Error saving custom order:', err);
  }
}

/**
 * Load custom task order from localStorage
 */
export function loadCustomOrder(entityId: string): string[] | null {
  try {
    const key = getStorageKey(entityId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error('Error loading custom order:', err);
    return null;
  }
}

/**
 * Clear custom task order for an entity
 */
export function clearCustomOrder(entityId: string): void {
  try {
    const key = getStorageKey(entityId);
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error clearing custom order:', err);
  }
}

/**
 * Apply custom order to tasks
 */
export function applyCustomOrder<T extends { uid: string }>(
  tasks: T[],
  customOrder: string[]
): T[] {
  // Create a map for quick lookup
  const taskMap = new Map(tasks.map(task => [task.uid, task]));

  // Build ordered array based on custom order
  const orderedTasks: T[] = [];
  const orderedIds = new Set<string>();

  // First, add tasks in custom order
  for (const uid of customOrder) {
    const task = taskMap.get(uid);
    if (task) {
      orderedTasks.push(task);
      orderedIds.add(uid);
    }
  }

  // Then add any tasks not in custom order (new tasks)
  for (const task of tasks) {
    if (!orderedIds.has(task.uid)) {
      orderedTasks.push(task);
    }
  }

  return orderedTasks;
}
