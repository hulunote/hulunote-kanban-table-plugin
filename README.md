# Hulunote Kanban & Table Plugin

Official example plugin for the **Hulunote Plugin System**. Adds Table and Kanban board components to outlines.

> **Plugin Development Guide:** See [Hulunote Plugin Development Guide](https://github.com/hulunote/hulunote/blob/master/docs/plugin-development.md) for the full documentation on how to create your own plugins.

## Usage

### Table

Type `{{table}}` in a block, then add child blocks with pipe-separated columns:

```
{{table}}
  Name | Age | City
  Alice | 30 | New York
  Bob | 25 | London
```

The first child becomes the header row. Subsequent children become data rows.

### Kanban

Type `{{kanban}}` in a block, then add child blocks as columns with sub-children as cards:

```
{{kanban}}
  Todo
    Buy groceries
    Fix bug #urgent
  In Progress
    Write docs #docs
  Done
    Deploy v1.0
```

Cards with `#tags` in their content will display tag badges.

## Install

```bash
npm install
npm run build
```

Copy the built file to Hulunote's public directory:

```bash
cp dist/hulunote-kanban-table-plugin.js /path/to/hulunote/resources/public/plugins/
```

Then in Hulunote, create a note titled **`hulunote/javascript`** and add a child block:

```
/plugins/hulunote-kanban-table-plugin.js
```

You can also create a **`hulunote/css`** note for additional CSS. Each child block is either:
- A URL (`/path/to/file.js`, `https://cdn.example.com/plugin.js`)
- Inline code (directly written in the block)

> For more details on how `hulunote/javascript` and `hulunote/css` notes work, see the [Plugin Development Guide](https://github.com/hulunote/hulunote/blob/master/docs/plugin-development.md#how-plugins-are-loaded).

## Plugin API

This plugin uses the `window.HulunotePlugin` API:

```js
window.HulunotePlugin.register({
  name: 'my-plugin',
  version: '1.0.0',
  styles: '/* CSS */',
  renderers: {
    'my-renderer': (ctx) => {
      // ctx.blockId, ctx.content, ctx.children, ctx.container
      ctx.container.innerHTML = '<div>Custom content</div>';
    }
  },
  init(api) { },
  destroy() { }
});
```

Block content pattern: `{{renderer-name}}` triggers the matching renderer.

> For the full API reference (RenderContext, lifecycle hooks, data structures), see the [Plugin Development Guide](https://github.com/hulunote/hulunote/blob/master/docs/plugin-development.md#plugin-api-reference).

## Development

```bash
npm run dev   # Watch mode (TypeScript only)
npm run build # Full build (TypeScript + bundle)
```

## Related Links

- [Hulunote Plugin Development Guide](https://github.com/hulunote/hulunote/blob/master/docs/plugin-development.md) — Full documentation on the plugin system
- [Hulunote](https://github.com/hulunote/hulunote) — The main Hulunote project
