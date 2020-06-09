<template>
  <div>
    <title-header :routes="routes" class="header-style"></title-header>
    <div class="content-frame1">
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
                <a-select-option value="name">
                  文档名称
                </a-select-option>
                <a-select-option value="city">
                  所属市县
                </a-select-option>
                <a-select-option value="provideCmpy">
                  提供单位
                </a-select-option>
                <a-select-option value="provideDept">
                  提供部门
                </a-select-option>
                <a-select-option value="belongItem">
                  所属项目
                </a-select-option>
                <a-select-option value="type">
                  文档类型
                </a-select-option>
                <a-select-option value="collectPerson">
                  收集人
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
            <a-col :span="3">
              <a-button
                type="primary"
                style="margin-left:40px;height:38px"
                @click="openModalAdd"
                v-if="columnsmodify"
              >
                添加
              </a-button>
            </a-col>
            <a-upload
              :multiple="true"
              action="/api/ducumentData/excel"
              enctype="multipart/form-data"
              :format="['xlsx', 'xls']"
              @change="handleChange"
              v-if="columnsmodify"
            >
              <a-button
                style="margin-left:55px;font-size:18px;height:40px;width:130px"
              >
                <a-icon type="upload" /> Excel导入
              </a-button>
            </a-upload>
            <!--  <a class="a-style" @click="linkDownload('192.168.100.136/ShareDoc')">百度</a>复制代码   -->
            <!-- <a-col :span="5"> -->

            <!--  </a-col> -->
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

        <div v-else-if="noTitleKey === 'uploadCard'" style="height:280px">
          <!--      <h1>上传！</h1> -->
          <!-- <template> -->
          <div style="float:left;margin-left:50px;">
            <span style="fontSize:18px">市： </span>
            <a-select
              mode="tags"
              style="width: 210PX;fontSize:16px"
              placeholder="Tags Mode"
              @change="selectChange1"
              @mouseenter="() => requestSelectData('first')"
            >
              <a-select-option v-for="item in selectdata1" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>

          <div style="float:left;margin-left:50px">
            <span style="fontSize:18px">县： </span>
            <a-select
              mode="tags"
              style="width: 210PX;fontSize:16px"
              placeholder="Tags Mode"
              @change="selectChange2"
              @mouseenter="() => requestSelectData('second')"
            >
              <a-select-option v-for="item in selectdata2" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>

          <div style="float:left;margin-left:50px">
            <span style="fontSize:18px">单位： </span>
            <a-select
              mode="tags"
              style="width: 210PX;fontSize:16px"
              placeholder="Tags Mode"
              @change="selectChange3"
              @mouseenter="() => requestSelectData('third')"
            >
              <!--             <a-select-option v-for="(item,i) in selectdata" :key="item.name+i" >
              {{item.name+i}} -->
              <a-select-option v-for="item in selectdata3" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>

          <div style="float:left;margin-left:50px;">
            <span style="fontSize:18px">收集人： </span>
            <a-select
              mode="tags"
              style="width: 210PX;fontSize:16px"
              placeholder="Tags Mode"
              @change="seleChange_collectperson"
            >
              <!--                 <a-select-option v-for="item in selectdata1" :key="item">
                  {{ item }}
                </a-select-option> -->
            </a-select>
          </div>
          <a-upload
            :multiple="true"
            action="/api/documentData/upload"
            enctype="multipart/form-data"
            :format="['xlsx', 'xls']"
            :data="select_director"
            @change="handleChange"
          >
            <a-button
              style="margin-left:55px;font-size:18px;height:40px;width:130px"
            >
              <a-icon type="upload" /> 选择文件
            </a-button>
          </a-upload>

          <!--   </template> -->
        </div>
      </a-card>
      <a-card style="width: 100%;" :bordered="false">
        <div class="table-div">
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :scroll="{ x: 2550, y: 600 }"
            rowKey="bsm"
          >
            <span slot="operation" slot-scope="record">
              <!--               <a @click="() => downloadFile(record)" style="margin-right: 20px">
                下载
              </a> -->
              <a @click="() => downloadFile(record)" style="margin-right: 20px">
                下载
              </a>

              <a
                @click="() => setModifyVisible(true, record)"
                v-if="columnsmodify"
              >
                <!-- 默认为true（显示），在created函数判断是否普通用户，如果是，则赋值false(隐藏)-->
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
                  <a-button key="back" @click="closemodify">
                    取消
                  </a-button>
                  <a-button type="primary" key="submit" @click="modify">
                    修改
                  </a-button>
                </template>

                <a-form-model
                  :model="formModify"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  :rules="updaterules"
                >
                  <a-form-model-item label="文档名称" prop="name">
                    <a-input v-model="formModify.name" />
                  </a-form-model-item>
                  <a-form-model-item label="市县" prop="city">
                    <a-input v-model="formModify.city" />
                  </a-form-model-item>
                  <a-form-model-item label="所属项目">
                    <a-input v-model="formModify.belongItem" />
                  </a-form-model-item>
                  <!--                   <a-form-model-item label="文件路径" prop="path">
                    <a-input v-model="formModify.path" />
                  </a-form-model-item> -->
                  <a-form-model-item label="提供单位">
                    <a-input v-model="formModify.provideCmpy" />
                  </a-form-model-item>
                  <a-form-model-item label="提供部门">
                    <a-input v-model="formModify.provideDept" />
                  </a-form-model-item>
                  <a-form-model-item label="数据提供人">
                    <a-input v-model="formModify.provider" />
                  </a-form-model-item>
                  <a-form-model-item label="联系方式">
                    <a-input v-model="formModify.phone" />
                  </a-form-model-item>
                  <a-form-model-item label="数据格式">
                    <a-input v-model="formModify.dataFormat" />
                  </a-form-model-item>
                  <a-form-model-item label="收集时间">
                    <a-input v-model="formModify.collectTime" />
                  </a-form-model-item>
                  <a-form-model-item label="收集人">
                    <a-input v-model="formModify.collectPerson" />
                  </a-form-model-item>
                  <a-form-model-item label="有效性">
                    <a-input v-model="formModify.validaty" />
                  </a-form-model-item>
                  <a-form-model-item label="数据类型" prop="type">
                    <a-input v-model="formModify.type" />
                  </a-form-model-item>
                  <a-form-model-item label="项目负责人">
                    <a-input v-model="formModify.director" />
                  </a-form-model-item>
                  <a-form-model-item label="备注">
                    <a-input v-model="formModify.remarks" />
                  </a-form-model-item>
                </a-form-model>
              </a-modal>
              <!-- 修改文档数据弹窗结束 -->

              <!-- 添加文档数据弹窗 -->
              <a-modal
                v-model="modalAddVisible"
                title="新增文档数据"
                width="720px"
              >
                <template slot="footer">
                  <a-button key="back" @click="closeModalAdd">
                    取消
                  </a-button>
                  <a-button
                    type="primary"
                    key="submit"
                    @click="() => AddRecord(formAdd)"
                  >
                    添加
                  </a-button>
                </template>

                <a-form-model
                  :model="formAdd"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  :rules="addrules"
                >
                  <a-form-model-item label="文档名称" prop="name">
                    <a-input v-model="formAdd.name" />
                  </a-form-model-item>
                  <a-form-model-item label="数据类型" prop="city">
                    <a-input v-model="formAdd.type" />
                  </a-form-model-item>
                  <a-form-model-item label="所属市县" prop="type">
                    <a-input v-model="formAdd.city" />
                  </a-form-model-item>
                  <a-form-model-item label="所属项目">
                    <a-input v-model="formAdd.belongItem" />
                  </a-form-model-item>
                  <a-form-model-item label="文件路径" prop="path">
                    <a-input v-model="formAdd.path" />
                  </a-form-model-item>
                  <a-form-model-item label="提供单位">
                    <a-input v-model="formAdd.provideCmpy" />
                  </a-form-model-item>
                  <a-form-model-item label="提供部门">
                    <a-input v-model="formAdd.provideDept" />
                  </a-form-model-item>
                  <a-form-model-item label="数据提供人">
                    <a-input v-model="formAdd.provider" />
                  </a-form-model-item>
                  <a-form-model-item label="联系方式">
                    <a-input v-model="formAdd.phone" />
                  </a-form-model-item>
                  <a-form-model-item label="数据格式">
                    <a-input v-model="formAdd.dataFormat" />
                  </a-form-model-item>
                  <a-form-model-item label="收集时间">
                    <a-input v-model="formAdd.collectTime" />
                  </a-form-model-item>
                  <a-form-model-item label="收集人">
                    <a-input v-model="formAdd.collectPerson" />
                  </a-form-model-item>
                  <a-form-model-item label="有效性">
                    <a-input v-model="formModify.validaty" />
                  </a-form-model-item>
                  <a-form-model-item label="数据类型">
                    <a-input v-model="formModify.type" />
                  </a-form-model-item>
                  <a-form-model-item label="项目负责人">
                    <a-input v-model="formModify.director" />
                  </a-form-model-item>
                  <a-form-model-item label="有效性">
                    <a-input v-model="formAdd.validaty" />
                  </a-form-model-item>
                  <a-form-model-item label="备注">
                    <a-input v-model="formAdd.remarks" />
                  </a-form-model-item>
                </a-form-model>
              </a-modal>
              <!-- 添加文档数据弹窗结束 -->
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
import documentdata from "@/api/documentdata";

Vue.component("vue-draggable-resizable", VueDraggableResizable);
const columns = [
  /*   {
    title: "编号",
    width: 80,
    dataIndex: "bsm",
    className: "column-header",
    key: "id"
    //  fixed: "left"
  }, */
  {
    title: "编号",
    fixed: "left",
    width: 80,
    dataIndex: "bsm",
    key: "bsm", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.bsm.localeCompare(b.bsm);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "数据名称",
    fixed: "left",
    width: 370,
    dataIndex: "name",
    key: "name", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.mname.localeCompare(b.name);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "数据类型",
    width: 130,
    dataIndex: "type",
    key: "type", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.type.localeCompare(b.type);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "市",
    dataIndex: "city",
    key: "city",
    className: "column-header",
    width: 100,
    sorter: (a, b) => {
      return a.city.localeCompare(b.city);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "县",
    dataIndex: "county",
    key: "county",
    className: "column-header",
    width: 100,
    sorter: (a, b) => {
      return a.county.localeCompare(b.county);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "提供单位",
    dataIndex: "provideCmpy",
    key: "commitmentdept",
    className: "column-header",
    width: 200,
    sorter: (a, b) => {
      return a.provideCmpy.localeCompare(b.provideCmpy);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "提供部门",
    width: 150,
    dataIndex: "provideDept",
    //key: "provideDept", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.provideDept.localeCompare(b.provideDept);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "数据格式",
    width: 100,
    dataIndex: "dataFormat",
    //key: "provideDept", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.dataFormat.localeCompare(b.dataFormat);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "提供人",
    width: 150,
    dataIndex: "provider",
    key: "provider", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.provider.localeCompare(b.provider);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "联系方式",
    width: 150,
    dataIndex: "phone",
    key: "phone", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.phone.localeCompare(b.phone);
    },
    sortDirections: ["descend", "ascend"]
  },

  {
    title: "所属项目",
    dataIndex: "belongItem",
    key: "owner",
    className: "column-header",
    width: 250,
    sorter: (a, b) => {
      return a.belongItem.localeCompare(b.belongItem);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "收集时间",
    dataIndex: "collectTime",
    key: "collectTime",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.collectTime.localeCompare(b.collectTime);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "收集人",
    dataIndex: "collectPerson",
    key: "collectPerson",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.collectPerson.localeCompare(b.collectPerson);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "有效性",
    dataIndex: "validaty",
    key: "validaty",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.validaty.localeCompare(b.validaty);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "备注",
    dataIndex: "remarks",
    key: "remarks",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.remarks.localeCompare(b.remarks);
    },
    sortDirections: ["descend", "ascend"]
  },
  /* 
  {
    title: "文档路径",
    dataIndex: "path",
    key: "path",
    className: "column-header",
    width: 500
  }, */
  {
    title: "操作",
    fixed: "right",
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
    /*     if (this.GLOBAL.username === "user") {
      this.columnsmodify = false;
    } */
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
      addrules: {
        name: [{ required: true, trigger: "blur" }],
        city: [{ required: true, trigger: "blur" }],
        path: [{ required: true, trigger: "blur" }],
        type: [{ required: true, trigger: "blur" }]
      },
      updaterules: {
        name: [{ required: true, trigger: "blur" }],
        city: [{ required: true, trigger: "blur" }],
        path: [{ required: true, trigger: "blur" }],
        type: [{ required: true, trigger: "blur" }]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      routes: [
        {
          breadcrumbName: "数据查询"
        },
        {
          breadcrumbName: "文档数据查询"
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
        },
        {
          key: "uploadCard",
          tab: "上传文件至服务器"
        }
      ],
      viewVisible: false, // 文件预览弹框隐藏
      key: "tab1",
      noTitleKey: "multipleSearch",
      columns,
      select: "name",
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
          pName: "name",
          pLabel: "文档名称"
        },
        {
          key: 2,
          pName: "city",
          pLabel: "市"
        },
        {
          key: 3,
          pName: "county",
          pLabel: "县"
        },
        {
          key: 4,
          pName: "belongItem",
          pLabel: "所属项目"
        },
        {
          key: 5,
          pName: "provideCmpy",
          pLabel: "提供单位"
        },
        {
          key: 6,
          pName: "provideDept",
          pLabel: "提供部门"
        }
      ],
      multipleForm: this.$form.createForm(this, { name: "advanced-search" }),
      multipleParams: {},
      searchState: "single",
      expand: false,
      stripe: true,
      modalAddVisible: false,
      modalModifyVisible: false,
      modalDeleteVisible: false,
      selectedRecord: {},
      columnsmodify: true,
      selectdata1: {
        //存储选择器后台返回数据
      },
      selectdata2: {},
      selectdata3: {},
      selectedform: {
        //获取各层级目录的表单
        path: "",
        first: "",
        second: "",
        third: "",
        type: ""
      },
      dowload: {},
      formAdd: {
        name: "",
        type: "",
        city: "",
        provideCmpy: "",
        provideDept: "",
        provider: "",
        phone: "",
        dataFormat: "",
        collectTime: "",
        collectPerson: "",
        path: "",
        belongItem: "",
        validaty: "",
        remarks: ""
      },
      select_director: {
        //上传文件时发送给后台的表单
        first: "",
        second: "",
        third: "",
        collectPerson: "",
        collectTime: ""
      },
      formModify: {
        itemname: "123"
      }
    };
  },

  methods: {
    closemodify() {
      this.modalModifyVisible = false;
    },
    requestSelectData(type) {
      this.selectedform.type = type;
      if (type === "first") {
        documentdata.searchdirectory(this.selectedform).then(response => {
          if (response.status === 200) {
            this.selectdata1 = response.data;
            /*             this.openNotification(
              ["success"],
              "获取目录成功！",
              "Record added successfully！"
            ); */

            this.refreshColumns();
          } else {
            // this.openNotification(["error"],"添加数据失败！","Add record failed！");
          }
        });
      }
      if (
        type === "second" &&
        this.select_director.first != null &&
        this.select_director.first != ""
      ) {
        //this.selectedform.path = '\\'+this.select_director.first;
        this.selectedform.first = this.select_director.first;
        documentdata.searchdirectory(this.selectedform).then(response => {
          if (response.status === 200) {
            this.selectdata2 = response.data;
            /*             this.openNotification(
              ["success"],
              "获取目录成功！",
              "Record added successfully！"
            ); */

            this.refreshColumns();
          } else {
            //this.openNotification(["error"],"添加数据失败！","Add record failed！");
          }
        });
      }
      if (
        type === "third" &&
        this.select_director.first != null &&
        this.select_director.first != "" &&
        this.select_director.second != null &&
        this.select_director.second != ""
      ) {
        this.selectedform.first = this.select_director.first;
        this.selectedform.second = this.select_director.second;
        //this.selectedform.path = '\\'+this.select_director+'\\'+this.select_director.second+'\\'+this.select_director

        documentdata.searchdirectory(this.selectedform).then(response => {
          if (response.status === 200) {
            this.selectdata3 = response.data;
            /*             this.openNotification(
              ["success"],
              "获取目录成功！",
              "Record added successfully！"
            ); */

            this.refreshColumns();
          } else {
            //this.openNotification(["error"],"添加数据失败！","Add record failed！");
          }
        });
      }
    },
    seleChange_collectperson(selectvalue) {
      console.log("---collectPerson---" + `selected ${selectvalue}`);
      this.select_director.collectPerson = `${selectvalue}`;
    },

    selectChange1(selectvalue) {
      //一级目录的控件改变事件
      console.log(`selected ${selectvalue}`);
      this.select_director.first = `${selectvalue}`;
    },

    selectChange2(selectvalue) {
      console.log(`selected ${selectvalue}`);
      this.select_director.second = `${selectvalue}`;
    },

    selectChange3(selectvalue) {
      console.log(`selected ${selectvalue}`);
      this.select_director.third = `${selectvalue}`;

      console.log(
        "select------------" +
          this.select_director.first +
          this.select_director.second +
          this.select_director.third
      );
    },

    closeModalAdd() {
      this.modalAddVisible = false;
    },
    openModalAdd() {
      this.modalAddVisible = true;
    },
    AddRecord(form) {
      documentdata.add(form).then(response => {
        if (response.status === 200) {
          this.openNotification(
            ["success"],
            "添加数据成功！",
            "Record added successfully！"
          );

          this.refreshColumns();
        } else {
          this.openNotification(
            ["error"],
            "添加数据失败！",
            "Add record failed！"
          );
        }
      });
      this.modalAddVisible = false;
    },
    linkDownload(url) {
      // 打开页面，此处最好使用提示页面
      let newLink = window.open("");
      this.$newAxios
        .get(url)
        .then(function(response) {
          console.log(response);
          newLink.location.href = url;
        })
        .catch(function(error) {
          console.log(error);
        });
      window.open(url, "_blank");
    },
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
      if (file.status == "done") {
        this.openNotification(
          "success",
          "文件上传成功！",
          "Data import successful"
        );
        this.refreshColumns();
      }
      if (file.status == "error") {
        this.openNotification("error", "文件上传失败！", "Data import failed");
      }
    },

    openNotification(type, chia, engli) {
      this.$notification[type]({
        style: {
          fontSize: 20
        },
        message: engli,
        placement: "bottomRight",
        description: chia
      });
    },
    upload_openNotification() {
      this.$notification.open({
        message: "warm prompt",
        description:
          "上传文件前需要先选择/填写市、县、等信息，详细命名文件名！上传成功将自动生成数据记录至数据库！",
        style: {
          width: "600px",
          marginLeft: `${335 - 600}px`
        }
      });
    },
    testplayfile() {
      this.openNotification(
        "warning",
        "下载功能正在开发调试！",
        "The download feature is being developed and debugged"
      );
    },

    playfile(record) {
      console.log(record);
      /*       var url = "http:"+record;
      window.open(url,'_blank'); */
      window.open(record.path, "_blank");
    },
    //页面跳转，进行文件浏览
    downloadFile(record) {
      //  window.location.href = "www.baidu.com";
      let url = this.$router.resolve({
        path: record.path
      });

      console.log(url);

      // window.open("www.baidu.com", "_blank");

      /*     const { href } = this.$router.resolve({
        path: "www.baidu.com"
      });
 */
      // window.open("http://www.baidu.com", "_blank");
      this.dowload = record;
      console.log(record.path);
      //window.location.href=this.dowload.path;
      //window.URL.createObjectURL(record.path);
      console.log(url);
      //window.open(url,"_blank");

      let param = new URLSearchParams();

      // var  result = record.path+"\\"+record.name+"."+record.dataFormat
      //param.append('path',result);

      param.append("path", record.path);
      param.append("city", record.city);
      param.append("county", record.county);
      param.append("prodecmpy", record.provideCmpy);
      param.append("name", record.name);
      param.append("format", record.dataFormat);
      param.append("providept", record.provideDept);
      /*       if (record.provideDept != null && record.provideDept != "") {
        alert("提供部门为空");
        param.append("providept", "0");
      } else {
        param.append("providept", record.provideDept);
      } */
      var pathstr = record.path;
      var pathstrsize = pathstr.size;
      //var partten= '///';

      var a = pathstr.lastIndexOf("\\");
      var resultstr = pathstr.substring(a + 1, pathstrsize);
      console.log("---resultstr---" + resultstr);

      console.log();
      // 加入到指定路径
      // this.$router.push({path: val})
      this.btnSendTem = true;
      this.loading = true;
      this.loadingText = "正在下载";
      this.$http
        .post(
          "/document/download", //请求的url
          param,
          {
            responseType: "blob" //服务器返回的数据类型
          }
        )
        .then(res => {
          //此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
          //检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
          //另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          const content = res.data;
          const blob = new Blob([content]); //构造一个blob对象来处理数据

          // String s =record.path.indexOf("/");

          //  const fileName = "南昆铁路增建二线信息管理系统汇报20200327.pptx";
          const fileName = record.name + "." + record.dataFormat;

          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持  download属性
          //IE10以上支持blob但是依然不支持download
          if ("download" in document.createElement("a")) {
            //支持a标签download的浏览器
            const link = document.createElement("a"); //创建a标签
            link.download = fileName; //a标签添加属性
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click(); //执行下载
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link); //释放标签
          } else {
            //其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(err => {
          console.log(err);
        });

      /*       this.$http({
        url:'/document/download',
        method:'post',
        responseType:'blob',
        params:{
          filename:record.path
        },
        data:{}
        }).then((res)=>{
          this.loading=false
          console.log(res)
          const content = res.data
          const blob= new Blob([content])
          const fileName = '文档.doc'
          if('download' in document.createElement('a')){
            const link = document.createElement('a')
            link.dowload= fileName
            link.style.display='none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href)
            document.body.removeChild(link)
          }else{
            navigator.msSaveBlob(blob,fileName)
          }
          this.btnSendTem = false
        }).catch((error) =>{
          console.log(error)
          this.loading = false
          this.btnSendTem = false
        }
        ) */
    },

    //  切换标签页
    onTabChange(key, type) {
      if (key === "uploadCard") {
        //alert("upload");
        //this.openNotification("success",);
        this.upload_openNotification();
      }
      //  console.log(key, type);
      this[type] = key;
    },
    //动态刷新表格数据，在添加记录和导入后
    refreshColumns() {
      var query = {
        page: this.queryParaSingle.pageNum,
        rows: this.queryParaSingle.pageSize
      };
      documentdata.search(query).then(response => {
        console.log(response.data.rows);
        this.data = response.data.rows;
        this.pagination.total = response.data.total;
      });
    },
    //  获取表格数据--一般查询
    async getDataSingle() {
      if (this.keyword === "") {
        var query = {
          page: this.queryParaSingle.pageNum,
          rows: this.queryParaSingle.pageSize
        };
        documentdata.search(query).then(response => {
          console.log(response.data.rows);
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
          this.selectdata = response.data.rows;
          console.log("selectdata-----------" + this.selectdata);
        });
      } else {
        query = {
          page: this.queryParaSingle.pageNum,
          rows: this.queryParaSingle.pageSize,
          [this.queryParaSingle.keyName]: this.queryParaSingle.keyValue
        };
        documentdata.search(query).then(response => {
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
    modify() {
      this.modalModifyVisible = false;
      //alert("进入修改函数")
      console.log();
      /*       var modifyquery = {
        bsm: this.formModify.bsm,
        itemname: this.formModify.itemname,
        year: this.formModify.year,
        type: this.formModify.type,
        commitmentdept: this.formModify.commitmentdept,
        owner: this.formModify.owner,
        datamanger: this.formModify.datamanger,
        director: this.formModify.director,
        remark: this.formModify.remark
      }; */
      documentdata
        .modify(
          this.formModify.bsm,
          this.formModify.name,
          this.formModify.city,
          this.formModify.type,
          this.formModify.provideCmpy,
          this.formModify.provideDept,
          this.formModify.provider,
          this.formModify.phone,
          this.formModify.dataFormat,
          this.formModify.collectTime,
          this.formModify.collectPerson,
          this.formModify.path,
          this.formModify.belongItem,
          this.formModify.validaty,
          this.formModify.remark
        )
        .then(response => {
          //this.status = response.status;
          if (response.status === 200) {
            this.openNotification(
              "success",
              "更新数据成功！",
              "Update data successfully!"
            );
            this.refreshColumns();
          } else {
            this.openNotification(
              "error",
              "更新数据失败！",
              "Update data failed"
            );
          }
        });
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
        await documentdata.search(datas).then(response => {
          this.data = response.data.rows;
          this.pagination.total = response.data.total;
        });
      } else {
        datas["page"] = this.queryParaSingle.pageNum;
        datas["rows"] = this.queryParaSingle.pageSize;
        await documentdata.search(datas).then(response => {
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
      this.formModify = record;
    },
    setDeleteVisible(modalVisible, record) {
      this.modalDeleteVisible = modalVisible;
      this.selectedRecord = record;
      this.openNotification(
        "warning",
        "暂不对外开放删除数据功能！",
        "The delete data function is not available to the public"
      );
    }
    /*     openNotification() {
      this.$notification.open({
        message: "update success",
        description: "this request is success",
        icon: <a-icon type="smile" style="color: #108ee9" />
      });
    } */
  },
  computed: {
    count() {
      return this.expand ? 7 : 4; //修改组合查询表单控件数
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

.content-frame1 {
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
