"use server";
import { connect } from "@/dbConfig/dbConfig";
import SiteAssignModel from "@/models/siteAssignModel";
import { getEmpSummaryData } from "../dashboardAction/dashboardAction";

export async function addSiteAssign(data) {
  try {
    await connect();
    if (data.id) {
      const siteAssign = await SiteAssignModel.findByIdAndUpdate(
        data.id,
        { $set: data },
        { new: true }
      );
      if (siteAssign) {
        return { status: true, message: "Site Assign Added Successfully" };
      }
      return { status: false, message: "Failed to Add Site Assign" };
    } else {
      const siteAssign = new SiteAssignModel(data);
      const result = await siteAssign.save(); // save the document
      if (result) {
        return { status: true, message: "Site Assign Added Successfully" };
      }
      return { status: false, message: "Failed to Add Site Assign" };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: "Failed to Add Site Assign" };
  }
}

// we have to get all the employee data from this SiteAssign
export async function getSiteAssign(page, limit, siteId, month) {
  const siteQuery = siteId ? { siteId: siteId } : {};
  const monthQuery = month
    ? { $expr: { $eq: [{ $month: "$assignDate" }, month] } }
    : {};
  const query = { $and: [siteQuery, monthQuery] };
  try {
    // try to connect to the database
    await connect(); // connect to the database
    const siteAssign = await SiteAssignModel.find({
      ...query,
      // get only one month data
      //   $and: [
      // monthQuery,
      // { assignDate: { $gte: new Date().setDate(new Date().getDate() - 30) } },
      // { assignDate: { $lte: new Date() } },
      // siteQuery,
      //   ], // get only one month data
    })
      .skip((page - 1) * limit) // skip the first (page -
      .limit(limit) // get only 10 documents
      .populate({
        path: "assignTo",
        select: { firstName: 1, lastName: 1, _id: 1 },
      })
      .populate({ path: "siteId", select: { siteName: 1, _id: 1 } })
      .lean(); // find all the documents in the collection
    const totalCount = await SiteAssignModel.countDocuments({
      // Apply the same date filter as the query above
      ...query,
    });
    const countEmploye = await getEmpSummaryData();
    const convert = JSON.parse(countEmploye?.data);
    const employeeData = siteAssign.map((item) => {
      const employeInfo = item.assignTo.map(({ firstName, lastName, _id }) => {
        return { label: `${firstName} ${lastName}`, value: _id };
      });
      const siteInfo = { label: item.siteId.siteName, value: item.siteId._id }; // get the site name
      const id = item._id;
      const date = item.assignDate;
      return {
        employeInfo,
        siteInfo,
        id,
        date,
        total: convert.totalEmployees,
      }; // return the data
    });
    if (siteAssign) {
      return { status: true, data: JSON.stringify(employeeData), totalCount }; // return the documents
    } else {
      return { status: false, message: "No Site Assign Found" }; // return a message
    } // end of else
  } catch (error) {
    // if there is an error
    console.error(error); // print the error
    return { status: false, message: "Failed to Get Site Assign" }; // return a message
  } // end of catch
} // end of getSiteAssign
export async function getSiteAssignById(id) {
  // get a single employee data
  try {
    // try to connect to the database
    await connect(); // connect to the database
    const siteAssign = await SiteAssignModel.findById(id).populate(
      "employeeId"
    ); // find a single document in the collection
    if (siteAssign) {
      // if the document is found
      return { status: true, data: siteAssign }; // return the document
    } else {
      // if the document is not found
      return { status: false, message: "No Site Assign Found" }; // return a message
    } // end of else
  } catch (error) {
    // if there is an error
    console.error(error); // print the error
    return { status: false, message: "Failed to Get Site Assign" }; // return a
  } // end of catch
} // end of getSiteAssignById
export async function updateSiteAssign(id, data) {
  // update a single employee data
  try {
    // try to connect to the database
    await connect(); // connect to the database
    const siteAssign = await SiteAssignModel.findByIdAndUpdate(id, data, {
      new: true,
    }); // update a single document in the collection
    if (siteAssign) {
      // if the document is updated
      return { status: true, message: "Site Assign Updated Successfully" }; // return a message
    } else {
      // if the document is not updated
      return { status: false, message: "Failed to Update Site Assign" }; // return a message
    } // end of else
  } catch (error) {
    // if there is an error
    console.error(error); // print the error
    return { status: false, message: "Failed to Update Site Assign" }; // return a message
  } // end of catch
} // end of updateSiteAssign
export async function deleteSiteAssign(id) {
  // delete a single employee data
  try {
    // try to connect to the database
    await connect(); // connect to the database
    const siteAssign = await SiteAssignModel.findByIdAndDelete(id); // delete a single document in
    if (siteAssign) {
      // if the document is deleted
      return { status: true, message: "Site Assign Deleted Successfully" }; // return a message
    } else {
      // if the document is not deleted

      return { status: false, message: "Failed to Delete Site Assign" }; // return a
    } // end of else
  } catch (error) {
    // if there is an error
    console.error(error); // print the error
    return { status: false, message: "Failed to Delete Site Assign" }; // return a
  } // end of catch
} // end of deleteSiteAssign
