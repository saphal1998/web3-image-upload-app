// We import Chai to use its asserting functions here.
import { expect } from "chai";
import { ImageSocialMedia__factory } from "../../contract-typings";

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("ImageSocialMediaDapp contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshopt in every test.
  async function deployImageSocialMediaDappContract() {
    // Get the ContractFactory and Signers here.
    const [owner, ...otherAddresses] = await ethers.getSigners();
    const ImageSocialMediaDapp = new ImageSocialMedia__factory(owner);

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const imageSocialMediaDapp = await ImageSocialMediaDapp.deploy();

    await imageSocialMediaDapp.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { imageSocialMediaDapp, owner, otherAddresses };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should deploy properly", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { imageSocialMediaDapp, owner } = await loadFixture(
        deployImageSocialMediaDappContract
      );

      // `expect` receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.
      expect(imageSocialMediaDapp.address).to.not.be.undefined;
    });
  });

  describe("Upload images", () => {
    it("Should upload images", async function () {
      const { imageSocialMediaDapp, owner } = await loadFixture(
        deployImageSocialMediaDappContract
      );

      const image = "abcd123";
      const imageHash = await imageSocialMediaDapp.uploadImage(
        image,
        "Hello world",
        { from: owner.address }
      );
      expect(imageHash).to.not.be.undefined;
    });

    it("Should have an UploadImage event emitted", async function () {
      const { imageSocialMediaDapp, owner } = await loadFixture(
        deployImageSocialMediaDappContract
      );

      const imageHashSent = "abcd123";
      const imageUpload = await imageSocialMediaDapp.uploadImage(
        imageHashSent,
        "Hello world",
        { from: owner.address }
      );
      const txn = await imageUpload.wait();
      const eventArgs = txn.events?.at(0)?.args;
      const ownerAddress = (await eventArgs?.owner) as string;
      const imageHash = (await eventArgs?.imageHash) as string;
      const caption = (await eventArgs?.caption) as string;

      expect(ownerAddress).to.equal(owner.address);
      expect(imageHash).to.equal(imageHashSent);
      expect(caption).to.equal("Hello world");
    });

    it("Should be able to retrieve image", async function () {
      const { imageSocialMediaDapp, owner } = await loadFixture(
        deployImageSocialMediaDappContract
      );

      const imageHashSent = "abcd123";
      const imageUpload = await imageSocialMediaDapp.uploadImage(
        imageHashSent,
        "Hello world",
        { from: owner.address }
      );
      await imageUpload.wait();

      const image = await imageSocialMediaDapp.images(BigNumber.from(1));
      expect(image.owner).to.equal(owner.address);
      expect(image.imgHash).to.equal(imageHashSent);
      expect(image.caption).to.equal("Hello world");
    });
  });
});
