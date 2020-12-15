const line = require('../line');

test('should add a line of blank spaces on each edge of the grid', () =>{
    expect(line.addPadding([
        ['X','-','-'],
        ['-','-','X']
    ])).toBe([
        [' ',' ',' ',' ',' '],
        [' ','X','-','-',' '],
        [' ','-','-','X',' '],
        [' ',' ',' ',' ',' ']
    ]);
})
test('should add a line of blank spaces on each edge of the grid for empty', () =>{
    expect(line.addPadding(
        []
    )).toBe([
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' '],
    ]);
})