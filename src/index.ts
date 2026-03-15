/**
 * Hulunote Kanban & Table Plugin
 *
 * Official example plugin demonstrating the Hulunote Plugin System.
 *
 * Usage in outlines:
 *   Type {{table}} in a block, then add child blocks as pipe-separated rows:
 *     {{table}}
 *       Name | Age | City
 *       Alice | 30 | New York
 *       Bob | 25 | London
 *
 *   Type {{kanban}} in a block, then add child blocks as columns with sub-children as cards:
 *     {{kanban}}
 *       Todo
 *         Buy groceries
 *         Fix bug #urgent
 *       In Progress
 *         Write docs
 *       Done
 *         Deploy v1.0
 *
 * Loading:
 *   Add <script src="hulunote-kanban-table-plugin.js"></script> to your page,
 *   or load dynamically after Hulunote initializes.
 */

import { PluginDefinition, HulunotePluginAPI } from './types';
import { renderTable } from './table';
import { renderKanban } from './kanban';
import { styles } from './styles';

const plugin: PluginDefinition = {
  name: 'hulunote-kanban-table',
  version: '1.0.0',
  styles,
  renderers: {
    table: renderTable,
    kanban: renderKanban,
  },
  init(api: HulunotePluginAPI) {
    console.log('[Kanban & Table Plugin] Initialized. Use {{table}} or {{kanban}} in blocks.');
  },
  destroy() {
    console.log('[Kanban & Table Plugin] Destroyed.');
  },
};

/**
 * Auto-register: if HulunotePlugin API is already available, register immediately.
 * Otherwise, wait for it via a polling mechanism.
 */
function autoRegister(): void {
  if (window.HulunotePlugin) {
    window.HulunotePlugin.register(plugin as any);
  } else {
    // Hulunote hasn't initialized yet — wait and retry
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.HulunotePlugin) {
        clearInterval(interval);
        window.HulunotePlugin.register(plugin as any);
      } else if (attempts > 50) {
        clearInterval(interval);
        console.warn('[Kanban & Table Plugin] HulunotePlugin API not found after 5s. Plugin not loaded.');
      }
    }, 100);
  }
}

autoRegister();

// Also export for manual registration
export { plugin, renderTable, renderKanban };
