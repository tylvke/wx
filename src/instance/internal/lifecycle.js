/**
 * Created by wangshuo on 2017/2/7.
 */
import {
    compile
} from '../../compile'

import Directive from '../../directive'

export default function (Wx) {
    Wx.prototype._compile=function (el) {
        var options=this.$options;

        compile(el,options)(this,el);
    }

    Wx.prototype._bindDir=function (descriptor,node) {
        this._directives.push(
            new Directive(descriptor,this,node)
        )
    }
}
