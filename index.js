const fs = require("fs");

fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const json = JSON.parse(data);
    let twins = [];

    for (let i = 0; i < json.length - 1; i++) {
        if (json[i].Population.TwentyTwentyTwo < 200000) {
            continue;
        }

        for (let j = i + 1; j < json.length; j++) {
            if (json[i].Population.TwentyTwentyTwo > json[j].Population.TwentyTwentyTwo * 2) {
                continue;
            }

            if (json[j].Population.TwentyTwentyTwo > json[i].Population.TwentyTwentyTwo * 2) {
                continue;
            }

            let distance = Distance(json[i].Location.North, json[i].Location.West, json[j].Location.North, json[j].Location.West);

            if (distance > 10) {
                continue;
            }

            twins.push([json[i], json[j]]);
            console.log(`${json[i].City} (pop: ${json[i].Population.TwentyTwentyTwo.toLocaleString()}) & ${json[j].City} (pop: ${json[j].Population.TwentyTwentyTwo.toLocaleString()}) are twins with a distance of ${distance.toFixed(2)} miles!`)
        }
    }

    if (twins.length % 2 != 0) {
        console.log("Warning: count is not even.");
        return;
    }

    console.log(`Found ${twins.length} pairs of twins.`);

    fs.writeFileSync("./cities.json", JSON.stringify(twins, null, 2));
});

function Distance(north1, west1, north2, west2) {
    north1 *= Math.PI/180;
    west1 *= -Math.PI/180;
    north2 *= Math.PI/180;
    west2 *= -Math.PI/180;

    return 3440.1 * Math.acos(Math.sin(north1) * Math.sin(north2) + Math.cos(north1) * Math.cos(north2) * Math.cos(west1 - west2)) * 1.15078;
}