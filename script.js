let cl = console.log
// GET ELEMENTS
let form = document.getElementById('form');
let input = document.getElementById('input');
// let submit = document.getElementById('submit');
let listParent = document.getElementById('listParent')
// let removeEle = document.createElement('span.remove-ele');
// FUNCTIONS
let toDoArr = [];
form.addEventListener('submit', ev => {
  ev.preventDefault();
  location.reload();
  let obj = {
    id: Date.now(),
  }
  obj.title = input.value;
  toDoArr.unshift(obj);
  localStorage.setItem('key', JSON.stringify(toDoArr));
})
let clearBtn = document.createElement('clearBtn');
// LET THE ARRAY RETURN THE VALUE FROM THE LOCALSTORAGE
let keyItem = JSON.parse(localStorage.getItem('key'));
if (localStorage.getItem('key')) {
  toDoArr = keyItem;
  toDoArr.forEach(ele => {
    let list = document.createElement('p');
    list.setAttribute('class', 'list');
    let removeBtn = document.createElement('span');
    removeBtn.setAttribute('class', 'remove-ele');
    removeBtn.textContent = "remove";
    list.textContent = ele.title.toUpperCase();
    list.appendChild(removeBtn);
    listParent.append(list);
    // WORK WITH REMOVE ITEM.
    removeBtn.addEventListener('click', ev => {
      let target = ev.target;
      let list = target.parentNode;
      let listContent = list.textContent.replace('remove', '');
      let element = toDoArr.filter(ele => {
        return ele.title.toUpperCase() == listContent;
      })
      toDoArr.splice(toDoArr.indexOf(...element), 1);
      localStorage.setItem('key', JSON.stringify(toDoArr));
      location.reload();
    })
  });
  listParent.style = 'display: flex;';
  listParent.appendChild(clearBtn);
}
window.onload = (e) => {
  input.focus();
}
// WORK WITH PROMPT
let prompt = document.getElementById('prompt');
let promptInput = document.getElementById('promptInput');
let buttons = document.getElementById('buttons');
let confirmButton = document.getElementById('confirmButton');
let cancelButton = document.getElementById('cancelButton');
promptInput.addEventListener('change', e => {
  if (promptInput.value === 'CLEAR') {
    buttons.addEventListener('click', (ev) => {
      ev.preventDefault();
      let target = ev.target;
      if (target === confirmButton) {
        localStorage.clear(); location.reload()
      } else location.reload();
    },true)
  } else {
    buttons.addEventListener('click', (ev) => {(ev.target === confirmButton) ? location.reload() : location.reload()},true)
  }
})
if (!toDoArr[0]) {
  clearBtn.style.display = 'none';
  listParent.style.display = 'none'
}
clearBtn.setAttribute('class', 'clearBtn')
clearBtn.textContent = 'clear';
clearBtn.onclick = function (e) {
  e.preventDefault();
  prompt.style = 'display: flex;'
}