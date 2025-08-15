import dns from 'node:dns';


function main() {
    console.log("Welcome - DNS Checker\n");



    dns.lookup('example.com', (err: NodeJS.ErrnoException | null, address: string, family: number) => {
        if (err) throw err;

        console.log('System Resolvers:');
        console.log('address: %j family: IPv%s', address, family);
    });

    dns.resolve4('example.com', (err: NodeJS.ErrnoException | null, addresses: string[]) => {
        if (err) {
            console.error('Error resolving A records:', err);
        }
        console.log('A records:', addresses);
    });

    dns.resolve6('example.com', (err: NodeJS.ErrnoException | null, addresses: string[]) => {
        if (err) {
            console.error('Error resolving AAAA records:', err);
        }
        console.log('AAAA records:', addresses);
    });
}

main();

