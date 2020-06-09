<template>
  <div>
    <title-header :routes="routes" class="header-style"></title-header>
    <div class="content-frame">
      <a-card
        style="width: 100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        :bordered="false"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <div v-if="noTitleKey === 'singleSearch'" class="search-box">
          <a-row>
            <a-col :span="3">
              <a-select v-model="select" size="large" style="width:100%">
                <a-select-option value="name">
                  姓名
                </a-select-option>
                <a-select-option value="dept">
                  部门
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="15">
              <a-input-search
                placeholder="请输入内容"
                enter-button
                @search="onSearch"
                size="large"
                v-model="keyword"
              />
            </a-col>
            <a-col :span="6"> </a-col>
            <a-upload
              :multiple="true"
              action="/api/addressBook/excel"
              enctype="multipart/form-data"
              :format="['xlsx', 'xls']"
              @change="handleChange"
              v-if="columnsmodify"
            >
              <a-button
                style="margin-left:230px;font-size:18px;height:40px;width:130px"
              >
                <a-icon type="upload" /> Excel导入
              </a-button>
            </a-upload>
          </a-row>
        </div>
        <div v-if="noTitleKey === 'multipleSearch'">
          <a-form
            class="advanced-search-form"
            :form="multipleForm"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            @submit="handleAdvanceSearch"
          >
            <a-row :gutter="24">
              <a-col
                v-for="item in paramsList"
                :key="item.key"
                :span="8"
                :style="{ display: item.key < count ? 'block' : 'none' }"
              >
                <a-form-item :label="`${item.pLabel}`">
                  <a-input
                    v-decorator="[`${item.pName}`]"
                    placeholder="请输入关键字"
                    style="width: 100%"
                    size="large"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24" :style="{ textAlign: 'right' }">
                <a-button type="primary" html-type="submit" size="large">
                  <a-icon type="search" />查 询
                </a-button>
                <a-button
                  :style="{ marginLeft: '24px' }"
                  @click="handleReset"
                  size="large"
                >
                  <a-icon type="setting" />重 置
                </a-button>
                <a
                  :style="{ marginLeft: '24px', fontSize: '12px' }"
                  @click="toggle"
                >
                  展开/折叠 <a-icon :type="expand ? 'up' : 'down'" />
                </a>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-div">
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            rowKey="bsm"
          />
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/TitleHeader";
import contacts from "@/api/contacts";

const columns = [
  {
    title: "编号",
    width: 120,
    dataIndex: "bsm",
    className: "column-header",
    key: "bsm"
  },
  {
    title: "姓名",
    width: 200,
    dataIndex: "name",
    key: "name",
    className: "column-header",
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "部门",
    width: 300,
    dataIndex: "dept",
    key: "dept",
    className: "column-header",
    sorter: (a, b) => {
      return a.dept.localeCompare(b.dept);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "职务",
    width: 200,
    dataIndex: "duty",
    key: "duty",
    className: "column-header",
    sorter: (a, b) => {
      return a.duty.localeCompare(b.duty);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "手机",
    width: 250,
    dataIndex: "mobilephone",
    key: "mobilephone",
    className: "column-header"
  },
  {
    title: "电话",
    width: 200,
    dataIndex: "telephone",
    key: "telephone",
    className: "column-header"
  },
  {
    title: "办公室",
    dataIndex: "office",
    key: "office",
    className: "column-header"
  }
];

/* const headers = {
  
} */

export default {
  components: {
    TitleHeader
  },

  data() {
    return {
      //  组合查询表单对象
      queryParaSingle: {
        keyName: "itemname",
        keyValue: "",
        pageNum: 1,
        pageSize: 10
      },
      expand: false,
      paramsList: [
        {
          key: 1,
          pName: "name",
          pLabel: "姓名"
        },
        {
          key: 2,
          pName: "dept",
          pLabel: "部门"
        },
        {
          key: 3,
          pName: "duty",
          pLabel: "职务"
        }
      ],
      multipleForm: this.$form.createForm(this, { name: "advanced-search" }),
      noTitleKey: "multipleSearch",
      tabListNoTitle: [
        {
          key: "singleSearch",
          tab: "一般查询"
        },
        {
          key: "multipleSearch",
          tab: "组合查询"
        }
      ],
      columnsmodify: true,
      routes: [
        {
          breadcrumbName: "信息查询"
        },
        {
          breadcrumbName: "通讯录查询"
        }
      ],
      data: [],
      select: "name",
      keyword: "",
      columns,
      queryParams: {
        keyName: "name",
        keyValue: "",
        pageNum: 1,
        pageSize: 10
      },
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = 1;
          this.queryParams.pageNum = 1;
          this.queryParams.pageSize = pageSize;
          this.getDataTable();
        },
        onChange: (page, pageSize) => {
          this.pagination.current = page;
          this.queryParams.pageNum = page;
          this.queryParams.pageSize = pageSize;
          this.getDataTable();
        },
        current: 1,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      },
      stripe: true
    };
  },
  methods: {
    //  折叠与展开
    toggle() {
      this.expand = !this.expand;
    },
    handleReset() {
      this.multipleForm.resetFields();
    },

    //  组合查询
    handleAdvanceSearch(e) {
      e.preventDefault();
      var values = this.multipleForm.getFieldsValue();
      var params = {};
      for (var i in values) {
        if (values[i] !== undefined && values[i] !== "") {
          params[i] = values[i];
        }
      }
      this.multipleParams = params;
      this.queryParaSingle.pageNum = 1;
      this.searchState = "multiple";
      this.getDataMultiple(params);
    },
    //  获取组合查询结果
    async getDataMultiple(datas) {
      console.log(datas);
      if (JSON.stringify(datas) == "{}") {
        datas = {
          page: this.queryParaSingle.pageNum,
          rows: this.queryParaSingle.pageSize
        };
        await contacts.search(datas).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      } else {
        datas["page"] = this.queryParaSingle.pageNum;
        datas["rows"] = this.queryParaSingle.pageSize;
        await contacts.search(datas).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      }
    },
    //  切换标签页
    onTabChange(key, type) {
      //  console.log(key, type);
      this[type] = key;
    },
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    async getDataTable() {
      if (this.keyword === "") {
        var query = {
          page: this.queryParams.pageNum,
          rows: this.queryParams.pageSize
        };
        await contacts.search(query).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      } else {
        query = {
          page: this.queryParams.pageNum,
          rows: this.queryParams.pageSize,
          [this.queryParams.keyName]: this.queryParams.keyValue
        };
        await contacts.search(query).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      }
    },
    onSearch() {
      this.queryParams.keyName = this.select;
      this.queryParams.keyValue = this.keyword;
      this.queryParams.pageNum = 1;
      this.getDataTable();
    },
    //  设置斑马纹
    renderStripe() {
      const table = document.getElementsByClassName("ant-table-row");
      if (table.length > 0) {
        const rowList = [...table];
        rowList.forEach(row => {
          const index = rowList.indexOf(row);
          if (index % 2 !== 0) {
            row.style.backgroundColor = "#F2F4F5";
          } else {
            row.style.backgroundColor = "#ffffff";
          }
        });
      }
    }
  },
  created() {
    this.getDataTable();
    /*     if (this.GLOBAL.username === "user") {
      this.columnsmodify = false;
    } */
  },
  updated() {
    if (this.stripe) {
      this.renderStripe();
    }
  },
  computed: {
    count() {
      return this.expand ? 7 : 4; //修改组合查询表单控件数
    }
  }
};
</script>

<style lang="less">
.header-style {
  background: #fff;
}

.content-frame {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

.table-div {
  margin-top: 24px;
}
</style>
