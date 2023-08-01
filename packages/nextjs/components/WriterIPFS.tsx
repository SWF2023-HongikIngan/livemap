import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const FactButton = styled.div`
  width: 126px;
  height: 36px;
  border-radius: 30px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

// export default function Writer({ cid }) {
export default function Writer({ contractName, functionName, args, text }) {
  //   const { address, isConnecting, isDisconnected } = useAccount();
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: contractName,
    functionName: functionName,
    args: [...args],
    // For payable functions, expressed in ETH
    value: "0",
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  async function Write() {
    await writeAsync();
  }

  return (
    <Button
      style={{
        padding: "10px 0",
        borderRadius: 30,
      }}
      variant="contained"
      onClick={Write}
    >
      제보하기
    </Button>
  );
}
