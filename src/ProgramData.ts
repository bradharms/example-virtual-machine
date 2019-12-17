export default interface ProgramData {
  /**
   * Contains the program's hash bang line
   *
   * This begins at the first byte of the file and ends at the first newline
   * This is used to indicate to Unix interpreters where the executable VM lives
   */
  readonly hashBang: string;
  /**
   * Program headers
   *
   * Data for this is encoded as JSON and begins after the first newline from
   * the beginning of the file. Exposed here as a normal JavaScript object.
   *
   * This data is not directly readable to the program but can be accessed
   * using special instructions
   */
  readonly headers: Header;
  /**
   * The initial state of the program
   *
   * The first byte in this buffer appears as the beginning of addressable
   * memory to the VM
   */
  readonly state: ArrayBuffer;
}

interface Header {
  [key: string]: HeaderValue;
}

type HeaderValue = string | number | boolean | null | (HeaderValue[]) | { [key: string]: HeaderValue };
