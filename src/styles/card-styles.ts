import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .warning {
    display: block;
    color: var(--error-color);
    padding: 16px;
  }

  /* Header */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .card-header .name {
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .card-header .task-count {
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }

  /* Content */
  .card-content {
    padding: 8px;
    overflow-y: auto;
    flex: 1;
  }

  .card-content.compact {
    padding: 4px;
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
    gap: 8px;
  }

  .empty-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--secondary-text-color);
    opacity: 0.5;
  }

  /* Task Groups */
  .task-group {
    margin-bottom: 16px;
  }

  .task-group:last-child {
    margin-bottom: 0;
  }

  .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    margin: 8px 0;
    background: var(--secondary-background-color);
    border-radius: 8px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .group-name {
    font-size: 14px;
  }

  .group-count {
    background: var(--divider-color);
    color: var(--secondary-text-color);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
    min-width: 16px;
    text-align: center;
  }

  /* Tasks */
  .tasks {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .compact .tasks {
    gap: 4px;
  }

  /* Task Item */
  .task-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .task-item:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .task-item.completed {
    opacity: 0.6;
  }

  .task-item.completed .task-summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }

  .task-item.overdue {
    border-left: 3px solid var(--error-color);
  }

  .compact .task-item {
    padding: 8px;
    gap: 8px;
  }

  /* Task Checkbox */
  .task-checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }

  /* Task Main Content */
  .task-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .compact .task-main {
    gap: 4px;
  }

  /* Task Header */
  .task-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .task-summary {
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    color: var(--primary-text-color);
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }

  .compact .task-summary {
    font-size: 14px;
  }

  /* Priority Icon */
  .priority-icon {
    flex-shrink: 0;
    --mdc-icon-size: 20px;
    margin-top: 2px;
  }

  .compact .priority-icon {
    --mdc-icon-size: 16px;
  }

  /* Task Description */
  .task-description {
    font-size: 13px;
    color: var(--secondary-text-color);
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .compact .task-description {
    font-size: 12px;
  }

  /* Task Metadata */
  .task-metadata {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .compact .task-metadata {
    gap: 6px;
  }

  /* Dates */
  .task-dates {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .date-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }

  .date-item ha-icon {
    --mdc-icon-size: 14px;
  }

  .date-item.overdue {
    background: var(--error-color);
    color: white;
  }

  .date-item.today {
    background: var(--warning-color);
    color: white;
  }

  .date-item.tomorrow {
    background: var(--info-color);
    color: white;
  }

  .date-item.this-week {
    background: var(--primary-color);
    color: white;
    opacity: 0.8;
  }

  .compact .date-item {
    font-size: 11px;
    padding: 2px 6px;
  }

  .compact .date-item ha-icon {
    --mdc-icon-size: 12px;
  }

  /* Status Badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--status-color, var(--primary-color));
    color: white;
    text-transform: capitalize;
  }

  .compact .status-badge {
    font-size: 11px;
    padding: 2px 6px;
  }

  /* Tags */
  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 12px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
  }

  .compact .tag {
    font-size: 10px;
    padding: 2px 6px;
  }

  /* Assignees */
  .task-assignees {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .assignee-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-color);
    color: white;
    font-size: 11px;
    font-weight: 600;
    overflow: hidden;
    border: 2px solid var(--card-background-color);
  }

  .assignee-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .compact .assignee-avatar {
    width: 24px;
    height: 24px;
    font-size: 10px;
    border-width: 1px;
  }

  /* Custom Fields */
  .custom-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 4px;
  }

  .custom-field {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-size: 12px;
  }

  .field-name {
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  .field-value {
    color: var(--primary-text-color);
  }

  .compact .custom-field {
    font-size: 11px;
    gap: 4px;
  }

  /* Responsive adjustments */
  @media (max-width: 600px) {
    .card-header {
      padding: 12px;
    }

    .card-header .name {
      font-size: 18px;
    }

    .task-item {
      padding: 10px;
      gap: 10px;
    }

    .task-summary {
      font-size: 14px;
    }
  }

  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    .task-item:hover {
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
    }
  }
`;
