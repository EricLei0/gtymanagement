<template>
  <div>
    <title-header :routes="routes" class="header-style"></title-header>
    <div class="content-frame">
      <a-card
        style="width:100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        :bordered="false"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <div v-if="noTitleKey === 'singleSearch'">
          <a-row>
            <a-col :span="3">
              <a-select v-model="select" size="large" style="width:100%">
                <a-select-option value="itemname">
                  项目名称
                </a-select-option>
                <a-select-option value="year">
                  年份
                </a-select-option>
                <a-select-option value="commitmentdept">
                  承担部门
                </a-select-option>
                <a-select-option value="datamanger">
                  数据管理员
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
        <div v-else-if="noTitleKey === 'multipleSearch'">
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
      </a-card>
      <a-card style="width: 100%" :bordered="false">
        <div class="table-div">
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            rowKey="bsm"
          >
            <span slot="operation" slot-scope="record">
              <a @click="() => setModifyVisible(true, record)">
                修改
              </a>
              <a-divider type="vertical" />
              <a @click="() => setDeleteVisible(true, record)">删除</a>
              <!-- 修改项目台账弹窗 -->
              <a-modal
                v-model="modalModifyVisible"
                title="修改项目台账"
                width="720px"
              >
                <template slot="footer">
                  <a-button key="back">
                    取消
                  </a-button>
                  <a-button type="primary" key="submit">
                    修改
                  </a-button>
                </template>
                <!-- 修改表单 -->
                <a-form
                  form="formModify"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-form-item label="编号">
                    <span class="ant-form-text">
                      {{ selectedRecord.bsm }}
                    </span>
                  </a-form-item>
                </a-form>
              </a-modal>
              <!-- 修改项目台账弹窗结束 -->
            </span>
          </a-table>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/TitleHeader";
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
import inventory from "@/api/inventory";

Vue.component("vue-draggable-resizable", VueDraggableResizable);
const columns = [
  {
    title: "编号",
    width: 80,
    dataIndex: "bsm",
    className: "column-header",
    key: "id"
    //  fixed: "left"
  },
  {
    title: "项目名称",
    width: 350,
    dataIndex: "itemname",
    key: "itemname",
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.itemname.localeCompare(b.itemname);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "年份",
    dataIndex: "year",
    key: "year",
    className: "column-header",
    width: 100,
    sorter: (a, b) => {
      return a.year.localeCompare(b.year);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "承担部门",
    dataIndex: "commitmentdept",
    key: "commitmentdept",
    className: "column-header",
    width: 250,
    sorter: (a, b) => {
      return a.commitmentdept.localeCompare(b.commitmentdept);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "业主单位",
    dataIndex: "owner",
    key: "owner",
    className: "column-header",
    width: 200,
    sorter: (a, b) => {
      return a.owner.localeCompare(b.owner);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "数据管理员",
    dataIndex: "datamanger",
    key: "datamanger",
    className: "column-header",
    width: 180,
    sorter: (a, b) => {
      return a.datamanger.localeCompare(b.datamanger);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "备注",
    dataIndex: "remarks",
    key: "remarks",
    className: "column-header",
    width: 150
  },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
const draggingMap = {};
columns.forEach(col => {
  draggingMap[col.key] = col.width;
});
const draggingState = Vue.observable(draggingMap);

export default {
  name: "App",
  components: {
    TitleHeader
  },
  created() {
    //  console.log(TitleHeader);
    this.getDataSingle();
  },
  data() {
    this.components = {
      header: {
        cell: (h, props, children) => {
          let thDom = null;
          const { key, ...restProps } = props;
          const col = columns.find(col => {
            const k = col.dataIndex || col.key;
            return k === key;
          });
          if (!col.width) {
            return <th {...restProps}>{children}</th>;
          }
          const onDrag = x => {
            draggingState[key] = 0;
            col.width = Math.max(x, 1);
          };

          const onDragstop = () => {
            draggingState[key] = thDom.getBoundingClientRect().width;
          };
          return (
            <th
              {...restProps}
              v-ant-ref={r => (thDom = r)}
              width={col.width}
              class="resize-table-th"
            >
              {children}
              <vue-draggable-resizable
                key={col.key}
                class="table-draggable-handle"
                w={10}
                x={draggingState[key] || col.width}
                z={1}
                axis="x"
                draggable={true}
                resizable={false}
                onDragging={onDrag}
                onDragstop={onDragstop}
              ></vue-draggable-resizable>
            </th>
          );
        }
      }
    };
    return {
      routes: [
        {
          breadcrumbName: "项目台账"
        },
        {
          breadcrumbName: "项目台账查询"
        }
      ],
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
      key: "tab1",
      noTitleKey: "singleSearch",
      columns,
      select: "itemname",
      keyword: "",
      data: [],
      currentPage: 1,
      //  获取台账的参数对象
      queryParaSingle: {
        keyName: "itemname",
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
          this.queryParaSingle.pageNum = 1;
          this.queryParaSingle.pageSize = pageSize;
          if (this.searchState === "single") {
            this.getDataSingle();
          } else {
            this.getDataMultiple(this.multipleParams);
          }
        },
        onChange: (page, pageSize) => {
          this.pagination.current = page;
          this.queryParaSingle.pageNum = page;
          this.queryParaSingle.pageSize = pageSize;
          if (this.searchState === "single") {
            this.getDataSingle();
          } else {
            this.getDataMultiple(this.multipleParams);
          }
        },
        current: 1,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      },
      paramsList: [
        {
          key: 1,
          pName: "itemname",
          pLabel: "项目名称"
        },
        {
          key: 2,
          pName: "year",
          pLabel: "年份"
        },
        {
          key: 3,
          pName: "commitmentdept",
          pLabel: "承担部门"
        },
        {
          key: 4,
          pName: "datamanger",
          pLabel: "数据管理员"
        }
      ],
      multipleForm: this.$form.createForm(this, { name: "advanced-search" }),
      multipleParams: {},
      searchState: "single",
      expand: false,
      stripe: true,
      modalModifyVisible: false,
      modalDeleteVisible: false,
      selectedRecord: {}
    };
  },
  methods: {
    //  切换标签页
    onTabChange(key, type) {
      //  console.log(key, type);
      this[type] = key;
    },
    //  获取表格数据--一般查询
    async getDataSingle() {
      if (this.keyword === "") {
        var query = {
          page: this.queryParaSingle.pageNum,
          rows: this.queryParaSingle.pageSize
        };
        inventory.search(query).then(response => {
          console.log(response.data.rows);
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      } else {
        query = {
          page: this.queryParaSingle.pageNum,
          rows: this.queryParaSingle.pageSize,
          [this.queryParaSingle.keyName]: this.queryParaSingle.keyValue
        };
        inventory.search(query).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
        /*const { data: res } = await this.$http.post(
          //  "/inventory/search",
          "/inventory/get",
          dataBody,
          {
            params: query,
            headers: { "Content-Type": "application/json" }
          }
        );
        //  返回状态为成功
        if (res.success === true) {
          this.data = res.data.content;
          this.pagination.total = res.data.totalElements;
        }*/
      }
    },
    onSearch() {
      this.queryParaSingle.keyName = this.select;
      this.queryParaSingle.keyValue = this.keyword;
      this.queryParaSingle.pageNum = 1;
      this.searchState = "single";
      this.getDataSingle();
    },
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
        await inventory.search(datas).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      } else {
        datas["page"] = this.queryParaSingle.pageNum;
        datas["rows"] = this.queryParaSingle.pageSize;
        await inventory.search(datas).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      }
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
    },
    setModifyVisible(modalVisible, record) {
      this.modalModifyVisible = modalVisible;
      this.selectedRecord = record;
      console.log(this.selectedRecord);
    },
    setDeleteVisible(modalVisible, record) {
      this.modalDeleteVisible = modalVisible;
      this.selectedRecord = record;
    }
  },
  computed: {
    count() {
      return this.expand ? 5 : 4;
    }
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

.pagination-div {
  margin-top: 24px;
}

.table-div {
  margin-top: -24px;
}

.resize-table-th {
  position: relative;
  .table-draggable-handle {
    height: 100% !important;
    bottom: 0;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
  }
}

.advanced-search-form .ant-form-item {
  display: flex;
}

.advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

/*th.column-header {
  background-color: #D0D1D1 !important;
}*/
</style>
