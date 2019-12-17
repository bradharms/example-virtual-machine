import {
  O_ADD,
  O_DBG,
  O_DIV,
  O_UJM,
  O_MOD,
  O_MUL,
  O_NOP,
  O_CJP,
  O_SUB,
} from 'tendril/constants';
import Pointer from 'tendril/Pointer';

type Instruction = {
  op: typeof O_ADD,
  l: Pointer;
  r: Pointer;
  s: number;
} | {
  op: typeof O_DBG,
  l: Pointer;
  r: Pointer;
  s: number
} | {
  op: typeof O_DIV,
  l: Pointer;
  r: Pointer;
  s: number
} | {
  op: typeof O_UJM,
  a: number;
} | {
  op: typeof O_MOD,
  l: Pointer;
  r: Pointer;
  s: number
} | {
  op: typeof O_MUL,
  l: Pointer;
  r: Pointer;
  s: number
} | {
  op: typeof O_NOP,
} | {
  op: typeof O_CJP,
} | {
  op: typeof O_SUB,
  l: Pointer;
  r: Pointer;
  s: number
};

export default Instruction;
