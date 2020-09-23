spessore = 2 ; 
coloreLinea="#000000";
x = 0; //di default x=0 così non darà errore se si schiaccia il pulsante e non c'è il testo
testoX=20;
testoY=18;

function onload(){
	canvasWidth = 1330;
	canvasHeight = 560;
	lineStops= 30;
	lineStopsWidth = 5; //dimensione di metà delle linee sugli assi
	centerX = canvasWidth/2;
	centerY = canvasHeight/2;
	canvas = document.getElementById("canvas");
	canvas.height = canvasHeight;
	canvas.width = canvasWidth;
	Ctx = canvas.getContext("2d");	
	drawAxes(); //richiama la funzione per disegnare gli assi quando si carica la pagina
};

function clearAll(){
	Ctx.save();
	Ctx.clearRect(0,0,canvasWidth,canvasHeight); //i primi due parametri sono le coordinate del punto di inizio
												 //e le ultime due sono la larghezza e l'altezza del rettangolo da pulire
	drawAxes();
	Ctx.restore(); // ripristina le caratteristiche del Ctx salvate in precedenza (colore della linea, spessore)
};

function drawAxes () {
	Ctx.strokeStyle="#000000";
	Ctx.save() ;
	Ctx.lineWidth = 3;
	// disegna asse X: da P(0,centerY) --> B(canvasWidth,centerY)
	Ctx.beginPath() ;
	Ctx.moveTo(0,centerY) ;
	Ctx.lineTo(canvasWidth,centerY) ;
	Ctx.stroke() ;

	// disegna asse Y: da P(centerX,0) --> B(centerX,canvasHeight)
	Ctx.beginPath() ;
	Ctx.moveTo(centerX,0) ;
	Ctx.lineTo(centerX,canvasHeight) ;
	Ctx.stroke() ;

	for (var i=0; i < canvasWidth-centerX; i+=lineStops) {
		//disegno lelinee sull'asse x dal centro alla fine dell'assse positivo
		Ctx.lineWidth = 1;
		Ctx.beginPath() ;
		Ctx.moveTo(centerX+i,centerY-lineStopsWidth) ; // disegna il segmento dal basso verso l'alto --|--|--| 
		Ctx.lineTo(centerX+i,centerY+lineStopsWidth) ; // e ogni volta si sposta di un unità di misura(lineStops) 
		Ctx.stroke() ;
	};

	for (var i=0; i < centerX; i+=lineStops) {
	//disegno lelinee sull'asse x dal centro alla fine dell'assse negativo
	Ctx.beginPath() ;
	Ctx.moveTo(centerX-i,centerY-lineStopsWidth) ;
	Ctx.lineTo(centerX-i,centerY+lineStopsWidth) ;
	Ctx.stroke() ;
	};

	for (var i=0; i < centerY; i+=lineStops) {
	//disegno lelinee sull'asse y dal centro dell'assse fino alla fine dell'asse negativo
	Ctx.beginPath() ;
	Ctx.moveTo(centerX-lineStopsWidth,centerY+i) ;
	Ctx.lineTo(centerX+lineStopsWidth,centerY+i) ;
	Ctx.stroke() ;
	};

	for (var i=0; i < centerY; i+=lineStops) {
	//disegno lelinee sull'asse y dal centro dell'assse fino alla fine dell'asse positivo
	Ctx.beginPath() ;
	Ctx.moveTo(centerX-lineStopsWidth,centerY-i) ;
	Ctx.lineTo(centerX+lineStopsWidth,centerY-i) ;
	Ctx.stroke() ;
	};
}

var f = function (x) { //passo a parametro x che verrà utilizzato dalla funzione
	testo = String(document.getElementById("testo").value); //prende in input la funzione e fa il cast to string del valore
	testoTrimmed = testo.trim(); //elimina gli spazi bianchi (non necessario)
	var abs = testoTrimmed.search("abs");
	var rad = testoTrimmed.search("rad");
	var log = testoTrimmed.search("log");
	var cos = testoTrimmed.search("cos"); //cerca nella funzione delle parole chiave 
	var sin = testoTrimmed.search("sin");
	var tan = testoTrimmed.search("tan");


	if (cos!=-1) { 
		testoTrimmed = testoTrimmed.replace(/cos/g,"Math.cos");  //sostituisca il valore con un'altra parola 
	}
	if (sin!=-1) {	
		testoTrimmed = testoTrimmed.replace(/sin/g,"Math.sin");		
	}
	if (tan!=-1) {		
		testoTrimmed = testoTrimmed.replace(/tan/g,"Math.tan");		
	}
	if (rad!=-1) {		
		testoTrimmed = testoTrimmed.replace(/rad/g,"Math.sqrt");		
	}
	if (log!=-1) {		
		testoTrimmed = testoTrimmed.replace(/log/g,"Math.log");		
	}
	if (abs!=-1) {		
		testoTrimmed = testoTrimmed.replace(/abs/g,"Math.abs");		
	}	

	if (testoTrimmed.charAt(0) != "z") {
		testoTrimmed =  testoTrimmed.replace("f(x)=","");
	}else{
		Naf = testoTrimmed; //prendo la non funzione e la trasformo in y=f(x)
		testoTrimmed = testoTrimmed.replace("zeri:","");
		var ugualeIndex = testoTrimmed.search("=");
		testoTrimmed = testoTrimmed.replace("=","");
		uno = testoTrimmed.substr(0,ugualeIndex);
		due = testoTrimmed.substr(ugualeIndex,testoTrimmed.length);
		testoTrimmed = (uno+"-("+due+")")// Mettere la seconda funzione negativa
		console.log(testoTrimmed)
		drawF(uno)
		drawF(due)
	}
	
	testoTrimmed = eval(testoTrimmed); //trasforma il testo in azioni leggibili dal programma
	return testoTrimmed //ritora la funzione corretta
}

function getCaratteristiche () {
	var linea = String(document.getElementById("linea").value); //prende il valore di ciascun input
	var spessoreLinea = parseInt(document.getElementById("spessore").value);
	var scala = parseInt(document.getElementById("scala").value);
	console.log(coloreLinea);

	if (linea.length != 0 && linea.length==7) { //controlla se è vuoto o se ha un numero di caratteri maggiore di 7 (#123456)
		coloreLinea=linea;   //assegna il valore digitato alla variabile globale
		console.log(coloreLinea)
	};
	if (isNaN(spessoreLinea)!= true && spessoreLinea>0) { //controlla se la variabile non è un numero e se è maggiore di zero
		spessore = spessoreLinea;
	};
	if (isNaN(scala) != true && scala>0) { //controlla se la variabile non è un numero e se è maggiore di zero
		lineStops = scala; //assegno la scala immessa dall'utente alla variabile che controlla la scala del grafico
		clearAll(); //richiamo la funzione che cancella tutto che poi al suo interno ha anche la funzione che ricrea gli assi
	};

	document.getElementById("linea").value = "";  //fa ritornare bianche le caselle input
	document.getElementById("spessore").value = "";
	document.getElementById("scala").value = "";

}

function draw() {	
	Ctx.strokeStyle= coloreLinea; //assegna il colore alla linea
	Ctx.lineWidth = spessore;  //assegna lo spessore alla linea
	Ctx.beginPath(); //incomincia il percorso 
		for (var i =0; i < centerX; i++) {
			x = i/lineStops ; 	//rapporto di scala a cui si riferisce la funzione (unità di misura)
			y = f(x);			 //*lineStops+centerY;			
			Ctx.lineTo(centerX+i,-y*lineStops+centerY);	//si mette -y perchè le coordinate sono inizialmente invertite
		}			
			Ctx.stroke(); //finisce di scrivere la funzione che va dal centro alla fine
			Ctx.moveTo(centerX,centerY); //si muove al centro degli assi
			Ctx.beginPath(); //ricomincia il percorso 

		for (var i =0; i < centerX; i++) {
			var x = -(i/lineStops) ; //rapporto di scala a cui si riferisce la funzione
			y = f(x); //*lineStops+centerY;			
			Ctx.lineTo(centerX-i,-y*lineStops+centerY); //si mette -y perchè le coordinate sono inizialmente invertite
		}
	Ctx.stroke();
}



function disegnaFigure () {
	var figura = prompt("Che figura vuoi disegnare?");
	switch(figura){
		case "rettangolo":
			drawRettangolo();
		break;
		case "cerchio":
			drawCerchio();
		break;
	}
}

function drawRettangolo () {
	Ctx.font = "bolder 17px Arial";
	Ctx.fillStyle = '#ffffff'; 
	Ctx.clearRect(0,0,200,60);
	Ctx.lineWidth=1;
	Ctx.strokeStyle = "#ffee33"
	var rectX = parseFloat(prompt("Inserire centro x del rettangolo"));
	var rectY = parseFloat(prompt("Inserire centro y del rettangolo"));
	var larghezza =  parseFloat(prompt("Inserire la larghezza del rettangolo"));
	var altezza =  parseFloat(prompt("Inserire l'altezza del rettangolo"));
	var metaAltezza = altezza/2;
	var metaLarghezza = larghezza/2;
	var area = larghezza*altezza;
	testoArea = "AREA : "+area.toFixed(2);
	testoCentro = "Centro : P("+rectX+","+rectY+")";
	var x = centerX-(lineStops*metaLarghezza)+(rectX*lineStops);
	var y = centerY-(lineStops*metaAltezza)-(rectY*lineStops);
	Ctx.beginPath();
	Ctx.rect(x,y,larghezza*lineStops,altezza*lineStops);
	Ctx.stroke();
	Ctx.fillStyle = "#33eeff";
	Ctx.beginPath();
	Ctx.arc(x+metaLarghezza*lineStops,y+(metaAltezza*lineStops),0.2*lineStops,0,Math.PI*2); //disegna un punto nel centro della figura
	Ctx.fill();
	Ctx.font = "17px Arial";
	Ctx.fillText(testoArea,testoX,testoY);
	Ctx.fillText(testoCentro,testoX,testoY+18);

}

function drawCerchio () {
	Ctx.clearRect(0,0,200,60);
	Ctx.lineWidth=1;
	Ctx.strokeStyle = "#ffee33"
	var pX = parseFloat(prompt("Inserire centro x del cerchio")); //prendo i dati dal prompt e li converto in numeri float
	var pY = parseFloat(prompt("Inserire centro y del cerchio"));
	var r =  parseFloat(prompt("Inserire la larghezza del cerchio"));
	var area = 2*Math.PI*r; //calcolo l'area del cerchio
	var x = pX*lineStops+centerX; //calcolo le ccordinate in base alla scala del grafico 
	var y =centerY-pY*lineStops;
	testoArea = "AREA : "+area.toFixed(2); //scrivo sulla canvas l'area e il punto del centro della figura
	testoCentro = "Centro : P("+pX+","+pY+")";
	Ctx.beginPath();
	Ctx.arc(x,y,r*lineStops,0,2*Math.PI); //disegna la figura
	Ctx.stroke();
	Ctx.fillStyle = "#33eeff"
	Ctx.beginPath();
	Ctx.arc(x,y,0.2*lineStops,0,Math.PI*2);//disegna un punto nel centro della figura
	Ctx.fill();
	Ctx.font = "17px Arial";
	Ctx.fillText(testoArea,testoX,testoY);
	Ctx.fillText(testoCentro,testoX,testoY);	
}



function getIntervallo () {
	var intervallo = String(document.getElementById("intervallo").value); //prende il valore di ciascun input
	intervallo = intervallo.trim();
	var sep = intervallo.search(";");
	if (sep!=-1) {//se il valore è stato trovato ovvero è diverso da -1
	
		window.a= eval(intervallo.substr(0,sep));
		window.b= eval(intervallo.substr(sep, intervallo.length));
		
		if (a>b) { //controllo se a è maggiore di b
			var cont = b;
			b= a;
			a= cont;
		};
	};	
	document.getElementById("intervallo").value = "";
	console.log(a,b)
	return [a,b];
}

function calcoloZeri (a,b) {

	var myWindow = window.open("", "Tabella", "width=360, height=300,top=600, left=500,scrollbars=1");
	myWindow.document.write("<table border='1' cellspacing='5'>"
		+"<tr>"
		+"<th><p>n</p></th>"
		+"<th><p>a</p></th>"
		+"<th><p>b</p></th>"
		+"<th><p>m</p></th>"
		+"<th><p>f(m)</p></th>"
		+"<th><p>&epsilon;</p></th>"
		+"</tr>");

	var m,E; //E= valore approssimazione m=punto medio
	var n=0;
	continua = f(a)*f(b);
	E= (b-a)/2;
 	if (continua<0) {
		while(E>approssimazione || f(m)==0){
			
			E= (b-a)/2;
			m = (b+a)/2; //==> f(m) : if(f(a)*f(m)<0){ b=m} 
						 //==> if(f(a)*f(m)>0){a=m}
			/*myWindow.document.write("<tr>");
			myWindow.document.write("<td>"+n+"</td>");
			myWindow.document.write("<td>"+a+"</td>");
			myWindow.document.write("<td>"+b+"</td>");
			myWindow.document.write("<td>"+m+"</td>");
			myWindow.document.write("<td>"+Number((f(m)).toFixed(3))+"</td>");			
			myWindow.document.write("<td>"+E+"</td>");
			myWindow.document.write("</tr>\n");*/
			if ((f(a)*f(m))<0) {
				b=m;
			}else{
				a=m;
			};
			n++;
		};
	/*myWindow.document.write("</table>");*/
	} else {
		console.log("La funzione nell'intervallo indicato non è continua");
	};
	Ctx.beginPath(); //disegna punto m (valore approssimato)
	Ctx.fillStyle="#32b7e2";
	Ctx.arc((m*lineStops)+centerX, 0+centerY, 0.15*lineStops, 0, 2 * Math.PI);
	Ctx.fill();
	Ctx.beginPath(); //disegna punto di intersezione delle due funzioni di f(x)
	Ctx.fillStyle="#e92f31";
	Ctx.arc((m*lineStops)+centerX, -calcolaFunzione(uno,m)*lineStops+centerY, 0.1*lineStops, 0, 2 * Math.PI);
	Ctx.fill();
	Ctx.fillStyle="#32b7e2";
	Ctx.font = "15px Arial";	
	Ctx.clearRect(0,0,300,65);
	Ctx.fillText("Valore approssimato: "+m,testoX+15,testoY-5);
	Ctx.fillText("Approssimazione: "+E,testoX+15,testoY+13);
	console.log("Valore Approssimato --> "+m+" Valore approssimazione --> "+E);
}
function calcolaFunzione (f,x) {  //calcola la f(x) per un valore x
	y=eval(f);
	return y;
}
function getApprossimazione () {
	approssimazione = parseFloat(document.getElementById("approssimazione").value);
	document.getElementById("approssimazione").value = "";
	return approssimazione;
}

function drawF (f) {
	console.log("drawF(y)");
	Ctx.strokeStyle="#4cd6d0";
	Ctx.lineWidth = 1;
	Ctx.beginPath(); //incomincia il percorso 
		for (var i =0; i < centerX; i++) {
			x = i/lineStops ; 	//rapporto di scala a cui si riferisce la funzione (unità di misura)
			y= eval(f);			 //*lineStops+centerY;			
			Ctx.lineTo(centerX+i,-y*lineStops+centerY);	//si mette -y perchè le coordinate sono inizialmente invertite
		}			
			Ctx.stroke(); //finisce di scrivere la funzione che va dal centro alla fine
			Ctx.moveTo(centerX,centerY); //si muove al centro degli assi
			Ctx.beginPath(); //ricomincia il percorso 

		for (var i =0; i < centerX; i++) {
			var x = -(i/lineStops) ; //rapporto di scala a cui si riferisce la funzione
			y= eval(f);	//*lineStops+centerY;			
			Ctx.lineTo(centerX-i,-y*lineStops+centerY); //si mette -y perchè le coordinate sono inizialmente invertite
		}
	Ctx.stroke();
}

function getInfoLim () {
	getIntervallo();
	var intervall = getIntervallo();
	var a=intervall[0];
	var b=intervall[1];
	var approssimazione = getApprossimazione();
	calcoloZeri(a,b);

}


/*

dove le due funzioni si incontrano: asintoto verticale P
segmento che indica l'intervallo (rosso)... OPZIONALE


*/