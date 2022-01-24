import Web3 from "web3"
let web3;
export const IsWeb3 = async () => {

  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    let address = await web3.eth.getAccounts();
// console.log("adddddasads---====",address)
    return address;
  }

}