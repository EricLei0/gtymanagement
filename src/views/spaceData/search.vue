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
                <a-select-option value="dataName">
                  数据名称
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
                <a-select-option value="dataType">
                  数据类型
                </a-select-option>
                <a-select-option value="dataFormat">
                  数据格式
                </a-select-option>
                <a-select-option value="gis">
                  坐标系统
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
                @click="openAddModal"
                v-if="columnsmodify"
              >
                添加
              </a-button>
            </a-col>
            <a-upload
              :multiple="true"
              action="/api/spaceData/excel"
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
            :scroll="{ x: 3000, y: 600 }"
            rowKey="bsm"
          >
            <span slot="operation" slot-scope="record">
              <a
                @click="() => setModifyVisible(true, record)"
                v-if="columnsmodify"
              >
                <!-- 默认为true（显示），在created函数判断是否普通用户，如果是，则赋值false(隐藏)-->
                > 修改
              </a>
              <a-divider type="vertical" />
              <a @click="() => setDeleteVisible(true, record)">删除</a>

              <!-- 新增空间数据弹窗 -->
              <a-modal
                v-model="modalAddVisible"
                title="新增空间数据"
                width="720px"
                mask="false"
              >
                <template slot="footer">
                  <a-button key="back" @click="closeAddModal">
                    取消
                  </a-button>
                  <a-button
                    type="primary"
                    key="submit"
                    @click="() => addSpacedataRecord(formAdd)"
                  >
                    新增
                  </a-button>
                </template>

                <a-form-model
                  :model="formAdd"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  :rules="addrules"
                >
                  <a-form-model-item label="数据名称" prop="dataName">
                    <a-input v-model="formAdd.dataName" />
                  </a-form-model-item>
                  <a-form-model-item label="要素代码">
                    <a-input v-model="formAdd.ysdm" />
                  </a-form-model-item>
                  <a-form-model-item label="数据类型" prop="dataType">
                    <a-input v-model="formAdd.dataType" />
                  </a-form-model-item>
                  <a-form-model-item label="所属市县" prop="city">
                    <a-input v-model="formAdd.city" />
                  </a-form-model-item>
                  <a-form-model-item label="提供单位">
                    <a-input v-model="formAdd.provideCmpy" />
                  </a-form-model-item>
                  <a-form-model-item label="提供部门">
                    <a-input v-model="formAdd.provideDept" />
                  </a-form-model-item>
                  <a-form-model-item label="提供人">
                    <a-input v-model="formAdd.provider" />
                  </a-form-model-item>
                  <a-form-model-item label="联系方式">
                    <a-input v-model="formAdd.phone" />
                  </a-form-model-item>
                  <a-form-model-item label="数据格式">
                    <a-input v-model="formAdd.dataFormat" />
                  </a-form-model-item>
                  <a-form-model-item label="坐标系统" prop="gis">
                    <a-input v-model="formAdd.gis" />
                  </a-form-model-item>
                  <a-form-model-item label="收集时间">
                    <a-input v-model="formAdd.collectTime" />
                  </a-form-model-item>
                  <a-form-model-item label="收集人">
                    <a-input v-model="formAdd.collectPer" />
                  </a-form-model-item>
                  <a-form-model-item label="数据管理员">
                    <a-input v-model="formAdd.dataManager" />
                  </a-form-model-item>
                  <a-form-model-item label="所属项目">
                    <a-input v-model="formAdd.belongItem" />
                  </a-form-model-item>
                  <a-form-model-item label="备注">
                    <a-input v-model="formAdd.remark" />
                  </a-form-model-item>
                </a-form-model>
              </a-modal>
              <!-- 新增空间数据弹窗结束 -->

              <!-- 修改空间数据弹窗 -->
              <a-modal
                v-model="modalModifyVisible"
                title="修改项目台账"
                width="720px"
              >
                <template slot="footer">
                  <a-button key="back" @click="closeModifyModal">
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
                  <a-form-model-item label="数据名称" prop="dataName">
                    <a-input v-model="formModify.dataName" />
                  </a-form-model-item>
                  <a-form-model-item label="要素代码">
                    <a-input v-model="formModify.ysdm" />
                  </a-form-model-item>
                  <a-form-model-item label="数据类型" prop="dataType">
                    <a-input v-model="formModify.dataType" />
                  </a-form-model-item>
                  <a-form-model-item label="所属市县" prop="city">
                    <a-input v-model="formModify.city" />
                  </a-form-model-item>
                  <a-form-model-item label="提供单位">
                    <a-input v-model="formModify.provideCmpy" />
                  </a-form-model-item>
                  <a-form-model-item label="提供部门">
                    <a-input v-model="formModify.provideDept" />
                  </a-form-model-item>
                  <a-form-model-item label="提供人">
                    <a-input v-model="formModify.provideCmpy" />
                  </a-form-model-item>
                  <a-form-model-item label="联系方式">
                    <a-input v-model="formModify.phone" />
                  </a-form-model-item>
                  <a-form-model-item label="数据格式">
                    <a-input v-model="formModify.dataFormat" />
                  </a-form-model-item>
                  <a-form-model-item label="坐标系统" prop="gis">
                    <a-input v-model="formModify.gis" />
                  </a-form-model-item>
                  <a-form-model-item label="收集时间">
                    <a-input v-model="formModify.collectTime" />
                  </a-form-model-item>
                  <a-form-model-item label="收集人">
                    <a-input v-model="formModify.collectPer" />
                  </a-form-model-item>
                  <a-form-model-item label="数据管理员">
                    <a-input v-model="formModify.dataManager" />
                  </a-form-model-item>
                  <a-form-model-item label="所属项目">
                    <a-input v-model="formModify.belongItem" />
                  </a-form-model-item>
                  <a-form-model-item label="备注">
                    <a-input v-model="formModify.remark" />
                  </a-form-model-item>
                </a-form-model>
              </a-modal>
              <!-- 修改空间数据弹窗结束 -->
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
import documentdata from "@/api/documentdata";
import spacedata from "@/api/spacedata";

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
    title: "数据名称",
    fixed: "left",
    width: 350,
    dataIndex: "dataName",
    key: "dataName", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.dataName.localeCompare(b.dataName);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "数据类型",
    width: 200,
    dataIndex: "dataType",
    key: "dataType", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.dataType.localeCompare(b.dataType);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "市县",
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
    width: 200,
    dataIndex: "provideDept",
    key: "provideDept", //对应数据库的返回键
    className: "column-header",
    //  fixed: "left",
    sorter: (a, b) => {
      return a.provideDept.localeCompare(b.provideDept);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "提供人",
    dataIndex: "provider",
    key: "provider",
    className: "column-header",
    width: 200,
    sorter: (a, b) => {
      return a.provider.localeCompare(b.provider);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    key: "phone",
    className: "column-header",
    width: 200,
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
    title: "数据格式",
    dataIndex: "dataFormat",
    key: "owner",
    className: "column-header",
    width: 250,
    sorter: (a, b) => {
      return a.dataFormat.localeCompare(b.dataFormat);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "坐标系统",
    dataIndex: "gis",
    key: "gis",
    className: "column-header",
    width: 250,
    sorter: (a, b) => {
      return a.gis.localeCompare(b.gis);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "收集时间",
    dataIndex: "collectTime",
    key: "datamanger",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.collectTime.localeCompare(b.collectTime);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "收集人",
    dataIndex: "collectPer",
    key: "collectPer",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.collectPer.localeCompare(b.collectPer);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "数据管理员",
    dataIndex: "dataManager",
    key: "dataManager",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.dataManager.localeCompare(b.dataManager);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    className: "column-header",
    width: 130,
    sorter: (a, b) => {
      return a.remark.localeCompare(b.remark);
    },
    sortDirections: ["descend", "ascend"]
  },
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
      columnsmodify: true,
      addrules: {
        dataName: [{ required: true, trigger: "blur" }],
        dataType: [{ required: true, trigger: "blur" }],
        city: [{ required: true, trigger: "blur" }],
        gis: [{ required: true, trigger: "blur" }]
      },

      updaterules: {
        dataName: [{ required: true, trigger: "blur" }],
        dataType: [{ required: true, trigger: "blur" }],
        city: [{ required: true, trigger: "blur" }],
        gis: [{ required: true, trigger: "blur" }]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      routes: [
        {
          breadcrumbName: "数据查询"
        },
        {
          breadcrumbName: "空间数据查询"
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
      noTitleKey: "multipleSearch",
      columns,
      select: "dataName",
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
          pName: "dataName",
          pLabel: "数据名称"
        },
        {
          key: 2,
          pName: "city",
          pLabel: "市县"
        },
        {
          key: 3,
          pName: "belongItem",
          pLabel: "所属项目"
        },
        {
          key: 4,
          pName: "provideCmpy",
          pLabel: "提供单位"
        },
        {
          key: 5,
          pName: "provideDept",
          pLabel: "提供部门"
        },
        {
          key: 6,
          pName: "dataType",
          pLabel: "数据类型"
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
      formAdd: {
        ysdm: "",
        dataName: "",
        dataType: "",
        city: "",
        provideCmpy: "",
        provideDept: "",
        provider: "",
        phone: "",
        dataFormat: "",
        gis: "",
        collectTime: "",
        collectPer: "",
        dataManager: "",
        belongItem: "",
        remark: ""
      },
      formModify: {
        itemname: "123"
      }
    };
  },
  methods: {
    addSpacedataRecord(addform) {
      spacedata.add(addform).then(response => {
        if (response.status === 200) {
          this.openNotification(
            ["success"],
            "添加数据成功！",
            "Record added successfully！"
          );
          this.modalAddVisible = false;
          this.refreshColumns();
        } else {
          this.openNotification(
            ["error"],
            "添加数据失败！",
            "Add record failed！"
          );
        }
      });
    },
    openAddModal() {
      this.modalAddVisible = true;
    },
    //页面跳转，进行文件浏览
    showFile() {
      //  window.location.href = "www.baidu.com";
      /* let url = this.$router.resolve({
        path: "www.baidu.com"
      });
      console.log(url);  */

      // window.open("www.baidu.com", "_blank");

      /*     const { href } = this.$router.resolve({
        path: "www.baidu.com"
      });
 */
      window.open("http://www.baidu.com", "_blank");
      // 加入到指定路径
      // this.$router.push({path: val})
    },
    handleChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
      if (file.status == "done") {
        this.openNotification(
          "success",
          "数据批量导入成功！",
          "Data import successful"
        );
        this.refreshColumns();
      }
      if (file.status == "error") {
        this.openNotification(
          "error",
          "数据批量导入失败！",
          "Data import failed"
        );
      }
    },
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
        spacedata.search(query).then(response => {
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
        spacedata.search(query).then(response => {
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
      inventory
        .modify(
          this.formModify.bsm,
          this.formModify.itemname,
          this.formModify.year,
          this.formModify.type,
          this.formModify.commitmentdept,
          this.formModify.owner,
          this.formModify.datamanger,
          this.formModify.director,
          this.formModify.remark
        )
        .then(response => {
          //this.status = response.status;
          if (response.status === 200) {
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
        "暂不对外开放删除数据功能",
        "The delete data function is not available to the public"
      );
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
    refreshColumns() {
      var query = {
        page: this.queryParaSingle.pageNum,
        rows: this.queryParaSingle.pageSize
      };
      spacedata.search(query).then(response => {
        console.log(response.data.rows);
        this.data = response.data.rows;
        this.pagination.total = response.data.total;
      });
    },
    closeModifyModal() {
      this.modalModifyVisible = false;
    },
    closeAddModal() {
      this.modalAddVisible = false;
    }
  },
  computed: {
    count() {
      return this.expand ? 8 : 4;
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
