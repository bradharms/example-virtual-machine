# Tendril Specification

Tendril is a virtual machine that executes instructions encoded as binary data and which operate on a fixed memory range. It does not use any registers other than the code pointer, and all instructions are capable of storing to and/or retrieving from any point in addressable memory. It is designed to be familiar to programmers of higher-level languages.

## Instruction Set

Tendril recognizes a fixed set of instructions. Instructions are 64 bits in length. The first 8 bits are used to indicate an op code, and remaining bits are used to accept one or more fields, referred to as "bit fields".

Currently instructions end at hex code `1E` (`SCL`).

| Hex  | Asm   | Description           | Bit assignments (8-63)                                                  |
|------|-------|-----------------------|-------------------------------------------------------------------------|
| `00` | `NOP` | No-op                 | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `01` | `SET` | Store a value         | `----:---- DDDD:DDDD DDDD:DDDD DDDD:DDDD DDDD:DDDD CCCC:CCCC CCCC:CCCC` |
| `02` | `MOV` | Copy a range of bytes | `----:---- AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `03` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `04` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `05` | `CJP` | Conditional jump      | `x---:---- AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `06` | `UJP` | Unconditional jump    | `xaaa:---- AAAA:AAAA AAAA:AAAA ----:---- ----:---- ----:---- ----:----` |
| `07` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `08` | `ADD` | `+`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `09` | `SUB` | `-`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `0A` | `MUL` | `*`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `0B` | `DIV` | `/`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `0C` | `MOD` | `%`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `0D` | `BAN` | `&`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `0E` | `BOR` | `|`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `0F` | `BXO` | `^`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `10` | `BNT` | `~`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA ----:---- ----:---- CCCC:CCCC CCCC:CCCC` |
| `11` | `BSL` | `<<`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `12` | `BSR` | `>>`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `13` | `AND` | `&&`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `14` | `ORR` | `||`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `15` | `NOT` | `!`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA ----:---- ----:---- CCCC:CCCC CCCC:CCCC` |
| `16` | `EQL` | `==`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `17` | `NEQ` | `!=`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `18` | `GTR` | `>`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `19` | `LSR` | `<`                   | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `1A` | `GTE` | `>=`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `1B` | `LTE` | `<=`                  | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `1C` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `1D` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `1E` | `SCL` | System call           | `efgh:---- EEEE:EEEE FFFF:FFFF GGGG:GGGG GGGG:GGGG HHHH:HHHH HHHH:HHHH` |
| `1F` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `20` | `---` | _undefined_           | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| ...  | ...   | ...                   | ...                                                                     |

### Bit Fields

Fields are assigned to fixed bit ranges within an instruction and are always of the same type. The way fields A-D are used depends on the instruction.

| Field | Description                                                                                |
|-------|--------------------------------------------------------------------------------------------|
| `-`   | The value should be `0` and any other value will result in undefined behavior              |
| `x`   | If set, the value located at `A` will be treated as a second-level pointer                 |
| `a`   | Type mode indicator for the final value of `A`, if applicable                              |
| `y`   | If set, the value located at `B` will be treated as a second-level pointer                 |
| `b`   | Type mode indicator for the final value of `B`                                             |
| `A`   | Pointer to 1st argument; often used as a left-hand operand. Not used when `D` is present.  |
| `B`   | Pointer to 2nd argument; often used as a right-hand operand. Not used when `D` is present. |
| `C`   | Pointer to 3rd argument; often used as result storage location                             |
| `D`   | 1st argument as a literal 32-bit value stored within the instruction itself.               |
| `e`   | If set, field `E` is treated as a signed value. Otherwise, it is an unsigned value.        |
| `f`   | If set, field `F` is treated as a signed value. Otherwise, it is an unsigned value.        |
| `g`   | If set, field `G` is treated as a signed value. Otherwise, it is an unsigned value.        |
| `h`   | If set, field `H` is treated as a signed value. Otherwise, it is an unsigned value.        |
| `E`   | 1st argument as a literal 8-bit value stored within the instruction itself.                |
| `F`   | 2nd argument as a literal 8-bit value stored within the instruction itself.                |
| `G`   | 3rd argument as a literal 16-bit value stored within the instruction itself.               |
| `H`   | 4rd argument as a literal 16-bit value stored within the instruction itself.               |

### Type Mode Indicators

Most values require corresponding 3-bit type mode indicators in order to determine how many bits are in the value and how the bits should be interpreted during operations involving other values. The following type modes are possible:

| Mode Bits | Type                    |
|-----------|-------------------------|
| `000`     | Unsigned 8-bit integer  |
| `001`     | Unsigned 16-bit integer |
| `010`     | Unsigned 32-bit integer |
| `011`     | INVALID; DO NOT USE     |
| `100`     | Signed 8-bit integer    |
| `101`     | Signed 16-bit integer   |
| `110`     | Signed 32-bit integer   |
| `111`     | Signed 32-bit float     |

### SET - Store a Value

`SET` is used to store a literal value at a location in memory. The value is contained within the instruction.

| Field | Description                         |
|-------|-------------------------------------|
| `C`   | Location where value will be stored |
| `D`   | Value to be stored                  |

### CJP - Conditional Jump

`CJP` is used to perform a conditional jump of execution to another location. The condition is a number. If the value is non-zero, the condition is considered to be true. If it is `0`, the condition is considered to be false.

| Field | Description                                  |
|-------|----------------------------------------------|
| `A`   | Condition                                    |
| `B`   | Address to jump to if the condition is true  |
| `C`   | Address tp jump to if the condition is false |

### UJP - Unconditional Jump

`UJP` is used to cause execution to immediately jump to a specified address even without any condition.

| Field | Description        |
|-------|--------------------|
| `A`   | Address to jump to |

### Operator Instructions

All instructions representing mathematical, bitwise, or boolean operations use fields the same way:

| Field | Description                                                 |
|-------|-------------------------------------------------------------|
| `A`   | Address to the location of the left operand                 |
| `B`   | Address to the location of the right operand, if applicable |
| `C`   | Address where the result of the operation will be stored    |

> **NOTES**
>
> 1. If fields `a` or `d` are set, the value pointed to by `L` and/or `R`, respectively, will itself be treated as an unsigned 16-bit pointer as well and the value pointed to by this secondary pointer will be used as the corresponding operand for the operation being performed instead of using the values immediately referenced by the primary pointer. Whatever the case, the actual, final numeric values used in the operation will be interpreted according to information in bit fields `b`, `d`, `e`, and `f`.
> 2. When the data type mode (bit fields `c` and `f`) of an operand indicates the value is a float, (corresponding to a mode of `11`), the corresponding sign field (`b` and `e`, respectively), have no defined meaning, but for consistency should be set to `1`, since floats are defined to always be signed.
> 3. Single-operand operations do not use these bits and should all be set to 0, and their singular operand location and corresponding meta-data bits should be stored in the left operand's bits.

### SCL - System Call

`SCL` is used to communicate with the host system via "system calls". System calls have full read-write access to the VM's memory while the call is being performed, though how it is used will depend on the function that was called. Execution in the VM continues as soon as the call has been initiated; the VM will not wait for the system call to finish, nor is there any mechanism for detecting that a call has finished. To this end, the program must either not depend on the result of the system call and be capable of continuing while the call runs in parallel until it ends on its own, or else the program must devise a way to detect the call's completion by reading signals out of VM memory that may be left by the call during its execution, or else it must be able to signal to the call that it should end.

| Field | Description                                                                                                                                                                                                                       |
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `e`   | Should be 0 (negative IDs are not valid)                                                                                                                                                                                          |
| `f`   | Should be 0 (negative IDs are not valid)                                                                                                                                                                                          |
| `g`   | Determines whether `E` will be presented to the host as unsigned (0) or signed (1)                                                                                                                                                |
| `h`   | Determines whether `H` will be presented to the host as unsigned (0) or signed (1)                                                                                                                                                |
| `E`   | The ID number of the plugin as an 8-bit unsigned integer. The ID number will vary depending on the order of the plugins listed in the ROM header                                                                                  |
| `F`   | The ID number of the function as an 8-bit unsigned integer. The ID number will vary depending on the functions provided by the plugin.                                                                                            |
| `G`   | First argument to the system function. The meaning of the argument will vary depending on the function. For functions that operate on a specific region of VM memory, this indicates the number of bytes of memory in the region. |
| `H`   | Second argument to the system function. The meaning of the argument will vary depending on the function. For functions that operate on a specific region of VM memory, this indicates the offset to the beginning of the region.  |

#### VM System Functions

The first plugin (with ID 0) to be registered in any ROM should always be the core system plugin.

| Function ID | Description                                                                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`         | End the application.                                                                                                                                             |
| `1`         | Output a string of text to the VM's console over stdout. `G` indicates the number of bytes in the string, and `H` is the beginning of the string in memory.     |
| `2`         | Output a line of error text to the VM's console over stderr. `G` indicates the number of bytes in the string, and `H` is the beginning of the string in memory. |
| `3`         | Read input from the VM's stdin. `G` is the number of bytes to read, and `H` is the location in memory where they should be stored.                              |

### ??? - Undefined Instructions

These instructions do not have a defined behavior. Do not use them.

## Plugins

Plugins are non-Tendril code that executes on the host and which are capable of providing functions that can be called using `SCL` from inside Tendril programs. Plugins must be registered with the VM from the outside before they can be used, and the name of the plugin must be present in the ROM header.
