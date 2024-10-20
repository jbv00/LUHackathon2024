const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
const getStartedButton = document.getElementById('get-started');
const animationBox = document.getElementById('animation-box');
const descriptionBox1 = document.getElementById('description-box1');
const descriptionBox2 = document.getElementById('description-box2');
const descriptionBox3 = document.getElementById('description-box3');
const descriptionBox4 = document.createElement('div');
const tripletBox = document.getElementById('triplet-box');
const translatePiButton = document.getElementById('translate-pi-btn');
const artContainer = document.getElementById('art-container');
const descriptionBox5 = document.getElementById('description-box5');
const acronymBox = document.getElementById('acronym-box');
acronymBox.style.display = 'none';
const descriptionBox6 = document.getElementById('description-box6');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(tabContent => tabContent.classList.remove('active'));
        tab.classList.add('active');
        target.classList.add('active');
    });
});

getStartedButton.addEventListener('click', () => {
    const step1Text = document.createElement('div');
    step1Text.innerHTML = "<h2>Step 1</h2>";
    step1Text.classList.add('step-title');
    descriptionBox1.before(step1Text);

    descriptionBox1.innerHTML = "For example: let's start with the first 15 digits of pi. George A. Miller famously argued that the average human's short-term memory can only hold around 7 objects or numbers, and we are starting with over 2 TIMES that amount!";
    setTimeout(() => descriptionBox1.classList.add('show'), 10);
    
    descriptionBox2.innerHTML = "To begin to memorize a list of numbers like pi, it's essential to have a key to translate numbers into letters. For now, we will use the one I provide below!";
    setTimeout(() => descriptionBox2.classList.add('show'), 1500);

    setTimeout(() => {
        animationBox.innerHTML = '';
        const table = document.createElement('table');
        table.classList.add('generated-table');

        const headerRow = table.insertRow();
        const headers = ['Number', 'Letter'];
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        const data = [
            [1, 'i'],
            [2, 't'],
            [3, 'e'],
            [4, 'r'],
            [5, 'f'],
            [6, 's'],
            [7, 'n'],
            [8, 'o'],
            [9, 'p'],
        ];

        data.forEach(rowData => {
            const row = table.insertRow();
            rowData.forEach(cellData => {
                const cell = row.insertCell();
                cell.textContent = cellData;
            });
        });
        
        descriptionBox3.innerHTML = "What we are memorizing and translating 314159265358979";
        setTimeout(() => descriptionBox3.classList.add('show'), 1500);

        animationBox.appendChild(table);
        animationBox.classList.add('show');
        translatePiButton.style.display = 'block';
        replaceButtonWithReplay();
    }, 4500);
});

const numberToLetterMapping = {
    1: 'i',
    2: 't',
    3: 'e',
    4: 'r',
    5: 'f',
    6: 's',
    7: 'n',
    8: 'o',
    9: 'p'
};

function translateNumberToLetters(numberString) {
    let translated = '';
    for (let char of numberString) {
        if (numberToLetterMapping[char]) {
            translated += numberToLetterMapping[char];
        } else {
            translated += char;
        }
    }

    return translated;
}

const generateImagesButton = document.createElement('button');
generateImagesButton.textContent = 'Generate Images';
generateImagesButton.classList.add('generate-images-btn', 'get-started-btn');
generateImagesButton.style.display = 'none';
artContainer.before(generateImagesButton);

translatePiButton.addEventListener('click', () => {
    const numberToTranslate = '314159265358979';
    const translatedOutput = translateNumberToLetters(numberToTranslate);
    descriptionBox3.innerHTML = `Translated Pi: ${translatedOutput}`;
    descriptionBox3.classList.add('show');

    descriptionBox4.innerHTML = "Now we want to split the translated digits of pi into triplets to create acronyms";
    descriptionBox4.classList.add('show');
    setTimeout(() => descriptionBox4.classList.add('show'), 1500);

    const step2Text = document.createElement('div');
    step2Text.innerHTML = "<h2>Step 2</h2>";
    step2Text.classList.add('step-title');
    tripletBox.before(step2Text);

    const triplets = splitIntoTriplets(translatedOutput);
    window.currentTriplets = triplets;
    tripletBox.innerHTML = `By translating the digits and splitting them into triplets, we now have 5 acronyms! <span class="triplet">${triplets.join(' ')}</span>`;
    tripletBox.classList.add('show');

    const acronyms = triplets.map(triplet => generateAcronymFromTriplet(triplet));
    tripletBox.innerHTML += '<br>From a dictionary of adjectives and nouns, we are now going to generate the words for each of these acronyms: ';

    acronymBox.innerHTML = acronyms.map(acronym => `<div>${acronym}</div>`).join('');
    acronymBox.style.display = 'block';
    setTimeout(() => {
        acronymBox.classList.add('show');
    }, 50);
    tripletBox.after(acronymBox);

    const step3Text = document.createElement('div');
    step3Text.innerHTML = "<h2>Step 3</h2>";
    step3Text.classList.add('step-title');
    acronymBox.after(step3Text);

    descriptionBox6.innerHTML = "For step 3, hit the Generate Images button to generate the images for each acronym";
    descriptionBox6.classList.add('show');
    descriptionBox6.style.display = 'block';
    step3Text.after(descriptionBox6);
    setTimeout(() => {
        descriptionBox6.classList.add('show');
    }, 1500);

    displayButton(acronyms);
});

function displayButton(acronyms) {
    descriptionBox5.innerHTML = ''; 
    generateImagesButton.style.display = 'block';

    const existingInputContainer = document.querySelector('.input-container');
    if (existingInputContainer) {
        existingInputContainer.remove();
    }

    generateImagesButton.addEventListener('click', () => {
        generateArtForAcronyms(acronyms).then(() => {
            displayInputBoxes(acronyms);
        });
    });

    showInputsButton.addEventListener('click', () => {
        displayInputBoxes(acronyms);
    });
}

function displayInputBoxes(acronyms) {
    acronymBox.style.display = 'none';
    descriptionBox5.innerHTML = "Now that we have our visual representations of the triplets, try and fill in each of these boxes to decode your images";
    descriptionBox5.classList.add('show');
    descriptionBox5.style.display = 'block';

    const triplets = window.currentTriplets;
    descriptionBox3.style.display = 'none';
    tripletBox.style.display = 'none';

    const step4Text = document.createElement('div');
    step4Text.innerHTML = "<h2>Step 4</h2>";
    step4Text.classList.add('step-title');
    descriptionBox5.before(step4Text);

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    const inputBoxes = [];

    for (let i = 0; i < triplets.length; i++) {
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = `Acronym ${i + 1}`;
        inputBox.classList.add('input-box');
        inputBoxes.push(inputBox);

        inputBox.addEventListener('input', () => {
            if (inputBox.value.trim().toLowerCase() === triplets[i].toLowerCase()) {
                inputBox.style.backgroundColor = 'green';
            } else {
                inputBox.style.backgroundColor = '';
            }
            checkAllInputs(inputBoxes, triplets);
        });
        inputContainer.appendChild(inputBox);
    }

    descriptionBox5.after(inputContainer);
}

function checkAllInputs(inputBoxes, triplets) {
    const allCorrect = inputBoxes.every((inputBox, index) => 
        inputBox.value.trim().toLowerCase() === triplets[index].toLowerCase()
    );

    if (allCorrect) {
        generateStep5(inputBoxes, window.currentTriplets);
    }
}

function generateStep5(inputBoxes, triplets) {
    const step5Text = document.createElement('div');
    step5Text.innerHTML = "<h2>Step 5</h2><p>Congratulations! You have successfully remembered the acronyms. Now, let's decode using the key!</p>";
    step5Text.classList.add('step-title');

    inputBoxes[0].parentElement.after(step5Text);

    const numericInputs = generateNumericInputs(triplets);
    step5Text.after(numericInputs);
}

function generateNumericInputs(triplets) {
    const integerInputContainer = document.createElement('div');
    integerInputContainer.classList.add('input-container');

    const inputBoxes = [];

    for (let i = 0; i < triplets.length; i++) {
        const inputBox = document.createElement('input');
        inputBox.type = 'number';
        inputBox.placeholder = `Triplet ${i + 1}`;
        inputBox.classList.add('input-box');

        inputBoxes.push(inputBox);

        inputBox.addEventListener('input', () => {
            checkAllInputsFilled(inputBoxes);
        });

        integerInputContainer.appendChild(inputBox);
    }
    return integerInputContainer;
}

function checkAllInputsFilled(inputBoxes) {
    const allFilled = inputBoxes.every(inputBox => inputBox.value.trim() !== '');
    if (allFilled) {
        const values = inputBoxes.map(inputBox => inputBox.value).join('');
        displayResult(values);
    }
}

function displayResult(values) {
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<h3>Collected Triplets: ${values}<br>Congratulations! you have succesfully memorized 15 digits of pi the way a professional does!</h3>`;
    resultDiv.classList.add('result');

    const lastInputContainer = document.querySelector('.input-container:last-child');
    lastInputContainer.after(resultDiv);
}

function splitIntoTriplets(str) {
    const triplets = [];
    for (let i = 0; i < str.length; i += 3) {
        triplets.push(str.substring(i, i + 3));
    }
    return triplets;
}

const adjectives = ['adventurous', 'bold', 'cautious', 'delightful', 'elegant', 'fierce', 'graceful', 'happy', 'idealistic', 'joyful', 'keen', 'loud', 'merry', 'natural', 'obscure', 'patient', 'quick', 'reluctant', 'silent', 'talented', 'unique', 'vivid', 'wise', 'extraordinary', 'youthful', 'zealous'];
const noun1 = ['apple', 'balloon', 'cat', 'dog', 'elephant', 'forest', 'garden', 'house', 'island', 'jacket', 'kite', 'lion', 'mountain', 'nest', 'ocean', 'pencil', 'queen', 'river', 'star', 'tree', 'umbrella', 'vase', 'window', 'xylophone', 'yacht', 'zebra'];
const noun2 = ['ant', 'book', 'car', 'desk', 'eagle', 'flower', 'grape', 'hat', 'ice', 'jar', 'kangaroo', 'lamp', 'mirror', 'notebook', 'octopus', 'piano', 'quilt', 'rocket', 'sand', 'turtle', 'unicorn', 'village', 'whale', 'xenon', 'yarn', 'zoo'];

function generateAcronymFromTriplet(triplet) {
    const [first, second, third] = triplet.split('');
    const myAdjectives = adjectives.find(word => word.startsWith(first));
    const myNoun1 = noun1.find(word => word.startsWith(second));
    const myNoun2 = noun2.find(word => word.startsWith(third));
    
    return `${myAdjectives} ${myNoun1} ${myNoun2}`;
}

let enableImageGeneration = true;

async function generateArtForAcronyms(acronyms) {
    if (!enableImageGeneration) {
        console.log("Image generation is currently disabled.");
        return;
    }
    artContainer.innerHTML = '';
    for (const acronym of acronyms) {
        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'api-key': '0c2b8460-3ad1-4969-b6a8-5caee7800707',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: acronym })
        });

        const data = await response.json();
        if (data.output_url) {
            const artWrapper = document.createElement('div');
            artWrapper.style.textAlign = 'center';
            artWrapper.style.marginBottom = '20px';

            const img = document.createElement('img');
            img.src = data.output_url;
            img.alt = `Art for ${acronym}`;
            img.style.maxWidth = '100%';

            artWrapper.appendChild(img);
            artContainer.appendChild(artWrapper);
        }
    }
}

function replaceButtonWithReplay() {
    const replayButton = document.createElement('button');
    replayButton.textContent = 'Replay';
    replayButton.classList.add('replay-btn');
    replayButton.addEventListener('click', replayAnimations);
    getStartedButton.replaceWith(replayButton);
}

function replayAnimations() {
    descriptionBox1.classList.remove('show');
    descriptionBox2.classList.remove('show');
    descriptionBox3.classList.remove('show');
    animationBox.classList.remove('show');
    descriptionBox4.classList.remove('show');
    tripletBox.classList.remove('show');
    acronymBox.classList.remove('show');
    descriptionBox5.classList.remove('show');
    descriptionBox6.classList.remove('show');

    descriptionBox1.innerHTML = '';
    descriptionBox2.innerHTML = '';
    descriptionBox3.innerHTML = '';
    animationBox.innerHTML = '';
    tripletBox.innerHTML = '';
    acronymBox.innerHTML = '';
    descriptionBox4.innerHTML = '';
    descriptionBox6.innerHTML = '';
    generateImagesButton.style.display ='none';
    translatePiButton.style.display = 'none';
    artContainer.innerHTML = '';

    const stepTitles = document.querySelectorAll('.step-title');
    stepTitles.forEach(title => title.remove());

    getStartedButton.click();
}




/*Starting Application here :) */

document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('table-body');
    const addRowButton = document.getElementById('add-row-btn');
    const autofillButton = document.getElementById('autofill-btn');
    const submitButton = document.getElementById('submit-btn');
    const resultBox = document.getElementById('result-box');
    const enableImageGeneration = true;

    const aminoAcids = [
        { name: 'Alanine', abbreviation: 'a' },
        { name: 'Arginine', abbreviation: 'r' },
        { name: 'Asparagine', abbreviation: 'n' },
        { name: 'Aspartic acid', abbreviation: 'd' },
        { name: 'Cysteine', abbreviation: 'c' },
        { name: 'Glutamic acid', abbreviation: 'e' },
        { name: 'Glutamine', abbreviation: 'q' },
        { name: 'Glycine', abbreviation: 'g' },
        { name: 'Histidine', abbreviation: 'h' },
        { name: 'Isoleucine', abbreviation: 'i' },
        { name: 'Leucine', abbreviation: 'l' },
        { name: 'Methionine', abbreviation: 'm' },
        { name: 'Phenylalanine', abbreviation: 'f' },
        { name: 'Proline', abbreviation: 'p' },
        { name: 'Serine', abbreviation: 's' },
        { name: 'Threonine', abbreviation: 't' },
        { name: 'Tryptophan', abbreviation: 'w' },
        { name: 'Tyrosine', abbreviation: 'y' },
        { name: 'Lysine', abbreviation: 'k' },
        { name: 'Valine', abbreviation: 'v' },
        { name: 'Selenocysteine', abbreviation: 'u' },
    ];

    const adjectives = ['adventurous', 'bold', 'cautious', 'delightful', 'elegant', 'fierce', 'graceful', 'happy', 'idealistic', 'joyful', 'keen', 'loud', 'merry', 'natural', 'obscure', 'patient', 'quick', 'reluctant', 'silent', 'talented', 'unique', 'vivid', 'wise', 'extraordinary', 'youthful', 'zealous'];
    const noun1 = ['apple', 'balloon', 'cat', 'dog', 'elephant', 'forest', 'garden', 'house', 'island', 'jacket', 'kite', 'lion', 'mountain', 'nest', 'ocean', 'pencil', 'queen', 'river', 'star', 'tree', 'umbrella', 'vase', 'window', 'xylophone', 'yacht', 'zebra'];
    const noun2 = ['ant', 'book', 'car', 'desk', 'eagle', 'flower', 'grape', 'hat', 'ice', 'jar', 'kangaroo', 'lamp', 'mirror', 'notebook', 'octopus', 'piano', 'quilt', 'rocket', 'sand', 'turtle', 'unicorn', 'village', 'whale', 'xenon', 'yarn', 'zoo'];

    function addRow(element = '', abbreviation = '') {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${element}" placeholder="Element"></td>
            <td><input type="text" value="${abbreviation}" placeholder="Abbreviation"></td>
            <td><button class="delete-row-btn">Delete</button></td>
        `;
        tableBody.appendChild(row);
    
        row.querySelector('.delete-row-btn').addEventListener('click', () => {
            row.remove();
        });
    }
    
    function autofillTable() {
        aminoAcids.forEach(item => {
            addRow(item.name, item.abbreviation);
        });
    }

    function splitIntoTriplets(str) {
        const triplets = [];
        for (let i = 0; i < str.length; i += 3) {
            triplets.push(str.substring(i, i + 3));
        }
        return triplets;
    }

    function generateAcronymFromTriplet(triplet) {
        const [first, second, third] = triplet.split('');
        const myAdjectives = adjectives.find(word => word.startsWith(first));
        const myNoun1 = noun1.find(word => word.startsWith(second));
        const myNoun2 = noun2.find(word => word.startsWith(third));
        
        return `${myAdjectives} ${myNoun1} ${myNoun2}`;
    }

    async function generateArtForAcronyms(acronyms) {
        if (!enableImageGeneration) {
            console.log("Image generation is currently disabled.");
            return;
        }
        resultBox.innerHTML += '<h2>Generated Images:</h2>';
        for (const acronym of acronyms) {
            const response = await fetch('https://api.deepai.org/api/text2img', {
                method: 'POST',
                headers: {
                    'api-key': 'abd25821-f824-4777-983f-ce4df00b1762',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: acronym })
            });

            console.log(`Generating art for acronym: ${acronym}`);

            const data = await response.json();
            console.log(data);
            
            if (data.output_url) {
                const artWrapper = document.createElement('div');
                artWrapper.style.textAlign = 'center';
                artWrapper.style.marginBottom = '20px';

                const img = document.createElement('img');
                img.src = data.output_url;
                img.alt = `Art for ${acronym}`;
                img.style.maxWidth = '100%';

                const caption = document.createElement('p');
                caption.innerText = acronym;

                artWrapper.appendChild(img);
                resultBox.appendChild(artWrapper);
            } else {
                console.error(`No image returned for acronym: ${acronym}`);
            }
        }
    }

    function collectAbbreviationsAndGenerateAcronyms() {
        const rows = tableBody.querySelectorAll('tr');
        let abbreviationString = '';
        
        rows.forEach(row => {
            const abbreviationInput = row.querySelector('td:nth-child(2) input');
            abbreviationString += abbreviationInput.value;
        });
        
        const triplets = splitIntoTriplets(abbreviationString);
        const acronyms = triplets.map(generateAcronymFromTriplet);
        
        resultBox.innerHTML = `
            <h2>Abbreviations:</h2>
            <p>${abbreviationString.split('').join('')}</p>
            <h2>Triplets:</h2>
            <p>${triplets.join(', ')}</p>
            <h2>Acronyms:</h2>
            ${acronyms.map(acronym => `<p>${acronym}</p>`).join('')}
        `;
        const generateImagesButton = document.createElement('button');
        generateImagesButton.innerText = "Generate Images";
        generateImagesButton.addEventListener('click', () => generateArtForAcronyms(acronyms));
        resultBox.appendChild(generateImagesButton);
    
        generateArtForAcronyms(acronyms).then(() => {
            const inputContainer = document.createElement('div');
            inputContainer.classList.add('input-container');
        
            const inputBoxes = [];
            for (let i = 0; i < triplets.length; i++) {
                const inputBox = document.createElement('input');
                inputBox.type = 'text';
                inputBox.placeholder = `Acronym ${i + 1}`;
                inputBox.classList.add('input-box');
                inputBoxes.push(inputBox);
        
                inputBox.addEventListener('input', () => {
                    if (inputBox.value.trim().toLowerCase() === triplets[i].toLowerCase()) {
                        inputBox.style.backgroundColor = 'green';
                    } else {
                        inputBox.style.backgroundColor = '';
                    }
                    checkAllInputs(inputBoxes, triplets);
                });
        
                inputContainer.appendChild(inputBox);
            }

            resultBox.appendChild(inputContainer);
        
            const label = document.createElement('label');
            label.textContent = 'List of Elements:';
            label.htmlFor = 'element-input';
        
            const elementInputBox = document.createElement('input');
            elementInputBox.type = 'text';
            elementInputBox.placeholder = 'Enter your list of elements here...';
            elementInputBox.classList.add('element-input-box', 'large-input');
            elementInputBox.id = 'element-input';
        
            resultBox.appendChild(document.createElement('br'));
            resultBox.appendChild(label);
            resultBox.appendChild(elementInputBox);
        });
    }

    addRowButton.addEventListener('click', () => {
        addRow(); 
    });
    autofillButton.addEventListener('click', () => {
        autofillTable();
    });
    submitButton.addEventListener('click', () => {
        collectAbbreviationsAndGenerateAcronyms();
    });
});