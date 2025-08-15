import * as dns from 'node:dns/promises';

type State = {
    resolver: dns.Resolver;     // Active Resolvers
    servers: string[];          // list of DNS servers
};

const defaultServers = ["8.8.8.8", "1.1.1.1"];

async function initState(): Promise<State> {
    const resolver = new dns.Resolver();
    resolver.setServers(defaultServers);
    return { resolver, servers: defaultServers };
}

async function main() {
    console.log("Welcome - DNS Checker\n");

    const domain = 'example.com';
    const state = await initState();

    const { address, family } = await dns.lookup(domain);
    console.log('System Resolvers:');
    console.log(`address: ${address}, family: IPv${family}\n`);


    console.log('Servers from defaultServers:', defaultServers);
    const aRecords = await state.resolver.resolve4(domain);
    console.log('A records:', aRecords);

    const aaaaRecords = await state.resolver.resolve6(domain);
    console.log('AAAA records:', aaaaRecords);
}

main().catch(console.error);
