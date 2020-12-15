const line = require('../line');

test('should add a line of blank spaces on each edge of the grid', () =>{
    expect(line.addPadding([
        ['X','-','-'],
        ['-','-','X']
    ]).toString()).toBe([
        [' ',' ',' ',' ',' '],
        [' ','X','-','-',' '],
        [' ','-','-','X',' '],
        [' ',' ',' ',' ',' ']
    ].toString());
})

test('should add a line of blank spaces on each edge of the grid 2', () =>{
    expect(line.addPadding([
        ['X'],

    ]).toString()).toBe([
        [' ',' ',' '],
        [' ','X',' '],
        [' ',' ',' ']

    ].toString());
})
test('should add a line of blank spaces on each edge of the grid for empty', () =>{
    expect(line.addPadding(
        []
    ).toString()).toBe([
        [' ',' '],
        [' ',' '],
    ].toString());
})

test('createBlankColumnShould_createColumnWithCorrectRowNumbers', () =>{
    expect(line.createBlankColumn(
        3
    ).toString()).toBe(
        [' ',' ',' '].toString()
    );
})