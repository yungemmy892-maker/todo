# Todo Card Component — Stage 1a

A sophisticated, accessible todo card component built with vanilla HTML, CSS, and JavaScript. This interactive component displays a single todo item with completion tracking, priority levels, due dates, time-remaining indicators, and inline editing.

## Technologies

- **HTML5**: Semantic markup and comprehensive accessibility features
- **CSS3**: Custom properties, responsive design, dark mode support, and smooth animations
- **Vanilla JavaScript**: DOM manipulation, state management, and persistent deletion via localStorage

## Features

- ✅ **Task Completion**: Mark tasks as complete with a custom checkbox (updates status to "Done")
- 📝 **Inline Editing**: Edit mode with separate form fields for all task properties
- 🏷️ **Priority & Status**: Visual indicators (High/Medium/Low and Pending/In Progress/Done)
- 📅 **Due Dates**: Live countdown showing time remaining until due date with color-coded urgency
- 🏷️ **Tags**: Categorize tasks with multiple tags
- 🌙 **Dark Mode**: Automatic dark mode support based on system preferences
- 📱 **Responsive**: Mobile-friendly card layout
- 🗑️ **Permanent Deletion**: Delete button with confirmation and localStorage persistence
- ♿ **Accessibility**: WCAG 2.1 AA compliance with screen reader support and keyboard navigation

## Demo

Open `index.html` in your web browser to see the component in action.

Alternatively, to run locally with a development server:

```bash
# Using Python (if available)
python -m http.server 8000

# Or using Node.js
npx serve .

# Then open http://localhost:8000 (or :8000/index.html)
```

## File Structure

```
Todo/
├── index.html     # Main HTML file
├── style.css      # Styles and responsive design
├── script.js      # JavaScript functionality
├── .gitignore     # Git ignore patterns
├── LICENSE        # MIT License
└── README.md      # This file
```

## What Changed from Stage 0

**Stage 0** was a minimal static card layout. **Stage 1a** introduces interactive functionality:

| Feature | Stage 0 | Stage 1a |
|---------|---------|----------|
| Structure | Static HTML | Semantic, accessibility-focused |
| Edit Mode | N/A | Full inline editing with form validation |
| Status Control | Display only | Interactive dropdown |
| Completion | N/A | Checkbox that syncs status to "Done" |
| Time Display | Static due date | Live countdown (updates every 30s) |
| Deletion | N/A | Permanent deletion with localStorage persistence |
| Overdue Indicator | N/A | Dynamic "Overdue" badge with ARIA live region |
| Description | Static | Collapsible long descriptions with "Show more" toggle |
| Accessibility | Basic | WCAG 2.1 AA with full screen reader support |
| Dark Mode | N/A | Automatic system preference detection |

## Design Decisions

### 1. **Vanilla JavaScript (No Framework)**
- **Why**: Minimizes bundle size and removes dependencies for a single-component demo
- **Trade-off**: More verbose state management compared to React/Vue

### 2. **Inline Edit Mode**
- **Why**: Reduces context switching for users; keeps editing interface discoverable
- **Implementation**: Modal form toggles between view and edit modes, with snapshot-based cancellation

### 3. **Live Time Remaining Counter**
- **Why**: Provides real-time urgency cues without page refresh
- **Implementation**: Updates every 30 seconds to reduce DOM thrashing while maintaining responsiveness

### 4. **localStorage-Based Deletion**
- **Why**: Demonstrates persistent state without a backend; survives page reloads
- **Limitation**: Only works on current domain/browser; not synced across devices

### 5. **Collapsible Long Descriptions**
- **Why**: Prevents card overflow on mobile; maintains readability for longer content
- **Threshold**: 120 characters before collapse

### 6. **Priority Visual Indicator**
- **Why**: Left-side bar provides at-a-glance priority without reading text
- **Implementation**: Semantic color coding (red=high, yellow=medium, green=low)

### 7. **Status Dropdown Instead of Status Buttons**
- **Why**: Cleaner UI and reduces card height; easier to discover than separate buttons
- **Behavioral Link**: Checking the checkbox automatically sets status to "Done"

## Accessibility (WCAG 2.1 AA)

This component was designed with inclusive access as a core requirement:

### Screen Reader Support
- **Semantic HTML**: Uses `<article>`, `<h2>`, `<time>`, `<select>`, `<button>` for proper element roles
- **ARIA Labels**: All interactive elements have descriptive `aria-label` attributes
- **Live Regions**: 
  - `aria-live="polite"` on time remaining updates announces status changes
  - `aria-live="assertive"` on overdue badge immediately alerts users
- **Form Associations**: Labels properly associated to form controls with `for` attributes
- **Expanded/Collapsed States**: Collapsible section uses `aria-expanded` and `aria-controls`

### Keyboard Navigation
- **Tab Order**: All interactive elements are keyboard accessible
- **Focus Visible**: Clear focus indicators on all buttons and inputs
- **Button Triggers**: Edit, Delete, and expand toggle buttons work with Enter/Space
- **Status Dropdown**: Status select fully keyboard accessible

### Visual Design
- **Color Contrast**: All text meets 4.5:1 contrast ratio (WCAG AA standard)
- **Color Not Alone**: Status and priority communicated through icons/text, not color only
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Reduced Motion**: CSS respects `prefers-reduced-motion` for users sensitive to animations

### Semantic HTML
```html
<article> — Main container
<h2> — Task title
<time> — Due date with datetime attribute
<form> — Edit mode
<select> — Status control
<input type="checkbox"> — Completion toggle
<button> — All actions (Edit, Delete)
<ul role="list"> — Tags list
```

### Testing
- Tested with NVDA (Windows screen reader)
- Verified keyboard-only navigation
- Checked color contrast with WebAIM tool
- Validated HTML with W3C validator

## Known Limitations

### 1. **Single Task Only**
- Component displays one hardcoded task
- No task list or multi-task management
- State stored in `localStorage` is task-specific

### 2. **localStorage Scope**
- Deletion persists only on the current browser/domain
- No cloud sync or multi-device support
- Clearing browser cache will restore deleted tasks

### 3. **No Backend Integration**
- All data is client-side only
- Changes don't persist across browsers or devices
- No user authentication or multi-user support

### 4. **Edit Validation**
- Title and description can be empty (validation exists but allows empty saves)
- No character limits enforced
- No duplicate detection

### 5. **Time Display**
- Live countdown updates every 30 seconds (not real-time)
- No timezone awareness — uses browser's local timezone
- Time calculations based on current browser time (not server time)

### 6. **Responsive Breakpoints**
- Optimized for mobile, tablet, and desktop
- May display differently on very small screens (<320px)
- Touch targets meet 44px minimum on mobile

### 7. **Browser Compatibility**
- Requires ES6 support (template literals, arrow functions, etc.)
- `localStorage` must be enabled
- CSS Grid and Flexbox required
- No IE 11 support

### 8. **Collapsible Description**
- Fixed 120-character threshold for collapse
- No user preference for collapse behavior
- Expand/collapse only works inline (no modal view)

## Usage Guide

1. **Download or clone** the project files
2. **Open `index.html`** in any modern web browser
3. **Interact with the todo card**:
   - ✓ **Check the checkbox** to mark the task as complete (status changes to "Done")
   - ✎ **Click "Edit"** to modify the title, description, priority, or due date
   - **Click "Cancel"** to discard changes without saving
   - **Click "Save"** to apply changes
   - 🗑️ **Click "Delete"** to permanently remove the task (requires confirmation)
   - **Click "Show more"** to expand long descriptions

### State & Persistence
- **State Object**: Task data stored in `state` object with title, description, priority, status, and due date
- **Deletion**: Uses `localStorage` to persist deletion state across page reloads
- **Live Updates**: Time remaining counter updates every 30 seconds
- **Edit Snapshots**: Pressing Cancel restores the previous values (snapshot-based)

## Browser Support

- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

## Customization

The component uses CSS custom properties (variables) for easy theming:

- `--bg`: Background color
- `--card-bg`: Card background
- `--text-primary`: Primary text color
- `--accent`: Accent color for highlights
- `--green`: Success/completion color
- `--amber`: Warning color
- `--blue`: Info color

## Development

To modify the component:

1. Edit `index.html` for structure changes
2. Modify `style.css` for visual changes
3. Update `script.js` for functionality changes

## License

This project is open source and available under the MIT License.