const form = document.getElementById("myForm").elements;
const contentTimingForm = document.getElementById("contentTimingForm").elements;
const radioForm = document.
getElementById("radioForm").elements;
console.log(form);


function handleSubmit(event){
    event.preventDefault();
    calcGLH();
    calcTime();
}


// 2. Second function called to calculate the total time needed to create a course. 
function calcTime(){
    // GLH Form: Calculate the total number of units in top half of the table
    let totalTextUnit = calcTextUnits();
    let totalVideoUnit = calcVideoUnits();
    let totalUnits = totalTextUnit + totalVideoUnit;
    document.getElementById("totalUnitsVal").innerHTML = totalUnits;
    
    // Timing Form: Calls a number of functions to calculate the total time needed to create a course.
    let totalHours = calcHours(totalUnits);
    let courseTotalHours = calcPrepHours(totalHours);
    let totalDays = calcDays(courseTotalHours);
    let totalWeeks = calcWeeks(totalDays);
    let totalWithBuffer = calcBuffer(totalWeeks);
}


function calcPrepHours(totalHours){
    let percentage = parseFloat(document.getElementById("prepActivitiesValue").innerText);
    let totalCoursePrepHours = ((totalHours * percentage) / 100) + totalHours
    document.getElementById("totalCourseHours").innerText = totalCoursePrepHours.toFixed(2);
    return totalCoursePrepHours.toFixed(2);
}


// 2.1 Calculate the total number of units. 
function calcTextUnits(){
    let textUnits = parseInt(form["textUnitsInput"].value);
    let challengeUnits = parseInt(form["textChallengeInput"].value);
    let totalTextUnits = (textUnits + challengeUnits) / 2;
    document.getElementById("unitEffortVal").innerHTML = totalTextUnits;
    return totalTextUnits;
}

function calcVideoUnits(){
    let passiveVidInput = parseInt(form["passiveVidInput"].value);
    let operVidInput = parseInt(form["operationalVidInput"].value);
    let activeVidInput = parseInt(form["activeVidInput"].value);
    let intensiveVidInput = parseInt(form["intensiveVidInput"].value);
    let totalVideoUnits = passiveVidInput + operVidInput + activeVidInput + intensiveVidInput;
    document.getElementById("totalVideoUnitsVal").innerHTML = totalVideoUnits;
    return totalVideoUnits;
}

// 2.2 Calculate the total number of hours needed to create a course.
function calcHours(totalUnits){
    let avgUnitLength = parseFloat(contentTimingForm["avgUnitsVal"].value);
    let totalCourseHours = parseFloat((totalUnits * avgUnitLength).toFixed(2));
    document.getElementById("courseHours").innerHTML = totalCourseHours;
    return totalCourseHours;
}



function calcDays(totalHours){
    let totalDays = parseFloat((totalHours / 7.5).toFixed(2));
    console.log("Total Days: ", totalDays);
    document.getElementById("totalDaysVal").innerHTML = totalDays;
    return totalDays;
}

function calcWeeks(totalDays){
    let totalWeeks = parseFloat((totalDays / 5).toFixed(2));
    console.log("total Weeks: ", totalWeeks);
    document.getElementById("totalWeeksVal").innerHTML = totalWeeks;
    return totalWeeks;
}

function calcBuffer(totalWeeks){
    let buffer = parseInt(contentTimingForm["bufferVal"].value);
    let totalWithBuffer = (totalWeeks * buffer/ 100) + totalWeeks;
    document.getElementById("totalBuffer").innerHTML = Math.ceil(totalWithBuffer);
    return totalWithBuffer;
}



// 1. First function called, to calculate the GLH for the top half of the table
function calcGLH(){
    let total = textBasedFunction();
    total += challengeBasedFunction();
    total += passiveFunction();
    total += operationalFunction();
    total += activeFunction();
    total += intensiveFunction();
    console.log(total);

    document.getElementById("totalMins").innerHTML = total;
    let totalGLH = getMins(total);
    document.getElementById("glhVal").innerHTML = totalGLH.toFixed(2);
    
}

function textBasedFunction(){
    // Text Units
    let textUnits = form["textUnitsInput"].value;
    let textLength = form["textLength"].value;
    let textWeight = parseInt(document.getElementById("textWeighting").innerHTML);
    let textGLHTotal = unitGLHFunction(textUnits, textLength, textWeight);
    document.getElementById("textResult").innerHTML = textGLHTotal;
    return textGLHTotal;
    }

function challengeBasedFunction(){
    // Text Challenge
    let challengeUnits = form["textChallengeInput"].value;
    let challengeLength = form["textChallengeLength"].value;
    let challengeWeight = parseInt(document.getElementById("textChallengeWeighting").innerHTML);
    let challengeGLHTotal = unitGLHFunction(challengeUnits, challengeLength, challengeWeight);
    document.getElementById("textChallengeResult").innerHTML = challengeGLHTotal;
    return challengeGLHTotal;
}

function passiveFunction(){
    // P Videos
    let passiveVidInput = form["passiveVidInput"].value;
    let passiveVidLength = form["passiveVidLength"].value;
    let passiveVidWeighting = parseFloat(document.getElementById("passiveVidWeighting").innerHTML);
    let passiveGLHTotal = unitGLHFunction(passiveVidInput, passiveVidLength, passiveVidWeighting);
    document.getElementById("passiveVidResult").innerHTML = passiveGLHTotal.toFixed(2);
    return passiveGLHTotal;
}

function operationalFunction(){
    // O Videos
    let operVidInput = form["operationalVidInput"].value;
    let operVidLength = form["operationalVidLength"].value;
    let operVidWeighting = parseFloat(document.getElementById("operationalVidWeighting").innerHTML);
    let operGLHTotal = unitGLHFunction(operVidInput, operVidLength, operVidWeighting);
    document.getElementById("operationalVidResult").innerHTML = operGLHTotal;
    return operGLHTotal;
}

function activeFunction(){
    // A Videos
    let activeVidInput = form["activeVidInput"].value;
    let activeVidLength = form["activeVidLength"].value;
    let activeVidWeighting = parseFloat(document.getElementById("activeVidWeighting").innerHTML);
    let activeGLHTotal = unitGLHFunction(activeVidInput, activeVidLength, activeVidWeighting);
    document.getElementById("activeVidResult").innerHTML = activeGLHTotal;
    return activeGLHTotal;
}

function intensiveFunction(){
    // I Videos
    let intensiveVidInput = form["intensiveVidInput"].value;
    let intensiveVidLength = form["intensiveVidLength"].value;
    let intensiveVidWeighting = parseFloat(document.getElementById("intensiveVidWeighting").innerHTML);
    let intensiveGLHTotal = unitGLHFunction(intensiveVidInput, intensiveVidLength, intensiveVidWeighting);
    document.getElementById("intensiveVidResult").innerHTML = intensiveGLHTotal;
    return intensiveGLHTotal;
}

// GLH Calculations Functions
function getMins(totalMins){
    let totalGLH = totalMins/60;
    return totalGLH;
}

function unitGLHFunction(numVids, avgLength, weight){
    let glhResult = numVids * avgLength * weight;
    return glhResult;
}

// 1.1 Event Listener to check if the L5 or L3 Tick boxes are selected. Each present different values to calculate 
document.getElementById("radioForm").addEventListener('change', function(event){
    if(event.target.value === "l3"){
        document.getElementById("textWeighting").innerHTML = 3;
        document.getElementById("textChallengeWeighting").innerHTML = 30;
        document.getElementById("passiveVidWeighting").innerHTML = 3.6;
        document.getElementById("operationalVidWeighting").innerHTML = 9;
        document.getElementById("activeVidWeighting").innerHTML = 24;
        document.getElementById("intensiveVidWeighting").innerHTML = 33;
    } else{
        document.getElementById("textWeighting").innerHTML = 1;
        document.getElementById("textChallengeWeighting").innerHTML = 10;
        document.getElementById("passiveVidWeighting").innerHTML = 1.2;
        document.getElementById("operationalVidWeighting").innerHTML = 3;
        document.getElementById("activeVidWeighting").innerHTML = 8;
        document.getElementById("intensiveVidWeighting").innerHTML = 1;
    }
    document.getElementById("textResult").innerHTML = 0;
    document.getElementById("textChallengeResult").innerHTML = 0;
    document.getElementById("passiveVidResult").innerHTML = 0;
    document.getElementById("operationalVidResult").innerHTML = 0;
    document.getElementById("activeVidResult").innerHTML = 0;
    document.getElementById("intensiveVidResult").innerHTML = 0;
});

let percentage = 50;
// 3. Event Listener to Add the Prep Activities to the Lower Table 
document.getElementById("checkboxForm").addEventListener('change', function prepFunction(event){
    let form = event.target;
    let totalHours = parseFloat(document.getElementById("courseHours").innerText)
    
    console.log(totalHours)
    if(form.checked == true){
        if(form.value == "walkthrough"){
            percentage += 20;
        } else{
            percentage += 10;
        }
    } else if(form.checked == false){
        if(form.value == "walkthrough"){
            percentage -= 20;
        } else{
            percentage -= 10;
        }
    }

    clearCells();
    document.getElementById("prepActivitiesValue").innerText = percentage;
});


function clearCells(){
    document.getElementById("totalCourseHours").innerText = 0;
    document.getElementById("totalDaysVal").innerText = 0;
    document.getElementById("totalWeeksVal").innerText = 0;

    document.getElementById("totalBuffer").innerText = 0;
}
    