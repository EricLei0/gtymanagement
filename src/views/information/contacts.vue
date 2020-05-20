<template>
  <div>
    <title-header :routes="routes" class="header-style"></title-header>
    <div class="content-frame">
      <a-card style="width: 100%" :bordered="false">
        <div class="search-box">
          <a-row>
            <a-col :span="3">
              <a-select v-model="select" size="large" style="width:100%">
                <a-select-option value="name">
                  姓名
                </a-select-option>
                <a-select-option value="department">
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
          </a-row>
        </div>
        <div class="table-div">
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            rowKey="id"
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
    dataIndex: "id",
    className: "column-header",
    key: "id"
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
    dataIndex: "department",
    key: "department",
    className: "column-header",
    sorter: (a, b) => {
      return a.dept.localeCompare(b.dept);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "职务",
    width: 200,
    dataIndex: "title",
    key: "title",
    className: "column-header",
    sorter: (a, b) => {
      return a.title.localeCompare(b.title);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "手机",
    width: 250,
    dataIndex: "mobile",
    key: "mobile",
    className: "column-header"
  },
  {
    title: "电话",
    width: 200,
    dataIndex: "work",
    key: "work",
    className: "column-header"
  },
  {
    title: "办公室",
    dataIndex: "office",
    key: "office",
    className: "column-header"
  }
];

export default {
  components: {
    TitleHeader
  },
  data() {
    return {
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
    async getDataTable() {
      if (this.keyword === "") {
        var query = {
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize
        };
        await contacts.search(query, {}).then(response => {
          this.data = response.data.data.content;
          this.pagination.total = response.data.data.totalElements;
        });
      } else {
        var dataBody = {
          [this.queryParams.keyName]: this.queryParams.keyValue
        };
        query = {
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize
        };
        await contacts.search(query, dataBody).then(response => {
          this.data = response.data.data.content;
          this.pagination.total = response.data.data.totalElements;
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
  },
  updated() {
    if (this.stripe) {
      this.renderStripe();
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
