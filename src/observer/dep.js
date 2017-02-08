/**
 * Created by wangshuo on 2017/2/8.
 */
let uid=0;
export default function Dep() {
    this.id=uid++;
    this.subs=[];
}

Dep.target=null;

Dep.prototype.addSub=function (sub) {
    this.subs.push(sub);
}

Dep.prototype.removeSub=function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
        this.subs.splice(index, 1);
    }
}

Dep.prototype.depend=function () {
    Dep.target.addDep(this);
}

Dep.prototype.notify=function () {
    this.subs.forEach(function (sub) {
        sub.update();
    })
}