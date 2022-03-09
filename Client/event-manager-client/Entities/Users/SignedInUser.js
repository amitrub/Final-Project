class SignedInUser {
  constructor(email, password, name, token) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}

export default SignedInUser;
