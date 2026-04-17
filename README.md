# ClickUp Todo Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub Release](https://img.shields.io/github/release/chbarnhouse/clickup-todo-card.svg)](https://github.com/chbarnhouse/clickup-todo-card/releases)
[![License](https://img.shields.io/github/license/chbarnhouse/clickup-todo-card.svg)](LICENSE)

An enhanced custom Lovelace card for Home Assistant that displays ClickUp tasks with full support for custom fields, priorities, tags, assignees, and advanced filtering.

![ClickUp Todo Card](https://via.placeholder.com/800x400?text=ClickUp+Todo+Card+Screenshot)

## Features

### Display Options
- **Custom Fields**: Display any of the 14 ClickUp custom field types (text, number, currency, date, dropdown, labels, checkbox, URL, email, phone, rating, location, etc.)
- **Start & Due Dates**: Show both start and due dates with relative formatting (Today, Tomorrow, In X days)
- **Priority Indicators**: Visual priority icons with colors (Urgent, High, Normal, Low)
- **Tags**: Display task tags with custom foreground and background colors
- **Assignees**: Show assignee avatars or initials with custom colors
- **Status**: Display custom ClickUp statuses with colors
- **Compact Mode**: Optional space-saving layout

### Organization
- **Sorting**: Sort tasks by due date, start date, priority, name, or status
- **Grouping**: Group tasks by status, priority, assignee, or custom field
- **Filtering**: Client-side filters for status, priority, tags, assignees, and date ranges
- **Smart Date Formatting**: Automatic relative date display with color coding for overdue, today, tomorrow, etc.

### User Experience
- **Visual Configuration Editor**: Easy-to-use UI for configuring the card
- **One-Click Task Completion**: Toggle task status directly from the card
- **Empty State**: Friendly display when no tasks match filters
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode Support**: Automatically adapts to Home Assistant theme

## Requirements

- Home Assistant 2023.1 or later
- [ClickUp Integration](https://github.com/chbarnhouse/ha-clickup) installed and configured
- At least one ClickUp todo entity (list or view)

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click the 3 dots in the top right
4. Select "Custom repositories"
5. Add `https://github.com/chbarnhouse/clickup-todo-card` as a repository
6. Select "Lovelace" as the category
7. Click "Add"
8. Find "ClickUp Todo Card" in the frontend section
9. Click "Install"
10. Restart Home Assistant

### Manual Installation

1. Download `clickup-todo-card.js` from the [latest release](https://github.com/chbarnhouse/clickup-todo-card/releases)
2. Copy it to `<config>/www/clickup-todo-card.js` (create the `www` folder if needed)
3. Add the resource to Lovelace:
   - Go to Configuration → Lovelace Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/clickup-todo-card.js`
   - Resource type: JavaScript Module
4. Restart Home Assistant

## Configuration

### Using the Visual Editor

1. Edit your Lovelace dashboard
2. Click "Add Card"
3. Search for "ClickUp Todo Card"
4. Select your ClickUp entity
5. Configure display options, filters, sorting, and grouping
6. Click "Save"

### YAML Configuration

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_my_list
title: My Tasks
show_start_date: true
show_due_date: true
show_priority: true
show_tags: true
show_assignees: true
show_custom_fields: false
compact_mode: false
sort_by: due_date
sort_order: asc
group_by: none
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Entity ID of a ClickUp todo list or view |
| `title` | string | Entity name | Card title |
| `show_start_date` | boolean | `true` | Show task start dates |
| `show_due_date` | boolean | `true` | Show task due dates |
| `show_priority` | boolean | `true` | Show priority icons |
| `show_tags` | boolean | `true` | Show task tags |
| `show_assignees` | boolean | `true` | Show assignee avatars |
| `show_custom_fields` | boolean | `false` | Show custom fields |
| `visible_custom_fields` | list | All | List of custom field IDs to display |
| `compact_mode` | boolean | `false` | Enable compact layout |
| `sort_by` | string | `due_date` | Sort field: `due_date`, `start_date`, `priority`, `name`, `status` |
| `sort_order` | string | `asc` | Sort order: `asc` or `desc` |
| `group_by` | string | `none` | Group by: `none`, `status`, `priority`, `assignee`, `custom_field` |
| `group_field_id` | string | - | Custom field ID when grouping by custom field |
| `filters` | object | - | Filter configuration (see below) |

### Filters Configuration

```yaml
filters:
  status:
    - 'in progress'
    - 'to do'
  priority:
    - 1  # Urgent
    - 2  # High
  tags:
    - 'important'
    - 'urgent'
  assignees:
    - '123456'  # User ID
  due_date_range:
    start: '2024-01-01'
    end: '2024-12-31'
```

## Examples

### Basic Task List

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_personal
title: Personal Tasks
```

### High Priority Tasks

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_work
title: Urgent Work Items
filters:
  priority:
    - 1  # Urgent
    - 2  # High
sort_by: due_date
sort_order: asc
```

### Tasks Due This Week

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_projects
title: This Week
filters:
  due_date_range:
    start: '{{ now().strftime("%Y-%m-%d") }}'
    end: '{{ (now() + timedelta(days=7)).strftime("%Y-%m-%d") }}'
sort_by: due_date
```

### Grouped by Status

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_team
title: Team Tasks
group_by: status
show_start_date: true
show_assignees: true
```

### Compact View with Custom Fields

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_development
title: Dev Tasks
compact_mode: true
show_custom_fields: true
visible_custom_fields:
  - 'field_id_1'  # Story Points
  - 'field_id_2'  # Sprint
group_by: custom_field
group_field_id: 'field_id_2'
```

### My Assigned Tasks

```yaml
type: custom:clickup-todo-card
entity: todo.clickup_all_tasks
title: Assigned to Me
filters:
  assignees:
    - '123456'  # Your ClickUp user ID
sort_by: priority
```

## Supported Custom Field Types

The card supports all 14 ClickUp custom field types:

- **Text**: Plain text values
- **Number**: Numeric values with locale formatting
- **Currency**: Monetary values with currency symbols
- **Date**: Formatted dates
- **Dropdown**: Single-select options
- **Labels**: Multi-select tags
- **Checkbox**: Boolean values (✓/✗)
- **URL**: Clickable links
- **Email**: Email addresses
- **Phone**: Phone numbers
- **Rating**: Star ratings (★★★☆☆)
- **Location**: Location names
- **Users**: Assigned users
- **Files**: Attached files

## Tips & Tricks

### Finding Custom Field IDs

1. Go to your ClickUp list in a browser
2. Open browser developer tools (F12)
3. Inspect a custom field
4. Look for the `data-field-id` attribute
5. Use this ID in the `visible_custom_fields` or `group_field_id` configuration

### Finding User IDs

1. Go to ClickUp Settings → Team
2. Click on a team member
3. The user ID is in the URL: `https://app.clickup.com/team/TEAM_ID/users/USER_ID`

### Performance Optimization

- Use `visible_custom_fields` to limit displayed fields
- Enable `compact_mode` for long task lists
- Use view entities with server-side filtering for large workspaces
- Group and sort strategically to organize tasks visually

### Combining with Views

The card works great with both list entities and view entities from the ClickUp integration:

- **List entities** (`todo.clickup_list_*`): Show all tasks in a list, use card filters for client-side filtering
- **View entities** (`todo.clickup_view_*`): Show pre-filtered tasks from ClickUp views, optionally add additional card filters

## Troubleshooting

### Card not showing

- Verify the ClickUp integration is installed and configured
- Check that the entity ID exists in Developer Tools → States
- Ensure the card resource is loaded (check browser console for errors)
- Try clearing browser cache

### Custom fields not displaying

- Enable `show_custom_fields: true` in configuration
- Verify the entity has `clickup_tasks` attribute with custom field data
- Check that the ClickUp integration version supports custom fields
- Use the visual editor to select specific fields

### Filters not working

- Verify filter values match exactly (case-sensitive for statuses and tags)
- Check that tasks have the filtered properties (e.g., status, priority)
- Use the visual editor to select available filter values
- Check browser console for JavaScript errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Lint code
npm run lint
```

The development server runs on `http://localhost:5000` and watches for file changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Lit](https://lit.dev/)
- Uses [custom-card-helpers](https://github.com/custom-cards/custom-card-helpers)
- Inspired by the Home Assistant stock todo card
- Created for use with the [ClickUp Integration](https://github.com/chbarnhouse/ha-clickup)

## Support

If you find this card useful, consider:

- Starring the repository on GitHub
- Reporting issues or suggesting features
- Contributing code improvements
- Sharing with other Home Assistant users

---

**Note**: This is a custom card and is not officially associated with ClickUp or Home Assistant.
