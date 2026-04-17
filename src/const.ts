export const CARD_VERSION = '1.0.0';

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
  1: '#f50000',  // Urgent - Red
  2: '#ffcc00',  // High - Yellow
  3: '#6fddff',  // Normal - Blue
  4: '#d8d8d8',  // Low - Gray
  null: '#d8d8d8'  // No Priority - Gray
};

export const STATUS_TYPE_COLORS = {
  open: 'var(--primary-color)',
  closed: 'var(--disabled-text-color)',
  custom: 'var(--accent-color)'
};

export const DEFAULT_CONFIG = {
  show_start_date: true,
  show_due_date: true,
  show_priority: true,
  show_tags: true,
  show_assignees: true,
  show_custom_fields: false,
  compact_mode: false,
  sort_by: 'due_date' as const,
  sort_order: 'asc' as const,
  group_by: 'none' as const,
};
