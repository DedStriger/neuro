		  $(()=>{
		  	const fon = document.querySelector('.main_container');
            const startModal = document.getElementById("start_modal");
            const endModal = document.getElementById("end_modal");
            $('#brain').val(15);
            $('#jump').val(20);
		  	var speed = 0;
		  	var start = false; 
            var seconds = 0;
            var minutes = 0;
		  	var left = 0;
            var flag = false;
            var player = '';
            var position = 1000;
            var way = fon.offsetWidth;
            var spaceCount = 0;
            var spaceFlag = false;
            var startJump = true;
            var waitCount = 0;

            document.addEventListener('keydown', function(event) {
                if (event.code === 'Space') {
                       $('.hero').animate({bottom: '370px'}, 410);
                        $('.hero').animate({bottom: '50px'}, 280,'linear');
                }
            });

            // document.addEventListener('keypress', function(event){
            //     if(event.code === 'Space' && startJump){
            //      if(waitCount === 0){
            //       spaceFlag = true;
            //       jump();
            //       startJump = false;
            //       waitCount = 1;
            //      }  
            //     }
            // });

            // document.addEventListener('keyup', function(event){
            //     if(event.code === 'Space'){
            //         spaceFlag = false;
            //         startJump = true;
            //         spaceCount = 0;
            //         $('#muscule').val(spaceCount);
            //         $('.muscule').html(spaceCount);
            //         waitCount = 0;
            //     }
            // });

            // var jump = () => {
            //     spaceCount = 0;
            //     setInterval(function(){
            //         if(spaceFlag){
            //             console.log(spaceCount);
            //             spaceCount++;
            //             $('#muscule').val(spaceCount);
            //             $('.muscule').html(spaceCount);
            //             if(spaceCount === +$('#jump').val()){
            //              $('.hero').animate({bottom: '370px'}, 410);
            //              $('.hero').animate({bottom: '50px'}, 280,'linear');
            //              spaceCount = 0;
            //              spaceFlag = false;
            //             }
            //         }
            //      }, 50);
            // }



				 document.addEventListener('keydown', function(event) {
  				if (event.code === 'Escape') {
		  			start = false;
		  		}
		  	});
    	
    		setInterval(function(){
    			if(start){
                    speed = -1 * $('#brain').val();
    				left += speed ;
    				fon.style.left = left + 'px';
                    $('.score-value').html(count());
                               if(left < -(way - document.body.clientWidth)){
                        finish();
                    }
                $('.pipe-item').each(function(){
                    if( (($('.hero').offset().left + $('.hero').width() - 15) >= $(this).offset().left) 
                        &&  (($('.hero').offset().top + $('.hero').height()) >= $(this).offset().top) 
                        && ($(this).offset().left >= 100)){
                      let i =0;
                    }
      
                });
                    progress(left);

    			} else {
    				flag ? finish() : null;
    			}
    		}, 20);

            setInterval(function(){
               if(start){
                time();
               } 
            }, 1000);

    $('#jump').change(function(){
    		$('.jump').html($('#jump').val());
    });

    $('#jump').mousemove(function(){
    		$('.jump').html($('#jump').val());
    });

       $('#brain').change(function(){
            $('.brain').html($('#brain').val());
    });

    $('#brain').mousemove(function(){
            $('.brain').html($('#brain').val());
    });

       $('#muscule').change(function(){
            $('.muscule').html($('#muscule').val());
    });

    $('#muscule').mousemove(function(){
            $('.muscule').html($('#muscule').val());
    });

    $('.brain').html($('#brain').val());
    $('.jump').html($('#jump').val());
    $('.muscule').html($('#muscule').val());

    var finish = () => {
    	if(flag){
    		endModal.style.display = 'block';
            let finalScore = count();
            $('.score-number').html(finalScore);
            sessionStorage.setItem(player, `time ${$('.progress-item-value').html()} score ${finalScore}`);
    		flag = false;
            start = false;
    	}
    }

    var progress = (prog) => {
        let percent = prog/(-(way/100));
        $('.progress-hero').css('left', percent + '%');
    }

    var time = () => {
        seconds++;

        if (seconds > 60){
            seconds = 0;
            minutes++;
        }

        if(seconds < 10){
            seconds = '0' + seconds;
        }

        $('.progress-item-value').html(minutes+':'+seconds);
    }

$('.form-level').each(function(){
    $(this).on('click', function(){
        $('.level-active').removeClass('level-active');
        $(this).toggleClass('level-active');

    });
});

$('.play-btn').on('click', function(e){
    e.preventDefault();
    $('.pipe-item').each(function(){$(this).remove();});
    startGame($('.level-active').data("level"));
    generate();
    if($('.level-active') && $('.input-id').val() !== ''){
        speed = -1 * $('#brain').val();
        start = true;
        flag = true;
        startModal.style.display = "none";
        player = $('.input-id').val() + ' level ' + $('.level-active').data("level");
    }
});


$('.cont-btn').on('click', function(e){
    e.preventDefault();
    endModal.style.display = 'none';
    startModal.style.display = 'block';
    fon.style.left = '0px';
    left = 0;
    seconds = 0;
    minutes = 0;

    $('.progress-item-value').html('0:00');
});

var generate = (pipeNumber, from, to) => {
  way = fon.offsetWidth;
  for(let i=0; i < pipeNumber; i++){
    $('.main_container').append(`<img src="img/куст_${Math.floor(Math.random() * 3)}.png" style='left: ${position}px;' alt="припятствие" class="pipe-item">`);
    if(position < (way - 2*document.body.clientWidth)){
        position = randomInteger(position + from , position + to);
    }
    console.log(position);
  }
  position = 1000;
}

var randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var startGame = (level) => {
    $('#muscule').attr('max', $('#jump').val());
    switch (level) {
  case 1:
    fon.style.width = 18000 + 'px';
    generate(9, 650, 2000);
    break;
  case 2:
    fon.style.width = 25000 + 'px';
    generate(16, 600, 1700);
    break;
  case 3:
    fon.style.width = 30000 + 'px';
    generate(25, 600, 1400);
    break;
  default:
    alert( "Ошибка выбора уровня" );
}
}

var count = () => {
    let score = 0;
    $('.pipe-item').each(function(){
        if($(this).offset().left <= $('.hero').offset().left){
            score++;
        }
    });
    return score;
}


var downloadURL = function(url, name) {
    var link = document.createElement('a');
    if(name == undefined || name == ''){name = url};
    link.setAttribute('href',url);
    link.setAttribute('download',name);
    onload = link.click();
};

  $('.download').click(function() {
    let scoreText = '';
    for(let i=0; i<sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      scoreText += ` ${key}: ${sessionStorage.getItem(key)}<br>`;
    }
    downloadURL('data:text/plain;charset=UTF-8,'+ scoreText.replace(/<br>/g, encodeURIComponent("\r\n")), 'score');
  });


});