const { parse } = require("csv-parse");
let localities = [];
const fs = require("fs");


function hasNumbers(t){
    var regex = /\d/g;
    return regex.test(t);
}  

const mainHeadlineBase = "The main headline in | the location ";
const secondHeadlineBase = "Second part headline ";
const firstDescriptionBase = [
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    }   
];
const secodaryHeadlineBase = {
    a: "Secondary headline part 1 in ",
    b: " secondary headline part2"
}

const productOneDescription = [
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    }
    
];

const productTwoDescription = [
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    }
];

const productThreeDescription = [ 
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    },
    {
        a:"Descriotion in ",
        b:", Description."
    }
];

// create a function to create a csv file with name, state, and zip code
function createCSVFile(data) {
    const csvContent = `"Location","State","Phone Number","CallToAction","Zip Codes","First Description","Meta Description","LocationsWindowWashing (Item)","Location_Id" \n` + data.join("\n");
    fs.writeFile("outputILFinalWI.csv", csvContent, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("CSV file created successfully!");
        }
    });
}

let Location, State, PhoneNumber, CallToAction, ZipCodes, FirstDescription, MetaDescription, LocationsWindowWashing, Location_Id;
let counter = 0;
let totalCounter = 1;
let rowCount = 0;
let localityRow;
fs.createReadStream("./LocationsWindowWashing.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
        console.log(rowCount)
        rowCount++;    
        if (row[0].toLowerCase().includes("name") != true) {

                name = row[0].split(",")[0];
                mainHeader = mainHeadlineBase + name + ", WI ";
                localityRow = name + "," + `"`+ mainHeader + `"`;
                secondHeadline = secondHeadlineBase + name + ", WI";
                localityRow = localityRow + "," + `"` + secondHeadline + `"`;
                firstDescription = firstDescriptionBase[counter].a + name + ", WI" + firstDescriptionBase[counter].b;
                localityRow = localityRow + "," + `"` + firstDescription + `"`;
                secodaryHeadline = secodaryHeadlineBase.a + name + ", WI" + secodaryHeadlineBase.b;
                localityRow = localityRow + "," + `"` + secodaryHeadline + `"`;
                officeCleaningDescription = productOneDescription[counter].a + name + ", WI" + productOneDescription[counter].b;
                localityRow = localityRow + "," + `"` + officeCleaningDescription + `"`;
                freeEstimate = productTwoDescription[counter].a + name + ", WI" + productTwoDescription[counter].b;
                localityRow = localityRow + "," + `"` + freeEstimate + `"`;
                freeEstimateDescription = productThreeDescription[counter].a + name + ", WI" + productThreeDescription[counter].b;
                localityRow = localityRow + "," + `"` + freeEstimateDescription + `"`;
                
                console.log(totalCounter + " " + name + " " + counter )
                totalCounter++;
                localities.push(localityRow);

        }
        if(counter < 5){
            counter++;
        }
        if(counter == 5){
            counter = 0;
        }

    })
    .on("end", function () {
        console.log("localities length: " + localities.length)
        createCSVFile(localities);
     })
    .on("error", function (error) {
        console.log(error.message);
    });
