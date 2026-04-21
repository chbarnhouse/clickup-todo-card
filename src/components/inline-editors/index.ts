/**
 * Inline editing components for ClickUp Todo Card v2.0.0
 *
 * These components provide inline editing capabilities for all task fields,
 * enabling full ClickUp list view parity.
 */

export { EditableText } from './editable-text';
export { EditablePriority } from './editable-priority';
export { EditableDate } from './editable-date';
export { EditableAssignees, type Assignee } from './editable-assignees';
export { EditableTags, type Tag } from './editable-tags';

// Import all components to ensure they're registered
import './editable-text';
import './editable-priority';
import './editable-date';
import './editable-assignees';
import './editable-tags';
