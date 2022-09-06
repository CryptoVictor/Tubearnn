import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { truncateEthAddress, props } from '../components/Header.tsx';
import { Program, web3, BN } from '@project-serum/anchor';
import { useMoralis } from "react-moralis";
import idl from './idl.json';

// Variables

let tokens_unc = 0;
let user_tokens = 0;

// System Variables

let walletAddress;
let users, setUsers;
const { SystemProgram } = web3;
const network = clusterApiUrl("devnet");
const opts = {preflightCommitment: "processed"};
const programID = new PublicKey(idl.metadata.address);

// Utils

const getProvider = () => {

    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
    
    return provider;
};

// Account Section

const connectUser = async () => {

    try{

    const user = useMoralis();
    walletAddress = truncateEthAddress(props.user.get("solAddress"));


    await program.rpc.create_account({
        accounts: {
            user: walletAddress,
            authority: walletAddress,
            systemProgram: SystemProgram.programId,
        },
    });

    catchInformations();

    } catch (error) {

        console.error(error);
    }
};

const catchInformations = async () => {

    try{

    const connection = new Connection(network, opts.preflightCommitment);
	const provider = getProvider();
	const program = new Program(idl, programID, provider);

		Promise.all(
			(await connection.getProgramAccounts(programID)).map(
				async (user) => ({
					...(await program.account.user.fetch(user.tokens)),
					tokens: user.tokens,
				})
			)
		).then((users) => setUsers(users));

    user_tokens = users.tokens;

    } catch (error) {

        console.error(error);
    }
};

// Rewards Section

const addRewards = async (publicKey) => {

    try {
    
    await program.rpc.add_tokens({
        accounts: {
            user: publicKey,
            tokens: user.tokens,
        },
    }, tokens_unc);

    tokens_unc = 0;

    catchInformations();

    } catch (error) {

        console.error(error);
    }
}

const withdrawRewards = async (publicKey) => {

    if(user_tokens> 1 * web3.LAMPORTS_PER_SOL) {

    try {

        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.withdraw_tokens(program, {
            accounts: {
                tokens: user.tokens,
                user: walletAddress,
            },
        }, new BN(user_tokens));

        console.log("Withdrew some money from:", publicKey.toString());
        user_tokens = 0;

    } catch (error) {

        console.error("Error withdrawing:", error);
    }

    }else {

        console.error("Insufficient funds");
    }
};

export { withdrawRewards, addRewards, catchInformations, connectUser, tokens_unc, user_tokens, walletAddress };