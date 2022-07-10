/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ImageSocialMediaInterface extends utils.Interface {
  functions: {
    "imageCount()": FunctionFragment;
    "images(uint256)": FunctionFragment;
    "uploadImage(string,string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "imageCount" | "images" | "uploadImage"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "imageCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "images",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "uploadImage",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "imageCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "images", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "uploadImage",
    data: BytesLike
  ): Result;

  events: {
    "UploadComplete(address,string,string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "UploadComplete"): EventFragment;
}

export interface UploadCompleteEventObject {
  owner: string;
  imageHash: string;
  caption: string;
  imageCount: BigNumber;
}
export type UploadCompleteEvent = TypedEvent<
  [string, string, string, BigNumber],
  UploadCompleteEventObject
>;

export type UploadCompleteEventFilter = TypedEventFilter<UploadCompleteEvent>;

export interface ImageSocialMedia extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ImageSocialMediaInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    imageCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    images(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string] & {
        imgHash: string;
        caption: string;
        owner: string;
      }
    >;

    uploadImage(
      _imgHash: PromiseOrValue<string>,
      _caption: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  imageCount(overrides?: CallOverrides): Promise<BigNumber>;

  images(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string] & {
      imgHash: string;
      caption: string;
      owner: string;
    }
  >;

  uploadImage(
    _imgHash: PromiseOrValue<string>,
    _caption: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    imageCount(overrides?: CallOverrides): Promise<BigNumber>;

    images(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string] & {
        imgHash: string;
        caption: string;
        owner: string;
      }
    >;

    uploadImage(
      _imgHash: PromiseOrValue<string>,
      _caption: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "UploadComplete(address,string,string,uint256)"(
      owner?: null,
      imageHash?: null,
      caption?: null,
      imageCount?: null
    ): UploadCompleteEventFilter;
    UploadComplete(
      owner?: null,
      imageHash?: null,
      caption?: null,
      imageCount?: null
    ): UploadCompleteEventFilter;
  };

  estimateGas: {
    imageCount(overrides?: CallOverrides): Promise<BigNumber>;

    images(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uploadImage(
      _imgHash: PromiseOrValue<string>,
      _caption: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    imageCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    images(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uploadImage(
      _imgHash: PromiseOrValue<string>,
      _caption: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
