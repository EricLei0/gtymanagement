import Vue from "vue";
import {
  Button,
  Form,
  Input,
  Checkbox,
  Icon,
  message,
  notification,
  Layout,
  Menu,
  PageHeader,
  Card,
  Row,
  Col,
  Select,
  Table,
  Pagination,
  ConfigProvider,
  Avatar,
  Result,
  Tooltip,
  Divider,
  Modal,
  FormModel,
  Upload,
  Steps,
  Cascader
} from "ant-design-vue";
//import { Step } from "ant-design-vue/types/steps/step";
Vue.use(Cascader);
Vue.use(Steps);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(PageHeader);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(ConfigProvider);
Vue.use(Avatar);
Vue.use(Result);
Vue.use(Tooltip);
Vue.use(Divider);
Vue.use(Modal);
Vue.use(FormModel);
Vue.use(Upload);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
message.config({
  duration: 2
});
