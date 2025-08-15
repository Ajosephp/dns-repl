import { promises as dns } from 'node:dns';

async function main() {
    console.log("Welcome - DNS Checker\n");

    const domain = 'example.com';

    const { address, family } = await dns.lookup(domain);
    console.log('System Resolvers:');
    console.log(`address: ${address}, family: IPv${family}`);

    const aRecords = await dns.resolve4(domain);
    console.log('A records:', aRecords);

    const aaaaRecords = await dns.resolve6(domain);
    console.log('AAAA records:', aaaaRecords);
}

main().catch(console.error);
