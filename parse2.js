raw_data = [["University of Maryland", "University of Hawaii", 253522618315768],
["University Corporation for Atmospheric Research", "National Energy Research Scientific Computing Center", 200811078229454],
["European Organization for Nuclear Research", "FUNDAÇÃO DE AMPARO À PESQUISA DO ESTADO SÃO PAULO", 198061720363008],
["Fermi National Accelerator Laboratory (Fermilab)", "Jisc Services Limited", 121130473831424],
["KISTI", "UNIVERSIDADE DE SAO PAULO", 120298893205504],
["Lawrence Berkeley National Laboratory", "UNIVERSIDADE DE SAO PAULO", 88028240576512],
["Google LLC", "University of Puerto Rico", 74477662511104],
["SURFnet bv", "Fermi National Accelerator Laboratory (Fermilab)", 72457492285440],
["University of Texas at Austin", "University of Oklahoma", 70886750872662],
["BELNET", "Fermi National Accelerator Laboratory (Fermilab)", 70257126697984]]


label_raw = [];
for(let i = 0; i < raw_data[0].length - 1; i++) {
    label_raw[i] = [];
    for (let j = 0; j < raw_data.length; j++) {
        label_raw[i].push(raw_data[j][i]);

    }
}

let tick_labels = [];
let tick_data = [];
let tick_vals = [];
 
for(i = 0; i < label_raw.length; i++) {
    tick_labels[i] = [];
    tick_vals[i] = [];
    tick_data[i] = [];
    for (let j = 0; j < label_raw[i].length; j++) {
        let added = false;
        let key = 0;

        for (k = 0; k < tick_labels[i].length; k++) {
            key = k+1;
            if (tick_labels[i][k] == label_raw[i][j]) {
                added = true;
                key = k;
                break;
            }
        }

        if (added == false) {
            tick_labels[i].push(label_raw[i][j]);
            tick_vals[i].push(key);
        }
        tick_data[i].push(key);
    };
}




console.log('tick labels, vals, data');
console.log(tick_labels);
console.log(tick_vals);
console.log(tick_data);