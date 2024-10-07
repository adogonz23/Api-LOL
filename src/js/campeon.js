export class Campeon {
    constructor(data){
        this.name = data.id;
        this.imagen= "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+this.name+"_0.jpg";
        this.splasArt="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+this.name+"_0.jpg";
        this.titulo = data.title;
    }
    
}