import {Category} from "./Category";
import Company from "./Company";

class Coupon {
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public category: Category;
    public amount: number;
    public price: number;
    public image: any;
    public company?:Company;
    public id?: number;


    constructor(title: string, description: string, startDate: Date, endDate: Date, category: Category, amount: number, price: number, image: any,company?: Company, id?: number) {
        this.company = company;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
        this.amount = amount;
        this.price = price;
        this.image = image;
        this.id = id;
    }

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


    // toJSON(): any{
    //     return {
    //         "company":this._company ,
    //         "category": this._category,
    //         "title": this._title,
    //         "description": this._description,
    //         "startDate": this._startDate,
    //         "endDate": this._endDate,
    //         "amount": this._amount,
    //         "price": this._price,
    //         "image": this._image
    //     }
    // }



}

export default Coupon