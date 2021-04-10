let canvas=document.getElementById("drawing")
let context=canvas.getContext('2d');
playerSpeed=5;
gameOn=false;
score=0;

class box{
    constructor(size,color){
        this.x=0;
        this.y=0;
        this.color=color;
        this.size=size;
    }
}

class player extends box{
    constructor(speed)
    {
        super(50,'blue')
        this.speed=speed;
    }
    move()
    {
        this.x=this.x+this.speed;
        if(this.x+this.size>500)
        {
            this.speed= - Math.abs(this.speed)
        }
         if(this.x<0)
        {
            this.speed= Math.abs(this.speed)
        }
    }
}

class enemy extends box{
    constructor(speed)
    {
        super(50,'red')
        this.speed=speed;
    }
    move()
    {
        this.y=this.y+this.speed;
        if(this.y+this.size>500)
        {
            this.speed= - Math.abs(this.speed)
        }
        else if(this.y+this.size<this.size)
        {
            this.speed= Math.abs(this.speed)
        }
    }
}


p = new player(0);
p.y=200;
b1 = new enemy(1);
b1.x=190;
b2= new enemy(10);
b2.x=250; 


canvas.addEventListener('mousedown',() => {
    p.speed=playerSpeed;
})

canvas.addEventListener('mouseup',() => {
    p.speed=0;
})

function getDistance(x,y)
{
    let ftop=y.y;
    let fbottom=y.y+y.size;
    let fleft=y.x;
    let fright=y.x+y.size; 

    let stop=x.y;
    let sbottom=x.y+x.size;
    let sleft=x.x;
    let sright=x.x+x.size;
  
    if(sleft<fright && fleft<sright && sbottom>ftop && fbottom>stop)
    {
        return true;
    }
    return false;

}

function draw(box)
{
    context.fillStyle=box.color;
    context.fillRect(box.x,box.y,box.size,box.size);
}

function move(){
    if(gameOn)
    {
        return;
    }
    context.clearRect(0,0,500,500)
    b1.move()
    b2.move()
    p.move()
    document.getElementById("score").innerHTML = "score: "+score
    if(getDistance(p,b1) || getDistance(p,b2))
    {
        alert("GAME OVER!");
        p.x=0;
        p.speed=0;
        score++;
    }
    if(score>1)
    {
        alert("no no no more")
        gameOn=true
        b1.y=0
        b2.y=2
    }
    draw(p)
    draw(b1)
    draw(b2)
    window.requestAnimationFrame(move)
}
move()


