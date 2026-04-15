// ─── State ───────────────────────────────────────────────
const state = {
  title: 'Redesign onboarding flow for mobile users',
  description: 'Audit the current onboarding screens and identify friction points from user research sessions conducted in Q1. Deliver updated wireframes with improved copy, progressive disclosure patterns, and a streamlined 3-step flow that reduces drop-off. Coordinate with the copy team and get sign-off from product leadership before handoff to engineering.',
  priority: 'High',
  status: 'In Progress',
  dueDate: new Date('2026-04-18T18:00:00Z'),
  // snapshot for cancel
  _snap: null
};
 
const COLLAPSE_THRESHOLD = 120; // chars before collapsing
 
// ─── DOM refs ────────────────────────────────────────────
const card          = document.getElementById('todo-card');
const viewMode      = document.getElementById('view-mode');
const editForm      = document.getElementById('edit-form');
const titleEl       = document.getElementById('todo-title');
const priorityBadge = document.getElementById('priority-badge');
const statusBadge   = document.getElementById('status-badge');
const overdueBadge  = document.getElementById('overdue-badge');
const dueDateEl     = document.getElementById('due-date-el');
const timeRemEl     = document.getElementById('time-remaining');
const statusSelect  = document.getElementById('status-select');
const checkbox      = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const descWrap      = document.getElementById('desc-wrap');
const editBtn       = document.getElementById('edit-btn');
 
// ─── Render description ───────────────────────────────────
function renderDesc() {
  const desc = state.description;
  const isLong = desc.length > COLLAPSE_THRESHOLD;
 
  if (!isLong) {
    descWrap.innerHTML = `<p data-testid="test-todo-description">${esc(desc)}</p>`;
    return;
  }
 
  const preview = desc.slice(0, COLLAPSE_THRESHOLD).trimEnd() + '…';
  descWrap.innerHTML = `
    <div class="desc-preview" id="desc-preview">${esc(preview)}</div>
    <div data-testid="test-todo-collapsible-section"
         id="collapsible"
         role="region"
         aria-labelledby="expand-toggle">
      <p data-testid="test-todo-description"
         style="border-radius:0;border-left:3px solid var(--card-border)">
        ${esc(desc)}
      </p>
    </div>
    <button data-testid="test-todo-expand-toggle"
            id="expand-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="collapsible">
      <span class="expand-icon">▼</span>
      <span id="expand-label">Show more</span>
    </button>`;
 
  document.getElementById('expand-toggle').addEventListener('click', toggleExpand);
}
 
function toggleExpand() {
  const btn = document.getElementById('expand-toggle');
  const col = document.getElementById('collapsible');
  const lbl = document.getElementById('expand-label');
  const pre = document.getElementById('desc-preview');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
 
  btn.setAttribute('aria-expanded', String(!expanded));
  col.classList.toggle('expanded', !expanded);
  lbl.textContent = !expanded ? 'Show less' : 'Show more';
  if (pre) pre.style.display = !expanded ? 'none' : '';
}
 
function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
 
// ─── Priority ─────────────────────────────────────────────
function applyPriority(p) {
  card.classList.remove('priority-high','priority-medium','priority-low');
  card.classList.add('priority-' + p.toLowerCase());
  priorityBadge.className = 'badge priority-' + p.toLowerCase();
  priorityBadge.textContent = p;
  priorityBadge.setAttribute('aria-label', 'Priority: ' + p);
}
 
// ─── Status ───────────────────────────────────────────────
function applyStatus(s) {
  state.status = s;
  card.classList.remove('status-done','status-overdue');
 
  const map = { 'Done':'s-done','In Progress':'s-in-progress','Pending':'s-pending' };
  statusBadge.className = map[s] || 's-pending';
  statusBadge.textContent = s;
  statusBadge.setAttribute('aria-label', 'Status: ' + s);
  statusSelect.value = s;
  checkbox.checked = (s === 'Done');
 
  if (s === 'Done') {
    card.classList.add('status-done');
    overdueBadge.classList.remove('visible');
    timeRemEl.textContent = 'Completed';
    timeRemEl.className = 'tr-done';
    return;
  }
  card.classList.remove('status-done');
  updateTime();
}
 
// ─── Time remaining ───────────────────────────────────────
function formatTime() {
  if (state.status === 'Done') return { text: 'Completed', cls: 'tr-done', overdue: false };
  const now = new Date();
  const diff = state.dueDate - now;
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hrs  = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);
 
  let text, cls, overdue = diff < 0;
 
  if (overdue) {
    if (mins < 60)  text = `Overdue by ${mins} min${mins!==1?'s':''}`;
    else if (hrs<24) text = `Overdue by ${hrs} hour${hrs!==1?'s':''}`;
    else             text = `Overdue by ${days} day${days!==1?'s':''}`;
    cls = 'tr-overdue';
  } else {
    if (mins < 1)    text = 'Due now!';
    else if (mins<60) text = `Due in ${mins} min${mins!==1?'s':''}`;
    else if (hrs<24)  text = `Due in ${hrs} hour${hrs!==1?'s':''}`;
    else if (days===1) text = 'Due tomorrow';
    else               text = `Due in ${days} days`;
    cls = days > 3 ? 'tr-later' : 'tr-soon';
  }
  return { text, cls, overdue };
}
 
function updateTime() {
  if (state.status === 'Done') return;
  const { text, cls, overdue } = formatTime();
  timeRemEl.textContent = text;
  timeRemEl.className = cls;
  timeRemEl.setAttribute('aria-label', 'Time remaining: ' + text);
 
  overdueBadge.classList.toggle('visible', overdue);
  card.classList.toggle('status-overdue', overdue);
}
 
function formatDueDate(d) {
  return 'Due ' + d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
 
// ─── Edit mode ────────────────────────────────────────────
function openEdit() {
  state._snap = { ...state };
  document.getElementById('edit-title').value     = state.title;
  document.getElementById('edit-desc').value      = state.description;
  document.getElementById('edit-priority').value  = state.priority;
  // format for datetime-local
  const local = new Date(state.dueDate.getTime() - state.dueDate.getTimezoneOffset()*60000)
    .toISOString().slice(0,16);
  document.getElementById('edit-due').value = local;
 
  viewMode.style.display = 'none';
  editForm.classList.add('active');
  document.getElementById('edit-title').focus();
}
 
function closeEdit(save) {
  if (save) {
    const newTitle = document.getElementById('edit-title').value.trim();
    const newDesc  = document.getElementById('edit-desc').value.trim();
    const newPri   = document.getElementById('edit-priority').value;
    const newDue   = document.getElementById('edit-due').value;
 
    if (newTitle) { state.title = newTitle; titleEl.textContent = newTitle; }
    if (newDesc)  { state.description = newDesc; renderDesc(); }
    state.priority = newPri;
    applyPriority(newPri);
    if (newDue) {
      state.dueDate = new Date(newDue);
      dueDateEl.textContent = formatDueDate(state.dueDate);
      dueDateEl.setAttribute('datetime', state.dueDate.toISOString());
    }
    updateTime();
  }
  editForm.classList.remove('active');
  viewMode.style.display = '';
  editBtn.focus();
}
 
// ─── Event listeners ──────────────────────────────────────
checkbox.addEventListener('change', () => {
  applyStatus(checkbox.checked ? 'Done' : 'Pending');
});
 
statusSelect.addEventListener('change', () => {
  applyStatus(statusSelect.value);
});
 
// ─── Delete ───────────────────────────────────────────────
function deleteTodo() {
  if (confirm('Are you sure you want to permanently delete this task?')) {
    // Save deletion to localStorage
    localStorage.setItem('todoDeleted', 'true');
    // Remove card from DOM with fade-out animation
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      card.style.display = 'none';
      // Alert user that task was deleted
      alert('Task deleted permanently');
    }, 300);
  }
}

// ─── Init ─────────────────────────────────────────────────
(function init() {
  // Check if todo was previously deleted
  if (localStorage.getItem('todoDeleted') === 'true') {
    card.style.display = 'none';
    return;
  }
  
  renderDesc();
  applyPriority(state.priority);
  applyStatus(state.status);
  dueDateEl.textContent = formatDueDate(state.dueDate);
  dueDateEl.setAttribute('datetime', state.dueDate.toISOString());
  updateTime();
  setInterval(updateTime, 30000);
})();