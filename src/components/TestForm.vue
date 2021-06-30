<template>
  <div class="container">
    <form @submit.prevent="someAction()" class="testForm">
      <h1>Новый клиент:</h1>
      <p class="note"><span class="star">*</span> Поле обязательное для заполнения </p>

      <div class="tab" v-show="currentTab === 1">
       
        <div class="field">
          <p>
            <label for="last-name" class="form_label_marked">Фамилия</label>
            <input
              id="last-name"
              type="text"
              autofocus
              v-model="lastName"
              @blur="v$.lastName.$touch()"
            />
          </p>
          <div class="error" v-if="v$.lastName.$error">
            <template v-if="v$.lastName.required.$invalid">
              Фамилия обязательна для заполнения
            </template>
            <template v-else-if="v$.lastName.minLength.$invalid">
              Длина фамилии не должна быть менее
              {{ v$.lastName.minLength.$params.min }} символов
            </template>
            <template v-else-if="!v$.lastName.alpha.$invalid">
              Фамилия должна содержать только буквы
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="name" class="form_label_marked">Имя</label>
            <input
              id="name"
              type="text"
              v-model="name"
              @blur="v$.name.$touch()"
            />
          </p>
          <div class="error" v-if="v$.name.$error">
            <template v-if="v$.name.required.$invalid">
              Имя обязательно для заполнения
            </template>
            <template v-else-if="v$.name.minLength.$invalid">
              Длина имени не должна быть менее
              {{ v$.name.minLength.$params.min }} символов
            </template>
            <template v-else-if="!v$.name.alpha.$invalid">
              Имя должно содержать только буквы
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="middle-name" class="form_label">Отчество</label>
            <input
              id="middle-name"
              type="text"
              v-model="middleName"
              @blur="v$.middleName.$touch()"
            />
          </p>
          <div class="error" v-if="v$.middleName.$error">
            <template v-if="!v$.middleName.alpha.$invalid">
              Отчество должно содержать только буквы
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="birth-date" class="form_label"
              >Дата рождения<span class="star">*</span></label
            >
            <input
              id="birth-date"
              type="date"
              v-model="birthDate"
              @blur="v$.birthDateValide.$touch()"
            />
          </p>
          <div class="error" v-if="v$.birthDateValide.$error">
            <template v-if="v$.birthDateValide.required.$invalid">
              Дата рождения обязательна для заполнения
            </template>
            <template v-else-if="v$.birthDateValide.maxValue.$invalid">
              Дата рождения не может быть больше текущей
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="phone_number" class="form_label_marked"
              >Номер телефона</label
            >
            <input
              id="phone_number"
              type="text"
              placeholder="7XXXXXXXXXX"
              v-model="phoneNumber"
              @blur="v$.phoneNumber.$touch()"
            />
          </p>
          <div class="error" v-if="v$.phoneNumber.$error">
            <template v-if="v$.phoneNumber.required.$invalid">
              Номер обязателен для заполнения
            </template>
            <template v-else-if="v$.phoneNumber.minLength.$invalid">
              Номер должен содержать 11 цифр
            </template>

            <template v-else-if="v$.phoneNumber.$invalid">
              Номер должен быть в формате 7XXXXXXXXXX
            </template>
          </div>
        </div>

        <div class="field">
          <label for="gender" class="form_label">Пол</label>
          <div class="form_radio_btn btn-1">
            <input id="radio-1" name="gender" type="radio" value="male" v-model="gender"/>
            <label for="radio-1">мужской</label>
          </div>
          <div class="form_radio_btn btn-2">
            <input id="radio-2" name="gender" type="radio" value="female" v-model="gender" />
            <label for="radio-2">женский</label>
          </div>
        </div>

        <div class="field">
            <br/><label for="clients_group" class="form_label_marked"
              >Группа клиентов</label
            >
            <select
              name="clients_group"
              size="3"
              
              multiple
              v-model="clientGroups"
              @blur="v$.clientGroups.$touch()"
            >
              <option
                v-for="clientGroupsType in clientGroupsTypes"
                v-bind:key="clientGroupsType.id"
              >
                {{ clientGroupsType.name }}
              </option>
            </select>
     
          <div class="error" v-if="v$.clientGroups.$error">
            <template v-if="v$.clientGroups.required.$invalid">
              Пожалуйста, выберите группу клиентов
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="attending_doctor" class="form_label">Лечащий врач</label>
            <select
              name="attending_doctor"
              size="1"

              v-model="attendingDoctor"
              @blur="v$.attendingDoctor.$touch()"
            >
              <option v-for="doctor in doctors" v-bind:key="doctor.id">
                {{ doctor.name }}
              </option>
            </select>
          </p>
        </div>

        <div class="field">
      
           <input type="checkbox"  name="sms" value="sms"
              v-model="disable_sms">
            <label for="sms" class="checkboxtext"> Не отправлять SMS </label>
        </div>
      </div>

      <div class="tab" v-show="currentTab === 2">
        Адрес:
        <div class="field">
          <p>
            <label for="index">Индекс</label>
            <input
              id="index"
              type="text"
              v-model="pochtaIndex"
              @blur="v$.pochtaIndex.$touch()"
            />
          </p>
          <div class="error" v-if="v$.pochtaIndex.$error">
            <template v-if="v$.pochtaIndex.numeric.$invalid">
              Индекс должен содержать только цифры
            </template>
            <template v-else-if="v$.pochtaIndex.minLength.$invalid">
              Индекс должен содержать 6 цифр
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="country">Страна</label>
            <input
              id="country"
              type="text"
              v-model="country"
              @blur="v$.country.$touch()"
            />
          </p>
        </div>

        <div class="field">
          <p>
            <label for="area">Область</label>
            <input
              id="area"
              type="text"
              v-model="area"
              @blur="v$.area.$touch()"
            />
          </p>
        </div>

        <div class="field">
          <p>
            <label for="city">Город<span class="star">*</span></label>
            <input
              id="city"
              type="text"
              v-model="city"
              @blur="v$.city.$touch()"
            />
          </p>
          <div class="error" v-if="v$.city.$error">
            <template v-if="v$.city.required.$invalid">
              Город обязателен для заполнения
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="street">Улица</label>
            <input id="street" type="text" />
          </p>
        </div>

        <div class="field">
          <p>
            <label for="house">Дом</label>
            <input id="house" type="text" />
          </p>
        </div>
      </div>

      <div class="tab" v-show="currentTab === 3">
        Документ:
        <div class="field">
          <p>
            <label for="document_type"
              >Тип документа<span class="star">*</span></label
            >
            <select
              name="document_type"
              size="1"
              v-model="documentType"
              @blur="v$.documentType.$touch()"
            >
              <option v-for="document in documents" v-bind:key="document.id">
                {{ document.name }}
              </option>
            </select>
          </p>
          <div class="error" v-if="v$.documentType.$error">
            <template v-if="v$.documentType.required.$invalid">
              Выберите тип документа
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="passport_serail">Серия</label>
            <input
              id="passport_serial"
              type="text"
              v-model="passportSerial"
              @blur="v$.passportSerial.$touch()"
            />
          </p>
        </div>

        <div class="field">
          <p>
            <label for="passport_number">Номер</label>
            <input
              id="passport_number"
              type="text"
              v-model="passportNumber"
              @blur="v$.passportNumber.$touch()"
            />
          </p>
          <div class="error" v-if="v$.passportNumber.$error">
            <template v-if="v$.passportNumber.numeric.$invalid">
              Номер паспорта должен содержать только цифры
            </template>
          </div>
        </div>

        <div class="field">
          <p>
            <label for="passport-auhority">Кем выдан</label>
            <input
              id="passport-auhority"
              type="text"
              v-model="passportAuhority"
            />
          </p>
        </div>

        <div class="field">
          <p>
            <label for="passport-date"
              >Дата выдачи<span class="star">*</span></label
            >
            <input
              id="pasport-date"
              type="date"
              v-model="passportDate"
              @blur="v$.passportDateValide.$touch()"
            />
          </p>
          <div class="error" v-if="v$.passportDateValide.$error">
            <template v-if="v$.passportDateValide.required.$invalid">
              Дата выдачи обязательна для заполнения
            </template>
            <template v-if="v$.passportDateValide.maxValue.$invalid">
              Дата выдачи не может быть больше текущей
            </template>
          </div>
        </div>
      </div>

      <div style="overflow: auto">
        <div style="float: right">
          <button
            type="button"
            id="prevBtn"
            v-on:click="previousTab()"
            v-if="currentTab > 1"
          >
            Назад
          </button>
          <button
            type="button"
            id="nextBtn"
            v-on:click="nextTab()"
            v-if="currentTab < 3"
          >
            Далее
          </button>
          <button type="submit" :disabled="v$.$invalid" v-if="currentTab == 3">
            Отправить форму
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric, maxValue } from "@vuelidate/validators";
import constants from "../constants.js";

export default {
  setup() {
    return {
      v$: useVuelidate(),
      ...constants,
    };
  },
  data() {
    return {
      lastName: "",
      name: "",
      middleName: "",
      birthDate: null,
      phoneNumber: null,
      gender: "male",
      clientGroups: [],
      attendingDoctor: this.doctors[0].name,
      disable_sms: false,
      pochtaIndex: null,
      country: "",
      area: "",
      city: "",
      street: "",
      house: "",
      documentType: this.documents[0].name,
      passportSerial: "",
      passportNumber: null,
      passportAuhority: "",
      passportDate: null,

      currentTab: 1,
    };
  },
  validations() {
    return {
      lastName: {
        required,
        alpha: (val) => /^[а-яё]*$/i.test(val),
        minLength: minLength(2),
      },

      name: {
        required,
        alpha: (val) => /^[а-яё]*$/i.test(val),
        minLength: minLength(2),
      },

      middleName: {
        alpha: (val) => /^[а-яё]*$/i.test(val),
      },

      birthDateValide: {
        required,
        maxValue: maxValue(new Date()),
      },

      phoneNumber: {
        required,
        validFormat: (val) => /^(7)(\d{3})(\d{3})(\d{2})(\d{2})/.test(val),
        minLength: minLength(11),
      },

      clientGroups: {
        required,
      },

      pochtaIndex: {
        numeric,
        minLength: minLength(6),
      },

      city: {
        required,
      },

      documentType: {
        required,
      },

      passportNumber: {
        numeric,
      },

      passportDateValide: {
        required,
        maxValue: maxValue(new Date()),
      },
    };
  },
  methods: {
    someAction() {
      alert("Новый клиент успешно создан");
    },

    nextTab() {
      if (this.currentTab < 3) {
        this.currentTab += 1;
      }
    },
    previousTab() {
      if (this.currentTab > 1) {
        this.currentTab -= 1;
      }
    },
  },
  computed: {
    birthDateValide() {
      return this.birthDate ? new Date(this.birthDate) : null;
    },

    passportDateValide() {
      return this.passportDate ? new Date(this.passportDate) : null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
.field {
  margin-bottom: 24px;
}

.field > label {
  margin-right: 8px;
}

.error,
.star {
  color: $main-color;
}
</style>
