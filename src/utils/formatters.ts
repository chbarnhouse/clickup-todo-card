import { ClickUpCustomField, ClickUpTask } from '../types';

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | number | string | undefined): string {
  if (!date) return '';

  let dateObj: Date;

  if (typeof date === 'number') {
    // ClickUp timestamps are in milliseconds
    dateObj = new Date(date);
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Relative dates
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  // Absolute date
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  if (dateObj.getFullYear() !== now.getFullYear()) {
    options.year = 'numeric';
  }

  return dateObj.toLocaleDateString(undefined, options);
}

/**
 * Format time estimate (milliseconds) to readable string
 */
export function formatTimeEstimate(ms: number | undefined): string {
  if (!ms) return '';

  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  }

  return '';
}

/**
 * Format custom field value based on field type
 */
export function formatCustomFieldValue(field: ClickUpCustomField): string {
  if (field.value === null || field.value === undefined || field.value === '') {
    return '-';
  }

  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
    case 'url':
      return String(field.value);

    case 'number':
      return Number(field.value).toLocaleString();

    case 'currency':
      const currencyType = field.type_config?.currency_type || 'USD';
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyType
      }).format(Number(field.value));

    case 'date':
      return formatDate(field.value);

    case 'checkbox':
      return field.value ? '✓' : '✗';

    case 'drop_down':
      // Value might be option ID or option name
      if (field.type_config?.options) {
        const option = field.type_config.options.find(
          opt => opt.id === field.value || opt.name === field.value
        );
        return option?.name || String(field.value);
      }
      return String(field.value);

    case 'labels':
      // Multiple label values
      if (Array.isArray(field.value)) {
        return field.value.join(', ');
      }
      return String(field.value);

    case 'rating':
      const rating = Number(field.value);
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);

    case 'location':
      if (typeof field.value === 'object' && field.value.location) {
        return field.value.location;
      }
      return String(field.value);

    default:
      return String(field.value);
  }
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Check if a task is overdue
 */
export function isOverdue(task: ClickUpTask): boolean {
  if (!task.due) return false;

  const now = new Date();
  const dueDate = new Date(task.due);

  return dueDate < now && task.status !== 'completed';
}

/**
 * Get relative date class for styling
 */
export function getDateClass(date: Date | number | string | undefined): string {
  if (!date) return '';

  let dateObj: Date;

  if (typeof date === 'number') {
    dateObj = new Date(date);
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays <= 7) return 'this-week';

  return 'future';
}
