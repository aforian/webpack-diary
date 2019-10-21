import { triangleArea, rectArea } from 'src/utils/math';

test('矩形公式,輸入寛為4,高為5,預期得到 20', () => {
  expect(rectArea(4,5)).toBe(20);
});

describe('測試 三角形 公式', function(){

  test('輸入底為3,高為2,預期得到 3', () => {
    expect(triangleArea(3, 2)).toBe(3);
  });

  test('輸入底為90,高為44,預期得到 1980', () => {
    expect(triangleArea(90, 44)).toBe(1980);
  });

  test('輸入底為31,高為6,預期得到 1980', () => {
    expect(triangleArea(31, 6)).toBe(93);
  });
})
