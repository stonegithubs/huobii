<template>
  <el-dialog title="添加收款方式" :visible.sync="isShown" width="472px" :before-close="handleClose" :modal-append-to-body="false">
    <div class="add-payment-form">
      <div class="payment-params">
        <el-form label-position="top" label-width="80px" :model="addPaymenForm" style="width:100%">
          <el-form-item label="名称">
            <el-select style="width:100%" v-model="addPaymenForm.id" placeholder="请选择支付方式">
              <el-option v-for="(item, id) in this.$store.state.Common.supportPayway" :label="item.payName" :value="item.id" v-bind:key='id'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="(item, id, index) in this.currentPayway" v-bind:key='id' :label="item" v-show="item !== null" :prop="'pram'+ (index+1)">
            <el-input v-model="addPaymenForm[id]" type='text'></el-input>
          </el-form-item>
          <el-form-item label="二维码" v-if="this.hasQrCode">
            <el-upload class="upload-demo" :limit="1" action="" :auto-upload="false" :on-change="handleChange" :on-remove="handleRemove" :file-list="this.qrFile" list-type="picture-card">
              <el-button v-if="this.qrFile.length ==0" size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item label="安全密码">
              <el-input type='password'></el-input>
            </el-form-item> -->
          <el-form-item>
            <el-button style="width:100%" type="primary" @click="handleAddPayment">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {
    addPay,
    getPayway
  } from '../../../api/user'
  export default {
    name: "add-payment-form",
    props: ["isShown"],
    data() {
      return {
        currentPayway: {
          pram1: null,
          pram2: null,
          pram3: null,
          pram4: null,
          // qrcode: null
        },
        hasQrCode: false,
        // qrcode:'',
        addPaymenForm: {
          id: '', // bank表id
          pram1: '',
          pram2: '',
          pram3: '',
          pram4: '',
          // qrcode: '',
        },
        qrFile: [],
        // AddPaymentdialogVisible: false,
      }
    },
    methods: {
      handleChange(file) {
        this.qrFile.push(file);
        // this.addPaymenForm.qrcode = file.raw;
        document.getElementsByClassName('el-upload--picture-card')[0].classList.add('noo')
      },
      handleRemove(file, fileList) {
        document.getElementsByClassName('el-upload--picture-card')[0].classList.remove('noo')
        this.qrFile = [];
        // this.addPaymenForm.qrcode = ''
      },
      handleAddPayment() {
        const formData = new FormData()
        formData.append('id', this.addPaymenForm.id)
        formData.append('pram1', this.addPaymenForm.pram1)
        formData.append('pram2', this.addPaymenForm.pram2)
        formData.append('pram3', this.addPaymenForm.pram3)
        formData.append('pram4', this.addPaymenForm.pram4)
        if (this.qrFile.length === 1) {
          let reader = new FileReader()
          reader.readAsDataURL(this.qrFile[0].raw)
          formData.append('qrcode', reader.result)
        } else {
          formData.append('qrcode', null)
        }
        addPay(formData).then(response => {
          this.$notify.success(response.message)
          this.isShown = false
          this.$store.dispatch('GetUserPayway')
        }).catch(_ => {
          this.$notify.error(_.message)
        })
        // console.log(formData.get('qrcode'))
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    created() {
      this.$nextTick(() => {
        if (this.$store.state.Common.supportPayway.length === 0) {
          this.$store.dispatch('getSupportedPayway').then(response => {
            // console.log(response)
          }).catch(_ => {
            console.log(_)
          })
        }
      })
    },
    watch: {
      addPaymenForm: {
        handler(val, oldval) {
          for (let item of this.$store.state.Common.supportPayway) {
            if (val.id === item.id) {
              this.currentPayway.pram1 = item.pram1
              this.currentPayway.pram2 = item.pram2
              this.currentPayway.pram3 = item.pram3
              this.currentPayway.pram4 = item.pram4
              if (item.qrcode === '1') {
                this.hasQrCode = true
              } else {
                this.hasQrCode = false
              }
            }
          }
        },
        deep: true
      },
      getID(newValue, oldval) {
        this.addPaymenForm.pram1 = null,
          this.addPaymenForm.pram2 = null,
          this.addPaymenForm.pram3 = null,
          this.addPaymenForm.pram4 = null,
          this.qrFile = []
      }
    },
    computed: {
      getID() {
        return this.addPaymenForm.id
      },
      hhshown() {
        return this.isShown
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
