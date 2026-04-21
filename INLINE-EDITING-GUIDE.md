# Inline Editing Infrastructure Guide

## Overview

The ClickUp Todo Card v2.0.0 includes a complete inline editing infrastructure that allows users to edit task fields directly in the card view, similar to ClickUp's native list view.

## Architecture

### Core Components

1. **EditStateManager** (`src/utils/edit-state.ts`)
   - Manages which task and field is currently being edited
   - Prevents multiple fields from being edited simultaneously
   - Tracks original vs. current values for cancel/revert functionality
   - Provides subscription mechanism for state changes

2. **Task Service** (`src/utils/task-service.ts`)
   - Handles all CRUD operations for tasks
   - Calls appropriate Home Assistant services
   - Provides consistent error handling
   - Returns structured results with success/error information

3. **EditableText Component** (`src/components/editable-text.ts`)
   - Reusable LitElement component for inline text editing
   - Handles user interactions (click, keyboard, blur)
   - Emits events for save/cancel actions
   - Provides visual feedback (hover, focus states)

## How It Works

### 1. Edit State Management

The `EditStateManager` is a singleton that tracks the current edit state across the entire card:

```typescript
import { editStateManager } from './utils/edit-state';

// Enter edit mode
const success = editStateManager.enterEditMode(
  task.uid,           // Task ID
  'name',             // Field being edited
  task.summary        // Original value
);

// Check if a field is being edited
const isEditing = editStateManager.isFieldBeingEdited(task.uid, 'name');

// Get current edit value
const currentValue = editStateManager.getEditValueFor(task.uid, 'name');

// Update value as user types
editStateManager.updateEditValue('New task name');

// Cancel editing
const originalValue = editStateManager.cancelEdit();

// Complete editing and prepare to save
const editState = editStateManager.completeEdit();
if (editState) {
  // Save the value
  await updateTaskName(hass, entityId, task, editState.currentValue);
}
```

### 2. Task Service Functions

All task updates go through the task service functions:

```typescript
import {
  updateTaskName,
  updateTaskDescription,
  updateTaskStatus,
  updateTaskPriority,
  updateTaskDueDate,
  updateTaskStartDate,
  updateTaskAssignees,
  updateTaskTags,
  updateCustomField,
  deleteTask,
  toggleTaskCompletion,
} from './utils/task-service';

// Example: Update task name
const result = await updateTaskName(
  this.hass,           // Home Assistant instance
  this._config.entity, // Entity ID
  task,                // Task object
  'New task name'      // New value
);

if (result.success) {
  console.log('Task updated successfully');
} else {
  console.error('Update failed:', result.error);
  // Show error to user
}
```

### 3. Editable Text Component

Use the component in your template:

```typescript
import './components/editable-text';

// In render method:
html`
  <editable-text
    .value=${task.summary}
    .placeholder=${'Enter task name'}
    .required=${true}
    @save=${(e: CustomEvent) => this._handleTaskNameSave(task, e.detail.value)}
    @cancel=${() => this._handleCancel()}
  ></editable-text>
`

// Handler methods:
private async _handleTaskNameSave(task: ClickUpTask, newValue: string): Promise<void> {
  const result = await updateTaskName(this.hass, this._config.entity, task, newValue);

  if (!result.success) {
    // Handle error - could show toast notification
    console.error('Failed to update task name:', result.error);
  }
}

private _handleCancel(): void {
  // Optional: Handle cancel action
  console.log('Edit cancelled');
}
```

## Complete Integration Example

Here's a complete example of integrating inline editing into the main card:

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editStateManager } from './utils/edit-state';
import { updateTaskName, updateTaskDescription } from './utils/task-service';
import './components/editable-text';

@customElement('task-row')
class TaskRow extends LitElement {
  @property({ attribute: false }) task!: ClickUpTask;
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: String }) entityId!: string;

  render() {
    return html`
      <div class="task-row">
        <!-- Editable task name -->
        <editable-text
          .value=${this.task.summary}
          .placeholder=${'Task name'}
          .required=${true}
          @save=${(e: CustomEvent) => this._handleNameSave(e.detail.value)}
        ></editable-text>

        <!-- Editable description -->
        <editable-text
          .value=${this.task.description || ''}
          .placeholder=${'Add description'}
          .multiline=${true}
          @save=${(e: CustomEvent) => this._handleDescriptionSave(e.detail.value)}
        ></editable-text>
      </div>
    `;
  }

  private async _handleNameSave(newValue: string): Promise<void> {
    const result = await updateTaskName(
      this.hass,
      this.entityId,
      this.task,
      newValue
    );

    if (!result.success) {
      // Show error notification
      this._showError(`Failed to update task name: ${result.error}`);
    }
  }

  private async _handleDescriptionSave(newValue: string): Promise<void> {
    const result = await updateTaskDescription(
      this.hass,
      this.entityId,
      this.task,
      newValue || null
    );

    if (!result.success) {
      this._showError(`Failed to update description: ${result.error}`);
    }
  }

  private _showError(message: string): void {
    // Implement error notification (e.g., toast)
    console.error(message);
  }
}
```

## Available Task Service Functions

### Standard Fields (via todo service)
- `updateTaskName(hass, entityId, task, newName)` - Update task summary
- `updateTaskDescription(hass, entityId, task, newDescription)` - Update description
- `updateTaskDueDate(hass, entityId, task, newDueDate)` - Update due date
- `toggleTaskCompletion(hass, entityId, task)` - Toggle completed status
- `deleteTask(hass, entityId, task)` - Delete task

### ClickUp-Specific Fields (via clickup service)
- `updateTaskStatus(hass, task, newStatus)` - Update ClickUp status
- `updateTaskPriority(hass, task, newPriority)` - Update priority (1-4 or null)
- `updateTaskStartDate(hass, task, newStartDate)` - Update start date
- `updateTaskAssignees(hass, task, assigneeIds)` - Update assignees
- `updateTaskTags(hass, task, tags)` - Update tags
- `updateCustomField(hass, task, fieldId, value)` - Update custom field

## Best Practices

### 1. Error Handling

Always handle errors from service calls:

```typescript
const result = await updateTaskName(hass, entityId, task, newName);

if (!result.success) {
  // Show user-friendly error message
  // Optionally revert to original value
  console.error('Update failed:', result.error);
}
```

### 2. Edit State Management

Use the edit state manager to coordinate edits:

```typescript
// Only allow one field to be edited at a time
const canEdit = editStateManager.enterEditMode(taskId, field, originalValue);
if (!canEdit) {
  // Another field is being edited, don't enter edit mode
  return;
}
```

### 3. Optimistic Updates

For better UX, you can update the UI optimistically:

```typescript
// Update UI immediately
this.task = { ...this.task, summary: newName };

// Then save to backend
const result = await updateTaskName(hass, entityId, task, newName);

if (!result.success) {
  // Revert on error
  this.task = { ...this.task, summary: originalName };
  this._showError(result.error);
}
```

### 4. Keyboard Shortcuts

The editable-text component already handles:
- **Enter** - Save (single-line)
- **Ctrl+Enter / Cmd+Enter** - Save (multi-line)
- **Escape** - Cancel

### 5. Validation

Validate input before saving:

```typescript
private async _handlePrioritySave(newPriority: number): Promise<void> {
  if (newPriority < 1 || newPriority > 4) {
    this._showError('Priority must be between 1 (Urgent) and 4 (Low)');
    return;
  }

  const result = await updateTaskPriority(this.hass, this.task, newPriority);
  // ...
}
```

## Next Steps

To fully implement inline editing in the main card:

1. Import the editable-text component
2. Replace static text displays with editable-text components
3. Add event handlers for save/cancel
4. Implement additional editable components for:
   - Status dropdown
   - Priority selector
   - Date picker
   - Assignees selector
   - Tags editor
   - Custom fields

## TypeScript Types

All components use strict TypeScript typing:

```typescript
// Edit state types
type EditableField = 'name' | 'description' | 'status' | 'priority' | 'start_date' | 'due_date' | 'assignees' | 'tags' | 'custom_field';

interface EditState {
  taskId: string;
  field: EditableField;
  customFieldId?: string;
  originalValue: any;
  currentValue: any;
}

// Service result type
interface ServiceResult {
  success: boolean;
  error?: string;
}
```

## Testing

When testing inline editing:

1. Test entering/exiting edit mode
2. Test save on Enter/blur
3. Test cancel on Escape
4. Test required field validation
5. Test error handling when service calls fail
6. Test editing multiple fields sequentially
7. Test that only one field can be edited at a time

## Troubleshooting

### Issue: Changes not saving
- Check console for errors
- Verify entity ID is correct
- Ensure task has a `clickup_id` for ClickUp-specific fields
- Check Home Assistant service configuration

### Issue: Multiple fields editing simultaneously
- Ensure you're using the singleton `editStateManager` instance
- Check that you're calling `enterEditMode()` before allowing edits

### Issue: Edit state not updating
- Subscribe to edit state changes if needed
- Ensure you're triggering re-renders when state changes

## Contributing

When adding new editable components:

1. Follow the pattern established in `editable-text.ts`
2. Use Lit decorators (@property, @state, @customElement)
3. Emit `save` and `cancel` events
4. Include comprehensive JSDoc comments
5. Use CSS custom properties for styling
6. Handle keyboard shortcuts appropriately
