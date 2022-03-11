/*
Commands

Update idl after redeploy the Solana program
anchor build

Airdrop Solana to Devnet wallet
solana airdrop 2 7fP7SQX1CjNqafqnjaqx5TqbbLhT38JJH6P8EPHspik7 --url devnet
 */

import {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import idl from './idl.json';
import kp from './keypair.json';
import {Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {Program, Provider, web3} from '@project-serum/anchor';
//import {useWalletNfts} from "@nfteyez/sol-rayz-react";
import {getParsedNftAccountsByOwner, isValidSolanaAddress} from "@nfteyez/sol-rayz"; //resolveToWalletAddress
import axios from "axios";
import './App.css';

// Constants
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
// Controls how we want to acknowledge when a transaction is "done".
const opts = {
    preflightCommitment: "processed"
};
const {SystemProgram} = web3;
const TWITTER_HANDLE = 'kittiecrypto';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Lets
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

let nftCount = 0, nftCounter = 0;

const App = () => {

    // State
    const [walletAddress, setWalletAddress] = useState(null);
    const [inputNameValue, setInputNameValue] = useState('');
    const [inputNftValue, setInputNftValue] = useState('');
    const [nftList, setNftList] = useState([]);
    const [AllNftData, setAllNftData] = useState([]);
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

    /*
     * NFT functions
     */
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

        } catch (error) {
            console.log("Error creating BaseAccount account:", error)
        }
    };
    const getNftList = async () => {
        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            const accountNftList = account.nftList;

            var userNfts = accountNftList.filter(nft => {
                return nft.userAddress.toString() === walletAddress
            });
            setNftList(userNfts)

        } catch (error) {
            console.log("Error in getNftList: ", error);
            setNftList(null);
        }
    };
    const getAllNftData = async () => {
        try {
            if (walletAddress) {
                const provider = getProvider();
                const connection = provider.connection;

                /*
                const { nfts, isLoading, error } = useWalletNfts({
                    publicAddress: walletAddress,
                    connection,
                });
                // */
                //*
                let ownerToken = provider.wallet.publicKey;

                //const result = isValidSolanaAddress(ownerToken);
                const nfts = await getParsedNftAccountsByOwner({
                    publicAddress: ownerToken,
                    connection: connection,
                    serialization: true,
                });
                // console.log(nfts);
                // setAllNftData(nfts);
                return nfts;
                // */
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getNftTokenData = async () => {
        try {
            let nftData = await getAllNftData();
            var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    let arr = [];
            let n = data.length;
            for (let i = 0; i < n; i++) {
                //console.log(data[i].data.uri);
                let val = await axios.get(data[i].data.uri);
                arr.push(val);
            }
            // console.log(arr);
            setAllNftData(arr);
        } catch (error) {
            console.log(error);
        }
    };

    /*
     * Containers to render
     */
    const renderUserNameContainer = () => (
        <div className="username-container">
            Hi {userName}!
        </div>
    );
    const renderNoDataInfo = () => (
        <span className="nodata-container">
            no data
        </span>
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
                        Do One-Time Initialization For Solana Program Account
                    </button>
                </div>
            )
        } else {
            return (
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
                            <th className="item-name">Wallet</th>
                            <th className="item-price">Acquisition Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="divider">
                            <td>&nbsp;</td>
                        </tr>
                        {nftList.length === 0 && renderEmptyInfo()}
                        {nftList.map(nft => (
                            <tr className="nft-item" key={nftCount += 1}>
                                <td className="item-name"><img src={nft.nftLink} alt={nft.userAddress.toString()}/>
                                    <span>{nft.userAddress.toString()}</span></td>
                                <td className="item-price">1 SOL</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <table className="nft-table">
                        <thead className="nft-item table-header">
                        <tr>
                            <th className="item-name">Name</th>
                            <th className="item-default">Symbol</th>
                            <th className="item-default">Description</th>
                            <th className="item-price">Acquisition Price</th>
                            {/*<th className="item-price">Mint</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="divider">
                            <td>&nbsp;</td>
                        </tr>
                        {AllNftData.length === 0 && renderEmptyInfo()}
                        {AllNftData.map(nft => (
                            <tr className="nft-item" key={nftCounter += 1}>
                                <td className="item-name"><img src={nft.data.image.toString()} alt={nft.data.name.toString()}/>
                                    <span>{nft.data.name.toString()}</span></td>
                                <td className="item-default">{!nft.data.symbol.toString() && renderNoDataInfo()}{nft.data.symbol.toString()}</td>
                                <td className="item-default">{nft.data.description.toString()}</td>
                                <td className="item-price">x SOL</td>
                                {/*<td className="item-price">{nft.mint.toString()}</td>*/}
                            </tr>

                        ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    };

    const renderEmptyInfo = () => {
        return (
            <tr>
                <td><br/>No NFT detected for your wallet!</td>
            </tr>
        )
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


    useEffect(() => {
        if (walletAddress) {
            //console.log('Fetching NFT list...');
            getNftList()
            getNftTokenData()
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
