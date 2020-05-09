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
  Menu
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Layout);
Vue.use(Menu);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
message.config({
  duration: 2
});
