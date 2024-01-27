import Coupon from "./Coupon";


class Company {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _companyCoupons?: Array<Coupon>;


    constructor(id: number, name: string, email: string, password: string, companyCoupons?: Array<Coupon>) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._companyCoupons = companyCoupons;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
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

    get companyCoupons(): Array<Coupon> {
        return this._companyCoupons;
    }

    set companyCoupons(value: Array<Coupon>) {
        this._companyCoupons = value;
    }

// toJson(): any{
    //     return {
    //         "id": this._id,
    //         "name": this._name,
    //         "email": this._email,
    //         "password": this._password,
    //     }
    // }
}

export default Company