export const CARD_VERSION = '2.0.11';

export const CARD_NAME = 'ClickUp Todo Card';

export const PRIORITY_LABELS = {
  1: 'Urgent',
  2: 'High',
  3: 'Normal',
  4: 'Low',
  null: 'No Priority'
};

export const PRIORITY_ICONS = {
  1: 'mdi:alert',
  2: 'mdi:chevron-double-up',
  3: 'mdi:equal',
  4: 'mdi:chevron-double-down',
  null: 'mdi:minus'
};

export const PRIORITY_COLORS = {
  1: 'var(--error-color)',  // Urgent - Red
  2: 'var(--warning-color)',  // High - Orange/Yellow
  3: 'var(--info-color)',  // Normal - Blue
  4: 'var(--disabled-text-color)',  // Low - Gray
  null: 'var(--disabled-text-color)'  // No Priority - Gray
};

export const STATUS_TYPE_COLORS = {
  open: 'var(--primary-color)',
  closed: 'var(--disabled-text-color)',
  custom: 'var(--accent-color)'
};

export const DEFAULT_CONFIG = {
  hide_header: false,
  hide_title: false,
  show_task_count: true,
  show_start_date: false,
  show_due_date: true,
  show_priority: false,
  show_status: false,
  show_tags: false,
  show_assignees: false,
  show_custom_fields: false,
  show_task_locations: false,
  compact_mode: false,
  add_button_text: 'Add Task',
  add_button_position: 'bottom-right' as const,
  add_button_overlay: true,
  sort_by: 'due_date' as const,
  sort_order: 'asc' as const,
  group_by: 'none' as const,
  show_sort_controls: false,
  show_filter_controls: false,
};
