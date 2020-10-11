# Tendril Specification

Tendril is a virtual machine that executes instructions encoded as binary data and which operate on a fixed memory range. It does not use registers, and all instructions are capable of storing to and/or retrieving from any point in addressable memory. It is designed to be familiar to programmers of higher-level languages.

## Instruction Set

Tendril recognizes a fixed set of instructions. Instructions are 64 bits in length. The first 8 bits are used to indicate an op code, and remaining bits are used to accept one or more fields, referred to as "bit fields".

Currently instructions end at hex code `1E` (`SCL`).

| Hex  | Asm   | Description           | Bit assignments (8-63)                                                  |
| ---- | ----- | --------------------- | ----------------------------------------------------------------------- |
| `00` | `NOP` | No-op                 | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `01` | `SET` | Store a value         | `----:---- DDDD:DDDD DDDD:DDDD DDDD:DDDD DDDD:DDDD CCCC:CCCC CCCC:CCCC` |
| `02` | `MOV` | Copy a range of bytes | `----:---- AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `03` | `PCL` | Procedure call        | `----:---- AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `04` | `RET` | Return from procedure | `xaaa:---- AAAA:AAAA AAAA:AAAA ----:---- ----:---- ----:---- ----:----` |
| `05` | `CJP` | Conditional jump      | `x---:---- AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `06` | `UJP` | Unconditional jump    | `xaaa:---- AAAA:AAAA AAAA:AAAA ----:---- ----:---- ----:---- ----:----` |
| `07` | `???` | No-op                 | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
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
| `1C` | `SPN` | Spawn a new thread    | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB ----:---- ----:----` |
| `1D` | `KIL` | Kill a thread         | `xaaa:y--- AAAA:AAAA AAAA:AAAA ----:---- ----:---- ----:---- ----:----` |
| `1E` | `SCL` | System call           | `xaaa:ybbb AAAA:AAAA AAAA:AAAA BBBB:BBBB BBBB:BBBB CCCC:CCCC CCCC:CCCC` |
| `1F` | `???` | No-op                 | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| `20` | `???` | No-op                 | `----:---- ----:---- ----:---- ----:---- ----:---- ----:---- ----:----` |
| ...  | ...   | ...                   | ...                                                                     |

### Bit Fields

Fields are assigned to fixed bit ranges within an instruction and are always of the same type. The way fields A-D are used depends on the instruction.

| Field | Description                                                                                                 |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| `x`   | If set, the value located at `A` will be treated as a second-level pointer                                  |
| `a`   | Type mode indicator for the final value of `A`, if applicable                                               |
| `y`   | If set, the value located at `B` will be treated as a second-level pointer                                  |
| `b`   | Type mode indicator for the final value of `B`                                                              |
| `A`   | Pointer to 1st argument; often used as a left-hand operand. Not used when `D` is present.                   |
| `B`   | Pointer to 2nd argument; often used as a right-hand operand. Not used when `D` is present.                  |
| `C`   | Pointer to 3rd argument; often used as result storage location                                              |
| `D`   | 1st argument as a literal value stored within the instruction itself. Not used when `A` or `B` are present. |

### Type Mode Indicators

Most values require corresponding 3-bit type mode indicators in order to determine how many bits are in the value and how the bits should be interpreted during operations involving other values. The following type modes are possible:

| Mode Bits | Type                    |
| --------- | ----------------------- |
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
| ----- | ----------------------------------- |
| `C`   | Location where value will be stored |
| `D`   | Value to be stored                  |

### PCL, RET - Procedure Call

`PCL` is used to perform a call to a procedure. Doing so will cause a new frame to be pushed onto the current thread's stack, will cause a range of bytes to be copied into the beginning of the new frame as arguments, and will cause execution to jump the procedure's first instruction. The procedure call can later be ended using `RET`.

| Field | Description                                                                                                                                                    |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `A`   | Location of the first byte in the procedure's header                                                                                                           |
| `B`   | Location of the first byte to be copied into the argument portion of the call's new stack frame. The total number of bytes copied is determined by the header. |
| `C`   | Location where the procedure's return value should be stored, or `0` if the value is to be ignored.                                                            |

All procedures begin with a header of a fixed size of 8 bytes:

| Byte Range | Description                                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0-1        | Unsigned 16-bit integer indicating number of total bytes within the procedure, including the header. When execution moves beyond this, the procedure is terminated and control is automatically returned to the previous frame. |
| 2-3        | Unsigned 16-bit integer indicating the number of bytes that should be copied and allocated for arguments within the new stack frame.                                                                                            |
| 4-5        | Unsigned 16-bit integer indicating additional space that should be allocated within the frame beyond the arguments.                                                                                                             |
| 6          | Bit 0 is unused. Bits 1-3 indicate the return value type mode indicator. Remaining bits are also unused.                                                                                                                        |
| 7          | Unused.                                                                                                                                                                                                                         |

The first instruction of the procedure begins immediately following the header. If the procedure does not end explicitly return using a `RET` instruction, the return value will be `0`.

`RET` is used to perform an explicit return from a procedure call prior to the end of the procedure's designated range as indicated by the header. In this case, field `A` can be used to specify the location of a return value, whose type is indicated in the procedure header.

### CJP - Conditional Jump

`CJP` is used to perform a conditional jump of execution to another location. The condition is a number. If the value is non-zero, the condition is considered to be true. If it is `0`, the condition is considered to be false.

| Field | Description                                  |
| ----- | -------------------------------------------- |
| `A`   | Condition                                    |
| `B`   | Address to jump to if the condition is true  |
| `C`   | Address tp jump to if the condition is false |

### UJP - Unconditional Jump

`UJP` is used to cause execution to immediately jump to a specified address even without any condition.

| Field | Description        |
| ----- | ------------------ |
| `A`   | Address to jump to |

### Operator Instructions

All instructions representing mathematical, bitwise, or boolean operations use fields the same way:

| Field | Description                                                 |
| ----- | ----------------------------------------------------------- |
| `A`   | Address to the location of the left operand                 |
| `B`   | Address to the location of the right operand, if applicable |
| `C`   | Address where the result of the operation will be stored    |

> **NOTES**
>
> 1. If fields `a` or `d` are set, the value pointed to by `L` and/or `R`, respectively, will itself be treated as an unsigned 16-bit pointer as well and the value pointed to by this secondary pointer will be used as the corresponding operand for the operation being performed instead of using the values immediately referenced by the primary pointer. Whatever the case, the actual, final numeric values used in the operation will be interpreted according to information in bit fields `b`, `d`, `e`, and `f`.
> 2. When the data type mode (bit fields `c` and `f`) of an operand indicates the value is a float, (corresponding to a mode of `11`), the corresponding sign field (`b` and `e`, respectively), have no defined meaning, but for consistency should be set to `1`, since floats are defined to always be signed.
> 3. Single-operand operations do not use these bits and should all be set to 0, and their singular operand location and corresponding meta-data bits should be stored in the left operand's bits.

### SPN, KIL - Spawning and killing threads

New threads of execution can be spawned by calling `SPN`. These threads operate on the same memory as the original thread and can do anything the original thread can do, but they have their own stack and will continue even when other threads are blocked. Threads will continue to execute until they are killed using the `KIL` instruction.

When multiple threads are running, the virtual machine will execute the next instruction for each thread sequentially thread-by-thread in order of thread ID. This ensures that no two threads ever access the same resource at the same time, but allows instructions to execute near enough together that they appear to be simultaneous for most purposes.

A virtually unlimited number of threads can be spawned simultaneously as long as memory is available for their stacks. Additionally, any thread can spawn or kill another thread, except for the initial thread, which can only be killed by itself. The virtual machine will set an execution cap to prevent runaway spawning of new threads from stalling the virtual machine itself. This is done by slowing execution of individual threads as consumption of computing power increases.

| Field | Description                                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `A`   | Address of the ID of the thread. For `SPN`, 0 indicates to use the next unused ID. For `KIL`, 0 indicates to kill the current thread. |
| `B`   | Address of a new thread's first instruction.                                                                                          |

### SCL - System Call

`SCL` is used to communicate with the host system. Data will be stored within an arbitrary address range indicated by the instruction. This range will be both readable and writable to the host during the duration of the system call. The current VM thread will be blocked until the host returns, so if execution must continue while waiting for the host, a new thread must be spawned.

Memory within a host-shared address range may be modified any number of times by the host system or other non-blocked threads while the thread that initiated the system call is being blocked. However, if the blocked thread is killed by another thread, this will end communication between the killed thread and the host, cancelling the system call and preventing the host from performing any further modifications to it. This can be done, for example, to create a timeout to prevent indefinitely waiting for a process outside of the vm that has hung.

| Field | Description                                      |
| ----- | ------------------------------------------------ |
| `a`   | Should be `001` (unsigned 16-bit integer)        |
| `A`   | Pointer to number of bytes in shared data range. |
| `C`   | Pointer to first byte of shared data range.      |

#### System Call Return Values

Following return of the system call, the first byte of the shared memory range should indicate a return code:

| Return Code | Description                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| 0           | Success                                                                                                 |
| 254         | System call is in progress and has not yet completed                                                    |
| 255         | Named system function was not recognized, or was not allowed to be performed by the current VM instance |

Remaining bytes depend on the system call, and the Tendril program will need to be able to understand and interpret it.

As a general convention, the shared memory range should start with a null-terminated ASCII string to indicate the name of the system function being called. Bytes beyond this depend on the system function.

Aside from VM system functions, system calls are provided via plugins.

#### VM System Functions

Names that are 4 letters or fewer are reserved for basic communication with the VM itself:

| Function | Description                                                                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `out`    | Output a line of informational text to the VM's console over stdout. Bytes following the name's null byte are a null-terminated string to be output.                                                                           |
| `err`    | Output a line of error text to the VM's console over stderr. Bytes following the name's null byte are a null-terminated string to be output.                                                                                   |
| `in`     | Read input from the VM's stdin. Return code is non-zero if input could not be read, or 0 if there is input to be read. The next 2 bytes indicate the number of input bytes available, and remaining bytes are the input bytes. |

## Video Output

The Tendril VM displays a window on the host containing video output by the program. A memory range called "VRAM" is dedicated to providing raster data to be displayed in this window. Any writes to VRAM will be displayed in the window on the next refresh.

## Plugins

Plugins are non-Tendril code that executes on the host and which are capable of providing system functions that can be called using `SCL` from inside Tendril programs. Plugins must be registered with the VM from the outside before they can be used. Additionally, each Tendril program must register the names of system calls it wants to be able to use in its header, and users must explicitly give permission for each one before they can be called.
