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
  Result
} from "ant-design-vue";

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

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
message.config({
  duration: 2
});
