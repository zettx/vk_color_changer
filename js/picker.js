var Line ={

    Hue: 0,

    init: function (elem){

        var canvaLine, cAr, pst, bk, t = 0;

        canvaLine = Line.create(elem.h, elem.w, elem.line, "cLine");

        cAr = document.getElementById(elem.th);
        bk = document.getElementById(elem.bk);

        chrome.storage.local.get('vkColorChanger', function(result){ 
            var values = result['vkColorChanger'];
            values = JSON.parse(values);

            cAr.style.top = (360 - values['hue-deg']) * (elem.h/ 360)-2 +"px";
            bk.style.backgroundColor = "rgb("+convert.hsv_rgb(values['hue-deg'],55,65)+")";
        });

        Line.posit = function (e){
            var top;

            top = mouse.pageY(e) - pst;
	    //window.alert(top);
	    if((top>elem.h)||(top<0)) {return;}

            cAr.style.top = top-2 +"px";
            t =  Math.round(top / (elem.h / 360));
            t = 360 - t;
            t = (t === 360) ? 0 : t;
            Line.Hue = t;

            document.getElementById('hue-deg').value = t;

            bk.style.backgroundColor = "rgb("+convert.hsv_rgb(t,55,65)+")";
        };
        // события перемещения по линии
        cAr.onmousedown = function (){

            pst = Obj.positY(canvaLine);

            document.onmousemove = function(e){Line.posit(e);};
        };

        cAr.onclick = Line.posit;

        canvaLine.onclick = function (e){Line.posit(e);};

        canvaLine.onmousedown = function (){

            pst = Obj.positY(canvaLine);

            document.onmousemove = function(e){Line.posit(e);};
        };
        document.onmouseup = function (){
            document.onmousemove = null; 
            cAr.onmousemove = null; 
            //document.getElementById('message').innerHTML = 'Изменения сохранены.';
        };
    },


    create : function (height, width, line, cN){
        var canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        canvas.className = cN;
        document.getElementById(line).appendChild(canvas);

        Line.grd(canvas, height, width);

        return canvas;
    },

    grd:function (canva, h, w){
        var gradient,hue,color, canva,
        tone = 255, i;

        canva = canva.getContext("2d");

        gradient = canva.createLinearGradient(w/2,h,w/2,0);

        hue = [[tone,0,0],[tone,tone,0],[0,tone,0],[0,tone,tone],[0,0,tone],[tone,0,tone],[tone,0,0]];

        for (i=0; i <= 6; ++i){

            color = 'rgb('+hue[i][0]+','+hue[i][1]+','+hue[i][2]+')';

            gradient.addColorStop(i/6, color);

        }
        canva.fillStyle = gradient;
        canva.fillRect(0,0, w ,h);
    }
};

var Block = {
    init: function (elem) {

        var block, bPstY=0, bHe, pxY;

        block = document.getElementById(elem.block);
        bHe = block.offsetHeight;
        pxY = bHe / 100;

        Block.cPos = function (e){

            var top, V;

            document.ondragstart = function() { return false;};

            document.body.onselectstart = function() { return false; };

            top = mouse.pageY(e) - bPstY;
            top = (top > bHe)? bHe : top;
            top = (top < 0)? 0 : top;

            V = Math.ceil(100. - top / pxY);

            picker.V = V;

            picker.out_color.style.backgroundColor = "rgb("+convert.hsv_rgb(Line.Hue,V)+")";
        };

        block.onclick = function(e){Block.cPos(e);};
        block.onmousedown  = function (){
            document.onmousemove = function (e){
                //bPstX = Obj.positX(block);
                bPstY = Obj.positY(block);
                Block.cPos(e);
            };
        };

        document.onmouseup=function() {
            document.onmousemove = null;
        };
    }
};

var convert = {

    hsv_rgb: function (H,V){

        var f, q, t, lH,
        R, G, B;

        lH = Math.floor(H / 60);
        f = H/60 - lH;
	V/=100;
        q = (1.-f)*V;
        t = f*V;

        switch (lH){

            case 0: R = V; G = t; B = 0; break;
            case 1: R = q; G = V; B = 0; break;
            case 2: R = 0; G = V; B = t; break;
            case 3: R = 0; G = q; B = V; break;
            case 4: R = t; G = 0; B = V; break;
            case 5: R = V; G = 0; B = q; break;}

        return [parseInt(R*255), parseInt(G*255), parseInt(B*255)];
    }

}; 

var picker = {
    V: 100,
    S: 100,
    status:false,

    init: function () {
        var id_elements = {primary: "primary_block", arrows: "arrows", block: "block_picker", line: "line"}, 
        s ={h:180, w:20, th: id_elements.arrows, bk: id_elements.block, line: id_elements.line},
        b = {block: id_elements.block};
        /*
        Параметры передаваемые через обьект "s" обьекту "Line"
        h - высота линни Hue
        w- ширина линни Hue
        th  - id для елмента в котором находяться стрелки || ползунок для управление шкалой Hue
        bk - id блока главного блока с изображение и изменяемым фоном
        */
        Line.init(s);//отрисовка линий hue и привязка событий

        /*
        Параметры передаваемые через обьект "b" обьекту "Block"
        id - id блока выбора цвета (основной блок)
        */
        Block.init(b);// привязка событий к блоку для управления

        picker.out_color = document.getElementById("out_color");

    }
};


picker.init();