import { RenderContext, BlockData } from './types';

/**
 * Table Renderer
 *
 * Data model (outline structure):
 *   {{table}}
 *     Name | Age | City          ← first child = header row (pipe-separated)
 *     Alice | 30 | New York      ← subsequent children = data rows
 *     Bob | 25 | London
 *
 * Each child block's content is split by "|" to form columns.
 * The first child is treated as the header row.
 * Sub-children of each row are ignored by the table (but preserved in the outline).
 */
export function renderTable(ctx: RenderContext): void {
  const { children, container } = ctx;

  if (!children || children.length === 0) {
    container.innerHTML = `
      <div class="hulunote-plugin-badge">
        <span class="hulunote-plugin-badge-icon"></span>
        Table
      </div>
      <div class="hulunote-table-empty">
        No data. Add child blocks with pipe-separated columns:<br>
        <code>Header1 | Header2 | Header3</code>
      </div>`;
    return;
  }

  const parseRow = (block: BlockData): string[] =>
    block.content.split('|').map(cell => cell.trim());

  const headers = parseRow(children[0]);
  const rows = children.slice(1).map(parseRow);

  // Build HTML
  const headerCells = headers
    .map(h => `<th>${escapeHtml(h)}</th>`)
    .join('');

  const bodyRows = rows
    .map(row => {
      const cells = headers.map((_, i) =>
        `<td>${escapeHtml(row[i] || '')}</td>`
      ).join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  container.innerHTML = `
    <div class="hulunote-plugin-badge">
      <span class="hulunote-plugin-badge-icon"></span>
      Table · ${rows.length} row${rows.length !== 1 ? 's' : ''}
    </div>
    <div class="hulunote-table-wrapper">
      <table class="hulunote-table">
        <thead><tr>${headerCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
