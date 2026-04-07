 const DUE_DATE = new Date('2026-04-18T18:00:00Z');

  let isEditing = false;
  let originalTitle = '';
  let originalDescription = '';

  function handleEdit() {
    const titleEl = document.getElementById('todo-title');
    const descEl = document.getElementById('todo-description');
    const editBtn = document.getElementById('edit-btn');

    if (!isEditing) {
      // Enter edit mode
      isEditing = true;
      originalTitle = titleEl.textContent;
      originalDescription = descEl.textContent;

      titleEl.contentEditable = true;
      descEl.contentEditable = true;

      titleEl.style.border = '1px solid var(--accent)';
      descEl.style.border = '1px solid var(--accent)';

      editBtn.innerHTML = `
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2.5 8l3.5 3.5L13.5 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Save
      `;
      editBtn.setAttribute('aria-label', 'Save changes');

      // Add cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'action-btn';
      cancelBtn.innerHTML = `
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
        </svg>
        Cancel
      `;
      cancelBtn.setAttribute('aria-label', 'Cancel editing');
      cancelBtn.onclick = handleCancelEdit;
      editBtn.parentNode.insertBefore(cancelBtn, editBtn.nextSibling);

    } else {
      // Save changes
      saveEdit();
    }
  }

  function handleCancelEdit() {
    const titleEl = document.getElementById('todo-title');
    const descEl = document.getElementById('todo-description');
    const editBtn = document.getElementById('edit-btn');
    const cancelBtn = editBtn.nextElementSibling;

    // Restore original values
    titleEl.textContent = originalTitle;
    descEl.textContent = originalDescription;

    // Exit edit mode
    exitEditMode();
  }

  function saveEdit() {
    // Just exit edit mode (changes are already in the elements)
    exitEditMode();
  }

  function exitEditMode() {
    const titleEl = document.getElementById('todo-title');
    const descEl = document.getElementById('todo-description');
    const editBtn = document.getElementById('edit-btn');
    const cancelBtn = editBtn.nextElementSibling;

    isEditing = false;

    titleEl.contentEditable = false;
    descEl.contentEditable = false;

    titleEl.style.border = '';
    descEl.style.border = '';

    editBtn.innerHTML = `
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M11 2.5l2.5 2.5-8 8H3V10.5l8-8z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>
        <path d="M9.5 4l2 2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
      </svg>
      Edit
    `;
    editBtn.setAttribute('aria-label', 'Edit task');

    // Remove cancel button
    if (cancelBtn && cancelBtn.textContent.includes('Cancel')) {
      cancelBtn.remove();
    }
  }
  function getTimeRemaining() {
    const now = new Date();
    const diffMs = DUE_DATE - now;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMs <= 0) {
      const overMins = Math.abs(diffMins);
      if (overMins < 60) return { text: `Overdue by ${overMins} min${overMins !== 1 ? 's' : ''}`, cls: 'overdue' };
      const overHours = Math.abs(diffHours);
      if (overHours < 24) return { text: `Overdue by ${overHours} hour${overHours !== 1 ? 's' : ''}`, cls: 'overdue' };
      const overDays = Math.abs(diffDays);
      return { text: `Overdue by ${overDays} day${overDays !== 1 ? 's' : ''}`, cls: 'overdue' };
    }

    if (diffMins < 60) return { text: diffMins <= 1 ? 'Due now!' : `Due in ${diffMins} mins`, cls: 'due-soon' };
    if (diffHours < 24) return { text: diffHours === 1 ? 'Due in 1 hour' : `Due in ${diffHours} hours`, cls: 'due-soon' };
    if (diffDays === 1) return { text: 'Due tomorrow', cls: 'due-soon' };
    if (diffDays <= 7) return { text: `Due in ${diffDays} days`, cls: 'due-soon' };
    return { text: `Due in ${diffDays} days`, cls: 'due-later' };
  }

  function updateTimeRemaining() {
    const el = document.getElementById('time-remaining');
    const { text, cls } = getTimeRemaining();
    el.textContent = text;
    el.className = cls;
    el.setAttribute('aria-label', `Time remaining: ${text}`);
  }

  function handleToggle(checkbox) {
    const card = document.getElementById('todo-card');
    const status = document.getElementById('status-badge');

    if (checkbox.checked) {
      card.classList.add('completed');
      status.textContent = 'Done';
      status.className = 'badge status-done';
      status.setAttribute('aria-label', 'Status: Done');
    } else {
      card.classList.remove('completed');
      status.textContent = 'In Progress';
      status.className = 'badge status-in-progress';
      status.setAttribute('aria-label', 'Status: In Progress');
    }
  }

  updateTimeRemaining();
  setInterval(updateTimeRemaining, 60000);