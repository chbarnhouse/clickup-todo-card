# Inline Editing Components

This directory contains reusable components for inline editing functionality in the ClickUp Todo Card.

## Components

### editable-text.ts

A LitElement component that provides inline text editing with a click-to-edit interface.

**Features:**
- Click to enter edit mode
- Auto-focus and select text on edit
- Save on Enter (or Ctrl+Enter for multiline)
- Cancel on Escape
- Save on blur (clicking outside)
- Show pencil icon on hover
- Support for single-line (input) and multiline (textarea)
- Required field validation

**Usage Example:**

```typescript
import './components/editable-text';

// In your render method:
html`
  <editable-text
    .value=${task.summary}
    .placeholder=${'Enter task name'}
    .required=${true}
    @save=${(e: CustomEvent) => this.handleSave(e.detail.value)}
    @cancel=${() => this.handleCancel()}
  ></editable-text>
`
```

**Properties:**
- `value: string` - Current text value
- `placeholder: string` - Placeholder text when empty
- `multiline: boolean` - Use textarea instead of input
- `required: boolean` - Whether the field is required
- `textClass: string` - Custom class for text display
- `showEditIcon: boolean` - Show pencil icon on hover
- `maxLength: number` - Maximum input length (0 = no limit)

**Events:**
- `save` - Dispatched when value is saved, detail contains `{value: string}`
- `cancel` - Dispatched when edit is cancelled

## Integration with Edit State Manager

The components should be used in conjunction with the `EditStateManager` from `utils/edit-state.ts`:

```typescript
import { editStateManager } from '../utils/edit-state';
import { updateTaskName } from '../utils/task-service';

// Example: Editing task name
private async _handleTaskNameSave(task: ClickUpTask, newValue: string): Promise<void> {
  const editState = editStateManager.completeEdit();
  if (!editState) return;

  const result = await updateTaskName(this.hass, this._config.entity, task, newValue);

  if (!result.success) {
    console.error('Failed to save:', result.error);
    // Optionally show error to user
  }
}
```

## Styling

Components use CSS custom properties (variables) for theming to match Home Assistant's design system:

- `--primary-color` - Primary theme color
- `--accent-color` - Accent color for focus states
- `--primary-text-color` - Main text color
- `--secondary-text-color` - Secondary/muted text color
- `--card-background-color` - Background color
- `--secondary-background-color` - Hover background color

## Future Components

Additional inline editing components to be added:

- `editable-select.ts` - Dropdown/select editor for status, priority, etc.
- `editable-date.ts` - Date picker for start/due dates
- `editable-tags.ts` - Tag editor with add/remove functionality
- `editable-assignees.ts` - Assignee selector
- `editable-custom-field.ts` - Generic custom field editor
