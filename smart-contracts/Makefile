deploy-local:
	forge script script/Deploy.s.sol:Deploy --fork-url http://localhost:8545  --private-key ${PRIVATE_KEY_ANVIL_0} --broadcast 

deploy-base-sepolia:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$BASE_SEPOLIA_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier blockscout --verifier-url https://base-sepolia.blockscout.com/api? -vvvv 

#deploy-bitkub:

deploy-morph:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$MORPH_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier blockscout --verifier-url https://explorer-api.morphl2.io/api? -vvvv 

deploy-hedera:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$HEDERA_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier sourcify --verifier-url https://server-verify.hashscan.io -vvvv 

deploy-zkscroll:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$ZK_SCROLL_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier-url --verifier-url https://api-sepolia.scrollscan.com/api --etherscan-api-key $$SCROLLSCAN_API -vvvv 

deploy-polygon:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$POLYGON_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier-url https://api-amoy.polygonscan.com/api --etherscan-api-key $$POLYGONSCAN_API -vvvv 

deploy-flow:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$FLOW_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --legacy --broadcast -vvvv --verify --verifier blockscout --verifier-url https://evm-testnet.flowscan.io/api -vvvv 

deploy-linea:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$LINEA_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier blockscout --verifier-url https://explorer.sepolia.linea.build/api? -vvvv 

deploy-zircuit:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$ZIRCUIT_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier-url --verifier-url https://explorer.testnet.zircuit.com/api/contractVerifyHardhat --etherscan-api-key $$ZIRCUIT_API -vvvv 

#deploy-eth-holesky:


