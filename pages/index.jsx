import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Image from 'next/image';
import Loader from 'react-loader-spinner';
import NFT from '../utils/EternalNFT.json';
import { Background, Button, LowerSection } from '../components';

const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

const mint = () => {
  const [mintedNFT, setMintedNFT] = useState(null);
  const [miningStatus, setMiningStatus] = useState(null);
  const [loadingState, setLoadingState] = useState(0);
  const [txError, setTxError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log('Got the ethereum obejct: ', ethereum);
    } else {
      console.log('No Wallet found. Connect Wallet');
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      console.log('Found authorized Account: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No authorized account found');
    }
  };

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log(`Connected to chain:${chainId}`);

      const mumbaiChainId = '0x13881';

      const devChainId = 1337;
      const localhostChainId = `0x${Number(devChainId).toString(16)}`;

      if (chainId !== mumbaiChainId && chainId !== localhostChainId) {
        alert('You are not connected to the Mumbai Polygon Testnet!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Found account', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('Error connecting to metamask', error);
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    const chainId = await ethereum.request({ method: 'eth_chainId' });

    const mumbaiChainId = '0x13881';

    const devChainId = 1337;
    const localhostChainId = `0x${Number(devChainId).toString(16)}`;
    console.log(`Connected to chain:${chainId}`, { localhostChainId, mumbaiChainId });

    if (chainId !== mumbaiChainId && chainId !== localhostChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkCorrectNetwork();
  }, []);

  // Creates transaction to mint NFT on clicking Mint Character button
  const mintCharacter = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log('test 999 nftContractAddress', nftContractAddress);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          nftContractAddress,
          NFT.abi,
          signer,
        );

        console.log('yyyyy are we hitting this');
        const nftTx = await nftContract.publicMint();
        console.log('Mining....', nftTx.hash);
        setMiningStatus(0);

        const tx = await nftTx.wait();
        setLoadingState(1);
        console.log('Mined!', tx);
        // const event = tx.events[0];
        // const value = event.args[2];
        // const tokenId = value.toNumber();

        alert(
          `Mined, see transaction: https://mumbai.polygonscan.com/tx/${tx.transactionHash}`,
        );

        // AK_TO_DO
        // it would be cool to display minted NFT. need token

        // getMintedNFT(tokenId);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log('Error minting character', error);
      setTxError(error.message);
    }
  };

  // Gets the minted NFT data
  const getMintedNFT = async (tokenId) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          nftContractAddress,
          NFT.abi,
          signer,
        );

        const tokenUri = await nftContract.tokenURI(tokenId); // Will need to change this
        const data = await axios.get(tokenUri);
        const meta = data.data;

        setMiningStatus(1);
        setMintedNFT(meta.image);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setTxError(error.message);
    }
  };
  console.log('nftContractAddress 22', nftContractAddress);
  return (
    <Background>
      <div style={{ justifyContent: 'center', width: '500px', textAlign: 'center' }}>
        <h1>Eggie Planet</h1>
        <p>Home of the Eggies</p>
        <Image alt="Vercel logo" src="/assets/eggie-lg.png" width={400} height={500} />
        <p>Welcome to the Eggie Planet Community driven On-chain</p>
        <h2>
          Price 0.01 Matic
        </h2>
        {currentAccount === '' ? (
          <Button onClick={connectWallet}>
            Connect Wallet
          </Button>
        ) : correctNetwork ? (
          <Button onClick={mintCharacter}>
            Mint Character
          </Button>
        ) : (
          <div>
            <p>----------------------------------------</p>
            <p>Please connect to the Rinkeby Testnet</p>
            <p>and reload the page</p>
            <p>----------------------------------------</p>
          </div>
        )}

        {/* <div className="text-xl font-semibold mb-20 mt-4">
          <a
            href={`https://rinkeby.rarible.com/collection/${nftContractAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="hover:underline hover:underline-offset-8 ">
              <h4>View Collection on Rarible</h4>
            </span>
          </a>
        </div> */}
        {loadingState === 0 ? (
          miningStatus === 0 ? (
            txError === null ? (
              <div className="flex flex-col justify-center items-center">
                <h2>
                  Processing your transaction
                </h2>
                <Loader
                  className="flex justify-center items-center pt-12"
                  type="TailSpin"
                  color="#d3d3d3"
                  height={40}
                  width={40}
                />
              </div>
            ) : (
              <div className="text-lg text-red-600 font-semibold">{txError}</div>
            )
          ) : (
            <div />
          )
        ) : (
          <div>
            <h2>
              Your Eggies Character (could be displayed below)
            </h2>
            <img
              src={mintedNFT}
              alt=""
              className="h-60 w-60 rounded-lg shadow-2xl shadow-[#6FFFE9] hover:scale-105 transition duration-500 ease-in-out"
            />
          </div>
        )}
        <LowerSection />
      </div>
    </Background>
  );
};

export default mint;
