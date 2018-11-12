import Vue, { PluginFunction } from 'vue';
import { Store } from 'vuex';

type AsyncFunction = ((any) => Promise<any>) | Promise<any>;

export default class VueWait extends VueWaitInstance {
  constructor(options?: VueWaitOptions);

  static install(): PluginFunction<any>;

  static init(Vue: Vue, store: Store<any>);
}

/**
 * The vue-wait Instance
 */

export class VueWaitInstance {
  /**
   * Returns boolean value if any loader exists in page.
   *
   * @returns {boolean}
   * @memberof VueWaitInstance
   */
  any(): boolean;

  /**
   * Returns boolean value if some of given loaders exists in page.
   *
   * @param {(string|string[])} waiter
   * @returns {boolean}
   * @memberof VueWaitInstance
   */
  is(waiter: string|string[]): boolean;

  /**
   * Returns boolean value if some of given loaders exists in page.
   *
   * @param {(string|string[])} waiter
   * @returns {boolean}
   * @memberof VueWaitInstance
   */
  waiting(waiter: string|string[]): boolean;

  /**
   * Returns the percentage of the given loader.
   *
   * @param {string} waiter
   * @returns {number}
   * @memberof VueWaitInstance
   */
  percent(waiter: string): number;

  /**
   * Starts the given loader.
   *
   * @param {string} waiter
   * @returns {void}
   * @memberof VueWaitInstance
   */
  start(waiter: string): void;

  /**
   * Stops the given loader.
   *
   * @param {string} waiter
   * @returns {void}
   * @memberof VueWaitInstance
   */
  end(waiter: string): void;

  /**
   * Sets the progress of the given loader.
   *
   * @param {string} waiter
   * @param {number} current
   * @param {number} [total]
   * @memberof VueWaitInstance
   */
  progress(waiter: string, current: number, total?: number);

  waitFor(waiter, callback: AsyncFunction, forceSync?: false): Promise<any>;
  waitFor(waiter, callback: Function, forceSync: true): Promise<any>;
}

export interface VueWaitOptions{
  /**
   * You can change this value to rename the accessor. E.g. if you rename this to $w, your VueWait methods will be accessible by $w.waits(..) etc.
   */
  accessorName?: string,
  /**
   *  Use this value for enabling integration with Vuex store. When this value is true VueWait will store data in Vuex store and all changes to this data will be made by dispatching actions to store
   */
  useVuex?: boolean,
  /**
   * Name for Vuex store if useVuex set to true, otherwise not used.
   */
  vuexModuleName?: string,
  /**
   * Registers v-wait component.
   */
  registerComponent?: boolean,
  /**
   * Changes v-wait component name.
   */
  componentName?: string;
  /**
   * Registers v-wait directive.
   */
  registerDirective?: boolean;
  /**
   * Changes v-wait directive name.
   */
  directiveName?: string;
}
