import './styles/index.css';
import './styles/image.css';
import $ from 'jquery';
import imgUrl1 from './images/javascript.png';
import imgUrl2 from './images/placehold01.jpeg';

import goodBye from '@/goodBye';

function initBody() {
  var element = document.createElement('div');
  var msg = 'Hello World!!';

  element.innerHTML = msg;
  console.log(msg)
  console.log(`env: ${process.env.NODE_ENV}`);

  var img1 = document.createElement('img');
  img1.src = imgUrl1;

  var img2 = document.createElement('img');
  img2.src = imgUrl2;

  element.appendChild(img1);
  element.appendChild(img2);

  goodBye();

  const arr1 = ['apple','samsung','hauwei'];
  arr1.forEach((item, index) => console.log(`${index}: hello ${item}!`))

  return element;

}

document.body.appendChild(initBody());

(function($){
  $('div').append('<p>Text Here</p>');
  $('div').append('<p>Text Here 2</p>');
})($)