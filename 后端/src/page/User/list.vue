<template>
  <div>
    <el-row class="grid-table">
      <el-form :inline="true" :model='search'>
        <el-form-item label="帐号">
          <el-input v-model="search.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table stripe border style="width:100%;margin-top:10px" :data="list">
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70">
        </el-table-column>
        <el-table-column prop="payAPPName" label="用户名" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.user}}
          </template>
        </el-table-column>
        <el-table-column prop="payAPPName" label="用户昵称" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.nick}}
          </template>
        </el-table-column>
        <el-table-column prop="payAPPName" label="生日" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.bith}}
          </template>
        </el-table-column>
        <el-table-column prop="payAPPName" label="地址" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.addr}}
          </template>
        </el-table-column>
        <el-table-column prop="payAPPName" label="身份证号" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.idcard}}
          </template>
        </el-table-column>
        <el-table-column prop="payAPPName" label="手机号" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.tel}}
          </template>
        </el-table-column>
        <el-table-column prop="payAPPName" label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="del(scope.row)">删除</el-button>
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-row>

    <!-- 编辑框 -->
    <Dialog :showDialog.sync="showDialog" title="编辑" @cancal="close" @confirm="edit">
      <div slot>
        <el-form ref="addForm" :model="addForm" label-width="130px" class="addForm" label-position="right" size="small">
          <el-form-item label="手机号:">
            <el-input v-model="addForm.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="addForm.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="生日:">
            <el-input v-model="addForm.bith" placeholder="请输入生日"></el-input>
          </el-form-item>
          <el-form-item label="生日:">
            <el-upload class="avatar-uploader" action="http://localhost:3000/api/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
              <img v-if="addForm.img" :src="addForm.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>
<script type="text/javascript">
import Pagination from "@/components/Pagination/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import { userlist, deluser, reInfo } from "@/api/api";

export default {
  components: { Pagination, Dialog },
  name: "list",
  data() {
    return {
      offset: 1, //当前页
      limit: 10, //每页大小
      total: 0, //总记录数
      hidden: false, //分页是否隐藏
      showDialog: false,
      addForm: {},
      search: {
        user: ""
      },
      list: []
    };
  },
  methods: {
    getData() {
      userlist({
        offset: this.offset,
        limit: this.limit,
        user: this.search.user
      }).then(res => {
        this.list = res.data.list;
        this.total = res.data.total[0].sum;
      });
    },

    //删除
    del(item) {
      deluser({
        id: item.id
      }).then(res => {
        this.getData();
      });
    },

    //模态框-关闭
    close() {
      this.showDialog = false;
      let time = setTimeout(() => {
        this.$data["addForm"] = this.$options.data()["addForm"];
      }, 300);
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.addForm.img = res.filename;
    },

    //编辑
    edit(item = "") {
      if (item != "") {
        this.addForm = JSON.parse(JSON.stringify(item)); //对象拷贝防止重置对象时污染
        this.showDialog = true;
      } else {
        reInfo(this.addForm).then(res => {
          this.close();
          this.getData();
        });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less">
.grid-table {
  .el-form-item {
    display: inline-block;
    max-height: 240px;
    width: ~"calc(24% - 10px)";
    &:first-child {
      .el-input {
        margin-right: 25px;
      }
    }
    &:last-child {
      overflow: hidden;
      white-space: nowrap;
      vertical-align: bottom;
    }
  }
  .el-pagination {
    margin-top: 5px;
    text-align: right;
  }
  .el-cascader--small .el-cascader__label {
    line-height: 40px;
  }
}
.avatar {
  width: 150px;
  height: 150px;
}
</style>
