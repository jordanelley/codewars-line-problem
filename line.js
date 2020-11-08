const line = (grid) => {
    const surroundingCharsAllowedForStartPoint = {
        up: ['|','+','X'],
        down: ['|','+','X'],
        left: ['-','+','X'],
        right: ['-','+','X']
    }


    const numOfStartLocations=2;
    const startLocations = findItemCoordinates('X',grid);
    if(startLocations.length!==numOfStartLocations)
        return false;
    for(let startPoint =0; startPoint<numOfStartLocations; startPoint++){
        let X = startLocations[startPoint][0];
        let Y = startLocations[startPoint][1];
        // let surroundingSquares=getSurroundingSquares(X,Y,grid);
        // for (const [relativeDirectionToCurrentSquare, currentNewSymbol] of Object.entries(surroundingSquares)) {
        //     const allowedSymbols = surroundingCharsAllowedForStartPoint[relativeDirectionToCurrentSquare];
        //     if(allowedSymbols.includes(currentNewSymbol)){
        //         continuePath(X,Y,currentNewSymbol,grid);
        //     }
        // }




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
            up: ['|','+','X'],
            down: ['|','+','X'],
            left: ['-','+','X'],
            right: ['-','+','X']
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
            const newCoordinates= getNewCoordinates(X,Y,relativeDirectionToCurrentSquare)
            continuePath(newCoordinates.X,newCoordinates.Y,grid);
        }
    }
}

const getNewCoordinates = (X,Y, direction) =>{
    //todo ignore negatives
    const coordinateMap = {
        up: {X:X,Y:Y+1},
        down: {X:X,Y:Y-1},
        left: {X:X-1,Y:Y},
        right: {X:X+1,Y:Y}
    }
    return coordinateMap[direction];
}

const getSurroundingSquares = (X,Y,grid) => {
    //todo ignore negatives
    return {
        up: grid[X][Y+1],
        down: grid[X][Y-1],
        left: grid[X-1][Y],
        right: grid[X+1][Y],
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