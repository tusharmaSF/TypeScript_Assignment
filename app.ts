function getDate(target: Object, propertyKey: string) {
  let value: string = this[propertyKey];
  const get = function () {
    console.log(`${propertyKey} value: ${value}`);
    return value;
  };
  const set = function (val: string) {
    console.log(`new ${propertyKey} value: ${val}`);
    value = val;
  };
}

enum roles {
  Manager = "Manager",
  Developer = "Developer",
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Subscriber = "Subscriber",
}

class person {
  @getDate
  public user_date: string;

  constructor(
    public first_name: string,
    public middle_name: string,
    public last_name: string,
    public email: string,
    public phone_number: string,
    public role: roles,
    public address: string,
    user_date: string
  ) {
    this.user_date = user_date;
  }
}

interface userActions<T> {
  addUser(e: T): void;
  loadUser(): void;
  editbtn(btn: T): void;
  removebtn(btn: T): void;
}

class User<T> implements userActions<T> {
  @getDate
  addUser(e: any): void {
    e.preventDefault();
    let rv = document.getElementById("role") as HTMLInputElement;
    if (rv.value in roles == true) {
      let fn = document.getElementById("firstname") as HTMLInputElement;
      let mn = document.getElementById("middlename") as HTMLInputElement;
      let ln = document.getElementById("lastname") as HTMLInputElement;
      let e = document.getElementById("email") as HTMLInputElement;
      let ph = document.getElementById("phoneno") as HTMLInputElement;
      let addr = document.getElementById("address") as HTMLInputElement;

      let u2 = new person(
        fn.value,
        mn.value,
        ln.value,
        e.value,
        ph.value,
        roles[rv.value],
        addr.value,
        ""
      );
      u2.user_date = newDate();
      userEntry.push(u2);

      const form = document.getElementById("form1") as HTMLFormElement;
      form.reset();

      localStorage.setItem("UserEntry", JSON.stringify(userEntry));
      this.loadUser();
    }
  }

  loadUser(): void {
    document.getElementById("load-user")!.innerText = "Refresh Data";
    const divt = document.getElementById("divtable")!;
    divt.style.visibility = "visible";
    let text = `<tr>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>Address</th>
          <th>Date</th>
          <th>Edit/Delete</th>
          </tr>`;
    document.getElementById("table")!.innerHTML = text;
    console.log(userEntry);
    for (let i = 0; i < userEntry.length; i++) {
      let text = `<tr id="u${i}">
              <td>${userEntry[i].first_name}</td>
              <td>${userEntry[i].middle_name}</td>
              <td>${userEntry[i].last_name}</td>
              <td>${userEntry[i].email}</td>
              <td>${userEntry[i].phone_number}</td>
              <td>${userEntry[i].role}</td>
              <td>${userEntry[i].address}</td>
              <td>${userEntry[i].user_date}</td>`;
      text += `<td><button type='button' onclick="user.editbtn(this)">Edit</button>
              <button type='button' onclick="user.removebtn(this)">Delete</button>
              </td></tr>`;
      document.getElementById("table")!.innerHTML += text;
    }
  }

  editbtn(btn: any): void {
    let row = btn.parentNode.parentNode;
    let rowid = row.id;
    let num = +rowid[1];
    btn.parentElement.innerHTML = `<button type='button' id='donebtn'>Save</button>
          <button type='button' onclick='cancelch()'>Cancel</button>`;
    (document.getElementById("role")! as HTMLInputElement).value =
      userEntry[num].role;
    (document.getElementById("firstname")! as HTMLInputElement).value =
      userEntry[num].first_name;
    (document.getElementById("middlename")! as HTMLInputElement).value =
      userEntry[num].middle_name;
    (document.getElementById("lastname")! as HTMLInputElement).value =
      userEntry[num].last_name;
    (document.getElementById("email")! as HTMLInputElement).value =
      userEntry[num].email;
    (document.getElementById("phoneno")! as HTMLInputElement).value =
      userEntry[num].phone_number;
    (document.getElementById("address")! as HTMLInputElement).value =
      userEntry[num].address;
    let btnsb = document.getElementById("sbbtn")!;
    btnsb.setAttribute("disabled", "true");
    let btncl = document.getElementById("clearbtn");
    btncl?.setAttribute("disabled", "true");
    document.getElementById("donebtn")!.addEventListener("click", (event) => {
      event.preventDefault();
      let rv = document.getElementById("role") as HTMLInputElement;
      let fn = document.getElementById("firstname") as HTMLInputElement;
      let mn = document.getElementById("middlename") as HTMLInputElement;
      let ln = document.getElementById("lastname") as HTMLInputElement;
      let e = document.getElementById("email") as HTMLInputElement;
      let ph = document.getElementById("phoneno") as HTMLInputElement;
      let addr = document.getElementById("address") as HTMLInputElement;
      userEntry[num].first_name = fn.value;
      userEntry[num].middle_name = mn.value;
      userEntry[num].last_name = ln.value;
      userEntry[num].email = e.value;
      userEntry[num].phone_number = ph.value;
      userEntry[num].role = rv.value;
      userEntry[num].address = addr.value;
      console.log(userEntry[num]);
      this.loadUser();
      const form = document.getElementById("form1") as HTMLFormElement;
      form.reset();
      let btnsb = document.getElementById("sbbtn")!;
      btnsb!.removeAttribute("disabled");
      let btncl = document.getElementById("clearbtn");
      btncl!.removeAttribute("disabled");
    });
  }

  removebtn(btn: any): void {
    let row = btn.parentNode.parentNode;
    let rowid = row.id;
    let num = +rowid[1];
    console.log(num);

    userEntry.splice(num, 1);
    row.parentNode.removeChild(row);

    let btnsb = document.getElementById("sbbtn")!;
    btnsb!.removeAttribute("disabled");
    let btncl = document.getElementById("clearbtn");
    btncl!.removeAttribute("disabled");
  }
}

let userEntry: Array<person> = [];

function onload1() {
  fetch("data.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let user1 of data) {
        let u1 = new person(
          user1.firstname,
          user1.middlename,
          user1.lastname,
          user1.e_mail,
          user1.phoneNo,
          roles[user1.role],
          user1.address,
          ""
        );
        u1.user_date = user1.doe;
        userEntry.push(u1);
      }
    });
}

function newDate() {
  let d1: Date = new Date();
  return d1.toString();
}

function addform() {
  document.getElementById("div-form")!.style.visibility = "visible";
  document
    .getElementById("sbbtn")!
    .addEventListener("click", (ev: Event) => user.addUser(ev));
}

let user = new User();

function errorMessage() {
  var error = document.getElementById("error")!;
  if (
    (document.getElementById("role") as HTMLInputElement).value in roles ==
    false
  ) {
    error.innerHTML =
      "<span style='color:red'>" + "Please enter a valid role</span><br>";
  } else {
    error.innerHTML = "";
  }
}

function cancelch() {
  user.loadUser();
  const form = document.getElementById("form1") as HTMLFormElement;
  form.reset();
  let btnsb = document.getElementById("sbbtn")!;
  btnsb!.removeAttribute("disabled");
  let btncl = document.getElementById("clearbtn");
  btncl!.removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("clearbtn")!
    .addEventListener("click", (ev: Event) => {
      ev.preventDefault();
      const form = document.getElementById("form1") as HTMLFormElement;
      form.reset();
    });
});
