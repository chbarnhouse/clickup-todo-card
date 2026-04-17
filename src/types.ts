import { LovelaceCardConfig } from 'custom-card-helpers';

// TodoItem interface (from Home Assistant)
export interface TodoItem {
  uid: string;
  summary: string;
  status: 'needs_action' | 'completed';
  description?: string;
  due?: Date | string | number;
}

export interface ClickUpTodoCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  title?: string;

  // Display options
  show_start_date?: boolean;
  show_due_date?: boolean;
  show_priority?: boolean;
  show_tags?: boolean;
  show_assignees?: boolean;
  show_custom_fields?: boolean;
  visible_custom_fields?: string[];
  compact_mode?: boolean;

  // Filters
  filters?: {
    status?: string[];
    priority?: number[];
    tags?: string[];
    assignees?: string[];
    due_date_range?: {
      start?: string;
      end?: string;
    };
  };

  // Sorting
  sort_by?: 'due_date' | 'start_date' | 'priority' | 'name' | 'status';
  sort_order?: 'asc' | 'desc';

  // Grouping
  group_by?: 'none' | 'status' | 'priority' | 'assignee' | 'custom_field';
  group_field_id?: string;
}

export interface ClickUpTask extends TodoItem {
  // Standard TodoItem fields
  uid: string;
  summary: string;
  status: 'needs_action' | 'completed';
  description?: string;
  due?: Date;

  // ClickUp-specific fields
  clickup_id: string;
  start_date?: number | string;  // Milliseconds timestamp or ISO string
  clickup_status?: {
    status: string;
    type: string;
    color?: string;
  };
  priority?: number | null;  // 1=Urgent, 2=High, 3=Normal, 4=Low, null=No priority
  tags?: Array<{
    name: string;
    tag_fg?: string;
    tag_bg?: string;
  }>;
  assignees?: Array<{
    id: number;
    username: string;
    email?: string;
    color?: string;
    initials?: string;
    profilePicture?: string;
  }>;
  custom_fields?: ClickUpCustomField[];
  time_estimate?: number;  // Milliseconds
  points?: number | null;
  list?: {
    id: string;
    name: string;
  };
  space?: {
    id: string;
    name: string;
  };
}

export interface ClickUpCustomField {
  id: string;
  name: string;
  type: ClickUpFieldType;
  value: any;
  type_config?: ClickUpFieldTypeConfig;
}

export type ClickUpFieldType =
  | 'text'
  | 'number'
  | 'currency'
  | 'date'
  | 'drop_down'
  | 'labels'
  | 'checkbox'
  | 'url'
  | 'email'
  | 'phone'
  | 'rating'
  | 'location';

export interface ClickUpFieldTypeConfig {
  default?: any;
  placeholder?: string;
  options?: Array<{
    id: string;
    name: string;
    value?: any;
    color?: string;
  }>;
  precision?: number;  // For number/currency
  currency_type?: string;  // For currency
  date_time?: boolean;  // For date
  [key: string]: any;
}

export interface ClickUpEntityAttributes {
  friendly_name: string;
  todo_items: TodoItem[];
  clickup_tasks: ClickUpTask[];
  list_id?: string;
  space_id?: string;
  space_name?: string;
  view_id?: string;
  view_name?: string;
  view_type?: string;
  [key: string]: any;
}

export interface ExtendedHassEntity {
  entity_id: string;
  state: string;
  attributes: ClickUpEntityAttributes;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}
