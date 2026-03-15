/**
 * CSS styles for the Table and Kanban plugin components.
 * Injected into <head> by the Hulunote plugin system.
 */
export const styles = `
/* ==================== Table Component ==================== */

.hulunote-table-wrapper {
  width: 100%;
  overflow-x: auto;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid var(--theme-border, #333);
}

.hulunote-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.5;
}

.hulunote-table thead {
  background: var(--theme-bg-secondary, #2a2d35);
}

.hulunote-table th {
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
  color: var(--theme-text-primary, #e0e0e0);
  border-bottom: 2px solid var(--theme-accent, #6c8dfa);
  white-space: nowrap;
}

.hulunote-table td {
  padding: 8px 14px;
  color: var(--theme-text-secondary, #ccc);
  border-bottom: 1px solid var(--theme-border, #333);
}

.hulunote-table tbody tr:hover {
  background: var(--theme-bg-hover, rgba(108, 141, 250, 0.08));
}

.hulunote-table tbody tr:last-child td {
  border-bottom: none;
}

.hulunote-table-empty {
  padding: 20px;
  text-align: center;
  color: #888;
  font-style: italic;
}

/* ==================== Kanban Component ==================== */

.hulunote-kanban {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0 12px 0;
  min-height: 120px;
}

.hulunote-kanban-column {
  flex: 0 0 260px;
  min-width: 220px;
  max-width: 300px;
  background: var(--theme-bg-secondary, #2a2d35);
  border-radius: 8px;
  border: 1px solid var(--theme-border, #333);
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.hulunote-kanban-column-header {
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  color: var(--theme-text-primary, #e0e0e0);
  border-bottom: 2px solid var(--theme-accent, #6c8dfa);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hulunote-kanban-column-count {
  background: var(--theme-accent, #6c8dfa);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.hulunote-kanban-cards {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hulunote-kanban-card {
  background: var(--theme-bg-primary, #1e2028);
  border: 1px solid var(--theme-border, #333);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--theme-text-secondary, #ccc);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.hulunote-kanban-card:hover {
  border-color: var(--theme-accent, #6c8dfa);
  box-shadow: 0 0 0 1px var(--theme-accent, #6c8dfa);
}

.hulunote-kanban-card-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.hulunote-kanban-card-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(108, 141, 250, 0.15);
  color: var(--theme-accent, #6c8dfa);
}

.hulunote-kanban-empty {
  padding: 20px;
  text-align: center;
  color: #888;
  font-style: italic;
}

/* ==================== Plugin Badge ==================== */

.hulunote-plugin-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #888;
  margin-bottom: 4px;
  user-select: none;
}

.hulunote-plugin-badge-icon {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: var(--theme-accent, #6c8dfa);
  display: inline-block;
}
`;
