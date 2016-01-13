function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);
	
    if (player.paused) {
        player.play();
        control.textContent = 'Pause';
    } else {
        player.pause();	
        control.textContent = 'Play';
    }
}

function resume(idPlayer) {
    var player = document.querySelector('#' + idPlayer);
	
    player.currentTime = 0;
    player.pause();
}

function volume(idPlayer, vol) {
    var player = document.querySelector('#' + idPlayer);
    
    player.volume = vol;    
}

function update(player) {
    var duration = player.duration;    // Durée totale
    var time     = player.currentTime; // Temps écoulé
    var fraction = time / duration;
    var percent  = Math.ceil(fraction * 100);

    var progress = document.querySelector('#progressBar');
    
    progress.style.width = percent + '%';
    progress.textContent = percent + '%';
    document.querySelector('#progressTime').textContent = formatTime(time);
}

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
    
    if (secs < 10) {
        secs = "0" + secs;
    }
    
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
        
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}

function getMousePosition(event) {
    return {
        x: event.pageX,
        y: event.pageY
    };
}
function getPosition(element){
    var top = 0, left = 0;
    
    do {
        top  += element.offsetTop;
        left += element.offsetLeft;
    } while (element = element.offsetParent);
    
    return { x: left, y: top };
}
function clickProgress(idPlayer, control, event) {
    var parent = getPosition(control);    // La position absolue de la progressBar
    var target = getMousePosition(event); // L'endroit de la progressBar où on a cliqué
    var player = document.querySelector('#' + idPlayer);
  
    var x = target.x - parent.x; 
    var wrapperWidth = document.querySelector('#progressBarControl').offsetWidth;
    
    var percent = Math.ceil((x / wrapperWidth) * 100);    
    var duration = player.duration;
    
    player.currentTime = (duration * percent) / 100;
}

// Gestion du Canvas
var canvas  = document.querySelector('#canvas');
var context = canvas.getContext('2d');
context.lineWidth = "1";
context.strokeStyle = "gold";
context.strokeRect(50, 35, 50, 80);

context.fillStyle = "rgba(23, 145, 167, 0.5)";
context.fillRect(40, 25, 40, 40);

//Pour effacer une partie, utile pour des découpes ou effacer le contenu d'un canvas
context.clearRect(45, 40, 30, 10);

//Pour les formes géométriques
context.strokeStyle = "rgb(23, 145, 167)";
context.beginPath();
context.moveTo(20, 20);  // 1er point
context.lineTo(130, 20); // 2e point
context.lineTo(130, 50); // 3e
context.lineTo(75, 130); // 4e
context.lineTo(20, 50);  // 5e
context.closePath();     // On relie le 5e au 1er
context.stroke();

//Pour les arcs
var canvas2  = document.querySelector('#canvas2');
var context2 = canvas2.getContext('2d');
context2.fillStyle = "rgba(23, 145, 167, 0.8)";

context2.beginPath(); // La bouche, un arc de cercle
context2.arc(75, 75, 40, 0, Math.PI);
context2.fill();

context2.beginPath(); // Le cercle extérieur
context2.arc(75, 75, 50, 0, Math.PI * 2);

//Comme on l'a vu plus haut, moveTo() permet de déplacer le « crayon » à l'endroit où 
//l'on souhaite commencer un chemin. Mais cette méthode peut aussi être utilisée 
// pour effectuer des « levées de crayon » au sein d'un même chemin

context2.moveTo(41, 58); // L'œil gauche
context2.arc(55, 70, 20, (Math.PI / 180) * 220, (Math.PI / 180) * 320);
         
context2.moveTo(81, 58); // L'œil droit
context2.arc(95, 70, 20, (Math.PI / 180) * 220, (Math.PI / 180) * 320);
context2.stroke();

//Pour les courbes de béziers et par exemple les bords rectangle arrondis
var canvas3  = document.querySelector('#canvas3');
var context3 = canvas3.getContext('2d');

context3.beginPath();
context3.moveTo(131, 119);
context3.bezierCurveTo(131, 126, 126, 131, 119, 131);
context3.lineTo(30, 131);
context3.bezierCurveTo(23, 131, 18, 126, 18, 119);
context3.lineTo(18, 30);
context3.bezierCurveTo(18, 23, 23, 18, 30, 18);
context3.lineTo(119, 18);
context3.bezierCurveTo(126, 18, 131, 23, 131, 30);
context3.lineTo(131, 119);
context3.closePath();
context3.fillStyle = "rgb(23, 145, 167)";
context3.fill();

context3.font = "68px Calibri,Geneva,Arial";
context3.fillStyle = "white";
context3.fillText("js", 84, 115);

//Intégrer une image dans un Canvas et utilisation de pattern (motif) 
//pour reproduire l'image
// Mis en commentaire car doit être intégré dans une seule fonction onload

/*window.onload = function() {
    var zozor = new Image();
    zozor.src = 'zozor_petit.png';

    var canvas4  = document.querySelector('#canvas4');
    var context4 = canvas4.getContext('2d');
    context4.clearRect(0, 0, 150, 150);

    zozor.addEventListener('load', function() {
        var pattern = context4.createPattern(zozor, 'repeat');
        context4.fillStyle = pattern;
        context4.drawImage(zozor, 35, 35, 40, 40);
        context4.fillRect(0, 0, 150, 150);
    }, false);
}*/

//Un logo textuel en JS
var canvas5  = document.querySelector('#canvas5');
var context5 = canvas5.getContext('2d');

context5.fillStyle = "rgba(23, 145, 167, 1)";
context5.fillRect(50, 50, 50, 50);
          
context5.font = "bold 22pt Calibri,Geneva,Arial";
context5.fillStyle = "#fff";
context5.fillText("js", 78, 92);

//Différentes Lignes
window.onload = function() {
          //Partie pour l'image
          var zozor = new Image();
            zozor.src = 'zozor_petit.png';

            var canvas4  = document.querySelector('#canvas4');
            var context4 = canvas4.getContext('2d');
            context4.clearRect(0, 0, 150, 150);

            zozor.addEventListener('load', function() {
                var pattern = context4.createPattern(zozor, 'repeat');
                context4.fillStyle = pattern;
                context4.drawImage(zozor, 35, 35, 40, 40);
                context4.fillRect(0, 0, 150, 150);
            }, false);

        //Partie pour les traits avec les différents embouts
          var canvas6  = document.querySelector('#canvas_6');
          var context6 = canvas6.getContext('2d');
          var y, top = 20, left = 15;      
          
          context6.lineWidth = 10; 
          
          y = top;
          context6.beginPath();
          context6.lineJoin = 'round';
          context6.moveTo(left + 0, y + 0);
          context6.lineTo(left + 30, y + 30);
          context6.lineTo(left + 60, y + 0);
          context6.lineTo(left + 90, y + 30);
          context6.lineTo(left + 120, y + 0);
          context6.stroke();
          
          y = top + 40;
          context6.beginPath();
          context6.lineJoin = 'bevel';
          context6.moveTo(left + 0, y + 0);
          context6.lineTo(left + 30, y + 30);
          context6.lineTo(left + 60, y + 0);
          context6.lineTo(left + 90, y + 30);
          context6.lineTo(left + 120, y + 0);
          context6.stroke();        
          
          y = top + 80;
          context6.beginPath();
          context6.lineJoin = 'miter';
          context6.moveTo(left + 0, y + 0);
          context6.lineTo(left + 30, y + 30);
          context6.lineTo(left + 60, y + 0);
          context6.lineTo(left + 90, y + 30);
          context6.lineTo(left + 120, y + 0);
          context6.stroke();                
      }

var canvas7  = document.querySelector('#canvas7');
var context7 = canvas7.getContext('2d');
var linear = context7.createLinearGradient(0, 0, 0, 150);
linear.addColorStop(0, 'white');
linear.addColorStop(0.5, '#1791a7');
linear.addColorStop(0.5, 'orange');
linear.addColorStop(1, 'white');

context7.fillStyle = linear;
context7.fillRect(10, 10, 130, 130);

//Dégradé radial
var canvas8  = document.querySelector('#canvas8');
var context8 = canvas8.getContext('2d');
var radial = context8.createRadialGradient(75, 75, 0, 130, 130, 150);
radial.addColorStop(0, '#1791a7');
radial.addColorStop(1, 'white');

context8.fillStyle = radial;
context8.fillRect(10, 10, 130, 130);

//Création de bulles avec les radiaux
var canvas9  = document.querySelector('#canvas9');
var context9 = canvas9.getContext('2d');
var radial1 = context9.createRadialGradient(0, 0, 10, 100, 20, 150); // fond
radial1.addColorStop(0, '#ddf5f9');
radial1.addColorStop(1, '#ffffff');

var radial2 = context9.createRadialGradient(75, 75, 10, 82, 70, 30); // bulle orange
radial2.addColorStop(0, '#ffc55c');
radial2.addColorStop(0.9, '#ffa500');
radial2.addColorStop(1, 'rgba(245,160,6,0)');

var radial3 = context9.createRadialGradient(105, 105, 20, 112, 120, 50); // bulle turquoise
radial3.addColorStop(0, '#86cad2');
radial3.addColorStop(0.9, '#61aeb6');
radial3.addColorStop(1, 'rgba(159,209,216,0)');   

context9.fillStyle = radial1;
context9.fillRect(10, 10, 130, 130);
context9.fillStyle = radial2;
context9.fillRect(10, 10, 130, 130);
context9.fillStyle = radial3;
context9.fillRect(10, 10, 130, 130);

//Translate permet de faire un offset et restore permet de revenir à l'origine
var canvas10  = document.querySelector('#canvas10');
var context10 = canvas10.getContext('2d');
context10.save();
context10.translate(40, 40);

context10.fillStyle = "teal"; 
context10.fillRect(0, 0, 50, 50);
context10.restore();

context10.fillStyle = "orange";
context10.fillRect(0, 0, 50, 50);

//Rotate permet de faire rotation des axes du canvas
var canvas11  = document.querySelector('#canvas11');
var context11 = canvas11.getContext('2d');
context11.translate(75,75);

context11.fillStyle = "teal";
context11.rotate((Math.PI / 180) * 45);        
context11.fillRect(0, 0, 50, 50);

context11.fillStyle = "orange";
context11.rotate(Math.PI / 2);        
context11.fillRect(0, 0, 50, 50);          

context11.fillStyle = "teal";
context11.rotate(Math.PI / 2);        
context11.fillRect(0, 0, 50, 50);      

context11.fillStyle = "orange";
context11.rotate(Math.PI / 2);        
context11.fillRect(0, 0, 50, 50);

//Pour arriver à faire une animation avec Canvas, il faut
//1 Dessiner une image ;
//2 Effacer tout ;
//3 Redessiner une image, légèrement modifiée ;
//4 Effacer tout ;
//5 Redessiner une image, légèrement modifiée ;
//6 Et ainsi de suite…

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || // La forme standardisée
           window.webkitRequestAnimationFrame || // Pour Chrome et Safari
           window.mozRequestAnimationFrame    || // Pour Firefox
           window.oRequestAnimationFrame      || // Pour Opera
           window.msRequestAnimationFrame     || // Pour Internet Explorer
           function(callback){                   // Pour les mauvais
               window.setTimeout(callback, 1000 / 60);
           };
})();

window.addEventListener('load', function() {
    var canvas12  = document.querySelector('#canvas12');
    var context12 = canvas12.getContext('2d');

    function draw(angle) {
        context12.save();
        context12.clearRect(0, 0, 150, 150);
        context12.translate(75,75);

        context12.fillStyle = "teal";
        context12.rotate((Math.PI / 180) * (45 + angle));
        context12.fillRect(0, 0, 50, 50);

        context12.fillStyle = "orange";
        context12.rotate(Math.PI / 2);
        context12.fillRect(0, 0, 50, 50);

        context12.fillStyle = "teal";
        context12.rotate(Math.PI / 2);
        context12.fillRect(0, 0, 50, 50);

        context12.fillStyle = "orange";
        context12.rotate(Math.PI / 2);
        context12.fillRect(0, 0, 50, 50);

        context12.restore();

        angle = angle + 2;

        if (angle >= 360) angle = 0;

        window.requestAnimFrame(function() { draw(angle) });
    }

    draw(0);
}, false);


