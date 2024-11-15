window.addEventListener('load', () => {
    const box4 = document.querySelector('.box4');
    const box5 = document.querySelector('.box5');

    if (box4 && box5) {
        const temp = box4.innerHTML;
        box4.innerHTML = box5.innerHTML;
        box5.innerHTML = temp;
    }
});

const a = 5;
const b = 6;
const c = 7;

function calculateTriangleArea(a, b, c) {
    const p = (a + b + c) / 2;
    const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    const mainBox = document.querySelector('.main');

    const oldResult = mainBox.querySelector('.result-text');
    if (oldResult) {
        oldResult.remove();
    }

    const resultText = document.createTextNode(` Площа трикутника: ${area.toFixed(2)}`);

    const textNodes = Array.from(mainBox.childNodes).filter(node =>
        node.nodeType === Node.TEXT_NODE ||
        (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BUTTON')
    );

    const lastTextNode = textNodes[textNodes.length - 1];

    if (lastTextNode) {
        lastTextNode.parentNode.insertBefore(resultText, lastTextNode.nextSibling);
    } else {
        mainBox.appendChild(resultText);
    }
}

window.addEventListener('load', () => {
    calculateTriangleArea(a, b, c);
});

    function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

    function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
    return cookie.substring(cookieName.length, cookie.length);
}
}
    return "";
}

    function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

    function createNumberForm() {
    const mainBox = document.querySelector('.main');
    const formHTML = `
        <form id="numberForm">
            <div>Введіть 10 чисел:</div>
            ${Array.from({length: 10}, (_, i) => `
                <input type="number" required name="number${i}" placeholder="Число ${i + 1}">
            `).join('')}
            <button type="submit">Знайти кількість мінімальних чисел</button>
        </form>
    `;

    mainBox.innerHTML += formHTML;

    document.getElementById('numberForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const numbers = Array.from({length: 10}, (_, i) =>
    parseFloat(this.elements[`number${i}`].value)
    );
    const min = Math.min(...numbers);

    const count = numbers.filter(num => num === min).length;

    setCookie("minNumbersCount", count, 1);

    alert(`Кількість мінімальних чисел: ${count}`);

    location.reload();
});
}

    window.addEventListener('load', () => {
    const savedCount = getCookie("minNumbersCount");
    const mainBox = document.querySelector('.main');

    if (savedCount) {
    if (confirm(`Збережений результат: кількість мінімальних чисел = ${savedCount}\nНатисніть OK для видалення даних з cookie`)) {
    deleteCookie("minNumbersCount");
    if (confirm("Cookie видалено. Натисніть OK для перезавантаження сторінки")) {
    location.reload();
}
}
} else {
    const showFormButton = document.createElement('button');
    showFormButton.textContent = 'Показати форму для введення чисел';
    showFormButton.style.marginBottom = '10px';
    showFormButton.addEventListener('click', createNumberForm);
    mainBox.appendChild(showFormButton);
}
});

    function changeTextColor() {
    const mainBox = document.querySelector('.main');

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = localStorage.getItem('mainBoxColor') || '#000000'; // Беремо збережений колір або чорний за замовчуванням

    const label = document.createElement('label');
    label.textContent = 'Виберіть колір тексту: ';

    colorInput.addEventListener('input', function() {
    mainBox.style.color = this.value;
    localStorage.setItem('mainBoxColor', this.value);
});

    const controlsContainer = document.createElement('div');
    controlsContainer.style.marginBottom = '10px';
    controlsContainer.appendChild(label);
    controlsContainer.appendChild(colorInput);

    mainBox.insertBefore(controlsContainer, mainBox.firstChild);
}

    window.addEventListener('load', () => {
    const mainBox = document.querySelector('.main');

    const savedColor = localStorage.getItem('mainBoxColor');
    if (savedColor) {
    mainBox.style.color = savedColor;
}

    const colorButton = document.createElement('button');
    colorButton.textContent = 'Змінити колір тексту';
    colorButton.style.marginBottom = '10px';
    colorButton.addEventListener('click', changeTextColor);

    mainBox.insertBefore(colorButton, mainBox.firstChild);
});




function createListForm(targetBox) {
    const form = document.createElement('form');
    form.className = 'list-form';

    const ul = document.createElement('ul');
    ul.className = 'dynamic-list';

    const inputContainer = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Введіть текст пункту списку';
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = 'Додати пункт';

    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.textContent = 'Зберегти список';

    addButton.addEventListener('click', () => {
        if (input.value.trim()) {
            const li = document.createElement('li');
            li.textContent = input.value;
            ul.appendChild(li);
            input.value = '';
        }
    });

    saveButton.addEventListener('click', () => {
        const items = Array.from(ul.children).map(li => li.textContent);
        if (items.length > 0) {
            // Get a unique identifier for the box
            let boxId;
            if (targetBox.classList.contains('high_box')) {
                boxId = 'high_box';
            } else if (targetBox.classList.contains('low_box')) {
                boxId = 'low_box';
            } else {
                boxId = targetBox.className.split(' ')[0];
            }

            // Save to localStorage
            localStorage.setItem(boxId, JSON.stringify(items));

            // Clear all existing content
            targetBox.innerHTML = '';

            // Add the new list
            const newUl = document.createElement('ul');
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                newUl.appendChild(li);
            });
            targetBox.appendChild(newUl);
        }
    });

    inputContainer.appendChild(input);
    inputContainer.appendChild(addButton);
    form.appendChild(inputContainer);
    form.appendChild(ul);
    form.appendChild(saveButton);

    return form;
}

function initListCreator() {
    const boxes = document.querySelectorAll('.box, .high_box, .low_box');

    boxes.forEach(box => {
        box.addEventListener('dblclick', (e) => {
            if (e.target === box || e.target.parentElement === box) {
                if (!box.querySelector('.list-form')) {
                    const form = createListForm(box);
                    box.appendChild(form);
                }
            }
        });
    });
}

window.addEventListener('load', () => {
    localStorage.clear();

    const activateButton = document.createElement('button');
    activateButton.textContent = 'Активувати створення списків';
    activateButton.style.margin = '10px';
    activateButton.addEventListener('click', initListCreator);

    document.querySelector('.main').prepend(activateButton);
});