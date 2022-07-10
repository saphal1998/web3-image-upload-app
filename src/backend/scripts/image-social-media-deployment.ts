import { ethers } from "hardhat";
import { ImageSocialMedia__factory } from "../../contract-typings";

async function tokenAndVaultDeployment() {
  const [owner, ...otherAddresses] = await ethers.getSigners();
  const factory = new ImageSocialMedia__factory(owner);
  const imageSocialMediaDapp = await factory.deploy();
  console.log(await imageSocialMediaDapp.deployed());
}

const main = async () => {
  await tokenAndVaultDeployment();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
