"use server";
// const json2csv = require("json2csv").parse;
// const fs = require("fs");
import { connect } from "@/dbConfig/dbConfig";
import ProjectSiteModel from "@/models/siteProjectModel";

// # ADD SITE  PROJECT DATA TO DATABASE
export const addSiteProject = async (data) => {
  const { siteName, siteAddress, status, siteType, siteDescription } = data;
  try {
    await connect();
    const addSite = new ProjectSiteModel({
      siteName,
      siteAddress,
      status,
      siteType,
      siteDescription,
    });
    const saveSite = await addSite.save();

    const data = {
      siteName: saveSite.siteName,
      status: 201,
      message: "Add Site Successfully...",
    };
    return data;
  } catch (error) {
    return error.message;
  }
};
// # GET ALL SITE PROJECTS FROM THE DATABASE
export const getAllProjects = async () => {
  try {
    await connect();
    const projects = await ProjectSiteModel.find().lean().exec();
    // console.log(JSON.stringify(projects));
    if (!projects || projects.length === 0) {
      return { status: false, message: "No Data Found" };
    } else {
      const projectData = JSON.stringify(projects);
      const data = {
        status: true,
        count: projects.length,
        data: projectData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
    return { status: false, message: "Server Error" };
  }
};
// # UPDATE THE STATUS  OF A SPECIFIC PROJECT IN THE DATABASE
export const siteUpdateStatus = async (id) => {
  try {
    await connect();
    let siteProject = await ProjectSiteModel.findOne({
      _id: id,
    });
    if (!siteProject) {
      return new Response("Team Member Not Found", { status: 404 });
    } else {
      const updatedStatus = !siteProject.isActive;
      siteProject = await ProjectSiteModel.updateOne(
        { _id: id },
        { $set: { isActive: updatedStatus } }
      );
      const data = {
        status: 201,
        message: "The  Status of the Site Project has been Updated",
      };
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};
// # UPDATE A SPECIFIC SITE PROJECT INFORMATION BY ID
export const updateSiteProjectById = async (id, data) => {
  console.log(data);
  const { siteName, siteAddress, status, siteType, siteDescription } = data;
  // if (!Object.keys(siteproject).length) throw new Error("No Data Provided");
  if (!id) throw new Error("ID not provided");
  try {
    await connect();
    // this is the find by id get the particular data from id
    // let index = allData.findIndex((x) => x._id == id);
    let project = await ProjectSiteModel.findById(id);
    if (!project) throw new Error(`Invalid Id`);
    await ProjectSiteModel.updateOne(
      { _id: id },
      { siteName, siteAddress, status, siteType, siteDescription }
    );
    const data = {
      status: 200,
      message: `Successfully Upadted ${project.siteName}'s Information`,
    };
    return data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
// # DELETE A SPECIFIC SITE PROJECT BY ID
export const deleteSiteProjectById = async (id) => {
  try {
    await connect();
    let res = await ProjectSiteModel.deleteOne({ _id: id }).exec();
    if (res.n === 0) throw new Error("Invalid Id");
    return "Delete Successfully";
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

// # SEARCH A  SITE PROJECT BY NAME OR TYPE OF THE PROJECT
export const searchSiteProjectByKeyword = async (keyword) => {
  try {
    await connect();
    let projects = await ProjectSiteModel.find({
      $or: [
        { siteName: { $regex: keyword, $options: "i" } },
        { typeOfTheProject: { $regex: keyword, $options: "i" } },
      ],
    });
    if (!projects || projects.length === 0) {
      throw new Error("No project available");
    } else {
      const projectData = JSON.stringify(projects);
      const data = {
        count: projects.length,
        data: projectData,
      };
      return data;
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

//# GET ALL DATA FROM DATABASE AND RETURN AS ARRAY OF OBJECTS
export const getAllProjectsFromDB = () => {
  return new Promise((resolve, reject) => {
    ProjectSiteModel.find()
      .sort([["createdAt", -1]]) // sort by createdAt in descending order
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// # THIS IS THE WORKING ON THE NEW VERSION
export const searchSiteProjectByKeywordNew = async (keyword) => {
  try {
    let results = [];
    await connect();
    if (keyword) {
      // Construct the query based on whether a search term is provided
      const query = String(keyword)
        ? {
            $or: [
              { siteName: { $regex: String(keyword), $options: "i" } },
              { typeOfTheProject: { $regex: String(keyword), $options: "i" } },
            ],
          }
        : {};

      const data = await ProjectSiteModel.find(query);
      return (results = {
        data: JSON.stringify(data),
      });
    } else {
      results = await getAllProjects();
    }
    return results;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
};

export const getSiteById = async (siteId) => {
  if (!siteId) return { status: false, message: "Site Id is required." };
  try {
    // const response = await ProjectSiteModel.findOne({where:{id: siteId}}).populate('users');
    const response = await ProjectSiteModel.findOne({ _id: siteId });
    if (response.isActive) return { status: true, message: "success" };
    else return { status: false, message: "This site is not active right Now" };
  } catch (error) {
    console.log(`Error in getting site by id ${error}`);
  }
};

// # CONVERT DATA INTO CSV FILE
export const convertToCSV = async (data) => {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  return [header, ...rows].join("\n");
};

// # EXPORT DATA AS CSV FILE WITHOUT USING  ANY LIBRARY BLACKBOX
// const createCSVFileWithoutLibrary = (fileName, dataArray) => {
//   var blob = new Blob([dataArray], { type: "text/csv;charset=utf-8;" });
//   var link = document.createElement("a");
//   link.setAttribute("href", URL.createObjectURL(blob));
//   link.setAttribute("download", fileName + ".csv");
//   document.body.appendChild(link);
//   link.click();
// };

// // # EXPORT DATA AS CSV GENERATED BY BLACKBOX
// export const downloadSearchResultsAsCsv = async (req, res) => {
//   try {
//     let csvData = [];
//     const headerRow = Object.keys(projectFields).map((key) => projectFields[key].label);
//     csvData.push(headerRow.join(",")); // Add the header row to the csv array

//     const searchResult = await getFilteredProjects(req.query.q);
//     if (!searchResult || !searchResult.data) throw new Error("No Data Found!");

//     const rows = JSON.parse(searchResult.data).map((row) => {
//       return Object.values(row)
//         .map((field) => {
//           // Convert field into string and remove any unwanted characters
//           return `${field}`.replace(/[^a-zA-Z0-9,._\s]/g, "").trim();
//         })
//         .join(",");
//     });
//     csvData = [...csvData, ...rows];

//     createCSVFileWithoutLibrary(`${req.query.q}-results`, csvData.join("\n"));
//     res.send({ message: `Download of ${req.query.q}-results.csv has started!` });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: err.message });
//   }
// };

// # EXPORT DATA AS CSV FILE OR EXCEL FILE
// export const exportAsCSVFile = (projectsData, fileName) => {
//   const csv = json2csv(projectsData);
//   fs.writeFileSync(`${fileName
//     }.csv`, csv);
// };

// export const exportAsExcelFile = (projectsData, fileName) => {
//   const excelBuffer = require("xlsx").utils.book_append_xml(
//     require("xlsx").utils.book_new_fill(),
//     require("xlsx").utils.sheet_add_xmlfile(require("xlsx").utils.book_new_fill(),
//       require("js2xml")(projectsData,
//         {
//           header: true,
//           pretty: false,
//         })
//         ));
//   //create buffer of the xlsx file and save it to disk
//   fs.writeFileSync(`${process.cwd()}/public/uploads/${fileName}.xlsx`,
//     Buffer.from(excelBuffer));
// };

// # SORTING PROJECTS BY CATEGORY AND TIMELINE
// export function sortByCategoryAndTimeline(a, b) {
//   let categoryComparison = a.category.localeCompare(b.category);
//   if (categoryComparison === 0) {
//     return (
//       new Date(a.timeline ? a.timeline : "9999-12-31") -
//       new Date(b.timeline ? b.timeline : "9999-12-31")
//     );
//   } else {
//     return categoryComparison;
//   }
// }
