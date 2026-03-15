import { RenderContext, BlockData } from './types';

/**
 * Kanban Renderer
 *
 * Data model (outline structure):
 *   {{kanban}}
 *     Todo                  ← child = column (content = column title)
 *       Buy groceries       ← grandchild = card
 *       Fix bug #123        ← grandchild = card
 *     In Progress           ← child = column
 *       Write docs          ← grandchild = card
 *     Done                  ← child = column
 *       Deploy v1.0         ← grandchild = card
 *
 * Each top-level child is a column. Its sub-children are cards.
 * Cards can have #tags in their content which are extracted and shown as badges.
 */
export function renderKanban(ctx: RenderContext): void {
  const { children, container } = ctx;

  if (!children || children.length === 0) {
    container.innerHTML = `
      <div class="hulunote-plugin-badge">
        <span class="hulunote-plugin-badge-icon"></span>
        Kanban
      </div>
      <div class="hulunote-kanban-empty">
        No columns. Add child blocks as columns, with sub-children as cards:<br>
        <code>Todo</code> → <code>Task 1</code>, <code>Task 2</code>
      </div>`;
    return;
  }

  const columnsHtml = children.map(column => {
    const cards = column.children || [];
    const cardsHtml = cards.map(card => renderCard(card)).join('');

    return `
      <div class="hulunote-kanban-column">
        <div class="hulunote-kanban-column-header">
          <span>${escapeHtml(column.content)}</span>
          <span class="hulunote-kanban-column-count">${cards.length}</span>
        </div>
        <div class="hulunote-kanban-cards">
          ${cardsHtml || '<div style="padding:8px;color:#666;font-size:12px;">No cards</div>'}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="hulunote-plugin-badge">
      <span class="hulunote-plugin-badge-icon"></span>
      Kanban · ${children.length} column${children.length !== 1 ? 's' : ''}
    </div>
    <div class="hulunote-kanban">
      ${columnsHtml}
    </div>`;
}

function renderCard(card: BlockData): string {
  const { text, tags } = extractTags(card.content);

  const tagsHtml = tags.length > 0
    ? `<div class="hulunote-kanban-card-tags">
        ${tags.map(t => `<span class="hulunote-kanban-card-tag">${escapeHtml(t)}</span>`).join('')}
       </div>`
    : '';

  // If card has sub-children, show a small indicator
  const subCount = card.children?.length || 0;
  const subIndicator = subCount > 0
    ? `<div style="margin-top:4px;font-size:11px;color:#888;">▸ ${subCount} sub-item${subCount > 1 ? 's' : ''}</div>`
    : '';

  return `
    <div class="hulunote-kanban-card">
      <div>${escapeHtml(text)}</div>
      ${tagsHtml}
      ${subIndicator}
    </div>`;
}

/**
 * Extract #tags from text content.
 * Returns the clean text and an array of tag strings.
 */
function extractTags(content: string): { text: string; tags: string[] } {
  const tagRegex = /#([^\s#\[\]]+)/g;
  const tags: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(content)) !== null) {
    tags.push(match[1]);
  }

  const text = content.replace(tagRegex, '').trim();
  return { text: text || content, tags };
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
