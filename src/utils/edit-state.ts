import { ClickUpTask } from '../types';

/**
 * Represents which field is currently being edited
 */
export type EditableField =
  | 'name'
  | 'description'
  | 'status'
  | 'priority'
  | 'start_date'
  | 'due_date'
  | 'assignees'
  | 'tags'
  | 'custom_field';

/**
 * Interface for active edit state
 */
export interface EditState {
  /** ID of the task being edited */
  taskId: string;
  /** Field currently being edited */
  field: EditableField;
  /** Custom field ID if editing a custom field */
  customFieldId?: string;
  /** Original value before editing (for cancel/revert) */
  originalValue: any;
  /** Current edit value */
  currentValue: any;
}

/**
 * Manages inline editing state for tasks
 *
 * This class handles tracking which task field is currently being edited,
 * managing the edit lifecycle (enter/exit/save/cancel), and coordinating
 * between different editable components.
 */
export class EditStateManager {
  private currentEdit: EditState | null = null;
  private listeners: Set<(state: EditState | null) => void> = new Set();

  /**
   * Check if any field is currently being edited
   */
  public isEditing(): boolean {
    return this.currentEdit !== null;
  }

  /**
   * Check if a specific task is being edited
   */
  public isTaskBeingEdited(taskId: string): boolean {
    return this.currentEdit?.taskId === taskId;
  }

  /**
   * Check if a specific field of a task is being edited
   */
  public isFieldBeingEdited(taskId: string, field: EditableField, customFieldId?: string): boolean {
    if (!this.currentEdit || this.currentEdit.taskId !== taskId || this.currentEdit.field !== field) {
      return false;
    }

    // For custom fields, also check the custom field ID
    if (field === 'custom_field' && customFieldId) {
      return this.currentEdit.customFieldId === customFieldId;
    }

    return true;
  }

  /**
   * Get the current edit state
   */
  public getCurrentEdit(): EditState | null {
    return this.currentEdit ? { ...this.currentEdit } : null;
  }

  /**
   * Enter edit mode for a field
   *
   * @param taskId - ID of the task to edit
   * @param field - Field to edit
   * @param originalValue - Original value of the field
   * @param customFieldId - Optional custom field ID if editing a custom field
   * @returns true if edit mode was entered, false if another field is already being edited
   */
  public enterEditMode(
    taskId: string,
    field: EditableField,
    originalValue: any,
    customFieldId?: string
  ): boolean {
    // If already editing a different field, don't allow entering edit mode
    if (this.currentEdit && !this.isFieldBeingEdited(taskId, field, customFieldId)) {
      return false;
    }

    this.currentEdit = {
      taskId,
      field,
      customFieldId,
      originalValue,
      currentValue: originalValue,
    };

    this._notifyListeners();
    return true;
  }

  /**
   * Update the current edit value (as user types/changes)
   */
  public updateEditValue(value: any): void {
    if (!this.currentEdit) {
      return;
    }

    this.currentEdit = {
      ...this.currentEdit,
      currentValue: value,
    };

    this._notifyListeners();
  }

  /**
   * Exit edit mode without saving (cancel)
   *
   * @returns the original value that was being edited
   */
  public cancelEdit(): any {
    if (!this.currentEdit) {
      return null;
    }

    const originalValue = this.currentEdit.originalValue;
    this.currentEdit = null;
    this._notifyListeners();
    return originalValue;
  }

  /**
   * Exit edit mode and prepare to save
   *
   * @returns the edit state that was active, or null if nothing was being edited
   */
  public completeEdit(): EditState | null {
    if (!this.currentEdit) {
      return null;
    }

    const completedEdit = { ...this.currentEdit };
    this.currentEdit = null;
    this._notifyListeners();
    return completedEdit;
  }

  /**
   * Force exit edit mode (e.g., when task is deleted or component unmounted)
   */
  public forceExitEditMode(): void {
    if (this.currentEdit) {
      this.currentEdit = null;
      this._notifyListeners();
    }
  }

  /**
   * Subscribe to edit state changes
   *
   * @param listener - Callback to invoke when edit state changes
   * @returns Unsubscribe function
   */
  public subscribe(listener: (state: EditState | null) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  private _notifyListeners(): void {
    const state = this.getCurrentEdit();
    this.listeners.forEach(listener => listener(state));
  }

  /**
   * Check if current edit has unsaved changes
   */
  public hasUnsavedChanges(): boolean {
    if (!this.currentEdit) {
      return false;
    }

    return this.currentEdit.currentValue !== this.currentEdit.originalValue;
  }

  /**
   * Get the field value being edited for a specific task
   * Useful for rendering the edit UI
   */
  public getEditValueFor(taskId: string, field: EditableField, customFieldId?: string): any | null {
    if (!this.isFieldBeingEdited(taskId, field, customFieldId)) {
      return null;
    }

    return this.currentEdit?.currentValue;
  }
}

/**
 * Singleton instance for managing edit state across the card
 */
export const editStateManager = new EditStateManager();
