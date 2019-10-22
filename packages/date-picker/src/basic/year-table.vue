<template>
  <div @click="handleYearTableClick" class="el-year-table-x tea-calendar__row-group">
    <div class="tea-calendar__type-wrap tea-calendar__type-year">
      <div class="tea-calendar__row">
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 0)">
          <span>{{ startYear }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 1)">
          <span>{{ startYear + 1 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 2)">
          <span>{{ startYear + 2 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 3)">
          <span>{{ startYear + 3 }}</span>
        </div>
      </div>
      <div class="tea-calendar__row">
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 4)">
          <span>{{ startYear + 4 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 5)">
          <span>{{ startYear + 5 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 6)">
          <span>{{ startYear + 6 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 7)">
          <span>{{ startYear + 7 }}</span>
        </div>
      </div>
      <div class="tea-calendar__row">
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 8)">
          <span>{{ startYear + 8 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 9)">
          <span>{{ startYear + 9 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 10)">
          <span>{{ startYear + 10 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 11)">
          <span>{{ startYear + 11 }}</span>
        </div>
      </div>
      <div class="tea-calendar__row">
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 12)">
          <span>{{ startYear + 12 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 13)">
          <span>{{ startYear + 13 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 14)">
          <span>{{ startYear + 14 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 15)">
          <span>{{ startYear + 15 }}</span>
        </div>
      </div>
      <div class="tea-calendar__row">
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 16)">
          <span>{{ startYear + 16 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 17)">
          <span>{{ startYear + 17 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 18)">
          <span>{{ startYear + 18 }}</span>
        </div>
        <div class="tea-calendar__cell available" :class="getCellStyle(startYear + 19)">
          <span>{{ startYear + 19 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import { hasClass } from 'element-ui/src/utils/dom';
  import { isDate, range, nextDate, getDayCountOfYear } from 'element-ui/src/utils/date-util';
  import { arrayFindIndex, coerceTruthyValueToArray } from 'element-ui/src/utils/util';

  const datesInYear = year => {
    const numOfDays = getDayCountOfYear(year);
    const firstDay = new Date(year, 0, 1);
    return range(numOfDays).map(n => nextDate(firstDay, n));
  };

  export default {
    props: {
      disabledDate: {},
      value: {},
      defaultValue: {
        validator(val) {
          // null or valid Date Object
          return val === null || (val instanceof Date && isDate(val));
        }
      },
      date: {}
    },

    computed: {
      startYear() {
        return this.date.getFullYear() - 19;// Math.floor(this.date.getFullYear() / 10) * 10;
      }
    },

    methods: {
      getCellStyle(year) {
        const style = {};
        const today = new Date();

        style.disabled = typeof this.disabledDate === 'function'
          ? datesInYear(year).every(this.disabledDate)
          : false;
        style.current = arrayFindIndex(coerceTruthyValueToArray(this.value), date => date.getFullYear() === year) >= 0;
        style['is-selected'] = style.current;
        style.today = today.getFullYear() === year;
        style['tea-calendar__cell--now'] = style.today;
        style.default = this.defaultValue && this.defaultValue.getFullYear() === year;

        return style;
      },

      handleYearTableClick(event) {
        const target = event.target;
        if (target.tagName === 'SPAN') {
          if (hasClass(target.parentNode, 'disabled')) return;
          const year = target.textContent || target.innerText;
          this.$emit('pick', Number(year));
        }
      }
    }
  };
</script>
