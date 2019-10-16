import './index.css'

function initBody() {
  var element = document.createElement('div');
  var msg = 'Hello World!!';

  element.innerHTML = msg;
  console.log(msg)
  console.log(`env: ${process.env.NODE_ENV}`)

  return element;
}

document.body.appendChild(initBody());