var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre and Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts and Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const inputElement = document.querySelector("#autocomplete")
const allDiv = document.querySelector(".autocomplete-list") // a div to store all the autocomplete items

function autoComplete (inputElement, inputArray) {
    inputElement.addEventListener("input", function (event) {
        // get the value inside of input element
        var val = this.value;

        // if the value is null or undefined, return
        if (!val) {
            clearDiv();
            return
        }

        clearDiv();

        for (let i = 0; i<inputArray.length; i++) {
            if (inputArray[i].toLowerCase().includes(val.toLowerCase())) {
                // create a div, p element for each matching element
                var matchDiv = document.createElement("div");
                matchDiv.setAttribute("class", "autocomplete-item")
                var p = document.createElement("p");
                
                // bold the matching letters
                var startIndex = inputArray[i].toLowerCase().indexOf(val.toLowerCase());
                var substringLength = val.length;
                var matchString = "<strong>" + val.toLowerCase() + "</strong>";

                var totalStringFirst = inputArray[i].toLowerCase().slice(0, startIndex);
                var totalStringLast = inputArray[i].toLowerCase().slice(totalStringFirst.length + substringLength, inputArray[i].length);
                p.innerHTML = totalStringFirst + matchString + totalStringLast;

                // create a hidden input which has the value of the array element
                var hiddenValue = document.createElement("input")
                hiddenValue.setAttribute("type", "hidden")
                hiddenValue.setAttribute("value", inputArray[i])

                // append the match name to the div element
                matchDiv.appendChild(p);
                matchDiv.appendChild(hiddenValue)

                // the main input should get the value of hidden input when someone clicks it
                matchDiv.addEventListener("click", function(event) {
                    inputElement.value = this.getElementsByTagName("input")[0].value;
                    clearDiv();
                })

                // append this div to the parent div
                allDiv.appendChild(matchDiv)
            }
        }
    })
}

function clearDiv(){
    // grabs the autocomplete-list div and removes all elements from it
    while (allDiv.firstChild) {
        allDiv.removeChild(allDiv.firstChild)
    }
    return
}

document.addEventListener("click", () => clearDiv())

autoComplete(inputElement, countries);