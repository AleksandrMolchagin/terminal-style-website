var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const mainText = document.getElementById("text");
const redHighlightedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
let typingDelay = 50;
let newParagraphDelay = 2500;
//variables to get a Character from Line from Paragraph
let charIndex = 0;
let lineOfArrayNum = 0;
let arrayNum = 0;
//a variable to put a Character into specific html paragraph
let lineInd = 0;
//arrays for paragraphs 
const parArrayText = ["ALEKSANDRMOLCHAGIN.COM", "PERSONAL WEBSITE","//"];
const parArrayText2 = ["CONNECTION HAS BEEN ESTABLISHED"];
const parArrayText3 = ["GETTING PERMISSION TO ACCESS THE WEBSITE"];
const parArrayText4 = ["YOUR PERMISSION IS GRANTED", "THE CODE IS ACTIVATED", "//"];
const parArrayText5 = ["54 68 65 72 65 20 69 73 20 6E 6F 20 65 6D 6F 74 69 6F 6E 2C 20 74 68 65 72 65 20 69 73 20 70 65 61 63 65 2E 0D 0A 54 68 65 72 65 20 69 73 20 6E 6F 20 69 67 6E 6F 72 61 6E 63 65 2C 20 74 68 65 72 65 20 69 73 20 6B 6E 6F 77 6C 65 64 67 65 2E 0D 0A 54 68 65 72 65 20 69 73 20 6E 6F 20 70 61 73 73 69 6F 6E 2C 20 74 68 65 72 65 20 69 73 20 73 65 72 65 6E 69 74 79 2E 0D 0A 54 68 65 72 65 20 69 73 20 6E 6F 20 63 68 61 6F 73 2C 20 74 68 65 72 65 20 69 73 20 68 61 72 6D 6F 6E 79 2E 0D 0A 54 68 65 72 65 20 69 73 20 6E 6F 20 64 65 61 74 68 2C 20 74 68 65 72 65 20 69 73 20 74 68 65 20 46 6F 72 63 65 2E"];
//an array for all text paragraphs (arrays, not strings)
let arrayOfArrays = [parArrayText, parArrayText2, parArrayText3, parArrayText4, parArrayText5]  
//an array for html paragraphs (<p></p>)
let parArray = [];
//start
document.addEventListener("DOMContentLoaded", function() 
{
    //optimize page for mobile devices
    if (isMobile)
    {
            document.querySelector(".container p").setAttribute("style", "margin-left: 5%; margin-right: 5%; font-size: 0.7rem; font-weight: bold;");
            document.querySelector(".cursor").setAttribute("style", "display: inline-block; width: 7.5px; background-color: #ccc; margin-left: 00.2rem; animation: blink 1s infinite;");
    }
    //getting IP adress using www.cloudflare.com
    fetch('https://www.cloudflare.com/cdn-cgi/trace').then(res => res.text()).then(data => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
    let ip = data.match(ipRegex)[0];
    if (ip != null)
        mainText.textContent = ip;
    });
    //create an html paragraph for the first text paragraph
    parArrayText.forEach(createPar);
    //typing all paragraphs
    setTimeout(typePar, 3000)
})
function typePar() {
    //type the first string 
    if(charIndex < arrayOfArrays[arrayNum][lineOfArrayNum].length)
    {
        if(!cursorSpan.classList.contains("non-visible")) cursorSpan.classList.add("non-visible");
        parArray[lineInd].textContent += arrayOfArrays[arrayNum][lineOfArrayNum].charAt(charIndex);
        charIndex++;
        setTimeout(typePar, typingDelay);
    }
    //switch to the next string
    else if (lineOfArrayNum < arrayOfArrays[arrayNum].length-1)
    {
        if (parArray[lineInd].textContent.length == arrayOfArrays[arrayNum][lineOfArrayNum].length) 
        {
            if(cursorSpan.classList.contains("non-visible")) 
            {
                cursorSpan.classList.remove("non-visible");
                parArray[lineInd].appendChild(cursorSpan);
            }
            lineInd++;
            lineOfArrayNum++;
            charIndex = 0;
            setTimeout(typePar, typingDelay);
        }
    }
    //switch to the next array
    else if (arrayNum < arrayOfArrays.length-1)
    {
        if(cursorSpan.classList.contains("non-visible") && arrayNum != 1) 
        {
            cursorSpan.classList.remove("non-visible");
            parArray[lineInd].appendChild(cursorSpan);
        }
        lineInd++;
        arrayNum++;
        charIndex = 0;
        lineOfArrayNum = 0;
        addGap();
        if (!isMobile)
            addGap();
        arrayOfArrays[arrayNum].forEach(createPar);
        if (arrayNum == 1)
            typingDelay = 14;
        else
            newParagraphDelay = 800;
            typingDelay = 23;
            if (arrayNum == 4)
            {
                typingDelay = 3;
                newParagraphDelay = 1200;
            }
        setTimeout(typePar, newParagraphDelay)
    }
    //nothing to type -> make button visible
    else
    {   if (isMobile)
        {
            addGap();
            document.getElementById("end").setAttribute("style", "font-size: 0.7rem; float: right; visibility: visible; margin-left: 10%; margin-right: 10%");
        }
        else 
        {
            document.getElementById("end").setAttribute("style", "float: right; visibility: visible");
            document.getElementById("tab-booting").setAttribute("style", "visibility: visible");
            document.getElementById("tab-booting").setAttribute("style", "animation: fadeout 1.5s");
        }
    }
}
//create an html paragraph for each line 
function createPar(item, index, arr)
{
    var para = document.createElement("p");
    if (item == "CONNECTION HAS BEEN ESTABLISHED")
        para.setAttribute("class", "typed-color-text");
    else
        para.setAttribute("class", "typed-text");
    var node = document.createTextNode("");
    para.appendChild(node);
    var element = document.querySelector(".container");
    element.appendChild(para);
    if (isMobile)
            para.setAttribute("style", "margin-left: 5%; margin-right: 5%; font-size: 0.7rem; font-weight: bold;");
    parArray.push(para);
}
//create an empty line (put <br>)
function addGap()
{
    document.querySelector(".container").appendChild(document.createElement("br"));
}