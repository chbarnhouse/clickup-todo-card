import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    height: 100%;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
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
    border-radius: min(calc(var(--ha-card-border-radius, 12px) * 1.5), 999px);
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
    border-radius: min(calc(var(--ha-card-border-radius, 12px) * 2), 999px);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px color-mix(in srgb, var(--shadow-color, #000) 20%, transparent);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .floating-add-button.non-overlay {
    position: static;
  }

  .floating-add-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px color-mix(in srgb, var(--shadow-color, #000) 30%, transparent);
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

  .card-content.fixed-height {
    overflow-y: auto;
    overflow-x: hidden;
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

  .compact .empty-state {
    padding: 24px 12px;
  }

  .compact .empty-state ha-icon {
    --mdc-icon-size: 36px;
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
    border-radius: calc(var(--ha-card-border-radius, 12px) * 0.67);
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .group-name {
    font-size: 14px;
  }

  .group-count {
    background: var(--divider-color);
    color: var(--secondary-text-color);
    border-radius: min(calc(var(--ha-card-border-radius, 12px) * 0.83), 999px);
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
    min-width: 16px;
    text-align: center;
  }

  .compact .group-header {
    padding: 6px 10px;
    margin: 6px 0;
  }

  .compact .group-name {
    font-size: 13px;
  }

  .compact .group-count {
    padding: 1px 5px;
    font-size: 10px;
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
    gap: 8px;
    padding: 8px 12px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--divider-color);
    border-radius: 0;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .task-item:first-child {
    padding-top: 8px;
  }

  .task-item:last-child {
    border-bottom: none;
  }

  .task-item:hover {
    background: var(--secondary-background-color);
    cursor: pointer;
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
    padding: 6px 10px;
    gap: 6px;
  }

  /* Task Checkbox */
  .task-checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    align-self: center;
  }

  /* Task Status Pill (checkbox integrated inside) */
  .task-status-pill {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 1px;
    padding: 1px 4px 1px 0px;
    border-radius: 10px;
    width: auto;
  }

  .task-status-pill ha-checkbox {
    flex-shrink: 0;
    margin: 0 !important;
    padding: 0 !important;
    transform: scale(0.85);
    transform-origin: left center;
  }

  .compact .task-status-pill {
    gap: 1px;
    padding: 1px 3px 1px 0px;
    border-radius: 8px;
    width: auto;
  }

  .compact .task-status-pill ha-checkbox {
    margin: 0 !important;
    padding: 0 !important;
    transform: scale(0.75);
    transform-origin: left center;
  }

  .task-status-pill editable-status {
    flex: 1;
    min-width: 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 1.2;
  }

  .compact .task-status-pill editable-status {
    font-size: 10px;
    letter-spacing: 0.4px;
  }

  /* Task Main Content */
  .task-main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
    align-self: center;
  }

  .compact .task-main {
    gap: 1px;
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
    --mdc-icon-size: 14px;
    margin-top: 1px;
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
    font-size: 11px;
    line-height: 1.3;
  }

  /* Task Metadata */
  .task-metadata {
    display: grid;
    /* grid-template-columns and gap are set dynamically via inline styles */
    margin-top: 0;
    align-items: start;
  }

  .compact .task-metadata {
    margin-top: 0;
  }

  /* Task Location */
  .task-location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--secondary-text-color);
    padding: 4px 8px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }

  .task-location:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  /* Date fields */
  .task-start-date,
  .task-due-date {
    display: flex;
    align-items: center;
  }

  /* Field spans are controlled by metadata_grid config */

  .task-location ha-icon {
    --mdc-icon-size: 14px;
    opacity: 0.7;
  }

  .compact .task-location {
    font-size: 11px;
    padding: 3px 6px;
  }

  .compact .task-location ha-icon {
    --mdc-icon-size: 12px;
  }

  /* Dates */
  .task-dates {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    align-items: center;
  }

  .compact .task-dates {
    gap: 2px;
  }

  .date-item {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.05);
    color: var(--secondary-text-color);
    transition: all 0.2s ease;
  }

  .date-item:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .date-item ha-icon {
    --mdc-icon-size: 14px;
  }

  .date-item.overdue {
    color: var(--error-color);
    background: rgba(var(--rgb-error-color), 0.1);
  }

  .compact .date-item {
    font-size: 10px;
    padding: 2px 5px;
  }

  .compact .date-item ha-icon {
    --mdc-icon-size: 12px;
  }

  /* Status Badge (inside pill)
   * Note: Badge styles are set on editable-status element above and inherited
   * into the component's shadow DOM. Cannot style .status-badge directly.
   */

  /* Standalone status badge (when not in pill) */
  .status-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 12px;
    background: var(--status-color, var(--primary-color));
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    white-space: nowrap;
    transition: filter 0.15s ease;
    line-height: 1.3;
  }

  .status-badge:hover {
    filter: brightness(1.1);
  }

  .compact .status-badge {
    font-size: 9px;
    padding: 5px 10px;
    border-radius: 10px;
    letter-spacing: 0.5px;
  }

  /* Tags */
  .task-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.05);
    color: var(--primary-text-color);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .tag:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .compact .tag {
    font-size: 9px;
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
    width: 22px;
    height: 22px;
    font-size: 9px;
    border-width: 1px;
  }

  /* Custom Fields */
  .custom-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    padding-top: 0;
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
      padding: 8px 10px;
      gap: 8px;
    }

    .task-item:first-child {
      padding-top: 8px;
    }

    .task-summary {
      font-size: 14px;
    }

    .dialog-content {
      min-width: 300px;
    }
  }

  /* ========================================
   * v2.0.0: Inline Editing Styles
   * ======================================== */

  /* Inline editable text */
  .task-name-editor {
    flex: 1;
    min-width: 0;
  }

  .task-name-editor editable-text {
    width: 100%;
  }


  /* ========================================
   * v2.0.0: Multi-Select & Bulk Actions
   * ======================================== */

  /* Selection checkbox */
  .task-select {
    display: flex;
    align-items: center;
    padding: 0 8px;
  }

  .task-item.selected {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    border-left: 3px solid var(--primary-color);
  }

  /* Bulk actions toolbar */
  .bulk-actions-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    border-bottom: 1px solid var(--divider-color);
    gap: 12px;
    flex-wrap: wrap;
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bulk-actions-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .selected-count {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color);
  }

  .bulk-actions-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .bulk-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    cursor: pointer;
    transition: all 0.15s ease;
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
  }

  .bulk-action-btn:hover {
    background: var(--divider-color);
    transform: translateY(-1px);
  }

  .bulk-action-btn.danger {
    color: var(--error-color);
  }

  .bulk-action-btn.danger:hover {
    background: color-mix(in srgb, var(--error-color) 15%, transparent);
  }

  .bulk-action-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .bulk-status-select {
    padding: 6px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .bulk-status-select:hover {
    border-color: var(--primary-color);
  }

  .bulk-status-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
  }

  /* ========================================
   * v2.0.0: Drag and Drop
   * ======================================== */

  .task-item[draggable="true"] {
    cursor: move;
  }

  .task-item.drag-over {
    border-top: 2px solid var(--primary-color);
    margin-top: -2px;
  }

  /* Compact mode adjustments for v2.0.0 */
  .compact .bulk-actions-toolbar {
    padding: 8px 12px;
  }

  .compact .selected-count {
    font-size: 12px;
  }

  .compact .bulk-action-btn {
    padding: 4px 8px;
    font-size: 11px;
  }

  .compact .bulk-action-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  .compact .bulk-status-select {
    padding: 4px 8px;
    font-size: 11px;
  }

  /* ========================================
   * v2.0.1: Controls Toolbar
   * ======================================== */

  .controls-toolbar {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: transparent;
    border-bottom: 1px solid var(--divider-color);
    gap: 16px;
    flex-wrap: wrap;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .control-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text-color);
  }

  .control-select {
    padding: 6px 10px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: all 0.15s ease;
  }

  .control-select:hover {
    border-color: var(--primary-color);
    background: rgba(0, 0, 0, 0.3);
  }

  .control-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
  }

  .control-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    color: var(--primary-text-color);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .control-btn:hover {
    border-color: var(--primary-color);
    background: rgba(0, 0, 0, 0.3);
    color: var(--primary-color);
    transform: translateY(-1px);
  }

  .control-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .compact .controls-toolbar {
    padding: 8px 12px;
  }

  .compact .control-label {
    font-size: 11px;
  }

  .compact .control-select {
    padding: 4px 8px;
    font-size: 11px;
  }

  .compact .control-btn {
    width: 28px;
    height: 28px;
  }

  .compact .control-btn ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ========================================
   * v2.0.1: Style Polish
   * ======================================== */

  /* Improved task item transition */
  .task-item {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Better shadow for dropdowns */
  editable-status .dropdown,
  editable-priority .dropdown,
  editable-date .edit-popup,
  editable-assignees .dropdown {
    box-shadow:
      0 2px 8px color-mix(in srgb, var(--shadow-color, #000) 10%, transparent),
      0 8px 24px color-mix(in srgb, var(--shadow-color, #000) 15%, transparent);
  }

  /* Smooth scrolling */
  .card-content {
    scroll-behavior: smooth;
  }

  /* Better focus indicators */
  input:focus,
  select:focus,
  textarea:focus,
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Improved button transitions */
  .add-button,
  .bulk-action-btn,
  .control-btn {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Better disabled states */
  button:disabled,
  select:disabled,
  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Improved animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Apply animations */
  .task-item {
    animation: slideIn 0.2s ease;
  }

  .bulk-actions-toolbar,
  .controls-toolbar {
    animation: fadeIn 0.2s ease;
  }
`;
