/**
 * Location of the code pointer in memory.
 *
 * The code pointer is located at position 0, and its default value is also 0.
 * This means the code pointer is initialized to point at itself, and the VM
 * will read the code pointer's initial location as an instruction with op code
 * 0, which is a no-op. This is fine, because it will cause the VM to simply
 * advance the code pointer to the next instruction.
 */
export const P_CODE_POINTER = 0x0000 as const;

export const P_END = 0xFFFF as const;
export const O_NOP = 0x00 as const;
export const O_DBG = 0x01 as const;
export const O_UJP = 0x02 as const;
export const O_CJP = 0x43 as const;
export const O_ADD = 0xC4 as const;
export const O_SUB = 0xC5 as const;
export const O_MUL = 0xC6 as const;
export const O_DIV = 0xC7 as const;
export const O_MOD = 0xC8 as const;

export const INSTRUCTION_LENGTH = 0x08;
