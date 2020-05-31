<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Создать запись</router-link>
    </p>


    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
        :active-class="'active orange lighten-1'"
      >
      </Paginate>
    </section>


  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import paginationMixin from '../mixins/pagination.mixin';
import HistoryTable from '../components/HistoryTable.vue';


export default {
  name: 'history',
  extends: Doughnut,
  mixins: [paginationMixin],
  data() {
    return ({
      loading: true,
      records: [],
    });
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories);
    this.loading = false;
  },
  watch: {
    $route(to) {
      if (!to.query.page) {
        this.pageChangeHandler(1);
        this.page = 1;
      }
    },
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map((record) => ({
        ...record,
        categoryName: categories.find((c) => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      })));

      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map((c) => this.records.reduce((total, r) => {
            if (r.categoryId === c.id && r.type === 'outcome') {
              // eslint-disable-next-line no-param-reassign
              total += +r.amount;
            }
            return total;
          }, 0)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(39, 255, 20, 0.2)',
            'rgba(255, 0, 248, 0.2)',
            'rgba(255, 0, 21, 0.2)',
            'rgba(0, 239, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(39, 255, 20, 1)',
            'rgba(255, 0, 248, 1)',
            'rgba(255, 0, 21, 1)',
            'rgba(0, 239, 255, 1)',
          ],
          borderWidth: 1,
        }],
      });
    },
  },
  components: {
    HistoryTable,

  },
};
</script>
