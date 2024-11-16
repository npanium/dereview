deploy-local:
	forge script script/Deploy.s.sol:Deploy --fork-url http://localhost:8545  --private-key ${PRIVATE_KEY_ANVIL_0} --broadcast 

deploy-base-sepolia:
	source .env && forge script script/Deploy.s.sol:Deploy --fork-url $$BASE_SEPOLIA_RPC_URL --account $$PRIVATE_KEY_NAME --sender $$DEPLOYER_ACCOUNT --broadcast -vvvv --verify --verifier blockscout --verifier-url https://base-sepolia.blockscout.com/api? -vvvv 
