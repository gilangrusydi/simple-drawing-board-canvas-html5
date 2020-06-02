class Draw{

    constructor(){
        // Define Canvas
        this.canvas = document.querySelector('canvas');
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        // Context
        this.ctx = this.canvas.getContext('2d');

        // Mouse object
        this.mouse = {
            x:0,
            y:0
        };

        // Save the paint handler
        this.onPainHandler = this.paint.bind(this);

        // Define button
        this.colorButton = document.querySelectorAll('button[data-color]');
        this.clearButton = document.querySelector('#clear');
        
        // Init config
        this.initConfig();
        // Listener
        this.listener();
    }

    // Handle event listener 
    listener(){

        
        // Bind this state
        let bindThis = this;

        this.ctx.save();

        // Mousemove event
        this.canvas.addEventListener('mousemove', function(e){
            bindThis.mouse.x = e.pageX - this.offsetLeft;
            bindThis.mouse.y = e.pageY - this.offsetTop;
            e.preventDefault();
        });

        // Mousedown event
        this.canvas.addEventListener('mousedown', (e)=>{
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            
            // Inject mousemove
            this.canvas.addEventListener('mousemove', this.onPainHandler);
            e.preventDefault();
        });

        //Mouse Up
        this.canvas.addEventListener('mouseup', (e) => {
            this.canvas.removeEventListener('mousemove', this.onPainHandler);
            e.preventDefault();
        }); 

        // Color Button
        for(var i = 0; i < this.colorButton.length; i++){
            this.colorButton[i].addEventListener('click', function(e){
                bindThis.ctx.strokeStyle = this.getAttribute('data-color');
                bindThis.toggleActive(this.getAttribute('data-color'));
                e.preventDefault();
            });
        }

        // Clear Button
        this.clearButton.addEventListener('click', this.clearCanvas.bind(this));

        this.ctx.restore();

    }

    initConfig(){
        this.ctx.save();
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black'; // set default to 'black'
        this.ctx.restore();
    }

    // On Paint
    paint(){
        this.ctx.save();
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
        this.ctx.restore();
    }

    // Toggle active the button
    toggleActive(button){
        for(var i = 0; i < this.colorButton.length; i++){
            if(this.colorButton[i].getAttribute('data-color') == button) this.colorButton[i].classList.add('active');
               else this.colorButton[i].classList.remove('active');
        }
    }

    // Clear canvas board
    clearCanvas(){
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        this.ctx.restore();
    }

    // 

}