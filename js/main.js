'use strict'

var gInits = []
var shouldBeNum = 1
var timer
var gInterval
var gSize

var hr = 0
var min = 0
var sec = 0
var milliseconds = 0

function init(size) {

    var elBtn = document.querySelectorAll('.btn')

    for( var i=0; i<elBtn.length ; i++) { //turn the chosen difficulty button to red
        
        var currBtn = elBtn[i]
       
        if (currBtn.innerText==size.innerText) {
            currBtn.style.backgroundColor = 'red'
            break;
        }
    }

    var elDifficultiButtons = document.querySelector('.difficultyChoices') //lock the difficulty buttons
    elDifficultiButtons.style.pointerEvents= 'none'

    var elReRun = document.querySelector('.reStart') //make sure that if this notthe first game, the restart button is not displayed
    elReRun.style.display = 'none'

    var boardSize = +size.innerText 
    gSize = boardSize
    var boardValues = getBoardValues(boardSize)
    createBoard(boardSize,boardValues)
}

function checkPress(number) {
    
    var elInnerText = number.innerText
    var elNumber = number

    console.log(elInnerText);
    if (elInnerText==shouldBeNum) {
        elNumber.style.backgroundColor = 'red'
        elNumber.onclick = function() {
        this.disabled = true;
        }

        if(shouldBeNum===gSize) {
            clearInterval(gInterval)
            var elReRun = document.querySelector('.reStart')
            elReRun.style.display = 'inline'
        }
        shouldBeNum++
    } 
}

function getRandomNum(values){
    
    var number = values[Math.floor(Math.random()*values.length)];

    var index = values.indexOf(number);
    if (index !== -1) {
        values.splice(index, 1);
    }
    return number
}

function createBoard(size,values) {

    var strHTML = '<table>'

    for( var i=0; i<Math.sqrt(size); i++) {
        strHTML+='<tr>'

        for( var j=0; j<Math.sqrt(size) ; j++) {
            var randomNum = getRandomNum(values)
            
            if(randomNum==1) {
                strHTML+=`<td onclick="createTimer(); checkPress(this)" class="number${randomNum}">${randomNum}</td>` //start timer in the first press
            } else {

                strHTML+=`<td onclick="checkPress(this)" class="number${randomNum}">${randomNum}</td>`
            }
        }

        strHTML+='</tr>'
    }
    
    strHTML+='</table>'

    var elPlayArea = document.querySelector('.playArea')
    elPlayArea.innerHTML = strHTML
}

function createTimer () {
    gInterval = setInterval(startTimer,1)
    
}

function startTimer(){
    
    var elModal = document.querySelector('.modal')
    timer = `${hr}:${min}:${sec}.${milliseconds}`
    elModal.innerText= timer
    elModal.style.display = 'inline'
    
    milliseconds+=1

    if(milliseconds == 250) {
        sec+=1 
        milliseconds = 0
    }

    if(sec == 60) {
        min = min+1
        milliseconds = 0
        sec = 0 
    }
    if(min==60) {
        hr = hr +1
        milliseconds = 0
        sec = 0 
        min = 0
    }
    
}

function getBoardValues(size) {
    
    for(var i=0 ; i<size ; i++) {
        gInits[i] = i+1
    }
    return gInits
}

function newGame() {
    var elDifficultiButtons = document.querySelector('.difficultyChoices')
    elDifficultiButtons.style.pointerEvents = 'auto'

    var elBtn = document.querySelectorAll('.btn')

    for (var i=0 ; i<elBtn.length ; i++) {
        var elCurrBtn = elBtn[i]
        elCurrBtn.style.backgroundColor = 'lightgreen'
    }
    shouldBeNum = 1
    hr = 0
    min = 0
    sec = 0
    milliseconds = 0
    timer = 0
    
    var elModal = document.querySelector('.modal')
    elModal.innerText= timer
    elModal.style.display = 'none'

}
