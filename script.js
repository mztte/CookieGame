//author: Matt Briggs
//version 1.0.7
let ct = document.getElementById('clicker-counter')
let cps = 0
let cpsPower = 1
let counter = 0
let TFV = 2 //toFixed Value
let loopSpeedRatio = 0.1
let clickPower = 1
let iNF = new Intl.NumberFormat('en-US') //international formatter used for the numbers to incorporate commas
let prices = { //this actually doesn't have anything to do with prices anymore really it just holds a ton of information so that I can store it in local storage
    "version" : '1.0.7', //used to make sure last save-state was using the current prices
    //item# : [price, amount, maxAmount]
    //first shop items
    "clickpower" : [250, 0, 20],
    "cpspower" : [1500, 0, 11],
    "item1" : [2, 0, 100], //0.1cps
    "item2" : [50, 0, 100], //0.5cps
    "item3" : [300, 0, 75], //1cps
    "item4" : [1000, 0, 75], //5cps
    "item5" : [3000, 0, 75], //10cps
    "item6" : [12000, 0, 50], //25cps
    "item7" : [45000, 0, 50], //50cps
    "item8" : [100000, 0, 50], //100cps
    "item9" : [750000, 0, 30], //250cps
    "item10" : [2600000, 0, 30], //1000cps
    "item11" : [8808808, 0, 30], //3000cps
    "item12" : [77777777, 0, 25], //10000cps
    "item13" : [120000000, 0, 20], //20000cps
    "item14" : [450000000, 0, 20], //40000cps
    "item15" : [1000000000, 0, 15], //100000cps
    "item16" : [5000000000, 0, 10], //275000cps

    //second shop items
    "carrot" : [50000, 0, 1],
    "taco" : [350000, 0, 1],
    "cupcake" : [7500000,0,1],
    "duck" : [100000000, 0, 1],
    "unicorn" : [0, 0, 1],

    //for background music
    "isMusic" : false,
}
let codes = {
    //key : [cookies added, isRedeemed?]
    "cookiemonster" : [5000000, false], 
    "devbuildonly$" : [100000000000000, false],
    "un1c0rn" : [0, false], //special -- changes to unicorn image
    "colors" : [0, false], //special -- makes rainbowmode
    "bobo" : [1000000, false],
    "chicken" : [20000, false],
    "hello" : [50000, false],
    "egg" : [200000, false],
    "i<3tacos" : [200000, false],
    "rick" : [0, false], //special -- activates rickroll
    "42" : [420000, false],
    "narwhal" : [15000000, false],
    "does$" : [0, false], //special -- punishment for saying pineapple does belong on pizza
    "doesnot$" : [0, false], //special -- reward for saying pineapple belongs on pizza
}
//for second shop
let currentSelected = 'cookie'
let shopNumber = 1
const shopPage1 = document.getElementById('sub-shop')
const shopPage2 = document.getElementById('sub-shop-2')
const shopPage3 = document.getElementById('sub-shop-3')
let clickerImgMargin = document.querySelector(':root')
function setImgMargin(margin) {
    clickerImgMargin.style.setProperty('--clicker-btn-margin', margin)
}
//reset save-state every new update / version of the game
try {
    if(prices['version'] !== JSON.parse(localStorage.getItem('items'))['version']) {
        save() //reset if the version of the previous save does not align with current version, if there is no localStorage, catch an error
        window.alert("There's been an update! This means that your data may have gotten reset")
    }
} catch(error) {
    console.log(error)
    console.log("Reason: User does not have any local storage")
    save() //call save if there is no localStorage to define a starting localStorage
}

//every second check to make sure that there isnt too many digits on the counter
//also updates how fast it counts up to reduce lag at higher values
const formatLoop = window.setInterval(() => {
    if( counter < 100 ) {
        TFV = 2
        loopSpeedRatio = 0.05
    }
    if( counter >= 100 && counter < 1000) {
        TFV = 1
        loopSpeedRatio = 0.1
    }
    if( counter >= 1000) {
        TFV = 0
    }
    if(counter >= 100000) {
        loopSpeedRatio = 0.15
    }
}, 1000)

//inputs all js variables into HTML DOM (used when loading in the game)
//this is bad design lol
function updateAll() {
    document.getElementById('click-power-price').innerHTML = `Price: ${iNF.format(prices['clickpower'][0].toFixed(0))}C`
    document.getElementById('click-power-amount').innerHTML = `${prices['clickpower'][1]}`
    document.getElementById('cps-power-price').innerHTML = `Price: ${iNF.format(prices['cpspower'][0].toFixed(0))}C`
    document.getElementById('cps-power-amount').innerHTML = `${prices['cpspower'][1]}`
    document.getElementById('item-1-price').innerHTML = `Price: ${iNF.format(prices['item1'][0].toFixed(0))}C`
    document.getElementById('item-1-amount').innerHTML = `${prices['item1'][1]}`
    document.getElementById('item-2-price').innerHTML = `Price: ${iNF.format(prices['item2'][0].toFixed(0))}C`
    document.getElementById('item-2-amount').innerHTML = `${prices['item2'][1]}`
    document.getElementById('item-3-price').innerHTML = `Price: ${iNF.format(prices['item3'][0].toFixed(0))}C`
    document.getElementById('item-3-amount').innerHTML = `${prices['item3'][1]}`
    document.getElementById('item-4-price').innerHTML = `Price: ${iNF.format(prices['item4'][0].toFixed(0))}C`
    document.getElementById('item-4-amount').innerHTML = `${prices['item4'][1]}`
    document.getElementById('item-5-price').innerHTML = `Price: ${iNF.format(prices['item5'][0].toFixed(0))}C`
    document.getElementById('item-5-amount').innerHTML = `${prices['item5'][1]}`
    document.getElementById('item-6-price').innerHTML = `Price: ${iNF.format(prices['item6'][0].toFixed(0))}C`
    document.getElementById('item-6-amount').innerHTML = `${prices['item6'][1]}`
    document.getElementById('item-7-price').innerHTML = `Price: ${iNF.format(prices['item7'][0].toFixed(0))}C`
    document.getElementById('item-7-amount').innerHTML = `${prices['item7'][1]}`
    document.getElementById('item-8-price').innerHTML = `Price: ${iNF.format(prices['item8'][0].toFixed(0))}C`
    document.getElementById('item-8-amount').innerHTML = `${prices['item8'][1]}`
    document.getElementById('item-9-price').innerHTML = `Price: ${iNF.format(prices['item9'][0].toFixed(0))}C`
    document.getElementById('item-9-amount').innerHTML = `${prices['item9'][1]}`
    document.getElementById('item-10-price').innerHTML = `Price: ${iNF.format(prices['item10'][0].toFixed(0))}C`
    document.getElementById('item-10-amount').innerHTML = `${prices['item10'][1]}`
    document.getElementById('item-11-price').innerHTML = `Price: ${iNF.format(prices['item11'][0].toFixed(0))}C`
    document.getElementById('item-11-amount').innerHTML = `${prices['item11'][1]}`
    document.getElementById('item-12-price').innerHTML = `Price: ${iNF.format(prices['item12'][0].toFixed(0))}C`
    document.getElementById('item-12-amount').innerHTML = `${prices['item12'][1]}`
    document.getElementById('item-13-price').innerHTML = `Price: ${iNF.format(prices['item13'][0].toFixed(0))}C`
    document.getElementById('item-13-amount').innerHTML = `${prices['item13'][1]}`
    document.getElementById('item-14-price').innerHTML = `Price: ${iNF.format(prices['item14'][0].toFixed(0))}C`
    document.getElementById('item-14-amount').innerHTML = `${prices['item14'][1]}`
    document.getElementById('item-15-price').innerHTML = `Price: ${iNF.format(prices['item15'][0].toFixed(0))}C`
    document.getElementById('item-15-amount').innerHTML = `${prices['item15'][1]}`
    document.getElementById('item-16-price').innerHTML = `Price: ${iNF.format(prices['item16'][0].toFixed(0))}C`
    document.getElementById('item-16-amount').innerHTML = `${prices['item16'][1]}`
    

    ct.innerHTML = iNF.format(parseFloat(counter).toFixed(TFV)) + 'C'
    document.getElementById('cps').innerHTML = `${cps.toFixed(1)}cps x${cpsPower}`

}
function isMax(item) {
    if(prices[item][1] == prices[item][2]) {
        return true
    } else {
        return false
    }
}
function priceFormat(item) {
    return iNF.format(prices[item][0].toFixed(0))
}
//adders
function addAmount(amount) {
    counter += amount
    ct.innerHTML = iNF.format(parseFloat(counter).toFixed(TFV)) + 'C'
}
function addCPS (num) {
    cps += num
    document.getElementById('cps').innerHTML = `${cps.toFixed(1)}cps x${cpsPower}` 
}
//add the cps every second * fraction (loop speed), as well as cps * fraction (loop speed) to make sure output is the same per second
const cpsLoop = window.setInterval(() => {
    counter += cps*loopSpeedRatio*cpsPower
    ct.innerHTML = iNF.format(parseFloat(counter).toFixed(TFV)) + 'C'
}, 1000*loopSpeedRatio)

//purchase items functions (mostly copy and paste)
function addClickPower () {
    if(counter >= prices['clickpower'][0]) {
        if(!isMax('clickpower')){
            prices['clickpower'][1]++
            counter -= prices['clickpower'][0]
            clickPower *= 2
            prices['clickpower'][0]= (prices['clickpower'][0]*3) + 1000
            document.getElementById('click-power-price').innerHTML = `Price: ${priceFormat('clickpower')}C`            
            document.getElementById('click-power-amount').innerHTML = `${prices['clickpower'][1]}`
        }  
        if(isMax('clickpower')) {
            console.log('clickpower maxed')
            document.getElementById('click-power-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('click-power-amount').style.color = "gold"

            document.getElementById('click-power-price').innerHTML = 'MAXED'
            document.getElementById('click-power-price').style.textShadow = "0px 0px 10px white"

        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addCPSPower () {
    
    if(counter >= prices['cpspower'][0]) {
        if(!isMax('cpspower')) {
            prices['cpspower'][1]++;
            counter -= prices['cpspower'][0]
            cpsPower *= 2
            addCPS(0) //updates
            prices['cpspower'][0]= (prices['cpspower'][0]*10.8)
            document.getElementById('cps-power-price').innerHTML = `Price: ${priceFormat('cpspower')}C`
            document.getElementById('cps-power-amount').innerHTML = `${prices['cpspower'][1]}`
        }
        if(isMax('cpspower')) {
            console.log('cpspower maxed')
            document.getElementById('cps-power-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('cps-power-amount').style.color = "gold"

            document.getElementById('cps-power-price').innerHTML = 'MAXED'
            document.getElementById('cps-power-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem1 () {
    if(counter >= prices['item1'][0]) {
        if(!isMax('item1')) {
            prices['item1'][1]++;
            counter -= prices['item1'][0]
            addAmount(0) //updates amount
            addCPS(0.1)
            prices['item1'][0]= (prices['item1'][0]*1.15) + 3
            document.getElementById('item-1-price').innerHTML = `Price: ${priceFormat('item1')}C`
            document.getElementById('item-1-amount').innerHTML = `${prices['item1'][1]}`
        }
        if(isMax('item1')) {
            console.log('item1 maxed')
            document.getElementById('item-1-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-1-amount').style.color = "gold"

            document.getElementById('item-1-price').innerHTML = 'MAXED'
            document.getElementById('item-1-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem2 () {
    if(counter >= prices['item2'][0]) {
        if(!isMax('item2')) {
            prices['item2'][1]++;
            counter -= prices['item2'][0]
            addAmount(0) //updates amount
            addCPS(0.5)
            prices['item2'][0]= (prices['item2'][0]* 1.2) + 10
            document.getElementById('item-2-price').innerHTML = `Price: ${priceFormat('item2')}C`
            document.getElementById('item-2-amount').innerHTML = `${prices['item2'][1]}`
        }
        if(isMax('item2')) {
            console.log('item2 maxed')
            document.getElementById('item-2-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-2-amount').style.color = "gold"

            document.getElementById('item-2-price').innerHTML = 'MAXED'
            document.getElementById('item-2-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem3 () {
    if(counter >= prices['item3'][0]) {
        if(!isMax('item3')) {
            prices['item3'][1]++;
            counter -= prices['item3'][0]
            addAmount(0) //updates amount
            addCPS(1)
            prices['item3'][0]= (prices['item3'][0]* 1.25) + 25
            document.getElementById('item-3-price').innerHTML = `Price: ${priceFormat('item3')}C`
            document.getElementById('item-3-amount').innerHTML = `${prices['item3'][1]}`
        }
        if(isMax('item3')) {
            console.log('item3 maxed')
            document.getElementById('item-3-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-3-amount').style.color = "gold"

            document.getElementById('item-3-price').innerHTML = 'MAXED'
            document.getElementById('item-3-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem4 () {
    if(counter >= prices['item4'][0]) {
        if(!isMax('item4')) {
            prices['item4'][1]++;
            counter -= prices['item4'][0]
            addAmount(0) //updates amount
            addCPS(5)
            prices['item4'][0]= (prices['item4'][0]* 1.33) + 200
            document.getElementById('item-4-price').innerHTML = `Price: ${priceFormat('item4')}C`
            document.getElementById('item-4-amount').innerHTML = `${prices['item4'][1]}`
        }
        if(isMax('item4')) {
            console.log('item4 maxed')
            document.getElementById('item-4-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-4-amount').style.color = "gold"

            document.getElementById('item-4-price').innerHTML = 'MAXED'
            document.getElementById('item-4-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem5 () {
    if(counter >= prices['item5'][0]) {
        if(!isMax('item5')) {
            prices['item5'][1]++;
            counter -= prices['item5'][0]
            addAmount(0) //updates amount
            addCPS(10)
            prices['item5'][0]= (prices['item5'][0]* 1.35) + 100
            document.getElementById('item-5-price').innerHTML = `Price: ${priceFormat('item5')}C`
            document.getElementById('item-5-amount').innerHTML = `${prices['item5'][1]}`
        }
        if(isMax('item5')) {
            console.log('item5 maxed')
            document.getElementById('item-5-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-5-amount').style.color = "gold"

            document.getElementById('item-5-price').innerHTML = 'MAXED'
            document.getElementById('item-5-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem6 () {
    if(counter >= prices['item6'][0]) {
        if(!isMax('item6')) {
            prices['item6'][1]++;
            counter -= prices['item6'][0]
            addAmount(0) //updates amount
            addCPS(25)
            prices['item6'][0]= (prices['item6'][0]* 1.35) + 985
            document.getElementById('item-6-price').innerHTML = `Price: ${priceFormat('item6')}C`
            document.getElementById('item-6-amount').innerHTML = `${prices['item6'][1]}`
        }
        if(isMax('item6')) {
            console.log('item6 maxed')
            document.getElementById('item-6-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-6-amount').style.color = "gold"

            document.getElementById('item-6-price').innerHTML = 'MAXED'
            document.getElementById('item-6-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem7 () {
    if(counter >= prices['item7'][0]) {
        if(!isMax('item7')) {
            prices['item7'][1]++;
            counter -= prices['item7'][0]
            addAmount(0) //updates amount
            addCPS(50)
            prices['item7'][0]= (prices['item7'][0]* 1.4) + 1500
            document.getElementById('item-7-price').innerHTML = `Price: ${priceFormat('item7')}C`
            document.getElementById('item-7-amount').innerHTML = `${prices['item7'][1]}`
        }
        if(isMax('item7')) {
            console.log('item7 maxed')
            document.getElementById('item-7-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-7-amount').style.color = "gold"

            document.getElementById('item-7-price').innerHTML = 'MAXED'
            document.getElementById('item-7-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem8 () {
    if(counter >= prices['item8'][0]) {
        if(!isMax('item8')) {
            prices['item8'][1]++;
            counter -= prices['item8'][0]
            addAmount(0) //updates amount
            addCPS(100)
            prices['item8'][0]= (prices['item8'][0]* 1.4) + 5500
            document.getElementById('item-8-price').innerHTML = `Price: ${priceFormat('item8')}C`
            document.getElementById('item-8-amount').innerHTML = `${prices['item8'][1]}`
        }
        if(isMax('item8')) {
            console.log('item8 maxed')
            document.getElementById('item-8-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-8-amount').style.color = "gold"

            document.getElementById('item-8-price').innerHTML = 'MAXED'
            document.getElementById('item-8-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem9 () {
    if(counter >= prices['item9'][0]) {
        if(!isMax('item9')) {
            prices['item9'][1]++;
            counter -= prices['item9'][0]
            addAmount(0) //updates amount
            addCPS(250)
            prices['item9'][0]= (prices['item9'][0]* 1.35) + 70000
            document.getElementById('item-9-price').innerHTML = `Price: ${priceFormat('item9')}C`
            document.getElementById('item-9-amount').innerHTML = `${prices['item9'][1]}`
        }
        if(isMax('item9')) {
            console.log('item9 maxed')
            document.getElementById('item-9-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-9-amount').style.color = "gold"

            document.getElementById('item-9-price').innerHTML = 'MAXED'
            document.getElementById('item-9-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem10 () {
    if(counter >= prices['item10'][0]) {
        if(!isMax('item10')) {
            prices['item10'][1]++;
            counter -= prices['item10'][0]
            addAmount(0) //updates amount
            addCPS(1000)
            prices['item10'][0]= (prices['item10'][0]* 1.5) + 100000
            document.getElementById('item-10-price').innerHTML = `Price: ${priceFormat('item10')}C`
            document.getElementById('item-10-amount').innerHTML = `${prices['item10'][1]}`
        }
        if(isMax('item10')) {
            console.log('item10 maxed')
            document.getElementById('item-10-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-10-amount').style.color = "gold"

            document.getElementById('item-10-price').innerHTML = 'MAXED'
            document.getElementById('item-10-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem11 () {
    if(counter >= prices['item11'][0]) {
        if(!isMax('item11')) {
            prices['item11'][1]++;
            counter -= prices['item11'][0]
            addAmount(0) //updates amount
            addCPS(3000)
            prices['item11'][0]= (prices['item11'][0]* 1.4) + 130000
            document.getElementById('item-11-price').innerHTML = `Price: ${priceFormat('item11')}C`
            document.getElementById('item-11-amount').innerHTML = `${prices['item11'][1]}`
        }
        if(isMax('item11')) {
            console.log('item11 maxed')
            document.getElementById('item-11-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-11-amount').style.color = "gold"

            document.getElementById('item-11-price').innerHTML = 'MAXED'
            document.getElementById('item-11-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem12 () {
    if(counter >= prices['item12'][0]) {
        if(!isMax('item12')) {
            prices['item12'][1]++;
            counter -= prices['item12'][0]
            addAmount(0) //updates amount
            addCPS(10000)
            prices['item12'][0]= (prices['item12'][0]* 1.35) + 250000
            document.getElementById('item-12-price').innerHTML = `Price: ${priceFormat('item12')}C`
            document.getElementById('item-12-amount').innerHTML = `${prices['item12'][1]}`
        }
        if(isMax('item12')) {
            console.log('item12 maxed')
            document.getElementById('item-12-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-12-amount').style.color = "gold"

            document.getElementById('item-12-price').innerHTML = 'MAXED'
            document.getElementById('item-12-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem13 () {
    if(counter >= prices['item13'][0]) {
        if(!isMax('item13')) {
            prices['item13'][1]++;
            counter -= prices['item13'][0]
            addAmount(0) //updates amount
            addCPS(20000)
            prices['item13'][0]= (prices['item13'][0]* 1.5) + 100000
            document.getElementById('item-13-price').innerHTML = `Price: ${priceFormat('item13')}C`
            document.getElementById('item-13-amount').innerHTML = `${prices['item13'][1]}`
        }
        if(isMax('item13')) {
            console.log('item13 maxed')
            document.getElementById('item-13-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-13-amount').style.color = "gold"

            document.getElementById('item-13-price').innerHTML = 'MAXED'
            document.getElementById('item-13-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem14 () {
    if(counter >= prices['item14'][0]) {
        if(!isMax('item14')) {
            prices['item14'][1]++;
            counter -= prices['item14'][0]
            addAmount(0) //updates amount
            addCPS(40000)
            prices['item14'][0]= (prices['item14'][0]* 1.44) + 11000
            document.getElementById('item-14-price').innerHTML = `Price: ${priceFormat('item14')}C`
            document.getElementById('item-14-amount').innerHTML = `${prices['item14'][1]}`
        }
        if(isMax('item14')) {
            console.log('item14 maxed')
            document.getElementById('item-14-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-14-amount').style.color = "gold"

            document.getElementById('item-14-price').innerHTML = 'MAXED'
            document.getElementById('item-14-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem15 () {
    if(counter >= prices['item15'][0]) {
        if(!isMax('item15')) {
            prices['item15'][1]++;
            counter -= prices['item15'][0]
            addAmount(0) //updates amount
            addCPS(100000)
            prices['item15'][0]= (prices['item15'][0]* 1.5) + 100000
            document.getElementById('item-15-price').innerHTML = `Price: ${priceFormat('item15')}C`
            document.getElementById('item-15-amount').innerHTML = `${prices['item15'][1]}`
        }
        if(isMax('item15')) {
            console.log('item15 maxed')
            document.getElementById('item-15-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-15-amount').style.color = "gold"

            document.getElementById('item-15-price').innerHTML = 'MAXED'
            document.getElementById('item-15-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
function addItem16 () {
    if(counter >= prices['item16'][0]) {
        if(!isMax('item16')) {
            prices['item16'][1]++;
            counter -= prices['item16'][0]
            addAmount(0) //updates amount
            addCPS(275000)
            prices['item15'][0]= (prices['item16'][0]* 1.5) + 100000
            document.getElementById('item-16-price').innerHTML = `Price: ${priceFormat('item16')}C`
            document.getElementById('item-16-amount').innerHTML = `${prices['item16'][1]}`
        }
        if(isMax('item16')) {
            console.log('item16 maxed')
            document.getElementById('item-16-amount').style.textShadow = "0px 0px 10px gold"
            document.getElementById('item-16-amount').style.color = "gold"

            document.getElementById('item-16-price').innerHTML = 'MAXED'
            document.getElementById('item-16-price').style.textShadow = "0px 0px 10px white"
        }
    } else {
        console.log(`Not enough C's`)
    }
}
//toggle background music
function toggleMusic() {
    
    //on off (true or false) toggle
    prices['isMusic'] = !prices['isMusic'];
    playMusic();
    
}
function playMusic() {
    if(prices['isMusic']) {
        console.log('playing music')
        document.getElementById('rick-lofi-trimmed').play();
    } else {
        console.log('pausing music');
        document.getElementById('rick-lofi-trimmed').pause();
    }
}
//play music off start if set to true (setTimeout because it wouldn't work without a delay)
setTimeout( () => {
    playMusic();
}, 1000);


//load & save with local storage
function load() {
    counter = Number(localStorage.getItem('clickerCounter'))
    ct.innerHTML = counter + 'C'

    cps = Number(localStorage.getItem('cps'))
    document.getElementById('cps').innerHTML = cps + 'cps'

    prices = JSON.parse(localStorage.getItem('items'))
    clickPower = Math.pow(2, prices['clickpower'][1])
    cpsPower = Math.pow(2, prices['cpspower'][1])
    codes = JSON.parse(localStorage.getItem('codes'))
    updateAll()

    currentSelected = localStorage.getItem('currentSelected')

    switch(currentSelected) {
        case 'cookie' :
            selectCookie()
            break
        case 'taco' :
            selectTaco()
            break
        case 'carrot' :
            selectCarrot()
            break
        case 'duck' :
            selectDuck()
            break
        case 'unicorn' :
            selectUnicorn()
            break
        case 'cupcake' :
            selectCupcake()
            break
        default :
            selectCookie()
            break
    }
    // for( let key of Object.keys(prices) ) {
    //     console.log(key + "=" + prices[key])
    //     if(isMax(key)) {
            
    //     }
    // }
    //  ^^ attempt to iterate what I have below, unsure if possible with how I designed the rest of the game
    //I could do this for all the first shop items but it isn't necessary and would take too much work -- most won't care about the bug it is more important for the cosmetics though
    if(isMax('taco')) {
        document.getElementById('taco-amount').innerHTML = `${prices['taco'][1]}`
        document.getElementById('taco-amount').style.textShadow = '0px 0px 10px gold'
        document.getElementById('taco-amount').style.color = 'gold'
        document.getElementById('taco-price').innerHTML = 'OWNED'
        document.getElementById('taco-price').style.textShadow = '0px 0px 10px white'
    }
    if(isMax('carrot')) {
        document.getElementById('carrot-amount').innerHTML = `${prices['carrot'][1]}`
        document.getElementById('carrot-amount').style.textShadow = '0px 0px 10px gold'
        document.getElementById('carrot-amount').style.color = 'gold'
        document.getElementById('carrot-price').innerHTML = 'OWNED'
        document.getElementById('carrot-price').style.textShadow = '0px 0px 10px white'
    }
    if(isMax('cupcake')) {
        document.getElementById('cupcake-amount').innerHTML = `${prices['cupcake'][1]}`
        document.getElementById('cupcake-amount').style.textShadow = '0px 0px 10px gold'
        document.getElementById('cupcake-amount').style.color = 'gold'
        document.getElementById('cupcake-price').innerHTML = 'OWNED'
        document.getElementById('cupcake-price').style.textShadow = '0px 0px 10px white'
    }
    if(isMax('duck')) {
        document.getElementById('duck-amount').innerHTML = `${prices['duck'][1]}`
        document.getElementById('duck-amount').style.textShadow = '0px 0px 10px gold'
        document.getElementById('duck-amount').style.color = 'gold'
        document.getElementById('duck-price').innerHTML = 'OWNED'
        document.getElementById('duck-price').style.textShadow = '0px 0px 10px white'
    }
    if(isMax('unicorn')) {
        document.getElementById('unicorn-amount').innerHTML = `${prices['unicorn'][1]}`
        document.getElementById('unicorn-amount').style.textShadow = '0px 0px 10px gold'
        document.getElementById('unicorn-amount').style.color = 'gold'
        document.getElementById('unicorn-price').innerHTML = 'OWNED'
        document.getElementById('unicorn-price').style.textShadow = '0px 0px 10px white'
        document.getElementById('unicorn-icon').src = 'images/unicorn.svg'
    }

    console.log(`Game Loaded \n${JSON.stringify(prices)} \nClickPower: ${clickPower}\nCPS: ${cps}`)
}

function save () {
    localStorage.setItem('clickerCounter', parseFloat(counter).toFixed(2))
    localStorage.setItem('cps', parseFloat(cps).toFixed(2))
    localStorage.setItem('items', JSON.stringify(prices))
    localStorage.setItem('currentSelected', currentSelected)
    localStorage.setItem('codes', JSON.stringify(codes))
    console.log('Game Saved')
}
function clearData() {
    // localStorage.clear() rather than this, which takes out all local storage even for other apps, I will remove them individually
    localStorage.removeItem('clickerCounter')
    localStorage.removeItem('cps')
    localStorage.removeItem('currentSelected')
    localStorage.removeItem('codes')
    localStorage.removeItem('items');
    console.log("Data Cleared.")
    setTimeout(() => { 
        window.location.reload() //reload to update everything back to starting point
    }, 200)
    
}
//save game every 10 seconds
const autoSave = window.setInterval( () => {
    save()
}, 10000)
//load game in when opened
try {
    load()
} catch(error) {
    console.log(error)
    console.log("Reason: User does not have any local storage")
}


document.getElementById("clicker-btn").onclick = () => { addAmount(clickPower) }
// document.getElementById('load-btn').onclick = () => { load() }
document.getElementById('clear-data').onclick= () => { clearData() }
document.getElementById('bg-music').onclick = () => { toggleMusic() }
//the nav-bar links have an inline onclick function to save 
for(let i = 0; i < document.getElementsByClassName("saves").length; i++) {
    document.getElementsByClassName("saves")[i].onclick = () => { save() };
}

//first shop (functions are above)
document.getElementById('click-power').onclick = () => { addClickPower() }
document.getElementById('cps-power').onclick = () => { addCPSPower() }
document.getElementById('item1').onclick = () => { addItem1() }
document.getElementById('item2').onclick = () => { addItem2() }
document.getElementById('item3').onclick = () => { addItem3() }
document.getElementById('item4').onclick = () => { addItem4() }
document.getElementById('item5').onclick = () => { addItem5() }
document.getElementById('item6').onclick = () => { addItem6() }
document.getElementById('item7').onclick = () => { addItem7() }
document.getElementById('item8').onclick = () => { addItem8() }
document.getElementById('item9').onclick = () => { addItem9() }
document.getElementById('item10').onclick = () => { addItem10() }
document.getElementById('item11').onclick = () => { addItem11() }
document.getElementById('item12').onclick = () => { addItem12() }
document.getElementById('item13').onclick = () => { addItem13() }
document.getElementById('item14').onclick = () => { addItem14() }
document.getElementById('item15').onclick = () => { addItem15() }
document.getElementById('item16').onclick = () => { addItem16() }

//second shop
function selectCookie() {
    //since free this is all that is needed (for when selected)
    console.log('cookie cosmetic selected')
    currentSelected = 'cookie'
    document.getElementById('clicker-btn').src = "images/cookie.svg"
    setImgMargin('25px')
}
function selectTaco() {
    if(counter >= prices['taco'][0] && !isMax('taco')) {
        prices['taco'][1]++
        counter -= prices['taco'][0]
        addAmount(0) //updates amount
        document.getElementById('taco-price').innerHTML = `Price: ${priceFormat('taco')}C`
        document.getElementById('taco-amount').innerHTML = `${prices['taco'][1]}`
    } else {
        console.log(`Not enough C's`)
    }
    if(isMax('taco')) {
        document.getElementById('taco-amount').innerHTML = `${prices['taco'][1]}`
        console.log('taco cosmetic selected')
        currentSelected = 'taco'
        document.getElementById('taco-amount').style.textShadow = "0px 0px 10px gold"
        document.getElementById('taco-amount').style.color = "gold"
        document.getElementById('taco-price').innerHTML = 'OWNED'
        document.getElementById('taco-price').style.textShadow = "0px 0px 10px white"

        document.getElementById('clicker-btn').src = "images/taco.svg"

        setImgMargin('24px') //for some reason the taco's margin goes down 2px less than every other image
    }
}
function selectCarrot() {
    if(counter >= prices['carrot'][0] && !isMax('carrot')) {
        prices['carrot'][1]++
        counter -= prices['carrot'][0]
        addAmount(0) //updates amount
        document.getElementById('carrot-price').innerHTML = `Price: ${priceFormat('carrot')}C`
        document.getElementById('carrot-amount').innerHTML = `${prices['carrot'][1]}`
    } else {
        console.log(`Not enough C's`)
    }
    if(isMax('carrot')) {
        document.getElementById('carrot-amount').innerHTML = `${prices['carrot'][1]}`
        console.log('carrot cosmetic selected')
        currentSelected = 'carrot'
        document.getElementById('carrot-amount').style.textShadow = "0px 0px 10px gold"
        document.getElementById('carrot-amount').style.color = "gold"
        document.getElementById('carrot-price').innerHTML = 'OWNED'
        document.getElementById('carrot-price').style.textShadow = "0px 0px 10px white"

        document.getElementById('clicker-btn').src = "images/carrot.svg"

        setImgMargin('25px')
    }
}
function selectDuck() {
    if(counter >= prices['duck'][0] && !isMax('duck')) {
        prices['duck'][1]++
        counter -= prices['duck'][0]
        addAmount(0) //updates amount
        document.getElementById('duck-price').innerHTML = `Price: ${priceFormat('duck')}C`
        document.getElementById('duck-amount').innerHTML = `${prices['duck'][1]}`
    } else {
        console.log(`Not enough C's`)
    }
    if(isMax('duck')) {
        document.getElementById('duck-amount').innerHTML = `${prices['duck'][1]}`
        console.log('duck cosmetic selected')
        currentSelected = 'duck'
        document.getElementById('duck-amount').style.textShadow = "0px 0px 10px gold"
        document.getElementById('duck-amount').style.color = "gold"
        document.getElementById('duck-price').innerHTML = 'OWNED'
        document.getElementById('duck-price').style.textShadow = "0px 0px 10px white"

        document.getElementById('clicker-btn').src = "images/duck.svg"

        setImgMargin('25px')
    }
}
function selectCupcake() {
    if(counter >= prices['cupcake'][0] && !isMax('cupcake')) {
        prices['cupcake'][1]++
        counter -= prices['cupcake'][0]
        addAmount(0) //updates amount
        document.getElementById('cupcake-price').innerHTML = `Price: ${priceFormat('cupcake')}C`
        document.getElementById('cupcake-amount').innerHTML = `${prices['cupcake'][1]}`
    } else {
        console.log(`Not enough C's`)
    }
    if(isMax('cupcake')) {
        document.getElementById('cupcake-amount').innerHTML = `${prices['cupcake'][1]}`
        console.log('cupcake cosmetic selected')
        currentSelected = 'cupcake'
        document.getElementById('cupcake-amount').style.textShadow = "0px 0px 10px gold"
        document.getElementById('cupcake-amount').style.color = "gold"
        document.getElementById('cupcake-price').innerHTML = 'OWNED'
        document.getElementById('cupcake-price').style.textShadow = "0px 0px 10px white"

        document.getElementById('clicker-btn').src = "images/cupcake.svg"

        setImgMargin('25px')
    }
}
function selectUnicorn() {
    if(isMax('unicorn')) {
        document.getElementById('unicorn-amount').innerHTML = `${prices['unicorn'][1]}`
        console.log('unicorn cosmetic selected')
        currentSelected = 'unicorn'
        document.getElementById('unicorn-amount').style.textShadow = "0px 0px 10px gold"
        document.getElementById('unicorn-amount').style.color = "gold"
        document.getElementById('unicorn-price').innerHTML = 'OWNED'
        document.getElementById('unicorn-price').style.textShadow = "0px 0px 10px white"

        document.getElementById('clicker-btn').src = "images/unicorn.svg"

        setImgMargin('25px')
    }
}
document.getElementById('cookie').onclick = () => { selectCookie() }
document.getElementById('taco').onclick = () => { selectTaco() }
document.getElementById('carrot').onclick = () => { selectCarrot() }
document.getElementById('duck').onclick = () => { selectDuck() }
document.getElementById('cupcake').onclick = () => { selectCupcake() }
document.getElementById('unicorn').onclick = () => { selectUnicorn() }

//shop swtich functionality

function prevShop () {
    switch(shopNumber) {
        case 2 :
            shopPage1.style.display = "block"
            shopPage2.style.display = "none"
            shopPage3.style.display = "none"
            shopNumber = 1
            break
        case 3 :
            shopPage1.style.display = "none"
            shopPage2.style.display = "block"
            shopPage3.style.display = "none"
            shopNumber = 2
            break
        default:
            console.log('Unable to change shop')
        
    }
}
function nextShop () {
    switch(shopNumber) {
        case 1 :
            shopPage1.style.display = "none"
            shopPage2.style.display = "block"
            shopPage3.style.display = "none"
            shopNumber = 2
            break
        case 2 :
            shopPage1.style.display = "none"
            shopPage2.style.display = "none"
            shopPage3.style.display = "block"
            shopNumber = 3
        default :
            console.log('Unable to change shop')
    }
}

document.getElementById('previous-shop-btn').onclick = () => { prevShop() }
document.getElementById('next-shop-btn').onclick = () => { nextShop() }

//third shop
let taunts = [  "try again...", 
                "I'm a cookiemonster, in case you didn't know.",
                "You must really like cookies.",
                "Don't look at me, you got it wrong not me!",
                "Nice try, but you're not even close.",
                "Any ideas about how to find a unicorn? I heard there were some around here...",
                "Rainbow mode would be lit - if only there was a way to turn it on... code gotta be somewhere around here",
                "Cracked the code yet? Of course not.",
                "One of the codes is C- oh hey what are you doing here?",
                "NOM NOM NOM COOKIES LOL!",
                "*Yawns* Who are you again?",
                "Oh come on you have to get it eventually.",
                "Is this really how you treat my redeem codes machine, WITH WRONG ANSWERS?",
                "My name is Bobo, nice to meet you. I like cookies and I work this rig. Do you like the rainbow effect? I do. Colors are cool, colors is a fun word.",
                "Please don't mess with my machine too much!",
                "Look at what you've done",
                "Bobo says hi. Bobo was created from metal, electricity, and the power of a narwhal. Bobo wonders how you are doing.",
                "These colors are kinda bland, dont you think? Could use a little... everything",
                "*Bobo happy noises*",
                "I'm pretty sure that's not how it works...",
                "Are you even trying? Or are you just hopelessly guessing.",
                "1's and 0's are a good use of letters, maybe that's what binary was for all along,.. and they said school was useless.",
                "Achievement Unlocked! You guessed wrong.",
                "Which came first? The chicken or the egg? What if it was both simultaneously?",
                "Hey, just doing your thing aren't you?",
                "Could really go for some food right now. Tacos sound good. Mhm tacos. I <3 tacos",
                "I had a friend named rick once, he was cool. Wonder what he's doing nowadays.",
                "Bobo needs nap. Bobo works a l-- zzz zzz zz...",
                "This page needs a little spice",
                "Bobo found a note. It says: 'U N 1 '. It's torn down the middle. Hmmm.",
                "Bobo found the link on the about page funny.",
                "Bobo likes animals with horns.",
                "1 th1nk yo0're gett1ng cl0ser",
                "Tip: No code contains a space. Some hints have a space or other character, ignore them",
                "my password converted to numbers is '2 15 2 15' with no spaces",
                "Pineapple 'does$' or 'doesnot$' belong on pizza? You only have one chance... Answer wrong, bad things will happen. Answer right, good things will happen",
                "Pineapple 'does$' or 'doesnot$' belong on pizza? You only have one chance... Answer wrong, bad things will happen. Answer right, good things will happen",
                "What is the answer to the life the universe and everything equal to? Hmm... I'll have to google that one."
                ]

function redeemCode(code) {
    let elements = document.getElementsByClassName('color-effect')
    let keyFound = false;
    for( let key of Object.keys(codes) ) {
            if(key == code.toLowerCase()) {
                if(!codes[key][1]) {
                    console.log(`Code redeemed for ${codes[key][0]}C`)
                    counter += codes[key][0]
                    codes[key][1] = true
                    keyFound = true;
                    if( codes[key][0] == 0) {
                        document.getElementById('redeem-text').innerHTML  = `Congrats!... You figured out ${key.toUpperCase()} and got a special reward!`
                    } else {
                        document.getElementById('redeem-text').innerHTML  = `Congrats!... You figured out ${key.toUpperCase()} and got ${iNF.format(codes[key][0])}C!`
                    }
                    
                } else {
                    console.log('code already submitted')
                    keyFound = true;
                    document.getElementById('redeem-text').innerHTML  = `Hey, you already did that one!`
                }
            } 
            //special cases (not done in main part for readability && can be done multiple times if wanted)
            if(keyFound) {
                if(key == 'un1c0rn' && code.toLowerCase() == 'un1c0rn') {
                    if(!isMax('unicorn')) {
                        prices['unicorn'][1]++
                        document.getElementById('unicorn-icon').src = 'images/unicorn.svg'
                    }
                    selectUnicorn()
                }
                if(key == 'colors' && code.toLowerCase() == 'colors') {
                    for( let i = 0; i < elements.length; i++) {
                        elements[i].style.transition = 'color 200ms linear'
                        elements[i].style.color = 'red' //so it doesn't flash white in between loops
                        elements[i].style.animation = 'rainbowText 4s linear infinite'
                        elements[i].style.animationDelay = '200ms'
                    }
                }
                if(key == 'rick' && code.toLowerCase() == 'rick') {
                    document.getElementById('rick').play()
                    //bad way to solve this problem of both songs playing but due to there only being two possible sounds it works
                    document.getElementById('rick-lofi-trimmed').pause();
                }
                if(key == 'does$' && code.toLowerCase() == 'does$') {
                    //avoids bug
                    document.getElementById('previous-shop-btn').style.display = "none"
                    document.getElementById('next-shop-btn').style.display = "none"
                    codes['doesnot$'][1] = true //can't call the other one now that this one was called
                    document.getElementById('redeem-text').style.transition = 'all 200ms ease-in'
                    document.getElementById('redeem-text').style.fontSize = '2.4rem'
                    document.getElementById('redeem-text').style.color = 'red'
                    document.getElementById('redeem-text').style.textShadow = '0px 0px 10px red'
                    document.getElementById('redeem-text').innerHTML = 'SINNER! YOU DARE? CHANGING CPS TO NEGATIVE * 2...'
                    let tempCPS = cps
                    cps = -cps * 2
                    addCPS(0) //update it to be negative
                    for( let i = 0; i < elements.length; i++) {
                        elements[i].style.transition = 'color 200ms linear'
                        elements[i].style.color = 'red'
                    }
                   setTimeout(() => {
                        cps = tempCPS
                        addCPS(0) //update it to return to normal
                        counter /= 2
                        document.getElementById('redeem-text').style.color = 'white'
                        document.getElementById('redeem-text').style.textShadow = 'none'
                        document.getElementById('redeem-text').innerHTML = `Don't make that mistake again. I also took half ur cookies for that... You deserved it though`
                        document.getElementById('redeem-text').style.fontSize = '1.5rem'
                        for( let i = 0; i < elements.length; i++) {
                            elements[i].style.transition = 'color 200ms linear'
                            elements[i].style.color = 'white'
                        }
                        document.getElementById('previous-shop-btn').style.display = "inline"
                    document.getElementById('next-shop-btn').style.display = "inline"
                    }, 5000)
                }    
                if(key == 'doesnot$' && code.toLowerCase() == 'doesnot$') {
                    //avoids bug
                    document.getElementById('previous-shop-btn').style.display = "none"
                    document.getElementById('next-shop-btn').style.display = "none"
                    codes['does$'][1] = true //can't call the other one now that this one was called
                    document.getElementById('redeem-text').style.transition = 'all 200ms ease-in'
                    document.getElementById('redeem-text').style.color = 'rgb(18, 255, 18)'
                    document.getElementById('redeem-text').style.textShadow = '0px 0px 10px rgb(18, 255, 18)'
                    document.getElementById('redeem-text').innerHTML = 'CORRECT! x5 CPS for 30s.'
                    let tempCPS = cps
                    cps = 5*cps
                    addCPS(0) //update it to be x5
                    for( let i = 0; i < elements.length; i++) {
                        elements[i].style.transition = 'color 200ms linear'
                        elements[i].style.color = 'rgb(18, 255, 18)'
                    }
                    setTimeout(() => {
                        cps = tempCPS
                        addCPS(0) //update it to return to normal
                        document.getElementById('redeem-text').style.color = 'white'
                        document.getElementById('redeem-text').style.textShadow = 'none'
                        document.getElementById('redeem-text').innerHTML = `Back to normal.`
                        document.getElementById('redeem-text').style.fontSize = '1.5rem'
                        for( let i = 0; i < elements.length; i++) {
                            elements[i].style.transition = 'color 200ms linear'
                            elements[i].style.color = 'white'
                        }
                        document.getElementById('previous-shop-btn').style.display = "inline"
                        document.getElementById('next-shop-btn').style.display = "inline"
                    }, 30000)
                }
            }
        }
        if(!keyFound) {
            console.log('invalid code')
            document.getElementById('redeem-text').innerHTML = taunts[Math.floor((Math.random()/100) * taunts.length * 100)] //not sure but maybe dividing by 100 and multiplying by 100 makes it more random... it kept cycling through a few different text and not the others
        }
}
document.getElementById('redeem-code').addEventListener('keydown',
            e => {
                if(e.key == 'Enter' && document.getElementById('redeem-code').value != '') { //makes sure they aren't entering nothing
                    console.log("code submitted: " + document.getElementById('redeem-code').value)
                    redeemCode(document.getElementById('redeem-code').value)
                    document.getElementById('redeem-code').value = '' //resets to nothing
                }
            })

