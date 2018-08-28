<template>
  <div>
    <mdc-layout-grid>
      <mdc-layout-cell v-for="customer in customers" :key="customer.id">
        <mdc-card>
          <mdc-card-header :title="Customer" :subtitle="customer.id" />
          <mdc-card-text>
            <p>{{ customer.firstName }}</p>
            <p>{{ customer.lastName }}</p>
          </mdc-card-text>
        </mdc-card>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import datalayer from '../datalayer'
export default {
  name: 'customers-view',
  data () {
    return {
      customers: []
    }
  },
  async created () {
    const result = await datalayer.getCustomers()
    switch (result) {
      case 'Unauthorized':
        this.$root.$emit('show-snackbar', { message: result })
        break
      default:
        this.$router.push({name: 'CustomersView'})
    }
  }
}
</script>

<style>
h1 {
  font-weight: normal;
}
</style>
