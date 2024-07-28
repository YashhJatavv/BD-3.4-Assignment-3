let express = require("express");
let cors = require("cors");

let app = express();
let port = 3000;

app.use(cors());

//Data Structure.
let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 }
];

//Home.
app.get("/", (req, res) => {
  res.send("Welcome to Fitness Tracker app...");
});

//Endpoint 1 Add an Activity.
//Add a new activity to the tracker.
function addNewActivity(activityId, type, duration, caloriesBurned){
  let activity = {
    activityId : activityId,
    type : type,
    duration : duration,
    caloriesBurned : caloriesBurned,
  }
  activities.push(activity);
  return activities;
};

app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  let result = addNewActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities : result });
});

//Endpoint 2 Sort Activities by Duration.
//Sort activities by their duration in ascending order.
function sortActivitiesByDuration(activities1_Object, activities2_object){
  return activities1_Object.duration - activities2_object.duration;
};

app.get("/activities/sort-by-duration", (req, res) => {
  let activitiesCopy = activities.slice();
  let result = activitiesCopy.sort(sortActivitiesByDuration);
  res.json({ activities : result });
});

//Endpoint 3 Filter Activities by Type.
//Filter activities by their type.
function filterActivitiesByType(activities, type){
  return activities.type === type;
};

app.get("/activities/filter-by-type", (req, res) => {
  let type = req.query.type;
  let result = activities.filter(el => filterActivitiesByType(el, type));
  res.json({ activities : result });
});

//Endpoint 4 Calculate Total Calories Burned.
//Calculate the total calories burned for all activities.
function calculateTotalCaloriesBurned(activities){
  let totalCalories = 0;
  for(let i=0; i<activities.length; i++){
    totalCalories = totalCalories + activities[i].caloriesBurned;  
  }
  return totalCalories;
};

app.get("/activities/total-calories", (req, res) => {
  let result = calculateTotalCaloriesBurned(activities);
  res.json({ totalCaloriesBurned : result });
});

//Endpoint 5 Update Activity Duration by ID.
//Update the duration of an activity identified by its ID.
function updateActivityDurationById(activities, id, duration){
  for(let i=0; i<activities.length; i++){
    if(activities[i].activityId === id){
      activities[i].duration = duration;
    }  
  }
  return activities;
};

app.get("/activities/update-duration", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updateActivityDurationById(activities, activityId, duration);
  res.json({ activities : result });
});

//Endpoint 6 Delete Activity by ID.
//Delete an activity from the tracker by its ID.
function deleteActivityById(activities, id){
  return activities.activityId !== id;
};

app.get("/activities/delete", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = activities.filter(el => deleteActivityById(el, activityId));
  res.json({ activities : result });
});

//Endpoint 7 Delete Activities by Type.
//Delete all activities of a specific type from the tracker.
function deleteActivitiesByType(activities, type){
  return activities.type !== type;
};

app.get("/activities/delete-by-type", (req, res) => {
  let type = req.query.type;
  let result = activities.filter(el => deleteActivitiesByType(el, type));
  res.json({ type : result });
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
