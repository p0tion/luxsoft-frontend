function buildItem(item) {
    let div = document.createElement('div');
    let label;
    let element;

    if (item.label !== undefined) {
        label = document.createElement('label');
        let text = document.createTextNode(item.label);
        label.appendChild(text);
    }

    if (item.type !== undefined) {
        switch (item.type) {
            case 'input':
                element = document.createElement(item.type);
                element.setAttribute('type', 'text');
                setIdIfPresent(item, element)
                label.setAttribute('for', element.id);
                div.appendChild(label);
                let elementDiv = document.createElement('div');
                elementDiv.appendChild(element);
                div.appendChild(elementDiv);
                break;
            case 'checkbox':
                let checkboxDiv = document.createElement('div');
                element = document.createElement('input');
                element.setAttribute('type', 'checkbox');
                setIdIfPresent(item, element)
                label.setAttribute('for', element.id);
                checkboxDiv.appendChild(element);
                checkboxDiv.appendChild(label);
                div.appendChild(checkboxDiv);
                break;
            case 'title':
                element = document.createElement(item.type);
                let text = document.createTextNode(item.label);
                element.appendChild(text);
                setIdIfPresent(item, element)
                div.appendChild(element);
        }
    }

    return div;
}

function setIdIfPresent(item, element) {
    if (item.id !== undefined) {
        element.id = item.id;
    }
}

function buildFormFromJson(jsonObj) {
    let form = document.createElement(jsonObj["type"]);
    let items = jsonObj["items"];
    for (let i = 0; i < items.length; i++) {
        form.appendChild(buildItem(items[i]));
    }
    return form;
}

function render(jsonObj) {
    let resBlock = document.getElementById('result');
    resBlock.innerHTML = "";
    resBlock.appendChild(buildFormFromJson(jsonObj));
}

function handleButtonClick() {
    render(JSON.parse(document.getElementById('input_txtarea').value));
}