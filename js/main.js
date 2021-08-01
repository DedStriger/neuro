		  $(()=>{
		  	const fon = document.querySelector('.main_container');
            const startModal = document.getElementById("start_modal");
            const endModal = document.getElementById("end_modal");
            $('#brain').val(20);
            $('#jump').val(20);
		  	var speed = 0;
		  	var start = false; 
            var seconds = 0;
            var score = 0;
            var minutes = 0;
		  	var left = 0;
            var flag = false;
            var player = '';
            var point = 0;
            var position = 1000;
            var way = fon.offsetWidth;
            var spaceCount = 0;
            var spaceFlag = false;
            var startJump = true;
            var check = true;
            var checkStart = false;
            var waitCount = 0;
            var sessionCount = 0;
            const level1 = ['1200', '2899', '4647', '6536', '7732', '9338', '10554', '11701', '12990', '14057'];
            const level2 = ['1105', '2899', '4898', '5916', '7119', '8339', '9692', '11079', '12049', '13738', '15304', '16552', '17894', '19000', '20174', '21610', '22500'];
            const level3 = ['1000', '2187', '3221', '4595', '5879', '7096', '8320', '9569', '11467', '12327', '13224', '14582', '15440', '16261', '17219', '18466', '19356', '20526', '21541', '22495', '23519', '24985', '26478'];
           var keyjump = false;
           //закоментируйте код от строки 32 до строки 64, и раскомментируйте код от строки 67 до строки 105


            $('body').mousedown(function(){
                if(start && checkStart){
                    keyjump = true;
                }
            });


            $('body').click(function(){
                if(start && check && checkStart){
                    $('.hero').animate({bottom: '370px'}, 410);
                    $('.hero').animate({bottom: '50px'}, 410,'linear');
                    
                }
            });



            $('body').mouseup(function(){
                if(start){
                    keyjump = false;
                }
            });

           setInterval(function(){
                if(keyjump && checkStart){
                    $('.hero').animate({bottom: '370px'}, 410);
                    $('.hero').animate({bottom: '50px'}, 410,'linear');
                    check = false;
                } else {
                    check = true;
                    return false;
                }
            }, 820);
            

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
                            
                            $(this).addClass('fall');
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

            for(let i = 0; i < sessionStorage.length; i++){
                let key = sessionStorage.key(i);
                for(let t = 1; t < sessionStorage.length+1; t++){
                    if(key === player + ' try '+ t){
                     sessionCount++;
                    }
               }
            }

            sessionStorage.setItem(player + ' try ' + (sessionCount + 1), `time ${$('.progress-item-value').html()} score ${finalScore}`);
    		flag = false;
            start = false;
            sessionCount = 0;
    	}
    }

    var progress = (prog) => {
        let percent = prog/(-(fon.offsetWidth/100));
        $('.progress-hero').css('left',  percent + '% ');
    }

    var time = () => {
        seconds++;
        $('.pipe-item').each(function(){
            if($(this).hasClass('fall') && !($(this).hasClass('check'))){
                seconds += 10;
                $(this).addClass('check');
            }
        });
        if (seconds > 59){
            seconds = seconds - 60;
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
        setTimeout(function(){
            checkStart = true;
        }, 200);
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
    score = 0;
    checkStart = false;
    $('.progress-item-value').html('0:00');
});



var generate = (length, level) => {
  for(let i=0; i < length; i++){
    $('.main_container').append(`<img src="img/kust_${Math.floor(Math.random() * 3)}.png" style='left: ${level[i]}px;' alt="припятствие" class="pipe-item">`);
  }
}


var startGame = (level) => {
    $('#muscule').attr('max', $('#jump').val());
    switch (level) {
  case 1:
    fon.style.width = 18000 + 'px';
    way = fon.offsetWidth;
    generate(level1.length,level1);
    break;
  case 2:
    fon.style.width = 25000 + 'px';
    way = fon.offsetWidth;
    generate(level2.length,level2);
    break;
  case 3:
    fon.style.width = 30000 + 'px';
    way = fon.offsetWidth;
    generate(level3.length,level3);
    break;
  default:
    alert( "Ошибка выбора уровня" );
}
}

var count = () => {
    
    $('.pipe-item').each(function(){
        if(($(this).offset().left <= $('.hero').offset().left) && (($('.hero').offset().top + $('.hero').height()) <= $(this).offset().top) && !($(this).hasClass('complete')) && !($(this).hasClass('fall'))){
            score++;
            $(this).addClass('complete');
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