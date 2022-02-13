import $ from 'jquery';

import goodBye from '@/goodBye';

import './styles/index.css';
import './styles/image.css';
import './sass/index.sass';
import imgUrl1 from './images/javascript.png';
import imgUrl2 from './images/placehold01.jpeg';

// import { triangleArea, rectArea } from 'src/utils/math';

function initBody() {
  const msg = 'Hello World!!';

  console.log(msg);
  console.log(`env: ${process.env.NODE_ENV}`);

  goodBye();

  const arr1 = ['apple', 'samsung', 'hauwei'];
  // arr1.forEach((item, index) => console.log(`${index}: hello ${item}!`));
  arr1.forEach((item) => console.log(`hello ${item}!`));

  document.body.setAttribute('home', '');

  // const obj1 = {
  //   name: 'alex ian',
  //   age: 25,
  // };

  // create DOM
  const element = document.createElement('div');
  element.classList.add('container');
  element.innerHTML = msg;

  const img1 = document.createElement('img');
  img1.src = imgUrl1;

  const img2 = document.createElement('img');
  img2.src = imgUrl2;

  element.appendChild(img1);
  element.appendChild(img2);

  return element;

}

document.body.appendChild(initBody());

(function jqueyNow() {
  $('div').append('<p>Text Here</p>');
  $('div').append('<p>Text Here 2</p>');
}($));
