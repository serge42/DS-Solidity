<template>
  <div v-if="isDrizzleInitialized">
    <div>
        <drizzle-contract 
            contractName="SecureTransfer" 
            method="seller" 
            label="Seller" />
        <drizzle-contract 
            contractName="SecureTransfer" 
            method="price" 
            label="Current price" />
        <div v-if="isSeller">
            <drizzle-contract-form
                contractName="SecureTransfer"
                method="setPrice"
                :placeholders="['Set price (Wei)']"
            />
        </div>
        <div v-else>
            <drizzle-contract-form
                contractName="SecureTransfer"
                method="makeDeposit"
                :placeholders="['Place offer (Wei)']"
            />
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
    return seller === this.activeAccount;
  }
  }
}
</script>

<style>
</style>