import { Account, addFeeToTx, BitcoinUTXO, electrumFetchNonGlittrUtxos, GlittrSDK, OpReturnMessage, Output, txBuilder } from "@glittr-sdk/sdk";

async function deployFreeMintContract() {
  const NETWORK = 'regtest'
  const client = new GlittrSDK({
    network: NETWORK,
    apiKey: '1c4938fb-1a10-48c2-82eb-bd34eeb05b20',
    glittrApi: "https://devnet-core-api.glittr.fi", // devnet
    electrumApi: "https://devnet-electrum.glittr.fi" // devnet
  })
  const account = new Account({
    network: NETWORK,
    wif: "cW84FgWG9U1MpKvdzZMv4JZKLSU7iFAzMmXjkGvGUvh5WvhrEASj",
  })
  const tx: OpReturnMessage = {
    contract_creation: {
      contract_type: {
        moa: {
          divisibility: 18,
          live_time: 0,
          supply_cap: "1000000000",
          ticker: "FKBTC",
          mint_mechanism: { free_mint: { amount_per_mint: "10", supply_cap: "1000000000" } }
        }
      },
    },
  };

  const utxos = await electrumFetchNonGlittrUtxos(client, account.p2wpkh().address)
  const nonFeeInputs: BitcoinUTXO[] = []
  const nonFeeOutputs: Output[] = [
    { script: txBuilder.compile(tx), value: 0 }
  ]

  const { inputs, outputs } = await addFeeToTx(
    NETWORK,
    account.p2wpkh().address,
    utxos,
    nonFeeInputs,
    nonFeeOutputs
  )

  const txid = await client.createAndBroadcastRawTx({
    account: account.p2wpkh(),
    inputs,
    outputs
  })
  console.log("Transaction ID:", txid);
}

async function deployPreallocatedFreeMint() {
  const NETWORK = 'regtest'
  const client = new GlittrSDK({
    network: NETWORK,
    apiKey: '1c4938fb-1a10-48c2-82eb-bd34eeb05b20',
    glittrApi: "https://devnet-core-api.glittr.fi", // devnet
    electrumApi: "https://devnet-electrum.glittr.fi" // devnet
  })
  const account = new Account({
    network: NETWORK,
    wif: "cW84FgWG9U1MpKvdzZMv4JZKLSU7iFAzMmXjkGvGUvh5WvhrEASj",
  })
 
  const tx: OpReturnMessage = {
    contract_creation: {
      contract_type: {
        moa: {
          divisibility: 18,
          live_time: 0,
          mint_mechanism: {
            preallocated: {
              allocations: {
              }
            }
          },
          supply_cap: "10000",
          ticker: "VBTC" 
        }
      }
    }
  }
}

deployFreeMintContract()