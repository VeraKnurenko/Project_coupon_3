import Coupon from "./Coupon";

class Customer {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _coupons: Set<Coupon>;


    constructor(id: number, firstName: string, lastName: string, email: string, password: string, coupons: Set<Coupon>) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._coupons = coupons;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get coupons(): Set<Coupon> {
        return this._coupons;
    }

    set coupons(value: Set<Coupon>) {
        this._coupons = value;
    }
}

export default Customer