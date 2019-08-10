<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <my-test> -->
    <!-- <div slot="content" slot-scope="scope">content 获取组件内部数据:{{scope.a}}</div> -->
    <!-- <template v-slot:content="scope">content 获取组件内部数据:{{scope.a}}</template> -->
    <!-- <div slot="footer">footer</div> -->
    <!-- </my-test> -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <el-table :data="articles">
        <el-table-column prop="id" label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width:120px;height:80px">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align:center;margin-top:30px;">
        <el-pagination
          background
          layout="prev,pager,next,total"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import MyTest from '@/components/my-test'
// import MyBread from '@/components/my-bread'
export default {
  // components:{MyTest,MyBread},

  //   created () {
  //     this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
  //       console.log(res.data)
  //     })
  //   }
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: 2,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // channelOptions: [],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  // watch:{
  //   'reqParams.channel_id':function(newVal,oldVal){
  //     if(newVal===''){
  //       this.reqParams.channel_id=null
  //     }
  //   }
  // },
  created () {
    // this.getChannelOptions();
    this.getArticles()
  },
  methods: {
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`article/${id}`)
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // async getChannelOptions() {
    //   const {
    //     data: { data }
    //   } = await this.$http.get("channels");
    //   this.channelOptions = data.channels;
    // },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
