
$(document).ready(function(){
    var rand;  
    $('.board').prepend('SUDOKU'+ '<br>').css({'color': 'white', 'border': '1px solid black', 'border-radius': '10px', 'text-align': 'center', 'font-size':'40px', 'font-family':'Anton', 'font-weight':'bolder'});  
        $.ajax({
        url: "/easyData", 
        success: function(result){ 
            var puzzle = result.split('');
            for (var i = 0; i < 9; i++){
              $('input[data-row=' + i + ']').each(function(j, el){
                $(el).val(puzzle[j + (9 * i)]); 
              });
            }
        } 
       }); 
   

    $('#validate').on('click', checkWin); 
    $('#newBoard').on('click', newBoard); 
    $('#easy').on('click', easy); 
    $('#medium').on('click', medium); 
    $('#hard').on('click', hard); 

    function newBoard() {
      document.getElementById("myDropdown").classList.toggle("show");
    }
    function easy(){
       rand = Math.floor(Math.random() * 10000); 
      $('#message').text('Loading easy-difficulty puzzle # ' + rand + '...').css({"background-color": "#FFCCFF", "font-size": "400%", "font-family": "Roboto", "z-index": '10', 'border-radius': '5px', 'border': '1px solid black'}).animate({'opacity': 1}, 1000, function(){
        $('#message').delay(1000).animate({'opacity': 0}, 1500); 
      }); 
      setTimeout(function(){
        $.ajax({
        url: "/easyData", 
        success: function(result){ 
            var puzzle = result.split('');
            for (var i = 0; i < 9; i++){
              $('input[data-row=' + i + ']').each(function(j, el){
                $(el).val(puzzle[j + (9 * i)]); 
              });
            }
        } 
       }); 
      }, 3500);
    }   
     function medium(){
       rand = Math.floor(Math.random() * 10000); 
      $('#message').text('Loading medium-difficulty puzzle # ' + rand + '...').css({"background-color": "#FFCCFF", "font-size": "400%", "font-family": "Roboto", "z-index": '10', 'border-radius': '5px', 'border': '1px solid black'}).animate({'opacity': 1}, 1000, function(){
        $('#message').delay(1000).animate({'opacity': 0}, 1500); 
      }); 
      setTimeout(function(){
         $.ajax({
        url: "/mediumData", 
        success: function(result){ 
            var puzzle = result.split('');
            for (var i = 0; i < 9; i++){
              $('input[data-row=' + i + ']').each(function(j, el){
                $(el).val(puzzle[j + (9 * i)]); 
              });
            }
        } 
       }); 
      }, 3500);  
    }
    function hard(){
      rand = Math.floor(Math.random() * 10000); 
      $('#message').text('Loading hard-difficulty puzzle # ' + rand + '...').css({"background-color": "#FFCCFF", "font-size": "400%", "font-family": "Roboto", "z-index": '10', 'border-radius': '5px', 'border': '1px solid black'}).animate({'opacity': 1}, 1000, function(){
        $('#message').delay(1000).animate({'opacity': 0}, 1500); 
      }); 
      setTimeout(function(){
         $.ajax({
        url: "/hardData", 
        success: function(result){ 
            var puzzle = result.split('');
            for (var i = 0; i < 9; i++){
              $('input[data-row=' + i + ']').each(function(j, el){
                $(el).val(puzzle[j + (9 * i)]); 
              });
            }
        } 
       }); 
      }, 3500);  
    }






    function checkWin (){
      var checkArr = []; 
      var dataNum = ['0','1','2','3','4','5','6','7','8'];
      var checkAgainst = ['1','2','3','4','5','6','7','8','9'];
      var winLoss = true;  
      $('input').each(function(i, el){
        if ($(el).val() === '-' || $(el).val() === ''){
            $('h1').text('Not yet...').addClass('lose'); 
        } 
      });
      for (var i = 0; i < 9; i++){
        $("input[data-column=" + dataNum[i] + "]").each(function(i, el){
          checkArr.push($(el).val()); 
        }); 
       for (var j = 0; j < checkAgainst.length; j++){
          if (checkArr.indexOf(checkAgainst[j]) === -1){
              //console.log('no ', checkAgainst[j], 'at data-column', dataNum[i]);
              winLoss = false; 
          }   
        }
        checkArr = []; 
        }
        for (var k = 0; k < 9; k++){
        $("input[data-row=" + dataNum[k] + "]").each(function(i, el){
            checkArr.push($(el).val()); 
        }); 
         for (var l = 0; l < checkAgainst.length; l++){
            if (checkArr.indexOf(checkAgainst[l]) === -1){
                //console.log('no ', checkAgainst[l], 'at data-row', dataNum[k]);
                winLoss = false; 
            }   
          }
          checkArr = []; 
        }
        $(".box").each(function(i, el){
            $(el).find('input').each(function(j, iel){
              checkArr.push($(iel).val()); 
               if (checkArr.length === 9){
                for (var m = 0; m < checkAgainst.length; m++){
                  if (checkArr.indexOf(checkAgainst[m]) === -1){
                    //console.log('no ', checkAgainst[m], 'in box number', i);
                    winLoss = false; 
                  }
                  else if (m === checkAgainst.length - 1 && checkArr.indexOf(checkAgainst[m]) !== -1){
                    checkArr = []; 
                  }      
                }
              }

            }); 
       
        }); 

     if (winLoss === true){
      rand = Math.floor(Math.random() * 10000); 
        $('h1').text('Correct! Loading a new puzzle shortly...').addClass('win').removeClass('lose').animate({'opacity': 1}, 1500, function(){
        $('#result').animate({'opacity': 0}, 2500); 
      });
      setTimeout(function(){
        window.location.href = "/puzzle/easy/" + rand;
      }, 3500);  
      }  
      else {
         rand = Math.floor(Math.random() * 10000); 
        $('h1').text('Not yet...').addClass('lose').animate({'opacity': 1}, 1500, function(){
          $('#result').animate({'opacity': 0}, 2500); 
        }); 
      }   
    }

}); 





  



