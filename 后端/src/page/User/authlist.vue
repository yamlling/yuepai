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
        <el-table-column prop="payAPPName" label="真实名称" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.nick}}
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
            <el-button type="primary" @click="authuser(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-row>
  </div>
</template>
<script type="text/javascript">
import Pagination from "@/components/Pagination/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import { userliststate, userstate } from "@/api/api";

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
      userliststate({
        offset: this.offset,
        limit: this.limit,
        user: this.search.user
      }).then(res => {
        this.list = res.data.list;
        this.total = res.data.total[0].sum;
      });
    },

    //审核
    authuser(item) {
      userstate({
        id: item.id,
        state: 1
      }).then(res => {
        this.getData();
      });
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
