import ProgramData from 'tendril/ProgramData';

export default class Assembler {

  protected _headers: ProgramData['headers'];
  protected _instructions: Array<{ op:}>;

  public get headers() {
    return this.headers;
  }

  constructor(
    headers: ProgramData['headers'] = {},
  ) {
    this._headers = { ...headers };
  }

  /**
   * Set a program header
   */
  public $header(name: string, value: ProgramData['headers'][string]) {
    this._headers = {
      ...this._headers,
      [name]: value,
    };
    return this;
  }

  /**
   * Assemble the program data
   */
  public $assemble(): ProgramData {
    return {
      hashBang: '',
      headers: this.headers,
      state: new ArrayBuffer(2 ** 16),
    };
  }
}
