"use strict"
let pseudoJ1 ={
    nbFoisJoue: 0,
    celluleFaitTouche: [],
    celluleFaitCoule: []

};
let pseudoJ2={
    nbFoisJoue: 0,
    celluleFaitTouche: [],
    celluleFaitCoule: []
};
let mine={};
let playerEnCours;

function recupPseudo(form){
    pseudoJ1.name = form.nameJoueur1.value;
    pseudoJ2.name = form.nameJoueur2.value;
    mine.nbMine=Number(form.nbMine.value);
    mine.mineRestantJ1= Number(form.nbMine.value);
    mine.mineRestantJ2= Number(form.nbMine.value);

    //supp le form
    let body = document.getElementsByTagName("body")[0];
    let formu = document.getElementsByTagName("form")[0];
    body.removeChild(formu);

    //faire la tableau
    tableauCreation(0);
    //1er joueur joue
    placerMine();
    return false;
}

function tableauCreation(commencer){
    let nbCollumn=0;
    let nbLine=0;
    let tableauEntier="";
    let additionID=0;

    ///////tableau player 1///////
    do{//boucle ligne
        nbCollumn=0;
        do{//boucle collonne

            if(nbCollumn%10===0)
            {
                //début de tr
                tableauEntier+="<tr>";

            }

            additionID=(nbCollumn+(10*nbLine));
            if(commencer===0){
                tableauEntier+="<td onclick='takeId(\""+additionID+"\", 0)' id='"+additionID+"'>&nbsp;&nbsp;</td>";
            }
            else{
                tableauEntier+="<td onclick='takeId(\""+additionID+"\", 1)' id='"+additionID+"'>&nbsp;&nbsp;</td>";

            }


            if((nbCollumn+1)%10===0)//fin de tr
            {
                tableauEntier+="</tr>";
            }

            nbCollumn++;

        }while(nbCollumn<10);
        nbLine++;
    }while(nbLine<10);

    document.getElementsByTagName("table")[0].innerHTML=tableauEntier;

    let compteur;
    //va mettre les tableau quand ils sont déjà un peu fait
    if(playerEnCours===1)//si J1 joue
    {
        if(pseudoJ1.celluleFaitTouche.length!=0)
        {
            for(let i=0; i<pseudoJ1.celluleFaitTouche.length; i++)//si case est touche
            {
                compteur=0;
                do{
                    if(compteur==pseudoJ1.celluleFaitTouche[i])
                    {
                        document.getElementById(pseudoJ1.celluleFaitTouche[i]).style.backgroundColor="red";
                        document.getElementById(pseudoJ1.celluleFaitTouche[i]).style.color="white";
                        document.getElementById(pseudoJ1.celluleFaitTouche[i]).textContent="TOUCHE";
                    }

                    compteur++;
                }while(compteur<100);

            }
        }
        if(pseudoJ1.celluleFaitCoule.length!=0)
        {
            for(let i=0; i<pseudoJ1.celluleFaitCoule.length; i++)//si case est coule
            {
                compteur=0;
                do{
                    if(compteur==pseudoJ1.celluleFaitCoule[i])
                    {
                        document.getElementById(pseudoJ1.celluleFaitCoule[i]).style.backgroundColor="black";
                    }

                    compteur++;
                }while(compteur<100);

            }
        }





    }
    else{//si J2 joue
        if(pseudoJ2.celluleFaitTouche.length!=0)
        {
            for(let i=0; i<pseudoJ2.celluleFaitTouche.length; i++)//si case est touche
            {
                compteur=0;
                do{
                    if(compteur==pseudoJ2.celluleFaitTouche[i])
                    {
                        document.getElementById(pseudoJ2.celluleFaitTouche[i]).style.backgroundColor="red";
                        document.getElementById(pseudoJ2.celluleFaitTouche[i]).style.color="white";
                        document.getElementById(pseudoJ2.celluleFaitTouche[i]).textContent="TOUCHE";
                    }

                    compteur++;
                }while(compteur<100);

            }
        }
        if(pseudoJ2.celluleFaitCoule.length!=0) {

            for (let i = 0; i < pseudoJ2.celluleFaitCoule.length; i++)//si case est coule
            {
                compteur = 0;
                do {
                    if (compteur == pseudoJ2.celluleFaitCoule[i]) {
                        document.getElementById(pseudoJ2.celluleFaitCoule[i]).style.backgroundColor = "black";
                    }

                    compteur++;
                } while (compteur < 100);

            }
        }

    }



}

function placerMine(){
    document.getElementById("namePlayer").innerHTML=pseudoJ1.name;                                                          ////ligne 78: va appeller pour faire fin J1
    document.getElementById("message").innerHTML="<h2>"+pseudoJ1.name+", place tes mines !</h2><button id='finiPoserMine' onclick='passerJ2();'>J'ai terminé de poser mes mines</button>";
}
function passerJ2(){
    if(finishPlacer("joueur1")===1){//si tout est bon
        placerMine2();
        tableauCreation(0);
    }
}
function placerMine2(){
    document.getElementById("namePlayer").innerHTML=pseudoJ2.name;
    document.getElementById("message").innerHTML="<h2>"+pseudoJ2.name+", place tes mines !</h2><button id='finiPoserMine' onclick='finiPlacerTOUT();'>J'ai terminé de poser mes mines</button>";
}
function finishPlacer(player){
    let tableauMine=[];
    let compteurMine=0;
    let ok=0;

    for(let i=0; i<100; i++){//va mettre les mines dans le tableau
        tableauMine[i]=document.getElementsByTagName("td")[i].innerText;
    }

    for(let i in tableauMine)
    {//voir si il ya le bon nombre de mine
        if(tableauMine[i]==="X"){
            compteurMine++;
        }
    }
        if(compteurMine>mine.nbMine){
            alert("Vous avez mis trop de mine !");
            tableauCreation(0);
            if(player==="joueur1")
            {
                placerMine();
                return 0;
            }
            else if(player==="joueur2"){
                placerMine2();
                return 0;
            }

        }
        else if(compteurMine<mine.nbMine)
        {
            alert("Vous avez mis moins de mine que prévu !");
            tableauCreation(0);
            if(player==="joueur1")
            {
                placerMine();
                return 0;
            }
            else if(player==="joueur2"){
                placerMine2();
                return 0;
            }
        }
        else{
            ok++;//pour dire que on a respecter le nbr de mine
            if(player==="joueur1")
            {
                mine.joueur1=tableauMine;
                return 1;
            }
            else if(player==="joueur2"){
                mine.joueur2=tableauMine;
                return 1;
            }
        }




}


function finiPlacerTOUT(){
    if(finishPlacer("joueur2")===1){//si tout est bon
        debutJeu();
    }

}
function debutJeu(){
    document.getElementById("namePlayer").innerHTML=pseudoJ1.name;
    document.getElementById("message").innerHTML="<h2>Essaie de trouver où "+pseudoJ2.name+" a placé(e) ses mines !</h2>";
    playerEnCours=1;
    tableauCreation(1);//création de tableau
    //pour le reste du jeu =>voirSiToucher
}

function playerOneJoue(){
    playerEnCours=1;
    document.getElementById("namePlayer").innerHTML=pseudoJ1.name;
    document.getElementById("message").innerHTML="<h2>Essaie de trouver où "+pseudoJ2.name+" a placé(e) ses mines !</h2>";
    tableauCreation(1);//création de tableau
    //pour le reste du jeu =>voirSiToucher
}

function playerDeuxJoue(){
    playerEnCours=2;
    document.getElementById("namePlayer").innerHTML=pseudoJ2.name;
    document.getElementById("message").innerHTML="<h2>Essaie de trouver où "+pseudoJ1.name+" a placé(e) ses mines !</h2>";
    tableauCreation(1);//création de tableau
    //pour le reste du jeu =>voirSiToucher
}

function takeId(identite, commencer){//quand on clique ce qui se passe et 0 si pas commencer le jeu
    if(commencer===0){//si pas commencer
        document.getElementById(identite).textContent ="X";
    }
    else{//si en jeu voir si toucher
        voirSitoucher(identite);
    }
}

function voirSitoucher(identite){
    let dejaFait=0;
    if(playerEnCours===1)
    {//si c'est J1 qui joue
        for(let i=0; i<pseudoJ1.celluleFaitCoule.length; i++)
        {
            if(pseudoJ1.celluleFaitCoule[i]===identite)//si on a déjà appuyé sur cette case dans coule
            {
               dejaFait++;
            }
        }
        for(let i=0; i<pseudoJ1.celluleFaitTouche.length; i++)
        {
            if(pseudoJ1.celluleFaitTouche[i]===identite)//si on a déjà appuyé sur cette case dans touche
            {
                dejaFait++;
            }
        }
        if(dejaFait===0)//si jamais fait
        {
            pseudoJ1.nbFoisJoue++;//pour dire qu'il a joué
            if(mine.joueur2[identite]==="X")//si touché
            {
                pseudoJ1.celluleFaitTouche.push(identite);//rajoute les coordonnées de touché
                mine.mineRestantJ2--;
                document.getElementById(identite).style.backgroundColor="red";
                document.getElementById(identite).style.color="white";
                document.getElementById(identite).textContent="TOUCHE";
                mine.joueur2[identite]="  ";

            }
            else{//si pas touché
                document.getElementById(identite).style.backgroundColor="black";
                pseudoJ1.celluleFaitCoule.push(identite);//rajoute les coordonnées de rate
            }
            if(mine.mineRestantJ2===0){//trouvé toutes les mines
                if(mine.mineRestantJ1===0)//si J2 a fini aussi
                {
                    document.getElementById("message").innerHTML="<h2>Tu as trouvé toutes les mines en "+pseudoJ1.nbFoisJoue+" essai(s) !</h2><button id='buttonEnvoyer' onclick='endOfGame()' >Voir les résultats</button>";
                }
                else{
                    document.getElementById("message").innerHTML="<h2>Tu as trouvé toutes les mines en "+pseudoJ1.nbFoisJoue+" essai(s) !</h2><button id='buttonEnvoyer' onclick='playerDeuxJoue()' >Fin du tour</button>";
                }
            }
            else{// si il reste des mines
                if(mine.mineRestantJ1===0)//si J2 a fini
                {
                    document.getElementById("message").innerHTML="<h2>Il reste "+mine.mineRestantJ2+" mines !</h2><button id='buttonEnvoyer'  onclick='playerOneJoue()' >Fin du tour</button>";
                }
                else{
                    document.getElementById("message").innerHTML="<h2>Il reste "+mine.mineRestantJ2+" mines !</h2><button id='buttonEnvoyer'  onclick='playerDeuxJoue()' >Fin du tour</button>";
                }
            }
        }
    }



    else{//si c'est J2 qui joue
        dejaFait=0;
        for(let i=0; i<pseudoJ2.celluleFaitCoule.length; i++)
        {
            if(pseudoJ2.celluleFaitCoule[i]===identite)//si on a déjà appuyé sur cette case dans coule
            {
                dejaFait++;
            }
        }
        for(let i=0; i<pseudoJ2.celluleFaitTouche.length; i++)
        {
            if(pseudoJ2.celluleFaitTouche[i]===identite)//si on a déjà appuyé sur cette case dans touche
            {
                dejaFait++;
            }
        }
        if(dejaFait===0)//si jamais fait
        {
            pseudoJ2.nbFoisJoue++;//pour dire qu'il a joué
            if(mine.joueur1[identite]==="X")//si touché
            {
                pseudoJ2.celluleFaitTouche.push(identite);//rajoute les coordonnées de touche
                mine.mineRestantJ1--;
                document.getElementById(identite).style.backgroundColor="red";
                document.getElementById(identite).style.color="white";
                document.getElementById(identite).textContent="TOUCHE";
                mine.joueur1[identite]="  ";

            }
            else{//si pas touché
                pseudoJ2.celluleFaitCoule.push(identite);//rajoute les coordonnées de rate
                document.getElementById(identite).style.backgroundColor="black";
            }
            if(mine.mineRestantJ1===0){//trouvé toutes les mines
                if(mine.mineRestantJ2===0)//si J1 a fini aussi
                {
                    document.getElementById("message").innerHTML="<h2>Tu as trouvé toutes les mines en "+pseudoJ2.nbFoisJoue+" essai(s) !</h2><button  id='buttonEnvoyer'  onclick='endOfGame()' >Voir les résultats</button>";
                }
                else{
                    document.getElementById("message").innerHTML="<h2>Tu as trouvé toutes les mines en "+pseudoJ2.nbFoisJoue+" essai(s) !</h2><button id='buttonEnvoyer'  onclick='playerOneJoue()' >Fin du tour</button>";
                }
            }
            else{// si il reste des mines
                if(mine.mineRestantJ2===0)//si J1 a fini
                {
                    document.getElementById("message").innerHTML="<h2>Il reste "+mine.mineRestantJ1+" mines !</h2><button id='buttonEnvoyer'  onclick='playerDeuxJoue()' >Fin du tour</button>";
                }
                else{
                    document.getElementById("message").innerHTML="<h2>Il reste "+mine.mineRestantJ1+" mines !</h2><button id='buttonEnvoyer'  onclick='playerOneJoue()' >Fin du tour</button>";
                }
            }
        }
    }

}



function trieCoordonnes(){
    pseudoJ1.celluleFaitTouche.sort();
    pseudoJ2.celluleFaitTouche.sort();
    pseudoJ1.celluleFaitCoule.sort();
    pseudoJ2.celluleFaitCoule.sort();
}


function tableauResulatFinal(){
    trieCoordonnes();
    let tableauComplet="";
    tableauComplet+="<table class='tableauFinal'><thead><tr><td></td><td>"+pseudoJ1.name+"</td><td>"+pseudoJ2.name+"</td></tr></thead>";//début du tableau avec les noms
    tableauComplet+="<tbody><tr><td>Coordonnées de<br>l'endroit où vous avez<br>trouvé une mine<br>(triées par ordre numérique)</td><td></td><td></td></tr>";
    for(let i=0; i<mine.nbMine; i++)//////////////////////////////////////////pour les positions des mines
    {
        if(pseudoJ1.celluleFaitTouche[i].length===1){
            if(pseudoJ2.celluleFaitTouche[i].length===1)
            {
                tableauComplet+="<tr><td></td><td>("+pseudoJ1.celluleFaitTouche[i][0]+";0)</td><td>("+pseudoJ2.celluleFaitTouche[i][0]+";0)</td></tr>";

            }
            else{
                tableauComplet+="<tr><td></td><td>("+pseudoJ1.celluleFaitTouche[i][0]+";0)</td><td>("+pseudoJ2.celluleFaitTouche[i][0]+";"+pseudoJ2.celluleFaitTouche[i][1]+")</td></tr>";
            }
        }
        else if(pseudoJ2.celluleFaitTouche[i].length===1){
            if(pseudoJ1.celluleFaitTouche[i].length===1)
            {
                tableauComplet+="<tr><td></td><td>("+pseudoJ1.celluleFaitTouche[i][0]+";0)</td><td>("+pseudoJ2.celluleFaitTouche[i][0]+";0)</td></tr>";

            }
            else{
                tableauComplet+="<tr><td></td><td>("+pseudoJ1.celluleFaitTouche[i][0]+";"+pseudoJ1.celluleFaitTouche[i][1]+")</td><td>("+pseudoJ2.celluleFaitTouche[i][0]+";0)</td></tr>";
            }
        }
        else{
            tableauComplet+="<tr><td></td><td>("+pseudoJ1.celluleFaitTouche[i][0]+";"+pseudoJ1.celluleFaitTouche[i][1]+")</td><td>("+pseudoJ2.celluleFaitTouche[i][0]+";"+pseudoJ2.celluleFaitTouche[i][1]+")</td></tr>";
        }
    }
    tableauComplet+="<tr><td>Coordonnées de<br>l'endroit où vous n'avez<br>rien trouvé<br>(triées par ordre numérique)</td><td></td><td></td></tr>";
    let player1NbFoisCoule=pseudoJ1.celluleFaitCoule.length;
    let player2NbFoisCoule=pseudoJ2.celluleFaitCoule.length;
    let indexP1=0;//le numéro de l'index du tableau
    let indexP2=0;
    let finiTotal=0;//voir si on sort de la boucle

    do//////////////////////////////////////////pour les positions des non-mines
    {
        if(player1NbFoisCoule!=0 || player2NbFoisCoule!=0)// tant que pas fini
        {
            tableauComplet+="<tr><td></td>";
            if(player1NbFoisCoule!=0){//vois si il y a encore des coordonnées à afficher ou pas
                if(pseudoJ1.celluleFaitCoule[indexP1].length===1)
                {
                    tableauComplet+="<td>("+pseudoJ1.celluleFaitCoule[indexP1][0]+";0)</td>";
                }
                else{
                    tableauComplet+="<td>("+pseudoJ1.celluleFaitCoule[indexP1][0]+";"+pseudoJ1.celluleFaitCoule[indexP1][1]+")</td>";
                }

                indexP1++;//passer à l'index d'après
                player1NbFoisCoule--; //pour dire que on a deja afficher 1 resultat
            }
            else{
                tableauComplet+="<td>/</td>";
            }
            if(player2NbFoisCoule!=0){//vois si il y a encore des coordonnées à afficher ou pas
                if(pseudoJ2.celluleFaitCoule[indexP2].length===1)
                {
                    tableauComplet+="<td>("+pseudoJ2.celluleFaitCoule[indexP2][0]+";0)</td>";
                }
                else{
                    tableauComplet+="<td>("+pseudoJ2.celluleFaitCoule[indexP2][0]+";"+pseudoJ2.celluleFaitCoule[indexP2][1]+")</td>";
                }
                indexP2++;//passer à l'index d'après
                player2NbFoisCoule--; //pour dire que on a deja afficher 1 resultat
            }
            else{
                tableauComplet+="<td>/</td>";
            }
            tableauComplet+="</tr>";
        }
        else{//si fini
            finiTotal++;
            tableauComplet+="</tbody></table>";
        }


    }while(finiTotal===0);

    return tableauComplet;//retourne tout le tableau

}

function endOfGame(){
    let divPlayer= document.getElementById("divPlayer");
    let namePlayer= document.getElementById("namePlayer");
    let tablePlayer= document.getElementById("tablePlayer");
    divPlayer.removeChild(namePlayer);
    divPlayer.removeChild(tablePlayer);

    let tableauResulat=tableauResulatFinal();
    if(pseudoJ1.nbFoisJoue<pseudoJ2.nbFoisJoue)
    {
        document.getElementById("message").innerHTML="<img src='images/victoireRoyal.png' alt='Victoire Royale'><h1>"+pseudoJ1.name+" a gagné !!!!</h1><h2>"+pseudoJ1.name+" a trouvé toutes les mines en "+pseudoJ1.nbFoisJoue+" essais tandis que "+pseudoJ2.name+" a trouvé toutes les mines en "+pseudoJ2.nbFoisJoue+" essais !</h2>"+tableauResulat+"<button onClick='window.location.reload(true)' id='buttonEnvoyer'>Nouvelle partie</button><p>Ce site a été réalisé dans le but du cours de programmation web de l'<a href='https://portal.ephec.be/'  target='_blank'>EPHEC</a></p> ";

    }
	else if(pseudoJ1.nbFoisJoue===pseudoJ2.nbFoisJoue)
	{
		document.getElementById("message").innerHTML="<h1>Il y a une égalité parfaite !!!!</h1><h2>"+pseudoJ1.name+" a trouvé toutes les mines en "+pseudoJ1.nbFoisJoue+" essais tandis que "+pseudoJ2.name+" a trouvé toutes les mines en "+pseudoJ2.nbFoisJoue+" essais !</h2>"+tableauResulat+"<button onClick='window.location.reload(true)' id='buttonEnvoyer'>Nouvelle partie</button><p>Ce site a été réalisé dans le but du cours de programmation web de l'<a href='https://portal.ephec.be/'  target='_blank'>EPHEC</a></p> ";

	}
    else{
        document.getElementById("message").innerHTML="<img src='images/victoireRoyal.png' alt='Victoire Royale'><h1>"+pseudoJ2.name+" a gagné !!!!</h1><h2>"+pseudoJ1.name+" a trouvé toutes les mines en "+pseudoJ1.nbFoisJoue+" essais tandis que "+pseudoJ2.name+" a trouvé toutes les mines en "+pseudoJ2.nbFoisJoue+" essais !</h2>"+tableauResulat+"<button onClick='window.location.reload(true)' id='buttonEnvoyer'>Nouvelle partie</button><p>Ce site a été réalisé dans le but du cours de programmation web de l'<a href='https://portal.ephec.be/'  target='_blank'>EPHEC</a></p> ";

    }
}
