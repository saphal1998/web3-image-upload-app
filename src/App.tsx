import { ethers, providers } from "ethers";
import React from "react";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import {
  ImageSocialMedia,
  ImageSocialMedia__factory,
} from "./contract-typings";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

export interface Image {
  imgHash: string;
  caption: string;
  owner?: string;
}

interface AppState {
  images: Image[];
  loading: boolean;
  provider?: providers.Web3Provider;
  imageSocialMediaDapp?: ImageSocialMedia;
  buffer?: Buffer;
}

function App() {
  const [state, setState] = React.useState<AppState>({
    loading: false,
    images: [],
  });

  const imageSocialMediaDappAddress =
    process.env.REACT_APP_IMAGE_SOCIAL_MEDIA_DAPP_ADDRESS;

  const loadBlockChainData = async (imageSocialMediaDappAddress: string) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );

        const imageSocialMediaDapp = new ethers.Contract(
          imageSocialMediaDappAddress,
          ImageSocialMedia__factory.abi,
          provider.getSigner()
        ) as ImageSocialMedia;

        const imageCount = await imageSocialMediaDapp.imageCount();
        const images: Image[] = [];

        for (let i = 1; i <= imageCount.toNumber(); i++) {
          const image = await imageSocialMediaDapp.images(i);
          console.log(image);
          images.push(image);
        }

        setState((oldState) => ({
          ...oldState,
          images,
          provider,
          imageSocialMediaDapp,
        }));
      } else {
        window.alert("Could not find Metamask");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const captureFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.item(0);
    const reader = new window.FileReader();
    if (file) {
      reader.readAsArrayBuffer(file);

      reader.onloadend = () => {
        const buffer = Buffer.from(reader.result as ArrayBuffer);
        setState({ ...state, buffer });
      };
    }
  };

  const getAccount = async () => {
    await state.provider?.send("eth_requestAccounts", []);
    return state.provider?.getSigner();
  };

  const uploadImage = async (description: string) => {
    console.log("Submitting file to ipfs...");
    const account = await getAccount();
    const ownerAddress = await account?.getAddress();
    if (state.buffer && account && ownerAddress) {
      try {
        const ipfsAdd = await ipfs.add(state.buffer);
        const imageHash = ipfsAdd.path;
        await state.imageSocialMediaDapp
          ?.connect(account)
          .uploadImage(imageHash, description);

        setState((oldState) => ({
          ...oldState,
          images: [
            ...oldState.images,
            {
              imgHash: imageHash,
              caption: description,
              owner: ownerAddress,
            },
          ],
        }));
      } catch (err) {
        console.warn("Could not add to ipfs");
      }
    } else {
      window.alert(
        "Please select a file or check if your account is connected"
      );
    }
  };

  React.useEffect(() => {
    const loaders = async () => {
      if (imageSocialMediaDappAddress) {
        await loadBlockChainData(imageSocialMediaDappAddress);
      }
    };
    loaders();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mr-auto ml-auto">
              {state.loading ? (
                <p id="loader" className="text-center">
                  Loading..
                </p>
              ) : (
                <Main
                  images={state.images}
                  captureFile={captureFile}
                  uploadImage={uploadImage}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
