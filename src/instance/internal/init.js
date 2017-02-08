/**
 * Created by wangshuo on 2017/2/7.
 */
export default function (Wx) {
    Wx.prototype._init=function (options) {
        this.$options=options || {};
        this.$el=null;

        this._watchers=[];
        this._directives=[];

        this._events={};

        this._data={};

        this._initState();

        if(options.el){
            this.$mount(options.el);
        }
    }
}