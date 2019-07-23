var data = require('./test_data.json');

console.log("\n");

//Put JSON into array

let hits = data.responses[0].hits.hits;
let thingArray = [];
for (let i = 0; i < hits.length; i++) {
    let record_info = hits[i]._source.meta;
    let src_organization = record_info.src_organization;
    let src_port = record_info.src_port;
    let protocol = record_info.protocol;
    let dst_organization = record_info.dst_organization;
    let dst_port = record_info.dst_port;
    //let color = getRandomColor();
    let value = hits[i]._source.values.num_bits;

    let theThing = {}
    theThing.src_org = src_organization;
    theThing.dst_org = dst_organization;
    theThing.src_port = src_port;
    theThing.dst_port = dst_port;
    theThing.protocol = protocol;
    //theThing.color = color;
    theThing.value = value;

    let getThingAlready = false;
    for (let j = 0; j < thingArray.length; j++) {
        if (theThing.src_org == thingArray[j].src_org && theThing.dst_org == thingArray[j].dst_org && theThing.src_port == thingArray[j].src_port && theThing.dst_port == thingArray[j].dst_port && theThing.protocol == thingArray[j].protocol) {
            getThingAlready = true;
            thingArray[j].value += theThing.value;
            break;
        }
    }
    if (!getThingAlready)
        thingArray.push(theThing);

}

//~~~~~~~~~~~~~~~ Condense into top 10. ~~~~~~~~~~~~~
let condensed = [];
for (i = 0; i < thingArray.length; i++) {
    let added = false;
    for (j = 0; j < condensed.length; j++) {
        if (thingArray[i].src_org == condensed[j].src_org && thingArray[i].dst_org == condensed[j].dst_org) {
            added = true;
            condensed[j].src_port_array.push(thingArray[i].src_port);
            condensed[j].dst_port_array.push(thingArray[i].dst_port);
            condensed[j].protocol_array.push(thingArray[i].protocol);
            condensed[j].values_array.push(thingArray[i].value);
            condensed[j].value += thingArray[i].value;
            break;
        }
    }
    if (added == false) {
        newThing = {
            src_org: thingArray[i].src_org,
            dst_org: thingArray[i].dst_org,
            src_port_array: [thingArray[i].src_port],
            dst_port_array: [thingArray[i].dst_port],
            protocol_array: [thingArray[i].protocol],
            values_array: [thingArray[i].value],
            total_value: thingArray[i].value
        }
        condensed.push(newThing);
    }
};

console.log(condensed.length);

let top_ten = [];
for (i = 0; i < 10; i++) {
    top_ten.push(condensed[i]);
}
for (i = 10; i < condensed.length; i++) {
    for (j = 0; j < top_ten.length; j++) {
        if (condensed[i].value > top_ten[j].value) {
            top_ten[j] = condensed[i];
            break;
        }
    }
}

top_ten.sort(function (a, b) { return a.value - b.value });
console.log("[" + top_ten[9].src_port_array + "]")

//~~~~~ Create separate arrays for each data "column" ~~~~~

let src_org_array = [];
let dst_org_array = [];
let src_port_array = [];
let dst_port_array = [];
let values_array = [];
//let color_array = [];
let protocol_array = [];

for (let i = 0; i < top_ten.length; i++) {
    src_org_array.push(top_ten[i].src_org);
    dst_org_array.push(top_ten[i].dst_org);
    src_port_array.push(top_ten[i].src_port_array);
    dst_port_array.push(thingArray[i].dst_port);
    values_array.push(thingArray[i].value / 8);
    //color_array.push(thingArray[i].color);
    protocol_array.push(thingArray[i].protocol);
}

let protocol_legend = [];
let protocol_data = [];
for (let i = 0; i < src_org_array.length; i++) {
    let added = false;
    let key = 0;
    for (let j = 0; j < protocol_legend.length; j++) {
        if (protocol_array[i] == protocol_legend[j]) {
            added = true;
            break;
        }
        key = j;
    };
    if (added == false) {
        protocol_legend.push(protocol_array[i]);
    }
    protocol_data.push(key);
};

//~~~~~~~~~~ PRINT data ~~~~~~~~~~~~~~~~
/*
console.log("src_port [" + src_port_array + "]");
console.log("dst port [" + dst_port_array + "]");
console.log("values [" + values_array + "]");
//console.log("[" + color_array + "]");
console.log("protocol [" + protocol_data + "]");
console.log("protocol leg [" + protocol_legend + "]");

//console.log(JSON.stringify(key + ","));
*/
// ~~~~~~~~~~~~~~~~~~ Source/Dest Organizations ~~~~~~~~~~~~~~~~~~~~

let src_org_legend = [];
let src_org_data = [];
for (let i = 0; i < src_org_array.length; i++) {
    let added = false;
    let key = 0;
    for (let j = 0; j < src_org_legend.length; j++) {
        if (src_org_array[i] == src_org_legend[j]) {
            added = true;
            key = j;
            break;
        } else {
            key = j;
        }
    };
    if (added == false) {
        src_org_legend.push(src_org_array[i]);
    }
    src_org_data.push(key);
};
console.log("source orgs [" + src_org_data + "]");
for (i = 0; i < src_org_legend.length; i++) {
    console.log(JSON.stringify(src_org_legend[i]) + ",");
}

let dst_org_legend = [];
let dst_org_data = [];
for (let i = 0; i < dst_org_array.length; i++) {
    let added = false;
    let key = 0;
    for (let j = 0; j < dst_org_legend.length; j++) {
        if (dst_org_array[i] == dst_org_legend[j]) {
            added = true;
            key = j;
            break;
        } else {
            key = j;
        }
    };
    if (added == false) {
        dst_org_legend.push(dst_org_array[i]);
    }
    dst_org_data.push(key);
};
console.log("dst orgs [" + dst_org_data + "]");
for (i = 0; i < dst_org_legend.length; i++) {
    console.log(JSON.stringify(dst_org_legend[i]) + ",");
}

// scaled vals for colors

let color_vals = [];
for (i = 0; i < values_array.length; i++) {
    color_vals.push(Math.floor(values_array[i] / 8000))
}
console.log("colors [" + color_vals + "]");

