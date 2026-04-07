# Todo Card Component

A simple, elegant todo card component built with vanilla HTML, CSS, and JavaScript. This interactive demo displays a single todo item with completion tracking, priority levels, due dates, and tags.

## Technologies

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Custom properties, responsive design, and dark mode support
- **Vanilla JavaScript**: DOM manipulation and interactive functionality

## Features

- ✅ **Task Completion**: Mark tasks as complete with a custom checkbox
- 📝 **Editable Tasks**: Click the Edit button to modify the title and description
- 🏷️ **Priority & Status**: Visual indicators for task priority and current status
- 📅 **Due Dates**: Shows time remaining until due date with color-coded urgency
- 🏷️ **Tags**: Categorize tasks with custom tags
- 🌙 **Dark Mode**: Automatic dark mode support based on system preferences
- 📱 **Responsive**: Mobile-friendly design

## Demo

Open `todo.html` in your web browser to see the component in action.

Alternatively, to run locally with a development server:

```bash
# Using Python (if available)
python -m http.server 8000

# Or using Node.js
npx serve .

# Then open http://localhost:8000/todo.html
```

## File Structure

```
Todo/
├── todo.html      # Main HTML file
├── style.css      # Styles and responsive design
├── script.js      # JavaScript functionality
├── .gitignore     # Git ignore patterns
├── LICENSE        # MIT License
└── README.md      # This file
```

## Usage

1. Clone or download the project files
2. Open `todo.html` in any modern web browser
3. Interact with the todo card:
   - Check/uncheck the checkbox to mark as complete
   - Click "Edit" to modify the title and description
   - Use "Delete" to remove the task (currently shows alert)

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

1. Edit `todo.html` for structure changes
2. Modify `style.css` for visual changes
3. Update `script.js` for functionality changes

## License

This project is open source and available under the MIT License.