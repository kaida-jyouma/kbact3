// version: 3.0.1
var se0;
var ctd0;
var ipt = false;
var bl = false;
var iptms = [];
var ctipt = 0;
var begin = 0;
var last = 0;
var rg = 0;
var score = 0;
var blj = true;
var blf = true;
function start(){
    reset();
    ctd0 = 4;
    document.getElementById('content').innerHTML = "<p class='ctdn'>" + ctd0 + "</p>";
    setTimeout(function() {input()}, 4000);
    se0 = setInterval(function (){
        ctd0 -= 1;
        if (ctd0 < 2) clearInterval(se0);
        document.getElementById('content').innerHTML = "<p class='ctdn'>" + ctd0 + "</p>";
    }, 1000);
}
function input(){
    document.getElementById('content').innerHTML = "<p class='msg_c' id='playing' onkeyup='press()'>f/jボタンを交互にあと<span id='playdisp'>" + 33 + "</span>回押してください。</p>";
    ipt = true;
}
function press(){
    if (ipt){
        if (event.keyCode === 70 && blf){
            ctipt += 1;
            document.getElementById('playdisp').innerHTML = 33 - ctipt;
            blj = true;
            blf = false;
            
            // same code in keyCode=74 
            if (begin === 0){
                begin = new Date().getTime();
                rg = begin;
                // iptms.push(begin);
                console.log("Begin: " + begin);
            }else if (ctipt === 33){
                ipt = false;
                last = new Date().getTime();
                iptms.push(last - rg);
                console.log("Last: " + last);
                result();
            }else{
                var tm = new Date().getTime();
                iptms.push(tm - rg);
                rg = tm;
            }
            
        }else if (event.keyCode === 74 && blj){
            ctipt += 1;
            document.getElementById('playdisp').innerHTML = 33 - ctipt;
            blj = false;
            blf = true;
            
            // same code in keyCode=70
            if (begin === 0){
                begin = new Date().getTime();
                rg = begin;
                // iptms.push(begin);
                console.log("Begin: " + begin);
            }else if (ctipt === 33){
                ipt = false;
                last = new Date().getTime();
                iptms.push(last - rg);
                console.log("Last: " + last);
                result();
            }else{
                var tm = new Date().getTime();
                iptms.push(tm - rg);
                rg = tm;
            }
        }
        
        
        /*if (event.keyCode === 70 || event.keyCode === 74 || event.keyCode === 70 || event.keyCode === 74){
            ctipt += 1;
            document.getElementById('playdisp').innerHTML = 33 - ctipt;
            if (begin === 0){
                begin = new Date().getTime();
                rg = begin;
                // iptms.push(begin);
                console.log("Begin: " + begin);
            }else if (ctipt === 33){
                ipt = false;
                last = new Date().getTime();
                iptms.push(last - rg);
                console.log("Last: " + last);
                result();
            }else{
                var tm = new Date().getTime();
                iptms.push(tm - rg);
                rg = tm;
            }
        }*/
    }
}
function result(){
    var nt = last - begin;
    var bt4 = Math.round( nt / 8 );
    var bt16 = bt4 / 4;
    var mbpm = Math.round( 600000 / bt4 ) / 10;
    if (mbpm > 300) bpm = 300;
    else bpm = mbpm;
    for (i=0;i<iptms.length;i++){
        var dif = Math.abs(iptms[i] - bt16);
        var pt = 0;
        if (dif <= 5) pt = 100;
        else if (dif <= 10) pt = 90;
        else if (dif <= 20) pt = 80;
        else if (dif <= 40) pt = 70;
        else if (dif <= 60) pt = 55;
        else if (dif <= 80) pt = 30;
        else if (dif <= 100) pt = 10;
        console.log(Math.floor(pt * bpm * 1000 / 96));
        score += Math.floor(pt * bpm * 1000 / 96);
    }
    var rank = "F";
    if (score > 9800000) rank = "SSS+";
    else if (score > 9500000) rank = "SSS";
    else if (score > 9100000) rank = "SS+";
    else if (score > 8750000) rank = "SS";
    else if (score > 8375000) rank = "S+";
    else if (score > 8000000) rank = "S";
    else if (score > 7500000) rank = "AAA";
    else if (score > 7000000) rank = "AA";
    else if (score > 6666000) rank = "A";
    else if (score > 6250000) rank = "BBB";
    else if (score > 5550000) rank = "BB";
    else if (score > 5000000) rank = "B";
    else if (score > 4000000) rank = "C";
    else if (score > 3000000) rank = "D";
    else if (score > 2500000) rank = "E";
    
    document.getElementById('content').innerHTML = '<p class="msg_c">今回の記録</p><div id="scores"></div>';
    document.getElementById('scores').innerHTML = '<p class="p_score">Score:&#32;<span>' + score + '<p class="p_score">length:&#32;<span>' + nt + '</span>&#32;[ms]</p>' + '<p class="p_score">BPM:&#32;<span>' + bpm + '</span> / <span>300</span></p><p class="p_score">(&#32;diff:&#32;<span id="ranks">' + (Math.max(...iptms) - Math.min(...iptms)) + '</span>&#32;[ms]&#32;)</p><p class="p_score">Rank:&#32;<span id="op">' + rank + '</span><p>'/* + "<input type='button' class='selector' id='sel_rank' onclick='ranking()' value='ランキングを表示'><br>"*/ + "<input type='button' class='selector' id='rest_btn' onclick='re_start()' value='Re:&#32;Start'><br>" + "<input type='button' class='selector' id='sel_menu' onclick='mainMenu()' value='Goto:&#32;MainMenu'><br>";
    console.log(iptms);
    console.log("ndtim: " + nt);
    console.log("range: " + bt16);
    console.log("bpm: " + bpm);
}
function reset(){
    ipt = false;
    bl = false;
    iptms = [];
    ctipt = 0;
    begin = 0;
    last = 0;
    rg = 0;
    score = 0;
}
function mainMenu(){
    reset();
    document.getElementById('content').innerHTML = '<input type="button" class="btn0" name="start" id="start" value="Press:Start" onclick="start()">';
}
function re_start(){
    start();
}
