/** A block node in the outline tree */
export interface BlockData {
  id: string;
  content: string;
  children?: BlockData[];
}

/** Context passed to a renderer function */
export interface RenderContext {
  blockId: string;
  content: string;
  params: string | null;
  children: BlockData[];
  container: HTMLElement;
  api: HulunotePluginAPI;
}

/** The plugin API exposed by Hulunote on window.HulunotePlugin */
export interface HulunotePluginAPI {
  register(plugin: PluginDefinition): void;
  unregister(name: string): void;
  getPlugins(): string[];
  getBlockTree(blockId: string): BlockData;
  getBlockChildren(blockId: string): BlockData[];
}

/** A renderer function that fills a container with custom UI */
export type RendererFunction = (ctx: RenderContext) => void;

/** Plugin definition object */
export interface PluginDefinition {
  name: string;
  version: string;
  styles?: string;
  renderers?: Record<string, RendererFunction>;
  init?: (api: HulunotePluginAPI) => void;
  destroy?: () => void;
}

declare global {
  interface Window {
    HulunotePlugin: HulunotePluginAPI;
  }
}
