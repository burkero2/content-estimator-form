const form = document.getElementById("myForm").elements;
const radioForm = document.
getElementById("radioForm").elements;
console.log(form);


function handleSubmit(event){
    event.preventDefault();
    calcGLH();
    calcTime();
}

function calcTime(){
    let totalTextUnit = calcTextUnits();
    let totalVideoUnit = calcVideoUnits();
    let totalUnits = totalTextUnit + totalVideoUnit;
    document.getElementById("totalUnitsVal").innerHTML = totalUnits;
    let totalHours = calcHours(totalUnits);
    let totalDays = calcDays(totalHours);
    let totalWeeks = calcWeeks(totalDays);
    let totalWithBuffer = calcBuffer(totalWeeks);
}

function calcHours(totalUnits){
    let avgUnitLength = parseFloat(form["avgUnitsVal"].value);
    totalCourseHours = parseFloat((totalUnits * avgUnitLength).toFixed(2));
    let courseHoursWithPrep = prepFunction(totalCourseHours);
    document.getElementById("courseHours").innerHTML = courseHoursWithPrep;
    return courseHoursWithPrep;
}

function prepFunction(totalCourseHours){
    let courseHoursRate = 0;
    let text = "";
    let prepForm = document.getElementById("checkboxForm").elements;
    for (let i= 0; i<prepForm.length; i++){
        if(prepForm[i].value === "learningOutcomes" && prepForm[i].checked === false){
            courseHoursRate += 10;
            text += "Learning Outcomes Added (+10%)<br/>"
        } else if(prepForm[i].value === "assessCriteria" && prepForm[i].checked === false){
            courseHoursRate += 10;
            text += "Assessment Criteria Added (+10%)<br />"
        } else if(prepForm[i].value === "syllabus" && prepForm[i].checked === false){
            courseHoursRate += 10;
            text += "Syllabus Added (+10%)<br/>"
        } else if(prepForm[i].value === "walkthrough" && prepForm[i].checked === false){
            courseHoursRate += 25;
            text += "Walkthrough Project Added (+25%)<br/>"
        }
    } 
    totalCourseHours = ((totalCourseHours * (courseHoursRate / 100)) + totalCourseHours);
    console.log(text);
    document.getElementById("textBox").innerHTML = text;
    return totalCourseHours.toFixed(2);
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
    let buffer = parseInt(form["bufferVal"].value);
    let totalWithBuffer = (totalWeeks * buffer/ 100) + totalWeeks;
    document.getElementById("totalBuffer").innerHTML = Math.ceil(totalWithBuffer);
    return totalWithBuffer;
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

function calcTextUnits(){
    let textUnits = parseInt(form["textUnitsInput"].value);
    let challengeUnits = parseInt(form["textChallengeInput"].value);
    let totalTextUnits = (textUnits + challengeUnits) / 2;
    document.getElementById("unitEffortVal").innerHTML = totalTextUnits;
    return totalTextUnits;
}

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
    calcGLH();
});

// Function for the prep-activities form such as Walkthrough Project etc...
// document.getElementById("checkboxForm").addEventListener("change", function prepFunction(event){
//     if(event.target.value === "learningOutcomes" && event.target.checked === false){
//         courseHours += 10;
//     } else if(event.target.value === "learningOutcomes" && event.target.checked === true){
//         courseHours -= 10;
//     } else if(event.target.value === "assessCriteria" && event.target.checked === false){
//         courseHours += 10;
//     } else if(event.target.value === "assessCriteria" && event.target.checked === true){
//         courseHours -= 10;
//     } else if(event.target.value === "syllabus" && event.target.checked === false){
//         courseHours += 10;
//     } else if(event.target.value === "syllabus" && event.target.checked === true){
//         courseHours -= 10;
//     } else if(event.target.value === "walkthrough" && event.target.checked === false){
//         courseHours += 25;
//     } else if(event.target.value === "walkthrough" && event.target.checked === true){
//         courseHours -= 25;
//     }
//     console.log(courseHours);
//     return courseHours;
// });

