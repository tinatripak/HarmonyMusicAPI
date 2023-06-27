class UserClass {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.imageURL = obj.imageURL;
    this.user_id = obj.user_id;
    this.email_verfied = obj.email_verfied;
    this.role = obj.role;
    this.auth_time = obj.auth_time;
    this.favourites = obj.favourites;
  }
}

module.exports.UserClass = UserClass;