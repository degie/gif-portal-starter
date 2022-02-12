import {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'kittiecrypto';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_NFTS = [
    'https://media3.giphy.com/media/k0IRv7HUUqL3BJqYbI/200w.webp?cid=ecf05e47x3bv5upff2ho1grerxoqyp4pbcu0khbo1yw0vtxx&rid=200w.webp&ct=g',
    'https://media0.giphy.com/media/4oXQFWY1WRAxCAbS2H/200w.webp?cid=ecf05e47x3bv5upff2ho1grerxoqyp4pbcu0khbo1yw0vtxx&rid=200w.webp&ct=g',
    'https://media0.giphy.com/media/xxBBZgE1XpreXSsNPz/200w.webp?cid=ecf05e47x3bv5upff2ho1grerxoqyp4pbcu0khbo1yw0vtxx&rid=200w.webp&ct=g',
    'https://media1.giphy.com/media/KluRpaqe0ZyyFRfDzi/200w.webp?cid=ecf05e47x3bv5upff2ho1grerxoqyp4pbcu0khbo1yw0vtxx&rid=200w.webp&ct=g'
]

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
        if (inputNftValue.length > 0) {
            console.log('URL:', inputNftValue);
            setNftList([...nftList, inputNftValue]);
            setInputNftValue('');
        } else {
            console.log('Empty input URL. Try again.');
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

    const renderConnectedContainer = () => (
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
                <tr className="divider"><td>&nbsp;</td></tr>
                {nftList.map(nft => (
                    <tr className="nft-item" key={nft}>
                        <td className="item-name"><img src={nft} alt={nft}/> <span>Lucaionescuart GIF</span></td>
                        <td className="item-price">1 SOL</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

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
            console.log('Fetching NFT list...');

            // Call Solana program here.

            // Set state
            setNftList(TEST_NFTS);
        }
    }, [walletAddress]);

    return (
        <div className="App">
            <div className={walletAddress ? 'authed-container' : 'container'}>
                <div className="header-container">
                    <p className="header">NFT wallet</p>
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
