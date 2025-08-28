import * as dns from 'node:dns/promises';

import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';


const NAMED_SERVERS: Record<string, string[]> = {
    google: ['8.8.8.8'],
    cloudflare: ['1.1.1.1']
};

type State = {
    resolver: dns.Resolver;     // Active Resolvers
    servers: string[];          // list of DNS servers
};

function welcome(): void {
    console.log("Welcome - DNS Checker\n");
    console.log('Ctrl+C or "exit" to quit.\n');
}

// Initialize with Cloudflare by default
async function initState(): Promise<State> {
    const resolver = new dns.Resolver();
    resolver.setServers(NAMED_SERVERS.cloudflare);
    return { resolver, servers: [...NAMED_SERVERS.cloudflare] };
}

async function localLookup(domain: string) {
    const result = await dns.lookup(domain, { all: true });
    console.log('Local OS Resolver:', result);
}

async function customResolve(state: State, domain: string) {
    try {
        const records = await state.resolver.resolve4(domain);
        console.log(`Custom Resolver (${state.servers.join(', ')}):`, records);
    } catch (err: any) {
        console.error('Custom resolve error:', err.message);
    }
}

function help() {
    console.log(`Commands:
  servers                      Show current servers
  lookup <domain>              System resolver (OS)
  resolve <domain> [A|AAAA]    Resolve A/AAAA via custom resolver
  use <ip[,ip2,...]>           Set resolver servers
  reset                        Reset servers to defaults
  exit                         Quit
`);
}


async function repl(state: State) {
    const rl = readline.createInterface({ input, output });
    try {
        while (true) {
            const answer = await rl.question('> ');
            const inputLine = answer.trim().toLowerCase();

            if (inputLine === 'exit') break;
            if (inputLine === 'help') {
                help();
                continue;
            }
            const [cmd, ...args] = inputLine.split(/\s+/);

            switch (cmd) {
                case 'servers':
                    console.log('Current servers:', state.servers.join(', '));
                    break;
                case 'lookup':
                    if (!args[0]) {
                        console.log('Usage: lookup <domain>');
                    } else {
                        await localLookup(args[0]);
                    }
                    break;
                case 'resolve':
                    break;
                case 'use':
                    break;
                default:
                    console.log('Unknown command. Type "help" for options.');
            }
        }
    } finally {
        rl.close();
    }
}

async function main() {

    welcome();
    const state = await initState();
    await repl(state);

}

main().catch(console.error);
