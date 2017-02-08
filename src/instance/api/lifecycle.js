/**
 * Created by wangshuo on 2017/2/7.
 */
import {
    query
} from '../../util'
export default function (Wx) {
    Wx.prototype.$mount=function (el) {
        this.$el=el=query(el);
        this._compile(el);
        return this;
    }

}