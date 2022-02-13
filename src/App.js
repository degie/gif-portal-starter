/*
Commands

Update idl after redeploy the Solana program
anchor build
 */

import {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import idl from './idl.json';
import kp from './keypair.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import './App.css';

// Constants
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
// Controls how we want to acknowledge when a transaction is "done".
const opts = {
    preflightCommitment: "processed"
};
const { SystemProgram } = web3;
const TWITTER_HANDLE = 'kittiecrypto';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Lets
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

let nftCount = 0;

const App = () => {

    // State
    const [walletAddress, setWalletAddress] = useState(null);
    const [inputNameValue, setInputNameValue] = useState('');
    const [inputNftValue, setInputNftValue] = useState('');
    const [nftList, setNftList] = useState([]);
    const [userName, setUserName] = useState('');

    /*
     * This function holds the logic for deciding if a Phantom Wallet is
     * connected or not
     */
    const checkIfWalletIsConnected = async () => {
        try {
            const {solana} = window;

            if (solana) {
                if (solana.isPhantom) {
                    console.log('Phantom wallet found!');
                    /*
                     * The solana object gives us a function that will allow us to connect
                     * directly with the user's wallet!
                     */
                    const response = await solana.connect({onlyIfTrusted: true});
                    console.log(
                        'Connected with Public Key:',
                        response.publicKey.toString()
                    );

                    /*
                    * Set the user's publicKey in state to be used later!
                    */
                    setWalletAddress(response.publicKey.toString());
                }
            } else {
                console.log('Solana object not found! Get a Phantom Wallet 👻');
            }
        } catch (error) {
            console.error(error);
        }
    };
    /*
     * Let's define this method so our code doesn't break.
     * We will write the logic for this next!
     */
    const connectWallet = async () => {
        const {solana} = window;
        if (solana) {
            const response = await solana.connect();
            console.log('Connected with Public Key:', response.publicKey.toString());
            setWalletAddress(response.publicKey.toString());
        }
    };
    const saveName = async () => {
        if (inputNameValue.length > 0) {
            console.log('Name:', inputNameValue);
            setUserName(inputNameValue);
        } else {
            console.log('Empty input name. Try again.');
        }
    };
    const saveNft = async () => {
        if (inputNftValue.length === 0) {
            console.log("No NFT link given!")
            return
        }
        setInputNftValue('');
        console.log('URL:', inputNftValue);

        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);

            await program.rpc.addNft(inputNftValue, {
                accounts: {
                    baseAccount: baseAccount.publicKey,
                    user: provider.wallet.publicKey,
                },
            });
            console.log("NFT successfully sent to program", inputNftValue);

            await getNftList();
        } catch (error) {
            console.log("Error sending NFT:", error)
        }
    };
    const onInputNameChange = (event) => {
        const {value} = event.target;
        setInputNameValue(value);
    };
    const onInputNftChange = (event) => {
        const {value} = event.target;
        setInputNftValue(value);
    };
    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        return new Provider(
            connection, window.solana, opts.preflightCommitment,
        );
    };
    const createNftAccount = async () => {
        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            console.log("ping")
            await program.rpc.initialize({
                accounts: {
                    baseAccount: baseAccount.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [baseAccount]
            });
            console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
            await getNftList();

        } catch(error) {
            console.log("Error creating BaseAccount account:", error)
        }
    }

    /*
     * We want to render this UI when the user hasn't connected
     * their wallet to our app yet.
     */
    const renderUserNameContainer = () => (
        <div className="username-container">
            Hi {userName}!
        </div>
    );

    const renderNotConnectedContainer = () => (
        <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}>
            Connect to Wallet
        </button>
    );

    const renderSetNameInput = () => (
        <div className="form-container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    saveName()
                }}>
                <input type="text" placeholder="Set your name" name="userName" value={inputNameValue}
                       onChange={onInputNameChange}/>
                <button type="submit" className="cta-button submit-button">Save</button>
            </form>
        </div>
    );

    const renderConnectedContainer = () => {
        if (nftList === null) {
            return (
                <div className="connected-container">
                    <button className="cta-button submit-nft-button" onClick={createNftAccount}>
                        Do One-Time Initialization For NFT Program Account
                    </button>
                </div>
            )
        } else {
            return(
                <div className="connected-container">
                    <div className="add-nft-container">
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                saveNft()
                            }}>
                            <input type="text" name="nftValue" placeholder="Add NFT URL" value={inputNftValue}
                                   onChange={onInputNftChange}/>
                            <button type="submit" className="cta-button submit-button">Add</button>
                        </form>
                    </div>
                    <table className="nft-table">
                        <thead className="nft-item table-header">
                        <tr>
                            <th className="item-name">Item</th>
                            <th className="item-price">Acquisition Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="divider">
                            <td>&nbsp;</td>
                        </tr>
                        {nftList.map(nft => (
                            <tr className="nft-item" key={nftCount+=1}>
                                <td className="item-name"><img src={nft.nftLink} alt={nft.userAddress.toString()}/> <span>Lucaionescuart GIF</span></td>
                                <td className="item-price">1 SOL</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    };

    /*
     * When our component first mounts, let's check to see if we have a connected
     * Phantom Wallet
     */
    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    const getNftList = async() => {
        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

            console.log("Got the account", account);
            setNftList(account.nftList)

        } catch (error) {
            console.log("Error in getGifList: ", error);
            setNftList(null);
        }
    };


    useEffect(() => {
        if (walletAddress) {
            console.log('Fetching NFT list...');
            getNftList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress]);

    return (
        <div className="App">
            <div className={walletAddress ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <p className="header">NFT wallet <small>working on Devnet</small></p>
                    {walletAddress && !userName && renderSetNameInput()}
                    {userName && renderUserNameContainer()}
                    <p className="sub-text">
                        View your NFT collection in the metaverse ✨
                    </p>
                    <small className="wallet-address">{walletAddress}</small>
                    {!walletAddress && renderNotConnectedContainer()}
                </div>
                {walletAddress && renderConnectedContainer()}
                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
                    <a
                        className="footer-text"
                        href={TWITTER_LINK}
                        target="_blank"
                        rel="noreferrer"
                    >{`built by @${TWITTER_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;
