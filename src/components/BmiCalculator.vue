<template>
  <div class="columns is-centered">
    <div class="column is-half card" :style="bmiStyle">
      <div class="card-header-title is-centered is-size-4">BMI Calculator</div>
      <form @submit.prevent="submit" class="card-content">
        <div class="field">
          <div class="control">
            <label class="label">Height</label>
            Feet <input type="radio" value='feet' name='heightUnit' v-model="formData.heightUnit"> Centimeters <input type="radio" value='centimeters' name="heightUnit" v-model="formData.heightUnit">

            <div v-if="isFeet">
              <input class="input" type="number" name="feet" v-model="formData.feet" placeholder="Feet">
              <input class="input" type="number" name="inches" v-model="formData.inches" placeholder="Inches">
            </div>
            <div v-else>
              <input class="input" type="number" name="centimeters" v-model="formData.centimeters" placeholder="Centimeters">
            </div>
            <label v-show="errors.height" class="is-size-7 has-text-danger">{{ errors.height }}</label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">Weight</label>
            Kilograms <input type="radio" value='kilograms' name='weightUnit' v-model="formData.weightUnit"> Pounds <input type="radio" value='pounds' name="weightUnit" v-model="formData.weightUnit">
            <div>
              <input class="input" type="number" name="weight" v-model="formData.weight" :placeholder="isKilograms ? 'Kilograms' : 'Pounds'">
            </div>
            <label v-show="errors.weight" class="is-size-7 has-text-danger">{{ errors.weight }}</label>
          </div>
        </div>
        <div>
          <div class="control">
            <button class="button is-primary">Submit</button>&nbsp;
            <button class="button" type="button" @click="reset">Reset</button>
          </div>
        </div><br>
        <div v-if="this.result">
          <label class="label">RESULT: {{this.result}}</label>
          <span class="tag is-dark">{{this.remark}}</span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
const FEET_METERS = 3.28;
const INCHES_METERS = 0.0254;
const CENTIMETERS_METERS = 100;
const POUNDS_KILOGRAMS = 2.2046;

const REMARK_UNDERWEIGHT = "Underweight";
const REMARK_NORMAL = "Normal";
const REMARK_OVERWEIGHT = "Overweight";
const REMARK_OBESITY = "Obesity";

export default {
  name: "bmi-calculator",
  computed: {
    isFeet() {
      return this.formData.heightUnit === "feet";
    },
    isKilograms() {
      return this.formData.weightUnit === "kilograms";
    },
    isHeightEmpty() {
      if (this.formData.heightUnit === "feet") {
        return !this.formData.feet || !this.formData.inches;
      }

      return !this.formData.centimeters;
    },
    remarkClass() {
      if (!this.remark) return "#fff";
      if (this.remark === REMARK_UNDERWEIGHT) return "#f3e5f5";
      if (this.remark === REMARK_NORMAL) return "#dcedc8";
      if (this.remark === REMARK_OVERWEIGHT) return "#ffa0b6";
      return "#ffb74d";
    },
    bmiStyle() {
      return { backgroundColor: this.remarkClass };
    }
  },
  data() {
    return {
      formData: {
        heightUnit: "feet",
        weightUnit: "kilograms",
        feet: null,
        inches: null,
        centimeters: null,
        weight: null
      },
      errors: {},
      height: 0,
      weight: 0,
      result: null,
      remark: null
    };
  },
  methods: {
    submit() {
      const data = Object.assign({}, this.formData);
      if (!this.validate()) {
        return false;
      }

      this.height = this.isFeet
        ? parseFloat(this.formData.feet) / FEET_METERS +
          parseFloat(this.formData.inches) * INCHES_METERS
        : parseFloat(this.formData.centimeters) / CENTIMETERS_METERS;

      this.weight = this.isKilograms
        ? parseFloat(this.formData.weight)
        : parseFloat(this.formData.weight) / POUNDS_KILOGRAMS;

      const bmi = this.weight / this.height / this.height;
      this.result = parseFloat(bmi).toFixed(2);
      this.remark = this.getRemark(bmi);
    },
    validate() {
      this.errors = {};
      let status = true;
      if (this.isHeightEmpty) {
        this.$set(this.errors, "height", "Height field is required.");
        status = false;
      }

      if (!this.formData.weight) {
        this.$set(this.errors, "weight", "Weight field is required.");
        status = false;
      }

      return status;
    },
    reset() {
      this.formData = {
        heightUnit: "feet",
        weightUnit: "kilograms",
        feet: null,
        inches: null,
        centimeters: null,
        weight: null
      };
      this.errors = {};
      this.height = 0;
      this.weight = 0;
      this.result = null;
      this.remark = null;
    },
    getRemark(bmi) {
      if (bmi <= 18.5) return REMARK_UNDERWEIGHT;
      if (bmi >= 18.5 && bmi <= 24.9) return REMARK_NORMAL;
      if (bmi >= 25 && bmi <= 29.9) return REMARK_OVERWEIGHT;
      return REMARK_OBESITY;
    }
  }
};
</script>   