const isNumber = (n) => !isNaN(parseInt(n))
export default function numbersDecorator(number, title = false, language = "en", decoreWith = ",") {
    if (isNumber(number)) {
        number = number.toString();
        let dot = number.indexOf(".");
        let floatingNums = ""
        if (dot !== -1) {
            floatingNums = number.slice(dot);
            number = number.slice(0, dot);
        }
        number = number.split("").reverse();
        if (number.length > 3) {
            for (let i = 3; i < number.length; i += 3) {
                number[i] += decoreWith;
            }
            number.reverse();
            let lang = { "en": 0, "ar": 1 };
            let theTitle = "";
            if (title === true) {
                switch (true) {
                    case number.length < 4: theTitle = ""; break;
                    case number.length < 7: theTitle = ["k", " ألف"]; break;
                    case number.length < 10: theTitle = ["m", " مليون"]; break;
                    case number.length < 13: theTitle = ["b", " مليار"]; break;
                    case number.length < 16: theTitle = ["t", " تريليون"]; break;
                    case number.length < 19: theTitle = ["q", " كوادريليون"]; break;
                    default: theTitle = ""; break;
                }
                number = number.join("");
                return number.slice(0, number.indexOf(",")) + theTitle[lang[language]] ?? "";
            }
            else { return number.join("") + floatingNums; }
        }
        else { return number.reverse().join("") + floatingNums; }
    } else return ""
}
