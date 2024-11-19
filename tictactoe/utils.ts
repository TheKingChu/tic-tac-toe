export async function prompt(question: string): Promise<string>{
    const buf = new Uint8Array(1024);
    Deno.stdout.writeSync(new TextEncoder().encode(question));
    const read = <number>await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.slice(0, read));
}