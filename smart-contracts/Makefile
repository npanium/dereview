deploy-local:
	forge script script/Deploy.s.sol:Deploy --fork-url http://localhost:8545  --private-key ${PRIVATE_KEY_ANVIL_0} --broadcast 

deploy-base-sepolia:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$BASE_SEPOLIA_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier blockscout --verifier-url https://base-sepolia.blockscout.com/api? -vvvv 

#deploy-bitkub:

deploy-morph:

deploy-hedera:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$HEDERA_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier sourcify --verifier-url https://server-verify.hashscan.io -vvvv 

deploy-zkscroll:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$ZK_SCROLL_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier-url --verifier-url https://api-sepolia.scrollscan.com/api --etherscan-api-key $$SCROLLSCAN_API -vvvv 

deploy-polygon:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$POLYGON_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api? -vvvv 


deploy-flow:

deploy-linea:

deploy-zirkuit:

#deploy-eth-holesky:


