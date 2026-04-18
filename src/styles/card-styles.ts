import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
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
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    min-width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .card-header .task-count.single-digit {
    border-radius: 50%;
    width: 28px;
    padding: 0;
  }

  /* Button Container (for non-overlay mode) */
  .button-container {
    padding: 12px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-container .floating-add-button.bottom-left,
  .button-container .floating-add-button.top-left {
    margin-right: auto;
  }

  .button-container .floating-add-button.bottom-right,
  .button-container .floating-add-button.top-right {
    margin-left: auto;
  }

  .button-container .floating-add-button {
    position: relative;
  }

  /* Floating Add Button */
  .floating-add-button {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--primary-color);
    color: var(--text-primary-color);
    border: none;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .floating-add-button.non-overlay {
    position: static;
  }

  .floating-add-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  .floating-add-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .floating-add-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .floating-add-button ha-icon {
    --mdc-icon-size: 20px;
  }

  .floating-add-button.icon-only {
    padding: 12px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    justify-content: center;
  }

  .floating-add-button.icon-only ha-icon {
    --mdc-icon-size: 24px;
  }

  /* Positioning classes */
  .floating-add-button.bottom-left {
    bottom: 16px;
    left: 16px;
  }

  .floating-add-button.bottom-center {
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .floating-add-button.bottom-center:hover:not(:disabled) {
    transform: translateX(-50%) translateY(-2px);
  }

  .floating-add-button.bottom-center:active:not(:disabled) {
    transform: translateX(-50%) translateY(0);
  }

  .floating-add-button.bottom-right {
    bottom: 16px;
    right: 16px;
  }

  .floating-add-button.top-left {
    top: 16px;
    left: 16px;
  }

  .floating-add-button.top-center {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .floating-add-button.top-center:hover:not(:disabled) {
    transform: translateX(-50%) translateY(-2px);
  }

  .floating-add-button.top-center:active:not(:disabled) {
    transform: translateX(-50%) translateY(0);
  }

  .floating-add-button.top-right {
    top: 16px;
    right: 16px;
  }

  /* Content */
  .card-content {
    padding: 0;
    overflow-y: auto;
    flex: 1;
  }

  .card-content.compact {
    padding: 0;
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
    gap: 0;
  }

  .compact .tasks {
    gap: 0;
  }

  /* Task Item */
  .task-item {
    display: flex;
    gap: 12px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--divider-color);
    border-radius: 0;
    transition: background-color 0.2s ease;
  }

  .task-item:last-child {
    border-bottom: none;
  }

  .task-item:hover {
    background: var(--secondary-background-color);
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
    padding: 6px 12px;
    gap: 8px;
  }

  /* Task Checkbox */
  .task-checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }

  /* Task Status Wrapper (status badge with checkbox inside) */
  .task-status-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .task-status-wrapper .status-badge {
    padding-left: 48px;
    padding-right: 16px;
    padding-top: 7px;
    padding-bottom: 7px;
    position: relative;
    min-height: 36px;
    display: flex;
    align-items: center;
  }

  .task-status-wrapper ha-checkbox {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  /* Status Dropdown */
  .status-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    z-index: 100;
    min-width: 180px;
    overflow: hidden;
  }

  .status-option {
    padding: 0;
    cursor: pointer;
    transition: all 0.15s ease;
    border-bottom: 1px solid var(--divider-color);
  }

  .status-option:last-child {
    border-bottom: none;
  }

  .status-option:hover {
    background: var(--secondary-background-color);
    transform: translateX(4px);
  }

  .status-option .status-badge {
    display: block;
    width: 100%;
    padding: 10px 16px;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    font-size: 11px;
  }

  .status-option:first-child .status-badge {
    border-radius: 12px 12px 0 0;
  }

  .status-option:last-child .status-badge {
    border-radius: 0 0 12px 12px;
  }

  .status-option:only-child .status-badge {
    border-radius: 12px;
  }

  /* Task Main Content */
  .task-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
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
    padding: 0;
    border-radius: 0;
    background: transparent;
    color: var(--secondary-text-color);
  }

  .date-item ha-icon {
    --mdc-icon-size: 16px;
  }

  .date-item.overdue {
    color: var(--error-color);
  }

  .compact .date-item {
    font-size: 11px;
    padding: 0;
  }

  .compact .date-item ha-icon {
    --mdc-icon-size: 14px;
  }

  /* Status Badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 999px;
    background: var(--status-color, var(--primary-color));
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .compact .status-badge {
    font-size: 10px;
    padding: 3px 8px;
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

  /* Dialog Content */
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px 0;
    min-width: 420px;
  }

  .dialog-content ha-textfield,
  .dialog-content ha-textarea,
  .dialog-content ha-date-input,
  .dialog-content ha-select {
    width: 100%;
  }

  .dialog-content ha-textfield,
  .dialog-content ha-textarea {
    --mdc-theme-primary: var(--primary-color);
  }

  .dialog-content ha-select {
    --mdc-theme-primary: var(--primary-color);
    margin-top: 4px;
  }

  .dialog-actions-extra {
    display: flex;
    justify-content: flex-start;
    padding-top: 12px;
    margin-top: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .dialog-actions-extra mwc-button {
    color: var(--error-color);
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
      padding: 6px 12px;
      gap: 10px;
    }

    .task-summary {
      font-size: 14px;
    }

    .dialog-content {
      min-width: 300px;
    }
  }
`;
