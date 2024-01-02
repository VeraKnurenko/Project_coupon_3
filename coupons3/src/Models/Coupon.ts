import {Category} from "./Category";
import Customer from "./Customer";
import Company from "./Company";

class Coupon {
    private _id: number;
    private _company:Company;
    private _category: Category;
    private _title: string;
    private _description: string;
    private _startDate: Date;
    private _endDate: Date;
    private _amount: number;
    private _price: number;
    private _image: string;
    private _customers: Set<Customer>;


    constructor(id: number, company: Company, category: Category, title: string, description: string, startDate: Date, endDate: Date, amount: number, price: number, image: string, customers: Set<Customer>) {
        this._id = id;
        this._company = company;
        this._category = category;
        this._title = title;
        this._description = description;
        this._startDate = startDate;
        this._endDate = endDate;
        this._amount = amount;
        this._price = price;
        this._image = image;
        this._customers = customers;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get company(): Company {
        return this._company;
    }

    set company(value: Company) {
        this._company = value;
    }

    get category(): Category {
        return this._category;
    }

    set category(value: Category) {
        this._category = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get endDate(): Date {
        return this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get customers(): Set<Customer> {
        return this._customers;
    }

    set customers(value: Set<Customer>) {
        this._customers = value;
    }
}

export default Coupon