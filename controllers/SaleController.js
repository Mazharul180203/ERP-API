import {GetSalesCustomerTrackerService, SaleProductService, SalesCustomerTrackerService} from "../services/SaleService.js";

export const  saleproduct =  async (req,res) =>{
    let response = await SaleProductService(req);
    res.status(response.code).json({status: response.status,message: response.message, data: response.data || null });

}

export const  salesCustomerTracker =  async (req,res) =>{
    let response = await SalesCustomerTrackerService(req);
    res.status(response.code).json({status: response.status,message: response.message, data: response.data || null });

}

export const  getsalescustomertracker =  async (req,res) =>{
    let response = await GetSalesCustomerTrackerService(req);
    res.status(response.code).json({status: response.status,message: response.message, data: response.data || null });

}
