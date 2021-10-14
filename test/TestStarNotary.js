// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

let accounts; // List of development accounts provided by Truffle
let owner; // Global variable use it in the tests cases

// This called the StartNotary Smart contract and initialize it
contract("StarNotary", (accs) => {
  accounts = accs; // Assigning test accounts
  owner = accounts[0]; // Assigning the owner test account
});

// Example test case, it will test if the contract is able to return the starName property
// initialized in the contract constructor
it("has correct name", async () => {
  let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
  let starName = await instance.starName.call(); // Calling the starName property
  assert.equal(starName, "Jakes awesome star"); // Assert if the starName property was initialized correctly
});

it("can be claimed", async () => {
  const instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  const starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);
});

it("can change owners", async () => {
  const secondUser = accounts[1];
  const instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  assert.equal(await instance.starOwner.call(), owner);
  await instance.claimStar({ from: secondUser });
  assert.equal(await instance.starOwner.call(), secondUser);
});

it("can change star name", async () => {
  const instance = await StarNotary.deployed();
  assert.equal(await instance.starName.call(), "Jakes awesome star");
  await instance.changeName("Nova centauri", { from: owner });
  assert.equal(await instance.starName.call(), "Nova centauri");
});
