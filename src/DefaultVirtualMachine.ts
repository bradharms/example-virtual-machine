import {
  INSTRUCTION_LENGTH,
  O_DBG,
  O_UJM,
  O_NOP,
  O_CJP,
  P_CODE_POINTER,
  P_END,
} from 'tendril/constants';
import ProgramData from 'tendril/ProgramData';
import VirtualMachine from 'tendril/VirtualMachine';

export default class DefaultVirtualMachine implements VirtualMachine {

  public readonly state = new ArrayBuffer(2 ** 16);

  public readonly stateUint8Off0 = new Uint8Array(this.state, 0);
  public readonly stateUint16Off0 = new Uint16Array(this.state, 0);
  public readonly stateUint16Off1 = new Uint16Array(this.state, 1);
  public readonly stateUint32Off0 = new Uint32Array(this.state, 0);
  public readonly stateUint32Off1 = new Uint32Array(this.state, 1);
  public readonly stateUint32Off2 = new Uint32Array(this.state, 2);
  public readonly stateUint32Off3 = new Uint32Array(this.state, 3);

  constructor(
    public program: ProgramData,
  ) {
    this.reset();
  }

  public reset() {
    this.stateUint8Off0.set(new Uint8Array(this.program.state));
  }

  /**
   * Process a CPU cycle
   */
  protected *cycle() {
    const ui8o0 = this.stateUint8Off0;
    const ui16o0 = this.stateUint16Off0;
    const ui16o1 = this.stateUint16Off1;
    const ui32o0 = this.stateUint32Off0;
    const ui32o1 = this.stateUint32Off1;
    const ui32o2 = this.stateUint32Off2;
    const ui32o3 = this.stateUint32Off3;
    while (ui16o0[P_CODE_POINTER] < P_END) {
      const op = ui8o0[ui16o0[P_CODE_POINTER]];

      switch (op) {
        case O_NOP: { // No op
          yield;
          ui16o0[P_CODE_POINTER] += INSTRUCTION_LENGTH;
          break;
        }
        case O_DBG: { // Debug
          console.log(`Debug at 0x${ui16o0[P_CODE_POINTER].toString(0x10)}`);
          yield;
          ui16o0[P_CODE_POINTER] += INSTRUCTION_LENGTH;
          break;
        }
        case O_UJM: { // Unconditional break
          ui16o0[P_CODE_POINTER] = ui16o1[P_CODE_POINTER];
          yield;
          // JMP does not advance the code pointer
          break;
        }
        case O_CJP: { // Conditional relative break
          const skips = ui8o0[ui16o0[P_CODE_POINTER] + 1];
          const pCondition = ui16o0[((ui16o0[P_CODE_POINTER] + 2) / 2) | 0];
          const bitMask = ui32o0[((ui16o0[P_CODE_POINTER] + 4) / 4) | 0];
          const r = pCondition % 4;
          const condition = (
            r === 0 ? ui32o0 :
              r === 1 ? ui32o1 :
                r === 2 ? ui32o2 :
                  r === 3 ? ui32o3 :
                    null
          )[(pCondition / 4) | 0];
          if (condition & bitMask) {
            ui16o0[P_CODE_POINTER] += INSTRUCTION_LENGTH * skips;
            yield;
          } else {
            ui16o0[P_CODE_POINTER] += INSTRUCTION_LENGTH;
            yield;
          }
          break;
        }
      }
    }
  }
}
