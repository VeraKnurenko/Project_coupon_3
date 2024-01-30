import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import adminService from "../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";


function AllCoupons(): JSX.Element {

const [coupons, setCoupons] = useState<Coupon[]>();

    useEffect(() => {
        adminService.getAllCoupons()
            .then(c  => ((c) ?setCoupons(c): toast.success("no coupons yet")))
            .catch(err => errorHandler.showError(err))
    }, []);

    return (
        <div className="AllCoupons">

            {coupons?.map(c=><CouponCard key={c.id}
                                         id={c.id}
                                         title={c.title}
                                         price={c.price}
                                         category={c.category}
                                         description={c.description}
                                         startDate={c.startDate}
                                         endDate={c.endDate}
                                         image={c.image}

                                      />)}
        </div>
    );
}

export default AllCoupons;
