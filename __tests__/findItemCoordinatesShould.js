const line = require('../line');

test('find single X on the Grid at 0,0', () =>{
    expect(line.findItemCoordinates('X',
        [
            ['X','-','-']
        ]).toString()).toBe([[0,0]].toString());
})

test('find double X on the Grid at 0,0 and 1,2', () =>{
    expect(line.findItemCoordinates('X',
        [
            ['X','-','-'],
            ['-','-','X']
        ]).toString()).toBe([[0,0],[1,2]].toString());
})

test('find no Xs', () =>{
    expect(line.findItemCoordinates('X',
        [
            ['-','-','-'],
            ['-','-','-']
        ]).toString()).toBe([].toString());
})

