const Solana = '@solana/web3.js';
const Header = '../components/Header.tsx';
const Anchor = '@project-serum/anchor';
const Moralis = "react-moralis";
const idl = './idl.json';

class index {

constructor(){

// Variables

tokens_unc = 0;
user_tokens = 0;

// System Variables

walletAddress;
users;
setUsers;
SystemProgram = Anchor.web3;
opts = {preflightCommitment: "processed"};
programID = "DHBTg3qqcj3Hr1rWDp8SmQKV1d6E8YH4DGzFfdjmP23A";

}

// Utils

getProvider(){

    const connection = new Solana.Connection(opts.preflightCommitment);
    const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
    
    return provider;
};

// Account Section

connectUser(){

    try{

    const user = Moralis.useMoralis();
    walletAddress = Header.truncateEthAddress(Header.props.user.get("solAddress"));


    program.rpc.create_account({
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

catchInformations(){

    try{

    const connection = new Solana.Connection(network, opts.preflightCommitment);
	const provider = getProvider();
	const program = new Anchor.Program(idl.idl, programID, provider);

		Promise.all(
			(connection.getProgramAccounts(programID)).map(
				async (user) => ({
					...(program.account.user.fetch(user.tokens)),
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

addRewards({publicKey}) {

    try {
    
    program.rpc.add_tokens({
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

withdrawRewards({publicKey}) {

    if(user_tokens> 1 * web3.LAMPORTS_PER_SOL) {

    try {

        const provider = getProvider();
        const program = new Anchor.Program(idl.idl, programID, provider);
        program.rpc.withdraw_tokens(program, {
            accounts: {
                tokens: user.tokens,
                user: walletAddress,
            },
        }, new Anchor.BN(user_tokens));

        console.log("Withdrew some money from:", publicKey.toString());
        user_tokens = 0;

    } catch (error) {

        console.error("Error withdrawing:", error);
    }

    }else {

        console.error("Insufficient funds");
    }
};
}

module.exports = index;