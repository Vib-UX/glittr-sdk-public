export type BitcoinUTXO = {
  txid: string;
  vout: number;
  value: number;
  status?: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
  nonWitnessUtxo?: Uint8Array;
  witnessUtxo?: {
    script: Uint8Array;
    value: number;
  };
  redeemScript?: Uint8Array;
  witnessScript?: Uint8Array;
  isTaproot?: boolean;
  taprootWitness?: Uint8Array[];
  assets?: { // Glittr assets
    asset: string;
    amount: number;
  }[];
};

export type Output = {
  value: number;
  address?: string;
  script?: Buffer;
};
