import fs from 'fs';
import ProgramData from 'tendril/ProgramData';

export default function loadProgram(filename: string): ProgramData {
  return {
    hashBang: '',
    headers: {},
    state: fs.readFileSync(filename),
  };
}
