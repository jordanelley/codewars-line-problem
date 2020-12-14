const line = (grid) => {
    //todo check for unused characters
    //todo check + is a corner

    const numOfStartLocations=2;
    const startLocations = findItemCoordinates('X',grid);
    if(startLocations.length!==numOfStartLocations)
        return false;
    for(let startPoint =0; startPoint<numOfStartLocations; startPoint++){ //loops twice to check both directions
        let X = startLocations[startPoint][0];
        let Y = startLocations[startPoint][1];

        const result = continuePath(X,Y,grid)
        if(result){
            return true;
        }
    }
    return false;
}

const continuePath = (X, Y, grid) =>{
    const surroundingCharsAllowed = {
        '-':{
            up: [],
            down: [],
            left: ['-','+','X'],
            right: ['-','+','X']
        },
        '|':{
            up: ['|','+','X'],
            down: ['|','+','X'],
            left: [],
            right: []
        },
        '+':{
            up: ['|','+'],
            down: ['|','+'],
            left: ['-','+'],
            right: ['-','+']
        },
        'X':{
            up: ['|','+','X'],
            down: ['|','+','X'],
            left: ['-','+','X'],
            right: ['-','+','X']
        }
    }

    const surroundingSquares = getSurroundingSquares(X,Y,grid)

    for (const [relativeDirectionToCurrentSquare, currentSurroundingSymbol] of Object.entries(surroundingSquares)) {
        const symbol = grid[X][Y];
        const allowedSymbols = surroundingCharsAllowed[symbol][relativeDirectionToCurrentSquare];
        if(allowedSymbols.includes(currentSurroundingSymbol)){
            if(currentSurroundingSymbol === 'X')
                return true;
            const newCoordinates= getNewCoordinates(X,Y,relativeDirectionToCurrentSquare)
            return continuePath(newCoordinates.X,newCoordinates.Y,grid);
        }
    }
    return false;
}

const getNewCoordinates = (X,Y, direction) =>{
    //todo ignore negatives
    const coordinateMap = {
        right: {X:X,Y:Y+1},
        left: {X:X,Y:Y-1},
        up: {X:X-1,Y:Y},
        down: {X:X+1,Y:Y}
    }
    return coordinateMap[direction];
}

const getSurroundingSquares = (X,Y,grid) => {
    //todo ignore negatives
    return {
        right: grid[X][Y+1],
        left: grid[X][Y-1],
        up: grid[X-1][Y],
        down: grid[X+1][Y],
    }
}

const findItemCoordinates = (item,grid) => {
    const items =[];
    for(let x =0; x<grid.length; x++){
        for(let y =0; y<= grid[x].length; y++){
            if(grid[x][y]===item){
                items.push([x,y]);
            }
        }
    }
    return items;
}
module.exports ={line,findItemCoordinates}