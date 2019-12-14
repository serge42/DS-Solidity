<template>
  <div v-if="isDrizzleInitialized">
    <div>
        <drizzle-contract 
            contractName="SecureTransfer" 
            method="price" 
            label="Starting price" />
        <drizzle-contract 
            contractName="SecureTransfer" 
            method="seller" 
            label="Seller" />
        <div class="flex-container">
            <drizzle-contract
                contractName="SecureTransfer"
                method="offer"
                label="Highest offer" />
            <drizzle-contract
                contractName="SecureTransfer"
                method="buyer"
                label="by" />
        </div>
        <div v-if="isSeller">
            <div v-if="hasOffer">
                <drizzle-contract-form
                    contractName="SecureTransfer"
                    method="setPrice"
                    :placeholders="['Set price (Wei)']"
                />
            </div>
            <div v-else>Price cannot be changed.</div>
            <div v-if="isActive">
                <div class="flex-container">
                    <label>Accept offer:</label>
                    <drizzle-contract-form
                        contractName="SecureTransfer"
                        method="acceptOffer" />
                </div>
            </div>
            <div v-else>Offer already accepted.</div>
        </div>
        <div v-else>
            <div v-if="isActive">
                <drizzle-contract-form
                    contractName="SecureTransfer"
                    method="makeDeposit"
                    :placeholders="['Place offer (Wei)']"
                />
            </div>
            <div v-else>
                <div v-if="isBuyer">
                    <div class="flex-container">
                        <label>Confirm end transaction:</label>
                        <drizzle-contract-form
                            contractName="SecureTransfer"
                            method="endTransactionBuyer"
                            :placeholders="['Seller address']" />
                    </div>
                </div>
                <div v-else>An offer has already been accepted.</div>
            </div>
        </div>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SecureTransfer",
  computed:{
  ...mapGetters('drizzle', ['isDrizzleInitialized','drizzleInstance']),
  ...mapGetters('accounts', ['activeAccount']),
  ...mapGetters('contracts', ['getContractData']),
  isSeller() {
    const seller = this.getContractData({
      contract: 'SecureTransfer',
      method: 'seller'
    });
    return this.activeAccount === seller;
  },
  isBuyer() {
      const buyer = this.getContractData({
          contract: 'SecureTransfer',
          method: 'buyer'
      });
      return this.activeAccount === buyer;
  },
  hasOffer() {
      return this.getContractData({
          contract: 'SecureTransfer',
          method: 'offer'
      }) === 0;

  },
  isActive() {
      return this.getContractData({
          contract: 'SecureTransfer',
          method: 'sellerAccept'
      }) === false;
  }
  }
}
</script>

<style scoped>

label {
  font-weight: 800;
  padding-right: 0.5rem
}

div.flex-container {    
  display: flex;
  justify-content: center;
  margin-top: 0.1rem
}

div.flex-container > div {
    margin-right: 1rem;
}
</style>