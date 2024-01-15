import {Category} from "./Category";
import Company from "./Company";

class Coupon {
    private _company:Company;
    private _title: string;
    private _description: string;
    private _startDate: Date;
    private _endDate: Date;
    private _category: Category;
    private _amount: number;
    private _price: number;
    private _image: any;
    private _id: number;


    // constructor(id: number,  title: string, description: string, startDate: Date, endDate: Date,category: Category, amount: number, price: number, image: string) {
    //     this._id = id;
    //     this._company = new Company(companyId);
    //     this._title = title;
    //     this._description = description;
    //     this._startDate = startDate;
    //     this._endDate = endDate;
    //     this._category = category;
    //     this._amount = amount;
    //     this._price = price;
    //     this._image = image;
    // }

    constructor( company: Company,  title: string, description: string, startDate: Date, endDate: Date,category: Category, amount: number, price: number, image: any, id?: number) {
        this._company = company;
        this._title = title;
        this._description = description;
        this._startDate = startDate;
        this._endDate = endDate;
        this._category = category;
        this._amount = amount;
        this._price = price;
        this._image = image;
        this._id = id;

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

    get image(): any {
        return this._image;
    }

    set image(value: any) {
        this._image = value;
    }

    toJSON(): any{
        return {
            "company":this._company.toJson() ,
            "category": this._category,
            "title": this._title,
            "description": this._description,
            "startDate": this._startDate,
            "endDate": this._endDate,
            "amount": this._amount,
            "price": this._price,
            "image": this._image
        }
    }


}

export default Coupon