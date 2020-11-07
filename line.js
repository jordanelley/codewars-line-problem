const line = (grid) => {
    const surroundingCharsAllowedForXorPlus = {
        up: ['|','+','X'],
        down: ['|','+','X'],
        left: ['-','+','X'],
        right: ['-','+','X']
    }
    const numOfStartLocations=2;
    const startLocations = findItemCoordinates('X',grid);
    if(startLocations.length!==numOfStartLocations)
        return false;
    for(let startPoint =0; startPoint<2; startPoint++){
        let X = startLocations[startPoint][0];
        let Y = startLocations[startPoint][1];
        let surroundingSquares={
            up: grid[X][Y+1],
            down: grid[X][Y-1],
            left: grid[X-1][Y],
            right: grid[X+1][Y],
        }
        for (const [relativeDirectionToCurrentSquare, value] of Object.entries(surroundingSquares)) {
            //console.log(`${key}: ${value}`);
            if(relativeDirectionToCurrentSquare==='up'||relativeDirectionToCurrentSquare==='down' ){

            }
        }


    }
    return false;
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