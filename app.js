var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function getDate(target, propertyKey) {
    var value = this[propertyKey];
    var get = function () {
        console.log("".concat(propertyKey, " value: ").concat(value));
        return value;
    };
    var set = function (val) {
        console.log("new ".concat(propertyKey, " value: ").concat(val));
        value = val;
    };
}
var roles;
(function (roles) {
    roles["Manager"] = "Manager";
    roles["Developer"] = "Developer";
    roles["SuperAdmin"] = "SuperAdmin";
    roles["Admin"] = "Admin";
    roles["Subscriber"] = "Subscriber";
})(roles || (roles = {}));
var person = /** @class */ (function () {
    function person(first_name, middle_name, last_name, email, phone_number, role, address, user_date) {
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.role = role;
        this.address = address;
        this.user_date = user_date;
    }
    __decorate([
        getDate
    ], person.prototype, "user_date");
    return person;
}());
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.addUser = function (e) {
        e.preventDefault();
        var rv = document.getElementById("role");
        if (rv.value in roles == true) {
            var fn = document.getElementById("firstname");
            var mn = document.getElementById("middlename");
            var ln = document.getElementById("lastname");
            var e_1 = document.getElementById("email");
            var ph = document.getElementById("phoneno");
            var addr = document.getElementById("address");
            var u2 = new person(fn.value, mn.value, ln.value, e_1.value, ph.value, roles[rv.value], addr.value, "");
            u2.user_date = newDate();
            userEntry.push(u2);
            var form = document.getElementById("form1");
            form.reset();
            localStorage.setItem("UserEntry", JSON.stringify(userEntry));
            this.loadUser();
        }
    };
    User.prototype.loadUser = function () {
        document.getElementById("load-user").innerText = "Refresh Data";
        var divt = document.getElementById("divtable");
        divt.style.visibility = "visible";
        var text = "<tr>\n          <th>First Name</th>\n          <th>Middle Name</th>\n          <th>Last Name</th>\n          <th>Email</th>\n          <th>Phone Number</th>\n          <th>Role</th>\n          <th>Address</th>\n          <th>Date</th>\n          <th>Edit/Delete</th>\n          </tr>";
        document.getElementById("table").innerHTML = text;
        console.log(userEntry);
        for (var i = 0; i < userEntry.length; i++) {
            var text_1 = "<tr id=\"u".concat(i, "\">\n              <td>").concat(userEntry[i].first_name, "</td>\n              <td>").concat(userEntry[i].middle_name, "</td>\n              <td>").concat(userEntry[i].last_name, "</td>\n              <td>").concat(userEntry[i].email, "</td>\n              <td>").concat(userEntry[i].phone_number, "</td>\n              <td>").concat(userEntry[i].role, "</td>\n              <td>").concat(userEntry[i].address, "</td>\n              <td>").concat(userEntry[i].user_date, "</td>");
            text_1 += "<td><button type='button' onclick=\"user.editbtn(this)\">Edit</button>\n              <button type='button' onclick=\"user.removebtn(this)\">Delete</button>\n              </td></tr>";
            document.getElementById("table").innerHTML += text_1;
        }
    };
    User.prototype.editbtn = function (btn) {
        var _this = this;
        var row = btn.parentNode.parentNode;
        var rowid = row.id;
        var num = +rowid[1];
        btn.parentElement.innerHTML = "<button type='button' id='donebtn'>Save</button>\n          <button type='button' onclick='cancelch()'>Cancel</button>";
        document.getElementById("role").value =
            userEntry[num].role;
        document.getElementById("firstname").value =
            userEntry[num].first_name;
        document.getElementById("middlename").value =
            userEntry[num].middle_name;
        document.getElementById("lastname").value =
            userEntry[num].last_name;
        document.getElementById("email").value =
            userEntry[num].email;
        document.getElementById("phoneno").value =
            userEntry[num].phone_number;
        document.getElementById("address").value =
            userEntry[num].address;
        var btnsb = document.getElementById("sbbtn");
        btnsb.setAttribute("disabled", "true");
        var btncl = document.getElementById("clearbtn");
        btncl === null || btncl === void 0 ? void 0 : btncl.setAttribute("disabled", "true");
        document.getElementById("donebtn").addEventListener("click", function (event) {
            event.preventDefault();
            var rv = document.getElementById("role");
            var fn = document.getElementById("firstname");
            var mn = document.getElementById("middlename");
            var ln = document.getElementById("lastname");
            var e = document.getElementById("email");
            var ph = document.getElementById("phoneno");
            var addr = document.getElementById("address");
            userEntry[num].first_name = fn.value;
            userEntry[num].middle_name = mn.value;
            userEntry[num].last_name = ln.value;
            userEntry[num].email = e.value;
            userEntry[num].phone_number = ph.value;
            userEntry[num].role = rv.value;
            userEntry[num].address = addr.value;
            console.log(userEntry[num]);
            _this.loadUser();
            var form = document.getElementById("form1");
            form.reset();
            var btnsb = document.getElementById("sbbtn");
            btnsb.removeAttribute("disabled");
            var btncl = document.getElementById("clearbtn");
            btncl.removeAttribute("disabled");
        });
    };
    User.prototype.removebtn = function (btn) {
        var row = btn.parentNode.parentNode;
        var rowid = row.id;
        var num = +rowid[1];
        console.log(num);
        userEntry.splice(num, 1);
        row.parentNode.removeChild(row);
        var btnsb = document.getElementById("sbbtn");
        btnsb.removeAttribute("disabled");
        var btncl = document.getElementById("clearbtn");
        btncl.removeAttribute("disabled");
    };
    __decorate([
        getDate
    ], User.prototype, "addUser");
    return User;
}());
var userEntry = [];
function onload1() {
    fetch("data.json")
        .then(function (resp) {
        return resp.json();
    })
        .then(function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var user1 = data_1[_i];
            var u1 = new person(user1.firstname, user1.middlename, user1.lastname, user1.e_mail, user1.phoneNo, roles[user1.role], user1.address, "");
            u1.user_date = user1.doe;
            userEntry.push(u1);
        }
    });
}
function newDate() {
    var d1 = new Date();
    return d1.toString();
}
function addform() {
    document.getElementById("div-form").style.visibility = "visible";
    document
        .getElementById("sbbtn")
        .addEventListener("click", function (ev) { return user.addUser(ev); });
}
var user = new User();
function errorMessage() {
    var error = document.getElementById("error");
    if (document.getElementById("role").value in roles ==
        false) {
        error.innerHTML =
            "<span style='color:red'>" + "Please enter a valid role</span><br>";
    }
    else {
        error.innerHTML = "";
    }
}
function cancelch() {
    user.loadUser();
    var form = document.getElementById("form1");
    form.reset();
    var btnsb = document.getElementById("sbbtn");
    btnsb.removeAttribute("disabled");
    var btncl = document.getElementById("clearbtn");
    btncl.removeAttribute("disabled");
}
document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("clearbtn")
        .addEventListener("click", function (ev) {
        ev.preventDefault();
        var form = document.getElementById("form1");
        form.reset();
    });
});
