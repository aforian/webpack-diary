function initBody() {
  var element = document.createElement('div');
  var msg = 'Hello World!!'+ process.env.NODE_ENV;

  element.innerHTML = msg;
  console.log(msg)

  return element;
}

document.body.appendChild(initBody());