import { db } from "../logic/firebase";

const fetchBuildWeekProjects = async buildWeek => {
  let listOfProjects = [];
  let projectsCollection = await db
    .collection("build_weeks")
    .doc(`${buildWeek}`)
    .collection("projects")
    .get();
  projectsCollection.forEach(function(doc) {
    listOfProjects.push(doc.data());
  });
  return listOfProjects;
};

export default fetchBuildWeekProjects;
