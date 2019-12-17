import DefaultVirtualMachine from 'tendril/DefaultVirtualMachine';
import VirtualMachine from 'tendril/VirtualMachine';

export default class Cli {
    public vm: VirtualMachine;

    public main(...argv: string[]) {
        this.initialize();
        this.processArgv(argv);
    }

    public run() {

    }

    protected initialize() {
        this.vm = new DefaultVirtualMachine();

    }

    protected processArgv(argv: string[]) {
        console.log(argv);
    }
}
