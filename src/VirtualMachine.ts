import ProgramData from 'tendril/ProgramData';

export default interface VirtualMachine {
  /**
   * Current program
   */
  program: ProgramData;

  /**
   * Current state of the program
   */
  state: ArrayBuffer;

  stateUint8Off0: Uint8Array;
  stateUint16Off0: Uint16Array;
  stateUint16Off1: Uint16Array;
  stateUint32Off0: Uint32Array;
  stateUint32Off1: Uint32Array;
  stateUint32Off2: Uint32Array;
  stateUint32Off3: Uint32Array;

  /**
   * Reset VM state to the current program's initial state
   */
  reset(): void;
}
