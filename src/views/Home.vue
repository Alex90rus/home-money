/* eslint-disable */
<template>
  <div>
    <div class="page-title">
      <h3>{{"Bill" | localize}}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
        v-tooltip="localeRuEn"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency :rates="curRate" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill.vue';
import HomeCurrency from '../components/HomeCurrency.vue';
import localizeFilter from '../filters/localize.filter';

export default {
  name: 'home',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill'),
    };
  },
  data: () => ({
    loading: true,
    currency: null,
    curRate: {
      USD: null,
      EUR: null,
    },
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.curRate.EUR = this.currency.rates.RUB;
    this.curRate.USD = this.currency.rates.RUB / this.currency.rates.USD;
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.curRate.EUR = this.currency.rates.RUB;
      this.curRate.USD = this.currency.rates.RUB / this.currency.rates.USD;
      this.loading = false;
    },
  },
  computed: {
    localeRuEn() {
      return localizeFilter('Update');
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>
