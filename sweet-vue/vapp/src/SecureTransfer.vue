<template>
    <div v-if="isDrizzleInitialized">
        <div>
            <drizzle-contract 
                contractName="SecureTransfer"
                method="price"
                label="Current price"
            />
        </div>
    </div>

    <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SecureTransfer',
    computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
</style>