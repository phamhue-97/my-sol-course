import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";

export default function BalanceDisplay() {
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey, sendTransaction, wallet } = useWallet();

    const ping = () => {
        if (!connection || !publicKey) {
            return
        }
        const transaction = new web3.Transaction();
        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"),
                    isSigner: false,
                    isWritable: true,
                }
            ],
            programId: new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
        });
        transaction.add(instruction);
        sendTransaction(transaction, connection).then((rs) => {
            console.log('rs: ', rs)
        }).catch((e) => {
            console.log('Error:', e)
        })
    }

    useEffect(() => {
        if (!connection || !publicKey) {
            return
        }

        connection.onAccountChange(
            publicKey,
            (updatedAccountInfo) => {
                console.log('updatedAccountInfo: ', updatedAccountInfo)
                setBalance(updatedAccountInfo.lamports / web3.LAMPORTS_PER_SOL)
            },
            "confirmed"
        )

        connection.getAccountInfo(publicKey).then((info) => {
            console.log('info: ', info)
            if (info) {
                setBalance(info.lamports / web3.LAMPORTS_PER_SOL)
            }
        })
    }, [connection, publicKey]);

    return (
        <div>
            {connection && publicKey && (
                <>
                    <p>{publicKey ? `Balance: ${balance} SOL` : ""}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={ping}>
                        ping
                    </button>
                </>
            )}
        </div>
    )
}