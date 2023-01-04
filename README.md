# Example Virtual Machine

This is an example specification for a CPU instruction set and virtual machine collectively called "Tendril".

The virtual machine executes instructions encoded as binary data and operates on a fixed memory range. It does not use any registers other than the code pointer, and all instructions are capable of storing to and/or retrieving from any point in addressable memory. It is designed to be familiar to programmers of higher-level languages.

This project is meant to serve as a coding excercise and academic example and is not intended for serious production use. For an example of a robust, real-world open instruction set, check out [RISC-V](https://en.wikipedia.org/wiki/RISC-V).

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
| `1E` | `PCL` | Plugin call           | `efgh:---- EEEE:EEEE FFFF:FFFF GGGG:GGGG GGGG:GGGG HHHH:HHHH HHHH:HHHH` |
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

### Operator Instructions (ADD, SUB, MUL, etc.)

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

### PCL - Plugin Call

`PCL` is used to call plugin functions. Unless the plugin function triggers a pause in execution, the VM continues as soon as the call has been initiated and does not wait for it to finish. If the plugin did pause execution, however, it is also responsible for resuming execution afterwards.

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

### ??? - Undefined Instructions

These instructions do not have a defined behavior. Do not use them.

## Plugins

Plugins are non-Tendril code modules that execute on the host and which are capable of providing functions that can be called using system calls from inside Tendril programs. Plugins must be installed into the VM on the host before they can be used within a ROM, and the name of the plugin must be present in the ROM metadata.

Some plugins are provided with a default installation of the VM, and are always available. Others must be installed independently.

Every plugin fulfils one or more interfaces. Theoretically, any plugin can be substituted with another plugin that implements the same interface, although it is not guaranteed that the ROM will still be fully functional if the ROM depended on specific details of the original plugin's implementation. The VM provides utilities to substitute plugins globally or by a specific ROM name and version range.

ROMs will indicate both the interface of the plugins they require, as well as the name of the specific plugin they recommend to fulfil that interface. The VM will not run unless all required interfaces for a ROM are fulfilled by installed plugins.

All ROMs should require some variant of the `tendril.core.X.Y.Z` and `tendril.system.X.Y.Z` interfaces, and these must be listed as explicit requirements, and should be the first two requirements in the list of required interfaces.

Plugins listed in the ROM header are each initialized in the order specified by the ROM, with optional plugins always being initialized after required plugins.

Initialization is performed prior to execution of any Tendril instructions. However, ROMs may perform additional initialization steps by using system calls for plugins that require it. (The means of doing this will depend on the plugin interface.)

Plugins have total access to the VM's memory at all times. Non-standard plugins should not be installed unless they are trusted.

### Required Plugins

These plugins (or plugins with the same interfaces) MUST be required by all ROMs:

#### `tendril.core`
The first plugin (with ID 0) to be registered in any ROM should be the core plugin (`tendril.core`) and functions as the VM's CPU, which means it is the one solely responsible for executing machine code.


##### Functions
| Function ID | Description                                                                                                                                                                                                                 |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`         | Begin or resume the execution of VM instructions. This is called automatically by the VM itself as part of the program initialization process.                                                                              |
| `1`         | Pause execution of the VM. This can be called by the  instructions.                                                                                                                                                                                     |
| `2`         | End execution of instructions, terminating the program.                                                                                                                                                                     |
| `3`         | Get the number of plugins in use by the VM. (This is the number of plugins listed in the header.) The number will be stored as an unsigned 8-bit integer at the location in memory indicated by `G`.                       |
| `4`         | Get the length of the name of one of the plugins. The index number is indicated by `H`, and the location wherein the length should be stored is indicated by `G`. The name length number will be an 8-bit unsigned integer. |
| `5`         | Copy the name of the plugin from the header with a given index number. The index number is indicated by `H`, and the beginning of the offset is indicated by `G`.                                                           |

#### `tendril.system`
The second plugin (with ID 1) should be the system plugin (`tendril.system`), which is responsible for communication between the current Tendril application and the VM's host OS.

##### Functions
| Function ID | Description                                                                                                                                                     |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`         | Output a string of text to the VM's console over stdout. `G` indicates the number of bytes in the string, and `H` is the beginning of the string in memory.     |
| `1`         | Output a line of error text to the VM's console over stderr. `G` indicates the number of bytes in the string, and `H` is the beginning of the string in memory. |
| `2`         | Read input from the VM's stdin. `G` is the number of bytes to read, and `H` is the location in memory where they should be stored.                              |

### Other Common Plugins

These plugins and their interfaces will be mentioned briefly here as they are commonly used, but they will be covered in greater detail in other areas since their behavior is extensive.

#### `tendril.video`

Provides the main video output for Tendril applications.

### `tendril.audio`

Provides the main audio output for Tendril applications.

### `tendril.input`

Provides user input for Tendril applications.

## ROM files

ROMs are Yaml files that contain metadata and a snapshot of the initial VM memory state. The VM can be given the path of the ROM file as sole argument to execute it.

### Identification

The file extension `.tendril` is optional, but recommended for cross-platform execution. However, a ROM file should always begin with a Unix shebang as follows to indicate the file is executable:

`#!/usr/bin/env tendril-vm`

### Structure

Following the shebang, the structure of the ROM is a single object with the following keys and values

| Key  | Description                                            | Example         |
|------|--------------------------------------------------------|-----------------|
| `vm` | Version string for the VM that this ROM is targeted at | "`TENDRIL 1.0`" |
| `name` | Name of the ROM | `"Hero's Adventure"`
| `version` | Version of the ROM | `1.0.0` |
| `author` | Name of the author of the ROM | "`Fun House Inc.`" |
| `url` | A URL to additional information about the ROM | "`http://www.example.com`" |
| `required` | Array of interfaces that this ROM requires to be fulfilled with plugins | (array) | 
| `optional` | Array of interfaces that the ROM can also use if available, but are not required | (array) |
| `plugins` | An object that maps the names of required and optional interfaces to the recommended plugins to implement them | (object) |
| `mem` | Snapshot of the initial memory state encoded in gzip-compress base64 | (base-64-encoded data as a string) |

### ROM VM Memory Snapshot

The `mem` key of the ROM contains a complete snapshot of the VM's memory as it appears at the beginning of the ROM's execution encoded as compressed, base-64-encoded data. The exact layout of this data will vary wildly and has very little reliable structure to it. However, as the code pointer exists at memory offset 0, the first two bytes of the data effectively indicate the program entry point.

## Program Execution

Execution occurs in the following steps:

1. The host system passes the path of the ROM file as an argument to the `tendril-vm` executable.
2. The version will be checked against known versions, and if the current `tendril-vm` does not know how to execute this version an error is returned.
3. The required interfaces are checked. If all required interfaces are implemented by installed plugins, they are loaded (preferring host-specified substitutions first, then those recommended by the ROM). If not all interfaces can be fulfilled, an error is returned.  
4. The optional interfaces are checked. Any interfaces that can be implemented by available plugins are then then loaded, preferring host-specified substitutions over those recommended by the ROM.
5. The plugins of all required interfaces are initialized in order of appearance in the ROM meta data.
6. The plugins of all optional interfaces are initialized in order of appearance in thr ROM meta data.
7. Data in the `mem` section of the ROM is decoded, decompressed, and loaded into the VM's virtual memory.
8. The main VM instruction execution loop begins.

At this point, the instructions in the ROM take over execution.

## Object Files and Source Files

The "object code" for a Tendril program is actually just a series of large JSON blobs. These blobs can be hand-written, but its much more preferable to use the included `tendril-asm` library in conjunction with JavaScript or TypeScript, which include utilities for building Tendril programs more intuitively, and effectively allows JavaScript and TypeScript to function as macro languages. Using `tendril-asm`, you get the ability to treat JavaScript and TypeScript files as Tendril source files.
