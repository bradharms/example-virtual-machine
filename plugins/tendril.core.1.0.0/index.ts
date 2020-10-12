import {
  TendrilAbstractCorePlugin,
  TendrilPluginFunction,
} from 'tendril';

// tslint:disable-next-line: class-name
export default class TendrilCore_1_0_0
  extends TendrilAbstractCorePlugin {

  constructor() {
    super();
  }

  /**
   * Virtual method required by the abstract superclass
   */
  public get name(): string {
    return 'tendril.core.1.0.0';
  }

  /**
   * Provided by the abstract superclass, but overridden and extended to list additional interfaces provided by this class
   */
  public get interfaces(): string[] {
    return [...super.interfaces, 'tendril.core.1.0.0'];
  }

  /**
   * Required by the abstract superclass. Indicates other interfaces required by this plugin.
   */
  public get dependencies(): string[] {
    return [];
  }

  /**
   * Virtual method required by the superclass
   *
   * Lists all functions that are callable from VM code as system calls
   */
  public get functions(): TendrilPluginFunction[] {
    return [];
  }
}
