

const line = (grid) => {
    //todo check for unused characters
    //todo check + is a corner

    grid = addPadding(grid);

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

const continuePath = (X, Y, grid, disallowedCoordinate = null) =>{
    const surroundingCharsAllowed = getSurroundingCharsAllowed()
    const surroundingSquares = getSurroundingSquares(X,Y,grid)

    for (const [relativeDirectionToCurrentSquare, currentSurroundingSymbol] of Object.entries(surroundingSquares)) {
        const symbol = grid[X][Y];
        const allowedSymbols = surroundingCharsAllowed[symbol][relativeDirectionToCurrentSquare];
        const newCoordinates= getNewCoordinates(X,Y,relativeDirectionToCurrentSquare)
        if(allowedSymbols.includes(currentSurroundingSymbol) && notOnADisAllowedCoordinate(disallowedCoordinate,newCoordinates)){
            if(currentSurroundingSymbol === 'X')
                return true;
            grid = wipeCurrentSquare(X,Y,grid) //so it doesnt get reprocessed
            if(currentSurroundingSymbol === "+"){
                return continuePath(newCoordinates.X,newCoordinates.Y,grid,findDisallowedAxisToFollowPlus({X:X,Y:Y},newCoordinates));
            }
            return continuePath(newCoordinates.X,newCoordinates.Y,grid);  //todo save path result so the loop can continue if fails
        }
    }
    return false;
}

const notOnADisAllowedCoordinate = (disallowedCoordinate,newCoordinates) => {
    if(!disallowedCoordinate){
        return true
    }
    return !(disallowedCoordinate.X === newCoordinates.X || disallowedCoordinate.Y === newCoordinates.Y);


}

const findDisallowedAxisToFollowPlus =(previousCoordinates, plusCoordinates) => {
    if(previousCoordinates.X === plusCoordinates.X)
        return {X: plusCoordinates.X, Y: null}
    if(previousCoordinates.Y !== plusCoordinates.Y)
        console.error("coordinates are disconnected");
    return {X: null, Y: plusCoordinates.Y}
}

const getSurroundingCharsAllowed = () => {return{
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
}}

const getNewCoordinates = (X,Y, direction) =>{
    const coordinateMap = {
        right: {X:X,Y:Y+1},
        left: {X:X,Y:Y-1},
        up: {X:X-1,Y:Y},
        down: {X:X+1,Y:Y}
    }
    return coordinateMap[direction];
}

const wipeCurrentSquare = (X,Y,grid) => {
    grid[X][Y]= '^'
    return grid;
}

const getSurroundingSquares = (X,Y,grid) => {
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

const addPadding = (grid) => { //padding is added so the search does not go out of range
    const numOfRows = grid.length > 0 ? grid[0].length : 0;

    grid.unshift(createBlankColumn(numOfRows));
    grid.push(createBlankColumn(numOfRows));

    grid.forEach(column => {
        column.unshift(' ');
        column.push(' ');
    })

    return grid;
}

const createBlankColumn = (rows)=>{
    const column = []
    for(let i =0;i<rows;i++){
        column.push(' ');
    }
    return column
}
module.exports ={line,findItemCoordinates,addPadding,createBlankColumn}