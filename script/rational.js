function gcd(a, b) {
  if (b == 0) { return a; }
  return gcd(b, a % b);
}
function lcm(a, b) {
  return a * b / gcd(a, b);
}

class Rational {
  constructor(num = 0, deno = 1) {
    this.num = num;
    if (this.deno == 0) {
      throw "div0";
    }
    this.deno = deno;
  }
  valid() {
    return this.deno != 0;
  }
  simplify() {
    if (!this.valid()) { throw "!valid"; }
    if (this.deno < 0) {
      this.num = -this.num;
      this.deno = -this.deno;
    }
    if (this.num == 0) {
      this.deno = 1;
    }
    let d = gcd(this.num, this.deno);
    this.num /= d;
    this.deno /= d;
    return this;
  }
  add(rhs) {
    return (new Rational(this.num * rhs.deno + this.deno * rhs.num, this.deno * rhs.deno)).simplify();
  }
  sub(rhs) {
    return (new Rational(this.num * rhs.deno - this.deno * rhs.num, this.deno * rhs.deno)).simplify();
  }
  mul(rhs) {
    return (new Rational(this.num * rhs.num, this.deno * rhs.deno)).simplify();
  }
  div(rhs) {
    return (new Rational(this.num * rhs.deno, this.deno * rhs.num)).simplify();
  }
  str() {
    if (this.deno == 1) {
      return "" + this.num;
    }
    return this.num + "/" + this.deno;
  }
}